import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters.").regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed."),
  department: z.string().optional(),
  semester: z.string().optional(),
  student_id: z.string().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
