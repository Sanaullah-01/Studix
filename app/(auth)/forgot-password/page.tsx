import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Form Side */}
      <div className="flex flex-col px-4 py-8 sm:px-8 h-full bg-background relative z-10 animate-in fade-in slide-in-from-left-8 duration-700">
        
        <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-12">
          <Link href="/login" className="flex items-center gap-2 group text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to login
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <ForgotPasswordForm />
        </div>
        
      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex flex-col justify-center items-center relative bg-muted/40 p-12 overflow-hidden border-l">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative z-10 max-w-md text-center space-y-6 animate-in fade-in zoom-in-95 duration-1000 delay-150">
          <div className="bg-background shadow-xl border p-4 rounded-2xl inline-flex mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <KeyRound className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Secure account recovery.</h2>
          <p className="text-lg text-muted-foreground">Regain access to your intelligent student workspace safely and quickly.</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
