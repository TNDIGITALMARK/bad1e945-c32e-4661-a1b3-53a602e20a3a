"use client";

import { useEffect } from "react";

export function PhoenixTracker() {
  useEffect(() => {
    // Phoenix tracking initialization
    if (typeof window !== "undefined") {
      // Load phoenix tracking script if it exists
      const script = document.querySelector('script[src*="phoenix-tracking"]');
      if (!script) {
        const phoenixScript = document.createElement("script");
        phoenixScript.src = "/phoenix-tracking.js";
        phoenixScript.async = true;
        document.head.appendChild(phoenixScript);
      }

      // Load phoenix tracking styles if they exist
      const styles = document.querySelector('link[href*="phoenix-tracking"]');
      if (!styles) {
        const phoenixStyles = document.createElement("link");
        phoenixStyles.rel = "stylesheet";
        phoenixStyles.href = "/phoenix-tracking.css";
        document.head.appendChild(phoenixStyles);
      }
    }
  }, []);

  return null;
}