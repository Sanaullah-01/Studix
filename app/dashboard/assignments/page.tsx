import { getAssignmentsAction } from "@/lib/actions/assignments";
import { getCoursesAction } from "@/lib/actions/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddAssignmentDialog } from "@/components/assignments/add-assignment-dialog";
import { AssignmentStatusSelect } from "@/components/assignments/assignment-status-select";

export default async function AssignmentsPage() {
  const [{ assignments, error }, { courses }] = await Promise.all([
    getAssignmentsAction(),
    getCoursesAction()
  ]);

  if (error) return <div className="p-8">Error loading assignments: {error}</div>;

  const data = assignments || [];
  const todo = data.filter(a => a.status === 'todo');
  const inProgress = data.filter(a => a.status === 'in_progress');
  const completed = data.filter(a => a.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'in_progress': return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">In Progress</Badge>;
      default: return <Badge variant="outline" className="border-amber-500 text-amber-500">To Do</Badge>;
    }
  };

  const renderTable = (items: any[]) => (
    <Table>
      <TableHeader>
        <TableRow className="border-border/40">
          <TableHead>Title</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status Label</TableHead>
          <TableHead className="text-right">Update Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground border-border/40">
              No assignments found in this category.
            </TableCell>
          </TableRow>
        ) : (
          items.map((assignment) => (
            <TableRow key={assignment.id} className="border-border/40">
              <TableCell className="font-medium">
                <div>
                  {assignment.title}
                  {assignment.description && <p className="text-xs text-muted-foreground mt-1 font-normal">{assignment.description}</p>}
                </div>
              </TableCell>
              <TableCell>{assignment.courses?.title || "—"}</TableCell>
              <TableCell>{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : "—"}</TableCell>
              <TableCell>{getStatusBadge(assignment.status)}</TableCell>
              <TableCell className="text-right flex justify-end">
                <AssignmentStatusSelect id={assignment.id} currentStatus={assignment.status} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight font-heading">Assignments</h2>
        <AddAssignmentDialog courses={courses || []} />
      </div>

      <Tabs defaultValue="todo" className="space-y-4 mt-8">
        <TabsList className="bg-card border border-border/40 rounded-full px-2 h-12">
          <TabsTrigger value="todo" className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">To Do ({todo.length})</TabsTrigger>
          <TabsTrigger value="in_progress" className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed" className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Completed ({completed.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todo" className="space-y-4 pt-4">
          <Card className="rounded-[1.5rem] shadow-sm border-border/40">
            <CardHeader>
              <CardTitle>To Do</CardTitle>
              <CardDescription>Upcoming assignments that require your attention.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderTable(todo)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4 pt-4">
          <Card className="rounded-[1.5rem] shadow-sm border-border/40">
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>Assignments you are actively working on.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderTable(inProgress)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 pt-4">
          <Card className="rounded-[1.5rem] shadow-sm border-border/40">
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <CardDescription>Finished assignments.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderTable(completed)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
