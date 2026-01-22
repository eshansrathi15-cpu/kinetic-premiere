import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const DEHACK = lazy(() => import("./pages/DEHACK"));
const BedrockPage = lazy(() => import("./pages/BedrockPage"));
const Tickets = lazy(() => import("./pages/Tickets"));
const AboutEWeek = lazy(() => import("./pages/AboutEWeek"));
const TrailerTheater = lazy(() => import("./components/TrailerTheater"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-mono">LOADING...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dehack" element={<DEHACK />} />
              <Route path="/bedrock" element={<BedrockPage />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/about" element={<AboutEWeek />} />
              <Route path="/trailer" element={<TrailerTheater />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;