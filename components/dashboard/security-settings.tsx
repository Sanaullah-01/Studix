"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MfaEnrollForm } from "@/components/auth/mfa-enroll-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export function SecuritySettings() {
  const [isMfaEnabled, setIsMfaEnabled] = useState<boolean | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkMfaStatus() {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        console.error("Error fetching MFA factors:", error);
        return;
      }
      
      const totpFactor = data.totp.find((factor) => factor.status === 'verified');
      if (totpFactor) {
        setIsMfaEnabled(true);
        setFactorId(totpFactor.id);
      } else {
        setIsMfaEnabled(false);
      }
    }
    
    checkMfaStatus();
  }, [supabase]);

  const handleDisableMfa = async () => {
    if (!factorId) return;
    
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    if (error) {
      toast.error("Failed to disable MFA: " + error.message);
    } else {
      toast.success("Multi-Factor Authentication disabled.");
      setIsMfaEnabled(false);
      setFactorId(null);
    }
  };

  if (isMfaEnabled === null) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading security settings...</div>;
  }

  if (isEnrolling) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setIsEnrolling(false)}>← Cancel Enrollment</Button>
        <MfaEnrollForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-card border rounded-xl shadow-sm gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {isMfaEnabled ? <ShieldCheck className="h-6 w-6 text-green-500" /> : <ShieldAlert className="h-6 w-6 text-amber-500" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold font-heading">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              {isMfaEnabled 
                ? "Your account is extra secure. Two-factor authentication is currently enabled."
                : "Add an extra layer of security to your account. You'll need a time-based code from an authenticator app to log in."}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          {isMfaEnabled ? (
            <Button variant="destructive" onClick={handleDisableMfa} className="hover:bg-red-600 transition-colors">
              Disable 2FA
            </Button>
          ) : (
            <Button onClick={() => setIsEnrolling(true)} className="hover:bg-blue-600 hover:text-white transition-colors bg-primary text-primary-foreground">
              Enable 2FA
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-red-500/10 border border-red-500/20 rounded-xl shadow-sm gap-4 mt-8">
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold font-heading text-red-600 dark:text-red-400">Danger Zone</h3>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1 max-w-md">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <Button 
            variant="destructive" 
            className="hover:bg-red-700 transition-colors"
            onClick={async () => {
              if (window.confirm("Are you absolutely sure you want to permanently delete your account?")) {
                const { deleteAccountAction } = await import("@/lib/actions/auth");
                const res = await deleteAccountAction();
                if (res?.error) {
                  toast.error("Failed to delete account: " + res.error);
                }
              }
            }}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
