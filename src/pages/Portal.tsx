import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  
  Settings, 
  FileText, 
  Package, 
  Users, 
  Briefcase, 
  Phone,
  LogOut,
  Truck,
  Clock
} from "lucide-react";

const Portal = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const adminFeatures = [
    {
      icon: FileText,
      title: "Manage News",
      description: "Add, edit, and remove news updates",
      href: "/portal/admin/news",
    },
    {
      icon: Package,
      title: "Manage Services",
      description: "Update services offered",
      href: "/portal/admin/services",
    },
    {
      icon: Users,
      title: "Manage Team",
      description: "Add and remove team members",
      href: "/portal/admin/team",
    },
    {
      icon: Briefcase,
      title: "Manage Jobs",
      description: "Post and manage job listings",
      href: "/portal/admin/jobs",
    },
    {
      icon: Phone,
      title: "Manage Contact Info",
      description: "Update contact information",
      href: "/portal/admin/contact",
    },
    {
      icon: Settings,
      title: "Site Settings",
      description: "Update logo and other settings",
      href: "/portal/admin/settings",
    },
  ];

  const stats = [
    { icon: Package, label: "Active Shipments", value: "3", color: "text-blue-600" },
    { icon: Truck, label: "In Transit", value: "2", color: "text-orange-600" },
    { icon: FileText, label: "Pending Documents", value: "1", color: "text-purple-600" },
    { icon: Clock, label: "Completed This Month", value: "12", color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-2xl font-black">HQ LOGISTICS</h1>
            <p className="text-sm text-muted-foreground">Client Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user.email}</p>
              {isAdmin && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2">
            Welcome{isAdmin && " Admin"}!
          </h2>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Manage your website content from this dashboard"
              : "Manage your shipments and track cargo in real-time"}
          </p>
        </div>

        {isAdmin ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.href}>
                  <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </CardTitle>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Shipments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Track your latest cargo movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "HQ123456",
                      status: "In Transit",
                      from: "Dar es Salaam Port",
                      to: "Dry Port Facility",
                      eta: "Today, 4:00 PM",
                    },
                    {
                      id: "HQ123455",
                      status: "Documentation",
                      from: "Dar es Salaam Port",
                      to: "Dry Port Facility",
                      eta: "Tomorrow, 10:00 AM",
                    },
                    {
                      id: "HQ123454",
                      status: "Ready for Pickup",
                      from: "Dar es Salaam Port",
                      to: "Dry Port Facility",
                      eta: "Completed",
                    },
                  ].map((shipment) => (
                    <div
                      key={shipment.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">{shipment.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {shipment.from} → {shipment.to}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium text-primary">{shipment.status}</p>
                        <p className="text-xs text-muted-foreground">{shipment.eta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default Portal;