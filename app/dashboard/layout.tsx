import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-primary/20">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:pl-[280px]">
        <Navbar />
        <main className="flex-1 items-start p-4 sm:px-8 sm:py-2 md:gap-8 max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
}
