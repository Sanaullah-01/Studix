"use client";

import { useState } from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/actions/contact";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("first") as string,
      lastName: formData.get("last") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    if (!data.firstName || !data.email || !data.message) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const result = await submitContactForm(data);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      setIsSuccess(true);
      toast.success("Message sent successfully!");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <PublicHeader />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
          
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Let&apos;s talk.</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions about the Pro plan? Need technical support? We&apos;re here to help you succeed.
              </p>
            </div>
            
            <div className="space-y-6 pt-4 border-t">
              <div>
                <h3 className="font-medium text-foreground mb-1">Support Email</h3>
                <p className="text-muted-foreground">hello@Studix.com</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Office</h3>
                <p className="text-muted-foreground">Islamabad Pakistan Nutech University</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
            {isSuccess ? (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. We&apos;ll get back to you shortly.</p>
                <Button variant="outline" className="mt-4" onClick={() => setIsSuccess(false)}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first" className="text-sm font-medium">First name *</label>
                    <Input id="first" name="first" placeholder="Jane" className="bg-background" disabled={isLoading} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last" className="text-sm font-medium">Last name</label>
                    <Input id="last" name="last" placeholder="Doe" className="bg-background" disabled={isLoading} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email address *</label>
                  <Input id="email" name="email" type="email" placeholder="jane@university.edu" className="bg-background" disabled={isLoading} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message *</label>
                  <Textarea id="message" name="message" placeholder="How can we help?" className="min-h-[120px] bg-background resize-none" disabled={isLoading} />
                </div>
                
                <Button type="submit" className="w-full h-12 text-base active:scale-95 transition-transform" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>
          
        </div>
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/20">
        <p>© {new Date().getFullYear()} Studix.</p>
      </footer>
    </div>
  );
}

