import { getNotesAction } from "@/lib/actions/notes";
import { getCoursesAction } from "@/lib/actions/courses";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookText, BookOpen } from "lucide-react";
import { AddNoteDialog } from "@/components/notes/add-note-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteNoteButton } from "@/components/notes/delete-note-button";
import { Badge } from "@/components/ui/badge";

export default async function NotesPage() {
  const [{ notes, error }, { courses }] = await Promise.all([
    getNotesAction(),
    getCoursesAction()
  ]);

  if (error) return <div className="p-8">Error loading notes: {error}</div>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight font-heading">Notes</h2>
        <AddNoteDialog courses={courses || []} />
      </div>

      {(!notes || notes.length === 0) ? (
        <div className="flex flex-col items-center justify-center p-20 text-center border rounded-[2rem] border-dashed border-border/60 mt-8">
          <BookText className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold">No notes yet</h3>
          <p className="text-muted-foreground max-w-sm mt-2">Write down your first note to keep track of your learnings.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {notes.map((note) => {
            const themeColor = note.courses?.color || "#e2e8f0"; // Default to a neutral slate color if no course
            
            return (
              <Card key={note.id} className="flex flex-col rounded-[1.5rem] overflow-hidden group hover:shadow-xl transition-all border-border/40 bg-gradient-to-b from-background to-muted/10 relative">
                <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: themeColor }} />
                <CardHeader className="pb-3 pt-7 border-b border-border/40 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-mono text-xs text-muted-foreground border-border/50">
                      {new Date(note.created_at).toLocaleDateString()}
                    </Badge>
                    {note.file_url && <FileText className="h-4 w-4" style={{ color: themeColor !== "#e2e8f0" ? themeColor : undefined }} />}
                  </div>
                  <CardTitle className="text-xl flex items-start font-bold font-heading line-clamp-2 leading-snug">
                    {note.title}
                  </CardTitle>
                  {note.courses?.title && (
                    <CardDescription className="text-xs pt-1 flex items-center font-medium" style={{ color: themeColor }}>
                      <BookOpen className="w-3 h-3 mr-1" />
                      {note.courses.title}
                    </CardDescription>
                  )}
                </CardHeader>
              <CardContent className="pt-4 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                  {note.content || <span className="italic opacity-60">No content snippet available.</span>}
                </p>
              </CardContent>
              <CardFooter className="pt-2 pb-6 px-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                      <BookOpen className="mr-2 h-4 w-4" /> View Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-background shadow-2xl overflow-y-auto max-h-[85vh] rounded-[1.5rem] p-0 border-0">
                    <DialogHeader className="p-6 pb-6 border-b border-border/40 text-left">
                      <div className="w-12 h-1.5 rounded-full mb-4" style={{ backgroundColor: themeColor }} />
                      <DialogTitle className="text-3xl font-extrabold font-heading leading-tight">{note.title}</DialogTitle>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-3">
                        <Badge variant="outline">{new Date(note.created_at).toLocaleDateString()}</Badge>
                        {note.courses?.title && (
                          <Badge variant="outline" style={{ borderColor: themeColor, color: themeColor }}>
                            {note.courses.title}
                          </Badge>
                        )}
                      </div>
                    </DialogHeader>
                    <div className="p-6 prose prose-slate dark:prose-invert max-w-none pb-12">
                      {note.content ? (
                        <div className="whitespace-pre-wrap leading-relaxed text-base text-foreground/90">{note.content}</div>
                      ) : (
                        <p className="italic text-muted-foreground p-6 bg-muted/20 rounded-xl text-center border border-dashed">This note is empty.</p>
                      )}
                      
                      {note.file_url && (
                        <div className="mt-10 p-5 border border-border/50 rounded-2xl bg-muted/20 flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">Attached Document</p>
                              <a href={note.file_url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:underline transition-colors mt-1 block" style={{ color: themeColor !== "#e2e8f0" ? themeColor : undefined }}>
                                Click to view PDF securely
                              </a>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-lg shadow-sm" asChild>
                            <a href={note.file_url} target="_blank" rel="noreferrer">Open File</a>
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-12 pt-6 border-t border-border/40 flex justify-end">
                        <DeleteNoteButton noteId={note.id} noteTitle={note.title} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
