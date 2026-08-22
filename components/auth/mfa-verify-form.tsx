"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function MfaVerifyForm() {
  const supabase = createClient();
  const router = useRouter();
  const [verifyCode, setVerifyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [factorId, setFactorId] = useState("");

  useEffect(() => {
    async function checkMfa() {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (error || data.nextLevel !== 'aal2') {
        router.push("/dashboard");
        return;
      }
      const factors = await supabase.auth.mfa.listFactors();
      if (factors.error || !factors.data.totp.length) {
        toast.error("No TOTP factors found");
        return;
      }
      setFactorId(factors.data.totp[0].id);
    }
    checkMfa();
  }, [router, supabase]);

  const onVerify = async () => {
    setIsLoading(true);
    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
      toast.error(challenge.error.message);
      setIsLoading(false);
      return;
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code: verifyCode,
    });

    if (verify.error) {
      toast.error("Invalid verification code.");
      setIsLoading(false);
      return;
    }

    toast.success("Verification successful!");
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
        <CardDescription>Enter the code from your authenticator app.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input 
            id="code" 
            placeholder="000000" 
            value={verifyCode} 
            onChange={(e) => setVerifyCode(e.target.value)}
            disabled={isLoading} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onVerify} className="w-full" disabled={isLoading || verifyCode.length < 6}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </CardFooter>
    </Card>
  );
}
