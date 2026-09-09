import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";

import { AppHeader } from "@/components/AppHeader";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import "./globals.css";

/**
 * Noto Sans carries Telugu, Tamil, Kannada and Devanagari in one family, so the
 * kiosk does not fall back to a system font mid-sentence when a patient
 * switches language.
 */
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AYUSH Smart Case-Taking | SIH 26047",
  description:
    "Voice-first multilingual clinical intake and triage for Ministry of Ayush OPDs, working offline in low-connectivity clinics.",
  manifest: "manifest.webmanifest",
  appleWebApp: { capable: true, title: "AYUSH Intake", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0a6544",
  // Patients pinch-zoom to read; disabling that would fail WCAG 1.4.4.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-noto-sans)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:bg-leaf-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <AppHeader />
        <div id="main" className="flex-1">
          {children}
        </div>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
