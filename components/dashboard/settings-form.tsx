"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileInput } from "@/validations/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/lib/actions/profile";
import { toast } from "sonner";
import { AvatarUpload } from "./avatar-upload";
import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SettingsForm({ profile }: { profile: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      username: profile.username || "",
      department: profile.department || "",
      semester: profile.semester ? String(profile.semester) : "",
      student_id: profile.student_id || "",
    },
  });

  const onSubmit = async (data: ProfileInput) => {
    setIsLoading(true);
    const result = await updateProfileAction(data);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully!");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <AvatarUpload initialUrl={profile.avatar_url} fullName={profile.full_name} />
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={profile.email} disabled className="bg-muted/50 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="johndoe123" {...form.register("username")} disabled={isLoading} />
          {form.formState.errors.username && <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" placeholder="John Doe" {...form.register("full_name")} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student_id">Student ID</Label>
          <Input id="student_id" placeholder="e.g. S123456" {...form.register("student_id")} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input id="department" placeholder="Computer Science" {...form.register("department")} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="semester">Semester</Label>
          <Input id="semester" placeholder="1" {...form.register("semester")} disabled={isLoading} />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
