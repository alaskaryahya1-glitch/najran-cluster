import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme-provider";
import { useEffect, lazy, Suspense } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { SEOManager } from "@/components/SEOManager";

const Home = lazy(() => import("@/pages/Home"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const About = lazy(() => import("@/pages/About"));
const EmployeeServices = lazy(() => import("@/pages/EmployeeServices"));
const EServices = lazy(() => import("@/pages/EServices"));
const News = lazy(() => import("@/pages/News"));
const Transformation = lazy(() => import("@/pages/Transformation"));
const CareModel = lazy(() => import("@/pages/CareModel"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  useAnalytics();
  
  return (
    <>
      <SEOManager />
      <Suspense fallback={<PageLoader />}>
        <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/employee-services" component={EmployeeServices} />
        <Route path="/e-services" component={EServices} />
        <Route path="/news" component={News} />
        <Route path="/transformation" component={Transformation} />
        <Route path="/care-model" component={CareModel} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
    </>
  );
}

function App() {
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
