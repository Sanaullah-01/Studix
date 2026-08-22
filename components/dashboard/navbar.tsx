"use client";

import { useState, useEffect } from "react";
import { Menu, Search, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationBell } from "./notification-bell";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (data) setProfile(data as any);
      }
    }
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="sticky top-4 z-30 flex h-16 items-center gap-4 rounded-full bg-card/60 backdrop-blur-xl border border-border/40 px-6 mx-4 sm:mx-8 mb-6 shadow-sm transition-all">
      <Sheet>
        <SheetTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }), "sm:hidden border-none bg-transparent shadow-none")}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground">
              Overview
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-4 px-2.5 text-foreground">
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 h-10 rounded-full border-none bg-muted/50 focus-visible:bg-muted focus-visible:ring-1 focus-visible:ring-border transition-all sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <NotificationBell />
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")}>
            <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-2xl bg-card/95 backdrop-blur-2xl border-border/40 p-2 shadow-2xl">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Avatar className="h-16 w-16 border-2 border-border/50 shadow-sm">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <p className="text-base font-bold tracking-tight font-heading">{profile?.full_name || "My Account"}</p>
                    <p className="text-[13px] text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/40 my-2 mx-2" />
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted">
              <SettingsIcon className="mr-3 h-4 w-4 text-muted-foreground" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/40 my-2 mx-2" />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-3 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
