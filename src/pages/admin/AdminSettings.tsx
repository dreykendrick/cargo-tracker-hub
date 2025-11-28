import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

const AdminSettings = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/portal");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSettings();
    }
  }, [user, isAdmin]);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      toast({ title: "Error", description: "Failed to fetch settings", variant: "destructive" });
    } else if (data) {
      const settingsObj: Record<string, string> = {};
      data.forEach((setting: SiteSetting) => {
        settingsObj[setting.key] = setting.value;
      });
      setSettings(settingsObj);
      setLogoUrl(settingsObj.logo_url || "");
    }
  };

  const handleSaveLogo = async (url: string = logoUrl) => {
    const { data: existingLogo } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "logo_url")
      .maybeSingle();

    let error;
    if (existingLogo) {
      ({ error } = await supabase
        .from("site_settings")
        .update({ value: url })
        .eq("key", "logo_url"));
    } else {
      ({ error } = await supabase
        .from("site_settings")
        .insert({ key: "logo_url", value: url }));
    }

    if (error) {
      toast({ title: "Error", description: "Failed to update logo", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Logo updated successfully" });
      fetchSettings();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Error", description: "Failed to upload logo", variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("logos")
      .getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;
    setLogoUrl(publicUrl);
    await handleSaveLogo(publicUrl);
    setUploading(false);
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/portal")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-black">Site Settings</h1>
        </div>

        <div className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Settings</CardTitle>
              <CardDescription>Update the site logo URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Upload from device</Label>
                <div className="flex gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>
                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>
              
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-muted"></div>
                <span className="mx-4 text-sm text-muted-foreground">or</span>
                <div className="flex-grow border-t border-muted"></div>
              </div>

              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  placeholder="Enter logo URL"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
                <Button onClick={() => handleSaveLogo()}>Save URL</Button>
              </div>

              {logoUrl && (
                <div className="border rounded p-4">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <img src={logoUrl} alt="Logo preview" className="h-12" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
