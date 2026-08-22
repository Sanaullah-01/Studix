import { SettingsForm } from "@/components/dashboard/settings-form";
import { SecuritySettings } from "@/components/dashboard/security-settings";
import { createClient } from "@/lib/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-extrabold tracking-tight mb-2 font-heading">Settings</h2>
      <p className="text-muted-foreground mb-8">
        Manage your account preferences and security settings.
      </p>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="profile" className="rounded-lg px-6 flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg px-6 flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6 focus-visible:outline-none">
          <div className="bg-card border-border/40 border rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xl font-bold font-heading mb-6">Profile Information</h3>
            <SettingsForm profile={profile || {}} />
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6 focus-visible:outline-none">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
