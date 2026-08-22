"use server";

import { createClient } from "@/lib/supabase/server";
import { RegisterInput, LoginInput } from "@/validations/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Resend } from "resend";
import { WelcomeEmail } from "@/components/emails/welcome-email";

import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY || "dummy");

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || secret === "dummy_key_for_dev") return true; // skip in dev

  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, { method: "POST" });
  const data = await res.json();
  return data.success && data.score >= 0.5;
}

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function loginAction(data: LoginInput) {
  const isValidRecaptcha = await verifyRecaptcha(data.recaptchaToken);
  if (!isValidRecaptcha) return { error: "reCAPTCHA verification failed. Are you a bot?" };

  const supabase = await createClient();
  
  let emailToLogin = data.identifier;
  
  // If identifier is not an email, assume it's a username and lookup the email securely
  if (!emailToLogin.includes("@")) {
    const adminClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: profile } = await adminClient.from("profiles").select("email").eq("username", data.identifier).single();
    if (!profile) return { error: "Invalid username or password" };
    emailToLogin = profile.email;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: emailToLogin,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  const { data: mfaData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaData && mfaData.nextLevel === 'aal2' && mfaData.currentLevel === 'aal1') {
    redirect("/mfa/verify");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function registerAction(data: RegisterInput) {
  const isValidRecaptcha = await verifyRecaptcha(data.recaptchaToken);
  if (!isValidRecaptcha) return { error: "reCAPTCHA verification failed. Are you a bot?" };

  // Check if username is already taken using admin client
  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const { data: existingUser } = await adminClient.from("profiles").select("id").eq("username", data.username).single();
  if (existingUser) return { error: "Username is already taken." };

  const supabase = await createClient();
  
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    // Insert into profiles table
    // @ts-expect-error: Supabase SDK manual type inference limitation
    const { error: profileError } = await adminClient.from('profiles').insert([{
      id: authData.user.id,
      email: data.email,
      username: data.username,
      full_name: data.full_name,
      student_id: data.student_id,
      department: data.department || null,
      semester: data.semester ? parseInt(data.semester, 10) : null,
    }]);

    if (profileError) {
      return { error: "Failed to create user profile: " + profileError.message };
    }

    // Dispatch Resend Welcome Email
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "dummy") {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: data.email,
          subject: "Welcome to Studix!",
          react: React.createElement(WelcomeEmail, { fullName: data.full_name }) as React.ReactElement,
        });
      } catch (e) {
        console.error("Failed to send welcome email", e);
      }
    }
  }

  // Redirect to a verification instruction page
  redirect("/verify-email");
}

export async function resetPasswordAction(email: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/update-password`,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function deleteAccountAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Unauthorized" };
  }

  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await adminClient.auth.admin.deleteUser(user.id);
  if (error) {
    return { error: error.message };
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

