import { useCallback } from "react";

const pageModules: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/Home"),
  "/about": () => import("@/pages/About"),
  "/employee-services": () => import("@/pages/EmployeeServices"),
  "/e-services": () => import("@/pages/EServices"),
  "/news": () => import("@/pages/News"),
  "/transformation": () => import("@/pages/Transformation"),
  "/care-model": () => import("@/pages/CareModel"),
};

const prefetchedPages = new Set<string>();

export function usePrefetch() {
  const prefetch = useCallback((path: string) => {
    if (prefetchedPages.has(path)) return;
    
    const loader = pageModules[path];
    if (loader) {
      prefetchedPages.add(path);
      loader();
    }
  }, []);

  return { prefetch };
}

export function prefetchPage(path: string) {
  if (prefetchedPages.has(path)) return;
  
  const loader = pageModules[path];
  if (loader) {
    prefetchedPages.add(path);
    loader();
  }
}
