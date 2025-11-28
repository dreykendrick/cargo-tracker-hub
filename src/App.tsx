import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Portal from "./pages/Portal";
import Services from "./pages/Services";
import NewsDetail from "./pages/NewsDetail";
import AdminNews from "./pages/admin/AdminNews";
import AdminServices from "./pages/admin/AdminServices";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminContact from "./pages/admin/AdminContact";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/portal/admin/news" element={<AdminNews />} />
            <Route path="/portal/admin/services" element={<AdminServices />} />
            <Route path="/portal/admin/team" element={<AdminTeam />} />
            <Route path="/portal/admin/jobs" element={<AdminJobs />} />
            <Route path="/portal/admin/contact" element={<AdminContact />} />
            <Route path="/portal/admin/settings" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
