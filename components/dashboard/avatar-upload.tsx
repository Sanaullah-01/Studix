"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { updateAvatarAction } from "@/lib/actions/profile";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export function AvatarUpload({ initialUrl, fullName }: { initialUrl?: string | null; fullName: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    setIsUploading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsUploading(false);
      return;
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      toast.error(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
    
    setUrl(publicUrlData.publicUrl);
    
    const res = await updateAvatarAction(publicUrlData.publicUrl);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Avatar updated!");
    }
    setIsUploading(false);
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={url || ""} />
        <AvatarFallback className="text-2xl">{fullName?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div>
        <div className="relative">
          <Button variant="outline" disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Change Avatar"}
          </Button>
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
      </div>
    </div>
  );
}
