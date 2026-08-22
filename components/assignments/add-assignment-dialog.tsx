"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAssignmentAction } from "@/lib/actions/assignments";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddAssignmentDialog({ courses }: { courses: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("none");

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    formData.set("course_id", selectedCourse);
    const res = await createAssignmentAction(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Assignment created!");
      setIsOpen(false);
      setSelectedCourse("none");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] bg-background shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading">New Assignment</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Assignment Title</Label>
            <Input id="title" name="title" placeholder="e.g. Chapter 3 Essay" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course_id">Course (Optional)</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <span className="flex flex-1 text-left line-clamp-1 text-foreground">
                  {selectedCourse === "none" ? "None" : courses?.find(c => c.id === selectedCourse)?.title || "Select a course..."}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {courses?.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="course_id" value={selectedCourse} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input id="due_date" name="due_date" type="datetime-local" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input id="description" name="description" placeholder="Instructions..." />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add Assignment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
