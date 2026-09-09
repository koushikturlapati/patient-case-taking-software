"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useConnection } from "@/lib/useConnection";

export function AppHeader() {
  const pathname = usePathname();
  const { online, checking } = useConnection();

  return (
    <header className="no-print border-b border-bark-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-leaf-700 text-2xl">
            🌿
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight text-bark-900">
              AYUSH Case-Taking
            </span>
            <span className="block text-sm text-bark-600">Ministry of Ayush · SIH 26047</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-2" aria-label="Main">
          <NavLink href="/" active={pathname === "/"}>
            Patient intake
          </NavLink>
          <NavLink href="/doctor" active={pathname.startsWith("/doctor")}>
            Doctor portal
          </NavLink>
        </nav>

        <ConnectionBadge online={online} checking={checking} />
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`min-h-11 rounded-full px-4 py-2 text-base font-medium transition ${
        active ? "bg-leaf-700 text-white" : "text-bark-800 hover:bg-bark-100"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Whether the OPD server is reachable is clinically relevant, not a technical
 * detail: offline means records are held on this kiosk and have not yet reached
 * the doctor's queue, so staff need to see it at a glance.
 */
function ConnectionBadge({ online, checking }: { online: boolean; checking: boolean }) {
  if (checking) {
    return (
      <span className="rounded-full bg-bark-100 px-3 py-1.5 text-sm text-bark-600">
        Checking server…
      </span>
    );
  }

  return (
    <span
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
        online ? "bg-leaf-100 text-leaf-900" : "bg-turmeric-50 text-turmeric-900"
      }`}
      title={
        online
          ? "Connected to the OPD server."
          : "Working offline. Cases are stored on this device until the server is reachable."
      }
    >
      <span
        className={`size-2.5 rounded-full ${online ? "bg-leaf-600" : "bg-turmeric-600"}`}
        aria-hidden
      />
      {online ? "Server connected" : "Offline mode"}
    </span>
  );
}
