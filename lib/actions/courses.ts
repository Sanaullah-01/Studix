"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCoursesAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
  if (error) return { error: error.message };
  return { courses: data };
}

export async function createCourseAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const instructor = formData.get("instructor") as string;
  const color = formData.get("color") as string || "#3b82f6";
  const code = formData.get("code") as string;
  const semester = formData.get("semester") as string;
  const credits = formData.get("credits") ? parseInt(formData.get("credits") as string, 10) : null;
  const schedule = formData.get("schedule") as string;

  if (!title) return { error: "Title is required" };

  const { error } = await supabase.from("courses").insert({
    user_id: user.id,
    title,
    description,
    instructor,
    color,
    code,
    semester,
    credits,
    schedule,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteCourseAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard");
  return { success: true };
}
