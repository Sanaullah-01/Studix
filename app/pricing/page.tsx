import { PublicHeader } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Simple, transparent pricing</h1>
          <p className="text-lg text-muted-foreground">Start organizing your academic life for free. Upgrade when you need more AI power.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>Perfect for high school students.</CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                $0
                <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Track up to 5 courses</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Unlimited assignments</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Basic notes editor</li>
                <li className="flex items-center text-muted-foreground"><Check className="h-4 w-4 mr-3 opacity-50" /> No AI Assistant access</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Tier */}
          <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro AI</CardTitle>
              <CardDescription>For serious university students.</CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                $9
                <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Unlimited courses & notes</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Full AI Assistant Access</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Generate unlimited quizzes</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-3 text-primary" /> Advanced Study Analytics</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button className="w-full">
                  Start 7-Day Trial
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/20">
        <p>© {new Date().getFullYear()} Studix.</p>
      </footer>
    </div>
  );
}

