"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/validations/auth";
import { registerAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function RegisterForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      full_name: "", 
      username: "",
      email: "", 
      student_id: "", 
      department: "",
      password: "",
      confirm_password: "",
      recaptchaToken: ""
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    
    let token = "dummy_token";
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== "dummy_key_for_dev") {
      if (!executeRecaptcha) {
        toast.error("Security verification not ready. Please wait.");
        setIsLoading(false);
        return;
      }
      try {
        token = await executeRecaptcha("register");
      } catch (e) {
        console.error(e);
      }
    }
    data.recaptchaToken = token;

    const result = await registerAction(data);
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-muted-foreground">Join Studix to unlock your academic potential.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name <span className="text-destructive">*</span></Label>
            <Input id="full_name" placeholder="John Doe" className="h-10" {...form.register("full_name")} disabled={isLoading} />
            {form.formState.errors.full_name && <p className="text-sm text-destructive">{form.formState.errors.full_name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username <span className="text-destructive">*</span></Label>
            <Input id="username" placeholder="johndoe123" className="h-10" {...form.register("username")} disabled={isLoading} />
            {form.formState.errors.username && <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
            <Input id="email" type="email" placeholder="student@example.com" className="h-10" {...form.register("email")} disabled={isLoading} />
            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="student_id">Student ID <span className="text-destructive">*</span></Label>
            <Input id="student_id" placeholder="e.g. S123456" className="h-10" {...form.register("student_id")} disabled={isLoading} />
            {form.formState.errors.student_id && <p className="text-sm text-destructive">{form.formState.errors.student_id.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Computer Science" className="h-10" {...form.register("department")} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Input id="semester" placeholder="1" className="h-10" {...form.register("semester")} disabled={isLoading} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                className="h-10 pr-10" 
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
            <p className="text-xs text-muted-foreground">Must be at least 8 characters, containing uppercase, lowercase, numbers, and symbols.</p>
            {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm Password <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Input 
                id="confirm_password" 
                type={showConfirmPassword ? "text" : "password"} 
                className="h-10 pr-10" 
                {...form.register("confirm_password")} 
                disabled={isLoading} 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.confirm_password && <p className="text-sm text-destructive">{form.formState.errors.confirm_password.message}</p>}
          </div>

        <div className="pt-2">
          <Button type="submit" className="w-full h-11 active:scale-[0.98] transition-transform" disabled={isLoading}>
            {isLoading ? "Registering..." : "Create account"}
          </Button>
        </div>
        <div className="text-sm text-center text-muted-foreground pt-4">
          Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Log in here</Link>
        </div>
        <div className="text-xs text-center text-muted-foreground/60 pt-2">
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="hover:underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="hover:underline">Terms of Service</a> apply.
        </div>
      </form>
    </div>
  );
}

