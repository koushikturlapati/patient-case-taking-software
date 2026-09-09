"use client";

import { useCallback, useEffect, useState } from "react";

import { DoshaGauge } from "@/components/DoshaGauge";
import { TriageBanner } from "@/components/TriageBanner";
import { api } from "@/lib/api";
import { localStore, toQueueEntry } from "@/lib/store";
import type { CaseSheet, QueueEntry } from "@/lib/types";
import { useConnection } from "@/lib/useConnection";

// Red first, then yellow. A doctor scanning the list should never have to sort
// it themselves to find the patient who cannot wait.
const TRIAGE_RANK = (triage: string) =>
  triage.includes("Red") ? 0 : triage.includes("Yellow") ? 1 : 2;

/**
 * Combine the server queue with cases held on this kiosk, de-duplicated by
 * token, then order by urgency so the sickest patient is always at the top.
 */
function mergeQueues(remote: QueueEntry[], local: QueueEntry[]): QueueEntry[] {
  const seen = new Set<string>();
  const merged: QueueEntry[] = [];

  for (const entry of [...remote, ...local]) {
    if (seen.has(entry.token_number)) continue;
    seen.add(entry.token_number);
    merged.push(entry);
  }

  return merged.sort((a, b) => TRIAGE_RANK(a.triage) - TRIAGE_RANK(b.triage));
}

