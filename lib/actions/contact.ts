"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy");
const TARGET_EMAIL = process.env.PERSONAL_CONTACT_EMAIL || "your.email@example.com";

export async function submitContactForm(data: { firstName: string; lastName: string; email: string; message: string }) {
  if (!data.firstName || !data.email || !data.message) {
    return { error: "Missing required fields." };
  }

  const supabase = await createClient();
  
  // Rate limiting check
  // Check if this email has submitted a message in the last 24 hours
  // This assumes a 'contact_messages' table exists. If it doesn't, we will catch the error and still send the email,
  // but warn the developer to create the table.
  const { data: recentMessages, error: dbError } = await supabase
    .from("contact_messages")
    .select("created_at")
    .eq("sender_email", data.email)
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (!dbError && recentMessages && recentMessages.length >= 3) {
    return { error: "You have reached the maximum number of messages (3 per 24 hours). Please try again later." };
  }

  // Insert record to track rate limiting
  // @ts-expect-error: contact_messages might not be in the generated types yet
  await supabase.from("contact_messages").insert([{
    sender_email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    message: data.message
  }]);

  // Send Email via Resend
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "dummy") {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "contact@Studix.dev",
        to: TARGET_EMAIL,
        subject: `New Contact Request from ${data.firstName} ${data.lastName}`,
        text: `From: ${data.firstName} ${data.lastName} (${data.email})\n\nMessage:\n${data.message}`,
      });
    } catch (error) {
      console.error("Failed to send contact email:", error);
      return { error: "Failed to send the email to support. Please try again." };
    }
  } else {
    console.warn("RESEND_API_KEY is dummy or missing. Email was not actually sent.");
  }

  return { success: true };
}

