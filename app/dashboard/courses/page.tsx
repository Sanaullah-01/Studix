import { getCoursesAction } from "@/lib/actions/courses";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, BookText, Calendar, Clock, GraduationCap, FileText, Hash } from "lucide-react";
import { AddCourseDialog } from "@/components/courses/add-course-dialog";
import { DeleteCourseButton } from "@/components/courses/delete-course-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default async function CoursesPage() {
  const { courses, error } = await getCoursesAction();

  if (error) return <div className="p-8">Error loading courses: {error}</div>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight font-heading">My Courses</h2>
        <AddCourseDialog />
      </div>
      
      {(!courses || courses.length === 0) ? (
        <div className="flex flex-col items-center justify-center p-20 text-center border rounded-[2rem] border-dashed border-border/60 mt-8">
          <BookText className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold">No courses yet</h3>
          <p className="text-muted-foreground max-w-sm mt-2">Add your first course to start organizing your assignments and study sessions.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col rounded-[1.5rem] overflow-hidden group hover:shadow-xl transition-all border-border/40 relative bg-gradient-to-b from-background to-muted/20">
              <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: course.color }} />
              <CardHeader className="pb-2 pt-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold font-heading line-clamp-1">{course.title}</CardTitle>
                    {course.code && <Badge variant="outline" className="font-mono text-xs mt-1" style={{ borderColor: course.color, color: course.color }}>{course.code}</Badge>}
                  </div>
                </div>
                <CardDescription className="line-clamp-2 min-h-[40px] pt-2">{course.description || "No description provided."}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3 py-4">
                <div className="flex items-center text-sm text-muted-foreground bg-background/50 p-2 rounded-lg border border-border/50">
                  <User className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{course.instructor || "No instructor specified"}</span>
                </div>
                {(course.semester || course.schedule) && (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {course.semester && (
                      <span className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
                        <Calendar className="mr-1.5 h-3 w-3" /> {course.semester}
                      </span>
                    )}
                    {course.schedule && (
                      <span className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
                        <Clock className="mr-1.5 h-3 w-3" /> {course.schedule}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2 pb-6 px-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                      <BookOpen className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-background shadow-2xl overflow-y-auto max-h-[85vh] rounded-[1.5rem] p-0 border-0">
                    <DialogHeader className="p-6 pb-6 border-b border-border/40 text-left">
                      <div className="w-12 h-1.5 rounded-full mb-4" style={{ backgroundColor: course.color }} />
                      <DialogTitle className="text-3xl font-extrabold font-heading">{course.title}</DialogTitle>
                      {course.description && (
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{course.description}</p>
                      )}
                    </DialogHeader>
                    
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/30 p-4 rounded-2xl border border-border/40">
                          <div className="flex items-center text-muted-foreground mb-2">
                            <Hash className="w-4 h-4 mr-2" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Course Code</span>
                          </div>
                          <p className="font-semibold text-lg">{course.code || "—"}</p>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-2xl border border-border/40">
                          <div className="flex items-center text-muted-foreground mb-2">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Credits</span>
                          </div>
                          <p className="font-semibold text-lg">{course.credits ? `${course.credits} Units` : "—"}</p>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-2xl border border-border/40 space-y-4">
                        <div>
                          <div className="flex items-center text-muted-foreground mb-1">
                            <User className="w-4 h-4 mr-2" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Instructor</span>
                          </div>
                          <p className="font-medium text-foreground">{course.instructor || "Not specified"}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
                          <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="text-xs font-semibold uppercase tracking-wider">Semester</span>
                            </div>
                            <p className="font-medium text-sm">{course.semester || "—"}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                              <Clock className="w-4 h-4 mr-2" />
                              <span className="text-xs font-semibold uppercase tracking-wider">Schedule</span>
                            </div>
                            <p className="font-medium text-sm">{course.schedule || "—"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/40">
                        <h4 className="font-semibold text-lg mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-primary" />
                          Quick Links
                        </h4>
                        <div className="bg-card border border-border/50 rounded-xl p-4 text-sm text-muted-foreground shadow-sm">
                          Use the <strong className="text-foreground">Assignments</strong> or <strong className="text-foreground">Notes</strong> tabs in the sidebar to add coursework and link them directly to this class.
                        </div>
                        <div className="flex justify-end pt-4">
                          <DeleteCourseButton courseId={course.id} courseTitle={course.title} />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
