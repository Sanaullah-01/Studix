"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAssignmentsAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("assignments").select("*, courses(title)").order("due_date", { ascending: true });
  if (error) return { error: error.message };
  return { assignments: data };
}

export async function createAssignmentAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const due_date = formData.get("due_date") as string;
  const course_id = formData.get("course_id") as string || null;

  if (!title) return { error: "Title is required" };

  const { error } = await supabase.from("assignments").insert({
    user_id: user.id,
    title,
    description,
    due_date: due_date || null,
    course_id: course_id || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/assignments");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateAssignmentStatusAction(id: string, status: 'todo' | 'in_progress' | 'completed') {
  const supabase = await createClient();
  const { error } = await supabase.from("assignments").update({ status }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/assignments");
  revalidatePath("/dashboard");
  return { success: true };
}
