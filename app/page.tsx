import { PublicHeader } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BotMessageSquare, GraduationCap, Timer } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <PublicHeader />
      <main className="flex-1">
        {/* HERO SECTION - Okara Style Centered */}
        <section className="relative flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden text-center">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
            
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col items-center w-full">
              <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-foreground mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-foreground mr-2 animate-pulse"></span>
                Meet Studix 2.0
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-heading text-balance">
                The only AI assistant that puts your <br className="hidden md:block" />
                <span className="text-muted-foreground">academics on autopilot</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 text-balance">
                Consolidate your courses, track deep work sessions, organize notes, and unlock your potential with an integrated OpenRouter AI Study Assistant.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 px-10 text-base font-semibold w-full">
                    Start for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold bg-background w-full">
                    Explore features
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-6 font-medium">No credit card required. Cancel anytime.</p>
            </div>
            
            {/* Minimal abstract background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-foreground/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="py-24 bg-muted/30 border-t">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for modern academics.</h2>
              <p className="text-muted-foreground mt-4 text-lg">Everything you need to manage your semester, right in one place.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-card border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-2xl mb-3">Course Management</h3>
                <p className="text-muted-foreground leading-relaxed">Keep track of your classes, assignments, and grades all in one beautiful dashboard.</p>
              </div>
              
              <div className="bg-card border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group md:col-span-2 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <BotMessageSquare className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">AI Study Assistant</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">Summarize notes, generate flashcards, and get complex concepts explained instantly by our OpenRouter-powered AI model.</p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
                  <BotMessageSquare className="w-64 h-64" />
                </div>
              </div>
              
              <div className="bg-card border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group md:col-span-3">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <Timer className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-2xl mb-3">Deep Study Tracking</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md">Log your study sessions and visualize your academic progress over the semester with detailed analytics and time tracking.</p>
                  </div>
                  <div className="hidden md:flex gap-4 opacity-50 select-none">
                    <div className="h-32 w-1/3 bg-muted rounded-xl border"></div>
                    <div className="h-48 w-1/3 bg-muted rounded-xl border mt-auto"></div>
                    <div className="h-24 w-1/3 bg-muted rounded-xl border mt-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Logo />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Studix. Built with Next.js and Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}

