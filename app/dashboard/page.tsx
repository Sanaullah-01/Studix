import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // Handled by middleware proxy
  }

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile = data as any;

  // Fetch counts
  const { count: coursesCount } = await supabase.from("courses").select('*', { count: 'exact', head: true }).eq('user_id', user.id);
  const { count: assignmentsCount } = await supabase.from("assignments").select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'todo');
  const { count: notesCount } = await supabase.from("notes").select('*', { count: 'exact', head: true }).eq('user_id', user.id);
  const { count: sessionsCount } = await supabase.from("study_sessions").select('*', { count: 'exact', head: true }).eq('user_id', user.id);

  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
      <div className="col-span-1 lg:col-span-3">
        <div className="rounded-[2rem] bg-card text-card-foreground shadow-sm border border-border/40 p-8 sm:p-10 transition-all hover:shadow-lg hover:shadow-blue-500/5 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
                Welcome back, <span className="text-muted-foreground">{profile?.full_name || profile?.username || user.email}</span>
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-lg leading-relaxed">
                Here is an overview of your academic progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="rounded-[1.5rem] bg-card shadow-sm border border-border/40 p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Enrolled Courses</p>
          <p className="text-3xl font-extrabold">{coursesCount || 0}</p>
        </div>
        <div className="rounded-[1.5rem] bg-card shadow-sm border border-border/40 p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Assignments Due</p>
          <p className="text-3xl font-extrabold text-amber-500">{assignmentsCount || 0}</p>
        </div>
        <div className="rounded-[1.5rem] bg-card shadow-sm border border-border/40 p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Notes</p>
          <p className="text-3xl font-extrabold">{notesCount || 0}</p>
        </div>
        <div className="rounded-[1.5rem] bg-card shadow-sm border border-border/40 p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Study Sessions</p>
          <p className="text-3xl font-extrabold text-green-500">{sessionsCount || 0}</p>
        </div>
      </div>
    </div>
  );
}
