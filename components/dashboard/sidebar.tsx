"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, BookOpen, ClipboardList, BookText, Timer, BotMessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { name: "Notes", href: "/dashboard/notes", icon: BookText },
  { name: "Study Sessions", href: "/dashboard/study", icon: Timer },
  { name: "AI Assistant", href: "/dashboard/ai", icon: BotMessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-4 left-4 z-10 hidden w-64 flex-col rounded-3xl bg-card/60 backdrop-blur-xl border border-border/40 shadow-2xl sm:flex transition-all">
      <div className="flex h-20 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="scale-90 origin-left" />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4 px-4">
        <nav className="grid items-start gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-4 py-3 text-[15px] font-medium transition-all duration-200",
                  isActive 
                    ? "bg-foreground text-background shadow-md shadow-foreground/10" 
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-[18px] w-[18px]", isActive ? "text-background" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Decorative gradient for the bottom of the sidebar */}
      <div className="mt-auto p-6">
        <div className="h-24 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 border border-border/50 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
          <span className="text-xs font-semibold text-foreground relative z-10 font-heading">Pro Active</span>
        </div>
      </div>
    </aside>
  );
}
