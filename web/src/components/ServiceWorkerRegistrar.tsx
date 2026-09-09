"use client";

import { useEffect } from "react";

/**
 * Registers the offline service worker.
 *
 * Scoped to the deployed base path so it works both at the root during
 * development and under the repository subpath on GitHub Pages.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {
      /* Offline support is an enhancement; the kiosk still works without it. */
    });
  }, []);

  return null;
}
