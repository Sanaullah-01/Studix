import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const fontSora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const fontDmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Studix - The Intelligent Student Workspace",
    template: "%s | Studix",
  },
  description: "Studix is an AI-powered student management system. Track courses, assignments, take notes, and interact with an intelligent AI assistant.",
  keywords: ["student workspace", "AI assistant", "student planner", "course management", "notes app", "studix"],
  authors: [{ name: "Studix Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studix.vercel.app",
    siteName: "Studix",
    title: "Studix - The Intelligent Student Workspace",
    description: "Manage your academic life with AI-powered tools.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Studix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studix",
    description: "Your intelligent student workspace.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDmSans.variable} ${fontSora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

