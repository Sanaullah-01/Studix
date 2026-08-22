"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getNotesAction() {
  const supabase = await createClient();
  const { data, error } = (await supabase).from("notes").select("*, courses(title, color)").order("created_at", { ascending: false });
  if (error) return { error: error.message };
  return { notes: data as any[] };
}

export async function createNoteAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const courseId = formData.get("course_id") as string;
  const file = formData.get("pdf_file") as File;

  if (!title) return { error: "Title is required" };
  
  let file_url = null;
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from("notes_files")
      .upload(filePath, file);
      
    if (uploadError) return { error: "Failed to upload file: " + uploadError.message };
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("notes_files")
      .getPublicUrl(filePath);
      
    file_url = publicUrl;
  }

  const { error } = await supabase.from("notes").insert({
    student_id: user.id,
    course_id: courseId !== "none" ? courseId : null,
    title,
    content,
    file_url,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/notes");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteNoteAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/notes");
  revalidatePath("/dashboard");
  return { success: true };
}
