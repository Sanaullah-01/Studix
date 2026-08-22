import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { GraduationCap, ArrowLeft, BotMessageSquare, BookText, Timer } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Form Side */}
      <div className="flex flex-col px-4 py-8 sm:px-8 h-full bg-background relative z-10 animate-in fade-in slide-in-from-left-8 duration-700">
        
        <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-8">
          <Link href="/" className="flex items-center gap-2 group text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <RegisterForm />
        </div>
      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex flex-col justify-center items-center relative bg-muted/40 p-12 overflow-hidden border-l">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative z-10 w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000 delay-150">
          <div className="text-center mb-12">
            <div className="bg-background shadow-lg border p-3 rounded-2xl inline-flex mb-6">
              <div className="bg-primary p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Everything you need.</h2>
            <p className="text-muted-foreground mt-2">All your academic tools in one place.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border shadow-sm">
              <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0"><BookText className="h-5 w-5" /></div>
              <div>
                <h4 className="font-semibold text-sm">Course Management</h4>
                <p className="text-sm text-muted-foreground mt-1">Organize your semester and track assignments effortlessly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border shadow-sm ml-4">
              <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0"><Timer className="h-5 w-5" /></div>
              <div>
                <h4 className="font-semibold text-sm">Deep Study Tracking</h4>
                <p className="text-sm text-muted-foreground mt-1">Log sessions and measure your focus with Pomodoro integration.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border shadow-sm">
              <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0"><BotMessageSquare className="h-5 w-5" /></div>
              <div>
                <h4 className="font-semibold text-sm">AI Study Assistant</h4>
                <p className="text-sm text-muted-foreground mt-1">Generate flashcards and summarize your notes instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
