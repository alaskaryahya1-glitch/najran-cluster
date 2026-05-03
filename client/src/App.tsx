import { Switch, Route, Redirect } from "wouter";
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

const LandingPage = lazy(() => import("@/pages/LandingPage"));

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
          <Route>
            <Redirect to="/" />
          </Route>
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
