"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __hsReveal?: () => void;
  }
}

/** Re-scans for new reveal targets after a client-side navigation. */
export function RevealOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    window.__hsReveal?.();
  }, [pathname]);

  return null;
}
