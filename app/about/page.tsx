import { PublicHeader } from "@/components/layout/public-header";
import { GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <PublicHeader />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-24 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-8">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Our Mission.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe that every student deserves access to world-class academic organization and personalized AI assistance.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground leading-relaxed">
              Studix was founded to solve a simple problem: modern academic life is scattered across too many platforms. You track assignments in a calendar, write notes in a doc, log study time in a stopwatch app, and ask AI questions in a separate browser tab.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We brought everything under one beautiful, distraction-free interface.
            </p>
            <h3 className="text-2xl font-semibold mt-12 mb-4 text-foreground">The AI Advantage</h3>
            <p className="text-muted-foreground leading-relaxed">
              By integrating OpenRouter&apos;s powerful language models directly into your workspace, your AI assistant actually understands the context of your notes and study sessions. It isn&apos;t just a generic chatbot—it&apos;s a personalized tutor that helps you generate flashcards, simplify complex topics, and organize your academic career.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/20">
        <p>© {new Date().getFullYear()} Studix.</p>
      </footer>
    </div>
  );
}

