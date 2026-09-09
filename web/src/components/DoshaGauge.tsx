import type { PrakritiAssessment } from "@/lib/types";

const DOSHAS = [
  { key: "vata_pct", label: "Vata", devanagari: "वात", color: "var(--color-vata)" },
  { key: "pitta_pct", label: "Pitta", devanagari: "पित्त", color: "var(--color-pitta)" },
  { key: "kapha_pct", label: "Kapha", devanagari: "कफ", color: "var(--color-kapha)" },
] as const;

export function DoshaGauge({ prakriti }: { prakriti: PrakritiAssessment }) {
  return (
    <div className="print-break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-bold text-bark-900">Tri-Dosha Balance</h3>
        <span className="text-sm text-bark-600">{prakriti.dosha_balance_state}</span>
      </div>

      {/* A single stacked bar reads faster than three separate meters when a
          doctor is scanning the sheet in a 60-second consult. */}
      <div
        className="mt-3 flex h-7 w-full overflow-hidden rounded-full border border-bark-200"
        role="img"
        aria-label={DOSHAS.map((d) => `${d.label} ${prakriti[d.key]} percent`).join(", ")}
      >
        {DOSHAS.map((dosha) => (
          <div
            key={dosha.key}
            className="h-full transition-[width] duration-500"
            style={{ width: `${prakriti[dosha.key]}%`, backgroundColor: dosha.color }}
          />
        ))}
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2">
        {DOSHAS.map((dosha) => (
          <div key={dosha.key} className="rounded-lg bg-white p-2 text-center">
            <dt className="flex items-center justify-center gap-1.5 text-sm text-bark-600">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ backgroundColor: dosha.color }}
                aria-hidden
              />
              {dosha.label} <span className="opacity-60">{dosha.devanagari}</span>
            </dt>
            <dd className="text-2xl font-bold tabular-nums text-bark-900">
              {prakriti[dosha.key]}%
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 text-sm text-bark-800">
        <span className="font-semibold">Primary Prakriti:</span> {prakriti.primary_prakriti}
      </p>
    </div>
  );
}
