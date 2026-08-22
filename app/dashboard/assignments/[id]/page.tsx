import { getAssignmentById } from "@/lib/data/mock-courses";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, FileText, GraduationCap } from "lucide-react";
import { AssignmentSubmission } from "@/components/dashboard/assignment-submission";

export default async function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const assignment = getAssignmentById(resolvedParams.id);

  if (!assignment) {
    notFound();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'graded': return <Badge variant="default">Graded</Badge>;
      case 'submitted': return <Badge variant="secondary">Submitted</Badge>;
      default: return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Link 
          href="/dashboard/assignments" 
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assignments
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    {assignment.courseCode} - {assignment.courseName}
                  </p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Due:</span>
                  <span>{assignment.dueDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Points:</span>
                  <span>{assignment.score !== undefined ? `${assignment.score} / ` : ''}{assignment.totalPoints}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-semibold flex items-center mb-2">
                  <FileText className="mr-2 h-4 w-4" /> Description
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {assignment.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <AssignmentSubmission status={assignment.status} />
        </div>
      </div>
    </div>
  );
}
