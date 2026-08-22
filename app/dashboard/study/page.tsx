import { getStudySessionsAction } from "@/lib/actions/sessions";
import { getCoursesAction } from "@/lib/actions/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Timer, BookOpen, BrainCircuit } from "lucide-react";
import { AddSessionDialog } from "@/components/sessions/add-session-dialog";

export default async function StudySessionsPage() {
  const [{ sessions, error }, { courses }] = await Promise.all([
    getStudySessionsAction(),
    getCoursesAction()
  ]);

  if (error) return <div className="p-8">Error loading sessions: {error}</div>;

  const data = sessions || [];
  const totalMinutes = data.reduce((acc, session) => acc + session.duration_minutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Simple streak calculation (mocked as 3 for now, would require complex date diffing in a real app)
  const streak = 3;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight font-heading">Study Sessions</h2>
        <AddSessionDialog courses={courses || []} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card className="rounded-[1.5rem] shadow-sm border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{hours}h {minutes}m</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {data.length} recorded sessions
            </p>
          </CardContent>
        </Card>
        
        <Card className="rounded-[1.5rem] shadow-sm border-border/40 bg-gradient-to-br from-card to-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity Streak</CardTitle>
            <BrainCircuit className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-green-500">{streak} Days</div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep it up! Consistency is key.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 rounded-[1.5rem] shadow-sm border-border/40">
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>A log of your past study sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/40">
                <TableHead>Date</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead className="text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground border-border/40">
                    No sessions logged yet.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((session) => (
                  <TableRow key={session.id} className="border-border/40">
                    <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                        {session.courses?.title || "—"}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{session.title}</TableCell>
                    <TableCell className="text-right">{session.duration_minutes} min</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
