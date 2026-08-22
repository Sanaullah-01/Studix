import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/ui/logo";

export function PublicHeader() {
  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[transform,opacity] duration-300 ease-out border-b border-border/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <header className="flex items-center gap-6 py-4 xl:gap-10 justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex flex-none items-center">
            <Logo />
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/features" className="py-2.5 text-[15px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="py-2.5 text-[15px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground">
              Pricing
            </Link>
            <Link href="/about" className="py-2.5 text-[15px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="py-2.5 text-[15px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground">
              Contact
            </Link>
          </nav>

          {/* Right: Actions & Theme */}
          <div className="flex flex-none items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="ghost" className="font-semibold text-[15px]">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="min-w-[100px] text-sm font-medium transition-all duration-200 active:scale-[0.97]">Get Started</Button>
            </Link>
          </div>

        </header>
      </div>
    </div>
  );
}
