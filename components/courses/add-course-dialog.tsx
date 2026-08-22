"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCourseAction } from "@/lib/actions/courses";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export function AddCourseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    const res = await createCourseAction(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Course added!");
      setIsOpen(false);
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] rounded-[1.5rem] bg-background shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading">New Course</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Name</Label>
              <Input id="title" name="title" placeholder="e.g. Data Structures" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input id="code" name="code" placeholder="e.g. CS101" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input id="instructor" name="instructor" placeholder="e.g. Dr. Alan Turing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester / Term</Label>
              <Input id="semester" name="semester" placeholder="e.g. Fall 2026" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input id="credits" name="credits" type="number" min="0" placeholder="3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input id="schedule" name="schedule" placeholder="e.g. Mon/Wed 10:00 AM" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input id="description" name="description" placeholder="A brief summary..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Theme Color</Label>
            <div className="flex gap-2">
              {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"].map(c => (
                <label key={c} className="cursor-pointer">
                  <input type="radio" name="color" value={c} className="peer sr-only" defaultChecked={c === "#3b82f6"} />
                  <div className="w-8 h-8 rounded-full border-2 border-transparent peer-checked:border-foreground transition-all" style={{ backgroundColor: c }} />
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add Course"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
