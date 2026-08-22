"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

export function MfaEnrollForm() {
  const supabase = createClient();
  const router = useRouter();
  const [factorId, setFactorId] = useState("");
  const [qrCodeUri, setQrCodeUri] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    async function setupMfa() {
      // Clean up any unverified factors first (fixes strict mode/reload double enrollment)
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors && factors.totp) {
        const unverified = factors.totp.filter(f => f.status === 'unverified');
        for (const factor of unverified) {
          await supabase.auth.mfa.unenroll({ factorId: factor.id });
        }
      }

      if (!mounted) return;

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Studix-2FA-' + Math.random().toString(36).substring(2, 8)
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (mounted) {
        setFactorId(data.id);
        // Use the standard totp URI for generating a clean, compatible QR code
        setQrCodeUri(data.totp.uri);
      }
    }
    
    setupMfa();
    
    return () => {
      mounted = false;
    };
  }, [supabase]);

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
      toast.error(verify.error.message);
      setIsLoading(false);
      return;
    }

    toast.success("MFA successfully enabled!");
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20 border-border/40 shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="bg-muted/30 pb-8 pt-8">
        <CardTitle className="text-2xl font-extrabold font-heading text-center">Enable 2FA</CardTitle>
        <CardDescription className="text-center">Scan the QR code with your authenticator app.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col items-center pt-8">
        {qrCodeUri ? (
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-border/40">
            <QRCodeSVG value={qrCodeUri} size={200} level="M" includeMargin={false} />
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground animate-pulse">Loading QR...</div>
        )}
        <div className="w-full space-y-3 mt-4">
          <Label htmlFor="code" className="font-semibold text-center block">Verification Code</Label>
          <Input 
            id="code" 
            placeholder="000000" 
            className="text-center text-2xl tracking-[0.5em] h-14 rounded-xl"
            value={verifyCode} 
            onChange={(e) => setVerifyCode(e.target.value)}
            disabled={isLoading}
            maxLength={6}
          />
        </div>
      </CardContent>
      <CardFooter className="pb-8">
        <Button onClick={onVerify} className="w-full h-12 rounded-xl text-base font-semibold" disabled={isLoading || verifyCode.length < 6}>
          {isLoading ? "Verifying..." : "Verify & Enable"}
        </Button>
      </CardFooter>
    </Card>
  );
}

