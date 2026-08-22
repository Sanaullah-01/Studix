"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/validations/auth";
import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function LoginForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", recaptchaToken: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    
    let token = "dummy_token";
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== "dummy_key_for_dev") {
      if (!executeRecaptcha) {
        toast.error("Security verification not ready. Please wait.");
        setIsLoading(false);
        return;
      }
      try {
        token = await executeRecaptcha("login");
      } catch (e) {
        console.error(e);
      }
    }
    data.recaptchaToken = token;
    
    const result = await loginAction(data);
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">Enter your credentials to access Studix.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="identifier">Email or Username</Label>
          <Input id="identifier" placeholder="student@example.com or student123" className="h-10" {...form.register("identifier")} disabled={isLoading} />
          {form.formState.errors.identifier && <p className="text-sm text-destructive">{form.formState.errors.identifier.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              className="h-11 pr-10" 
              {...form.register("password")} 
              disabled={isLoading} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
        </div>
        
        <div className="pt-2">
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
        <div className="text-sm text-center text-muted-foreground pt-4">
          Don&apos;t have an account? <Link href="/register" className="font-semibold text-primary hover:underline">Register here</Link>
        </div>
        <div className="text-xs text-center text-muted-foreground/60 pt-2">
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="hover:underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="hover:underline">Terms of Service</a> apply.
        </div>
      </form>
    </div>
  );
}

