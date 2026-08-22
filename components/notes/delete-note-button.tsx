"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteNoteAction } from "@/lib/actions/notes";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteNoteButton({ noteId, noteTitle }: { noteId: string; noteTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteNoteAction(noteId);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Note deleted successfully");
      setIsOpen(false);
    }
    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="w-full sm:w-auto mt-6">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] bg-background shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center font-heading">
            <Trash2 className="mr-2 h-5 w-5" /> Confirm Deletion
          </DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Are you sure you want to delete <strong className="text-foreground">{noteTitle}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
