"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { DoshaGauge } from "@/components/DoshaGauge";
import { LanguagePicker } from "@/components/LanguagePicker";
import { TriageBanner } from "@/components/TriageBanner";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { api } from "@/lib/api";
import { generateCaseSheet } from "@/lib/clinical/caseSheet";
import { getQuestions } from "@/lib/clinical/data";
import { detectRedFlags } from "@/lib/clinical/triage";
import { DEFAULT_LANGUAGE, t } from "@/lib/languages";
import { localStore } from "@/lib/store";
import type { CaseSheet, LanguageCode, PatientInfo } from "@/lib/types";
import { useConnection } from "@/lib/useConnection";

const STEP_ORDER = ["language", "identity", "symptoms"] as const;

type FlowStep = (typeof STEP_ORDER)[number];
type Step = FlowStep | "done";

export default function KioskPage() {
  const [step, setStep] = useState<Step>("language");
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [patient, setPatient] = useState<PatientInfo>({ name: "", age: "", gender: "" });
  const [abhaInput, setAbhaInput] = useState("");
  const [abhaStatus, setAbhaStatus] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CaseSheet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { online } = useConnection();
  const questions = useMemo(() => getQuestions(language), [language]);

  // Triage runs on every keystroke so a red flag surfaces while the patient is
  // still at the kiosk, not after the case reaches the doctor's queue.
  const liveTriage = useMemo(
    () =>
      detectRedFlags({
        chiefComplaint: responses.chief_complaint,
        voiceTranscript: transcript,
        painSeverity: responses.pain_severity,
        responses,
      }),
    [responses, transcript],
  );

  async function verifyAbha() {
    setAbhaStatus("Checking…");
    try {
      const response = await api.verifyAbha(abhaInput);
      setPatient({
        name: response.profile.name,
        age: response.profile.age,
        gender: response.profile.gender,
        mobile: response.profile.mobile,
        abha_id: response.profile.abha_id,
      });
      setAbhaStatus(`Verified · consent ${response.consent_artifact.consent_id}`);
    } catch {
      setAbhaStatus("Could not reach ABDM. Enter the details by hand below.");
    }
  }

  async function submit() {
    setSubmitting(true);
    setError(null);

    const payload = {
      patient_info: {
        ...patient,
        name: patient.name.trim() || "Walk-in patient",
        age: patient.age || 0,
        gender: patient.gender || "Unspecified",
      },
      language,
      responses,
      voice_transcript: transcript,
      uploaded_documents: [],
    };

    try {
      // Prefer the server so the case lands in the shared queue, but never lose
      // an intake because the clinic link happened to be down.
      const caseSheet = online
        ? (await api.submitIntake(payload)).case_sheet
        : generateCaseSheet(payload);
      localStore.save(caseSheet);
      setResult(caseSheet);
      setStep("done");
    } catch {
      const caseSheet = generateCaseSheet(payload);
      localStore.save(caseSheet);
      setResult(caseSheet);
      setStep("done");
      setError("The OPD server did not respond, so this case is saved on the kiosk.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done" && result) {
    return <Confirmation caseSheet={result} language={language} warning={error} />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <StepProgress current={step} language={language} />

      {step === "language" && (
        <section className="mt-8">
          <h1 className="text-3xl font-bold text-bark-900">{t("chooseLanguage", language)}</h1>
          <p className="mt-2 text-bark-600">Choose your language</p>
          <div className="mt-6">
            <LanguagePicker value={language} onChange={setLanguage} size="hero" />
          </div>
          <PrimaryButton onClick={() => setStep("identity")} className="mt-8">
            {t("next", language)}
          </PrimaryButton>
        </section>
      )}

      {step === "identity" && (
        <section className="mt-8 space-y-6">
          <div className="rounded-[--radius-card] border border-bark-200 bg-white p-5">
            <h2 className="text-xl font-bold text-bark-900">{t("abhaPrompt", language)}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <input
                value={abhaInput}
                onChange={(event) => setAbhaInput(event.target.value)}
                inputMode="numeric"
                placeholder="98-7233-4120-9411"
                aria-label={t("abhaPrompt", language)}
                className="min-h-12 flex-1 rounded-lg border border-bark-200 px-4 text-lg tabular-nums"
              />
              <button
                type="button"
                onClick={verifyAbha}
                className="min-h-12 rounded-lg bg-leaf-700 px-6 font-semibold text-white hover:bg-leaf-800"
              >
                {t("verify", language)}
              </button>
            </div>
            {abhaStatus && (
              <p className="mt-3 text-sm font-medium text-bark-700" aria-live="polite">
                {abhaStatus}
              </p>
            )}
          </div>

          <div className="grid gap-4 rounded-[--radius-card] border border-bark-200 bg-white p-5 sm:grid-cols-2">
            <Field
              label={t("patientName", language)}
              value={String(patient.name)}
              onChange={(name) => setPatient((prev) => ({ ...prev, name }))}
            />
            <Field
              label={t("age", language)}
              value={String(patient.age)}
              inputMode="numeric"
              onChange={(age) => setPatient((prev) => ({ ...prev, age }))}
            />
            <Field
              label={t("gender", language)}
              value={patient.gender}
              onChange={(gender) => setPatient((prev) => ({ ...prev, gender }))}
            />
            <Field
              label={t("mobile", language)}
              value={patient.mobile ?? ""}
              inputMode="numeric"
              onChange={(mobile) => setPatient((prev) => ({ ...prev, mobile }))}
            />
          </div>

          <div className="flex gap-3">
            <SecondaryButton onClick={() => setStep("language")}>
              {t("back", language)}
            </SecondaryButton>
            <PrimaryButton onClick={() => setStep("symptoms")}>
              {t("next", language)}
            </PrimaryButton>
          </div>
        </section>
      )}

      {step === "symptoms" && (
        <section className="mt-8 space-y-6">
          {liveTriage.triage_level !== "GREEN" && (
            <>
              <TriageBanner triage={liveTriage} />
              {liveTriage.is_emergency && (
                <p className="rounded-lg bg-alert-600 p-4 text-lg font-bold text-white">
                  {t("emergencyNotice", language)}
                </p>
              )}
            </>
          )}

          <VoiceRecorder
            language={language}
            transcript={transcript}
            onTranscript={setTranscript}
            promptLabel={t("speakSymptoms", language)}
            idleLabel={t("tapToSpeak", language)}
            listeningLabel={t("listening", language)}
          />

          <div className="space-y-4">
            {questions.map((question) => (
              <fieldset
                key={question.id}
                className="rounded-[--radius-card] border border-bark-200 bg-white p-5"
              >
                <legend className="px-1 text-lg font-semibold text-bark-900">
                  {question.prompt}
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => {
                    const selected = responses[question.id] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          setResponses((prev) => ({ ...prev, [question.id]: option }))
                        }
                        className={`min-h-12 rounded-lg border-2 px-4 py-2 text-left text-base transition ${
                          selected
                            ? "border-leaf-700 bg-leaf-50 font-semibold text-leaf-900"
                            : "border-bark-200 bg-white text-bark-800 hover:border-leaf-500"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="flex gap-3">
            <SecondaryButton onClick={() => setStep("identity")}>
              {t("back", language)}
            </SecondaryButton>
            <PrimaryButton onClick={submit} disabled={submitting}>
              {submitting ? "Sending…" : t("submit", language)}
            </PrimaryButton>
          </div>
        </section>
      )}
    </div>
  );
}

function Confirmation({
  caseSheet,
  language,
  warning,
}: {
  caseSheet: CaseSheet;
  language: LanguageCode;
  warning: string | null;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="rounded-[--radius-card] border-2 border-leaf-500 bg-white p-8 text-center">
        <p className="text-lg text-bark-600">{t("yourTokenIs", language)}</p>
        <p className="mt-2 text-5xl font-bold tracking-tight text-leaf-800 tabular-nums">
          {caseSheet.token_number}
        </p>
        <p className="mt-4 text-bark-700">{caseSheet.patient_info.name}</p>
      </div>

      {warning && (
        <p className="mt-4 rounded-lg bg-turmeric-50 p-4 text-turmeric-900" role="status">
          {warning}
        </p>
      )}

      <div className="mt-6 space-y-6">
        <TriageBanner triage={caseSheet.triage} />
        <div className="rounded-[--radius-card] border border-bark-200 bg-white p-5">
          <DoshaGauge prakriti={caseSheet.prakriti} />
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-leaf-700 px-6 font-semibold text-white hover:bg-leaf-800"
      >
        Start a new intake
      </Link>
    </div>
  );
}

function StepProgress({ current, language }: { current: Step; language: LanguageCode }) {
  const labels: Record<FlowStep, string> = {
    language: t("chooseLanguage", language),
    identity: t("identity", language),
    symptoms: t("symptoms", language),
  };
  const currentIndex = STEP_ORDER.indexOf(current as FlowStep);

  return (
    <ol className="flex flex-wrap gap-2" aria-label="Progress">
      {STEP_ORDER.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        return (
          <li
            key={step}
            aria-current={active ? "step" : undefined}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              active
                ? "bg-leaf-700 text-white"
                : done
                  ? "bg-leaf-100 text-leaf-900"
                  : "bg-bark-100 text-bark-600"
            }`}
          >
            <span className="grid size-6 place-items-center rounded-full bg-white/25">
              {done ? "✓" : index + 1}
            </span>
            {labels[step]}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  value,
  onChange,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-bark-800">{label}</span>
      <input
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-12 w-full rounded-lg border border-bark-200 px-4 text-lg"
      />
    </label>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-h-14 flex-1 rounded-lg bg-leaf-700 px-8 text-lg font-bold text-white transition hover:bg-leaf-800 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-14 rounded-lg border-2 border-bark-200 bg-white px-8 text-lg font-semibold text-bark-800 hover:border-bark-400"
    >
      {children}
    </button>
  );
}
