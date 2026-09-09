import type { TriageAnalysis } from "@/lib/types";

const TIER_STYLES = {
  RED: {
    container: "border-alert-600 bg-alert-50 text-alert-900 animate-alert-pulse",
    chip: "bg-alert-600 text-white",
    label: "Code Red",
  },
  YELLOW: {
    container: "border-turmeric-600 bg-turmeric-50 text-turmeric-900",
    chip: "bg-turmeric-700 text-white",
    label: "Code Yellow",
  },
  GREEN: {
    container: "border-leaf-500 bg-leaf-50 text-leaf-900",
    chip: "bg-leaf-700 text-white",
    label: "Code Green",
  },
} as const;

export function TriageBanner({
  triage,
  compact = false,
}: {
  triage: TriageAnalysis;
  compact?: boolean;
}) {
  const style = TIER_STYLES[triage.triage_level];
  const findings = triage.detected_red_flags.filter((flag) => flag.code !== "NO_RED_FLAGS");

  return (
    <section
      // Emergencies interrupt the screen reader; routine results wait their turn.
      role={triage.is_emergency ? "alert" : "status"}
      aria-live={triage.is_emergency ? "assertive" : "polite"}
      className={`rounded-[--radius-card] border-2 p-4 sm:p-5 ${style.container}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-sm font-bold tracking-wide uppercase ${style.chip}`}
        >
          {style.label}
        </span>
        <span className="text-sm font-semibold">{triage.triage_category}</span>
      </div>

      <p className="mt-3 text-lg font-bold">{triage.triage_banner_text}</p>

      {!compact && findings.length > 0 && (
        <ul className="mt-4 space-y-3">
          {findings.map((flag) => (
            <li
              key={flag.code}
              className="rounded-lg border border-current/20 bg-white/70 p-3 text-bark-900"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-bold">{flag.system}</span>
                <span className="text-sm opacity-70">
                  matched “{flag.matched_keyword}”
                  {flag.language_detected ? ` (${flag.language_detected})` : ""}
                </span>
              </div>
              <p className="mt-1 text-sm">{flag.clinical_risk}</p>
              <p className="mt-2 text-sm font-semibold">{flag.recommended_action}</p>
            </li>
          ))}
        </ul>
      )}

      {!compact && (
        <p className="mt-4 text-sm font-medium opacity-90">{triage.ayush_safety_guideline}</p>
      )}
    </section>
  );
}
