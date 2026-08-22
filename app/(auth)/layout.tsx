import { RecaptchaProvider } from "@/components/auth/recaptcha-provider";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <RecaptchaProvider>
      {children}
    </RecaptchaProvider>
  );
}