export default function DoctorPage() {
  const { online } = useConnection();
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [selected, setSelected] = useState<CaseSheet | null>(null);
  const [loading, setLoading] = useState(true);

  // Bumping this re-runs the effect below, which keeps the one copy of the
  // fetch logic cancellable instead of duplicating it in a click handler.
  const [reloadToken, setReloadToken] = useState(0);
  const refresh = useCallback(() => setReloadToken((value) => value + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const local = localStore.list().map(toQueueEntry);

      let remote: QueueEntry[] = [];
      if (online) {
        try {
          remote = await api.getQueue();
        } catch {
          remote = [];
        }
      }
      if (cancelled) return;

      setQueue(mergeQueues(remote, local));
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [online, reloadToken]);

  async function openCase(token: string) {
    const cached = localStore.get(token);
    if (cached) {
      setSelected(cached);
      return;
    }
    try {
      setSelected(await api.getCase(token));
    } catch {
      setSelected(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-bark-900">OPD queue</h1>
        <button
          type="button"
          onClick={refresh}
          className="min-h-11 rounded-lg border-2 border-bark-200 bg-white px-5 font-semibold text-bark-800 hover:border-leaf-500"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[22rem_1fr]">
        <aside className="no-print space-y-3">
          {loading && <p className="text-bark-600">Loading queue…</p>}
          {!loading && queue.length === 0 && (
            <p className="rounded-[--radius-card] border border-dashed border-bark-200 p-6 text-center text-bark-600">
              No patients waiting. Completed intakes appear here.
            </p>
          )}
          {queue.map((entry) => (
            <QueueCard
              key={entry.token_number}
              entry={entry}
              active={selected?.token_number === entry.token_number}
              onSelect={() => openCase(entry.token_number)}
            />
          ))}
        </aside>

        <main>
          {selected ? (
            // Keying on the token resets the note fields when the doctor opens a
            // different patient, instead of syncing them through an effect.
            <CaseSheetView
              key={selected.token_number}
              caseSheet={selected}
              onSaved={refresh}
              online={online}
            />
          ) : (
            <p className="rounded-[--radius-card] border border-dashed border-bark-200 p-10 text-center text-bark-600">
              Select a patient to open their case sheet.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

function QueueCard({
  entry,
  active,
  onSelect,
}: {
  entry: QueueEntry;
  active: boolean;
  onSelect: () => void;
}) {
  const red = entry.triage.includes("Red");
  const yellow = entry.triage.includes("Yellow");

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`w-full rounded-[--radius-card] border-2 bg-white p-4 text-left transition ${
        active
          ? "border-leaf-700 shadow-md"
          : red
            ? "border-alert-300 hover:border-alert-600"
            : yellow
              ? "border-turmeric-300 hover:border-turmeric-600"
              : "border-bark-200 hover:border-leaf-500"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-sm font-bold text-bark-700">{entry.token_number}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${
            red
              ? "bg-alert-600 text-white"
              : yellow
                ? "bg-turmeric-700 text-white"
                : "bg-leaf-100 text-leaf-900"
          }`}
        >
          {red ? "Red" : yellow ? "Yellow" : "Green"}
        </span>
      </div>
      <p className="mt-1.5 font-semibold text-bark-900">{entry.patient_name}</p>
      <p className="text-sm text-bark-600">
        {entry.age ? `${entry.age} yrs · ` : ""}
        {entry.gender} · {entry.language}
      </p>
      <p className="mt-1 line-clamp-2 text-sm text-bark-700">{entry.chief_complaint}</p>
      <p className="mt-1.5 text-xs text-bark-400">{entry.status}</p>
    </button>
  );
}

function CaseSheetView({
  caseSheet,
  onSaved,
  online,
}: {
  caseSheet: CaseSheet;
  onSaved: () => void;
  online: boolean;
}) {
  const [notes, setNotes] = useState(caseSheet.doctor_plan ?? "");
  const [prescriptions, setPrescriptions] = useState((caseSheet.prescriptions ?? []).join("\n"));
  const [saved, setSaved] = useState(false);

  async function save() {
    const lines = prescriptions
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const status = "Consultation Completed";

    localStore.updateNotes(caseSheet.token_number, notes, lines, status);
    if (online) {
      try {
        await api.updateDoctorNotes({
          token_number: caseSheet.token_number,
          doctor_notes: notes,
          prescriptions: lines,
          status,
        });
      } catch {
        /* Saved locally regardless; the badge in the header shows the link state. */
      }
    }
    setSaved(true);
    onSaved();
  }

  return (
    <article className="space-y-6">
      <header className="rounded-[--radius-card] border border-bark-200 bg-white p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-bark-900">{caseSheet.patient_info.name}</h2>
            <p className="text-bark-600">
              {caseSheet.patient_info.age} yrs · {caseSheet.patient_info.gender}
              {caseSheet.patient_info.abha_id ? ` · ABHA ${caseSheet.patient_info.abha_id}` : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-lg font-bold text-leaf-800">{caseSheet.token_number}</p>
            <p className="text-sm text-bark-500">{caseSheet.created_at}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print mt-4 min-h-11 rounded-lg border-2 border-bark-200 px-5 font-semibold text-bark-800 hover:border-leaf-500"
        >
          Print case sheet
        </button>
      </header>

      <TriageBanner triage={caseSheet.triage} />

      <div className="rounded-[--radius-card] border border-bark-200 bg-white p-5">
        <DoshaGauge prakriti={caseSheet.prakriti} />
      </div>

      {caseSheet.voice_transcript && (
        <section className="rounded-[--radius-card] border border-bark-200 bg-white p-5">
          <h3 className="text-lg font-bold text-bark-900">Patient&rsquo;s own words</h3>
          <blockquote className="mt-2 border-l-4 border-leaf-300 pl-4 text-bark-800 italic">
            {caseSheet.voice_transcript}
          </blockquote>
        </section>
      )}

      <section className="rounded-[--radius-card] border border-bark-200 bg-white p-5">
        <h3 className="text-lg font-bold text-bark-900">SOAP note</h3>
        <dl className="mt-3 space-y-3">
          {(["Subjective", "Objective", "Assessment", "Plan"] as const).map((section) => (
            <div key={section} className="print-break-inside-avoid">
              <dt className="text-sm font-bold uppercase tracking-wide text-leaf-800">
                {section}
              </dt>
              <dd className="mt-0.5 whitespace-pre-line text-bark-800">
                {caseSheet.soap_note[section]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <ParikshaTable title="Dashavidha Pariksha" entries={caseSheet.dashavidha_pariksha} />
        <ParikshaTable title="Ashtavidha Pariksha" entries={caseSheet.ashtavidha_pariksha} />
      </div>

      <section className="no-print rounded-[--radius-card] border border-bark-200 bg-white p-5">
        <h3 className="text-lg font-bold text-bark-900">Doctor&rsquo;s plan</h3>
        <label className="mt-3 block">
          <span className="text-sm font-semibold text-bark-800">Clinical notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-bark-200 p-3"
          />
        </label>
        <label className="mt-3 block">
          <span className="text-sm font-semibold text-bark-800">
            Prescriptions, one per line
          </span>
          <textarea
            value={prescriptions}
            onChange={(event) => setPrescriptions(event.target.value)}
            rows={4}
            placeholder="Trikatu Churna 3g BD before food"
            className="mt-1 w-full rounded-lg border border-bark-200 p-3"
          />
        </label>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={save}
            className="min-h-12 rounded-lg bg-leaf-700 px-6 font-bold text-white hover:bg-leaf-800"
          >
            Save consultation
          </button>
          {saved && (
            <span className="text-sm font-semibold text-leaf-800" role="status">
              Saved{online ? "" : " on this device"}
            </span>
          )}
        </div>
      </section>
    </article>
  );
}

function ParikshaTable({
  title,
  entries,
}: {
  title: string;
  entries: Record<string, string>;
}) {
  return (
    <section className="print-break-inside-avoid rounded-[--radius-card] border border-bark-200 bg-white p-5">
      <h3 className="text-lg font-bold text-bark-900">{title}</h3>
      <dl className="mt-3 space-y-2">
        {Object.entries(entries).map(([term, value]) => (
          <div key={term} className="grid grid-cols-[9rem_1fr] gap-3 border-b border-bark-100 pb-2">
            <dt className="text-sm font-semibold text-leaf-800">{term}</dt>
            <dd className="text-sm text-bark-800">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
