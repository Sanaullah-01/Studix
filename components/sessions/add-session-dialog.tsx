"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logStudySessionAction } from "@/lib/actions/sessions";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddSessionDialog({ courses }: { courses: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("none");

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    formData.set("course_id", selectedCourse);
    const res = await logStudySessionAction(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Study session logged!");
      setIsOpen(false);
      setSelectedCourse("none");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Log Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] bg-background shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading">Log Study Session</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Topic / Focus</Label>
            <Input id="title" name="title" placeholder="e.g. Reading Chapter 5" required />
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (Minutes)</Label>
              <Input id="duration_minutes" name="duration_minutes" type="number" min="1" placeholder="60" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white" disabled={isLoading}>
            {isLoading ? "Saving..." : "Log Session"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
