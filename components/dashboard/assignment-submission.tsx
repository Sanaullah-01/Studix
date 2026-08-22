"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadCloud, CheckCircle2 } from "lucide-react";

interface AssignmentSubmissionProps {
  status: 'pending' | 'submitted' | 'graded';
}

export function AssignmentSubmission({ status: initialStatus }: AssignmentSubmissionProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setStatus('submitted');
      setIsSubmitting(false);
    }, 1500);
  };

  if (status === 'graded') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5" /> Graded
          </CardTitle>
          <CardDescription>This assignment has been graded. Submissions are closed.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === 'submitted') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600 flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5" /> Submitted
          </CardTitle>
          <CardDescription>Your work has been submitted successfully and is awaiting review.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={() => setStatus('pending')}>
            Undo Submission (Mock)
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Submit Work</CardTitle>
          <CardDescription>Upload your assignment files below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">File Attachment</Label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, ZIP (MAX. 10MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} required />
              </label>
            </div>
            {file && <p className="text-sm font-medium mt-2">Selected: {file.name}</p>}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea id="comments" placeholder="Type your message here." />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!file || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
