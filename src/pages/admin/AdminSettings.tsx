import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleSaveLogo = async () => {
    const { data: existingLogo } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "logo_url")
      .maybeSingle();

    let error;
    if (existingLogo) {
      ({ error } = await supabase
        .from("site_settings")
        .update({ value: logoUrl })
        .eq("key", "logo_url"));
    } else {
      ({ error } = await supabase
        .from("site_settings")
        .insert({ key: "logo_url", value: logoUrl }));
    }

    if (error) {
      toast({ title: "Error", description: "Failed to update logo", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Logo updated successfully" });
      fetchSettings();
    }
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
              <Input
                placeholder="Logo URL"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
              {logoUrl && (
                <div className="border rounded p-4">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <img src={logoUrl} alt="Logo preview" className="h-12" />
                </div>
              )}
              <Button onClick={handleSaveLogo}>Save Logo</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
