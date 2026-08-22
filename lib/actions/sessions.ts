"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getStudySessionsAction() {
  const supabase = await createClient();
  const { data, error } = (await supabase).from("study_sessions").select("*, courses(title)").order("date", { ascending: false });
  if (error) return { error: error.message };
  return { sessions: data as any[] };
}

export async function logStudySessionAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const durationStr = formData.get("duration_minutes") as string;
  const date = formData.get("date") as string;
  const course_id = formData.get("course_id") as string || null;

  const duration_minutes = parseInt(durationStr, 10);
  if (!title || isNaN(duration_minutes)) return { error: "Invalid input" };

  const { error } = await supabase.from("study_sessions").insert({
    student_id: user.id,
    title,
    duration_minutes,
    date: date || new Date().toISOString().split('T')[0],
    course_id: course_id || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/study");
  revalidatePath("/dashboard");
  return { success: true };
}
