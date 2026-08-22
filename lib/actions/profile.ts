"use server";

import { createClient } from "@/lib/supabase/server";
import { ProfileInput } from "@/validations/profile";
import { revalidatePath } from "next/cache";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function updateProfileAction(data: ProfileInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check if username is already taken by someone else
  if (data.username) {
    const { data: existingUser } = await adminClient
      .from("profiles")
      .select("id")
      .eq("username", data.username)
      .neq("id", user.id)
      .single();
    
    if (existingUser) {
      return { error: "Username is already taken." };
    }
  }

  // @ts-expect-error: Supabase inference bug
  const { error } = await supabase.from("profiles").update({
    full_name: data.full_name,
    username: data.username,
    department: data.department || null,
    semester: data.semester ? parseInt(data.semester, 10) : null,
    student_id: data.student_id || null,
  }).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateAvatarAction(avatarUrl: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // @ts-expect-error: Supabase inference bug
  const { error } = await supabase.from("profiles").update({
    avatar_url: avatarUrl,
  }).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/", "layout");
  return { success: true };
}
