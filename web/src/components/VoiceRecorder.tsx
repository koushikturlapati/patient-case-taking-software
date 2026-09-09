"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { getLanguage } from "@/lib/languages";
import type { LanguageCode } from "@/lib/types";

type RecorderState = "idle" | "listening" | "denied";

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const scope = window as WindowWithSpeech;
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition;
}

/* Browser capability, not React state: read it through the external-store hook
   so the prerendered HTML and the hydrated client agree without an effect. */
const subscribeToNothing = () => () => {};

function useSpeechSupported(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => getSpeechRecognitionCtor() !== undefined,
    () => false,
  );
}

/**
 * Voice intake using the browser's own speech recognition.
 *
 * The kiosk is a static export, so there is no server to stream audio to. The
 * Web Speech API keeps recognition on-device, which also means a patient's
 * spoken symptoms never leave the machine, and it keeps working when the clinic
 * link drops. Where the browser has no Indic recognition the control degrades
 * to a labelled textarea rather than silently capturing nothing.
 */
export function VoiceRecorder({
  language,
  transcript,
  onTranscript,
  promptLabel,
  idleLabel,
  listeningLabel,
}: {
  language: LanguageCode;
  transcript: string;
  onTranscript: (value: string) => void;
  promptLabel: string;
  idleLabel: string;
  listeningLabel: string;
}) {
  const [state, setState] = useState<RecorderState>("idle");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const supported = useSpeechSupported();

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognitionCtor();
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = getLanguage(language).speechTag;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let assembled = "";
      for (let index = 0; index < event.results.length; index += 1) {
        assembled += event.results[index][0].transcript;
      }
      onTranscript(assembled.trim());
    };
    recognition.onerror = (event) => {
      setState(event.error === "not-allowed" ? "denied" : "idle");
    };
    recognition.onend = () => setState((current) => (current === "listening" ? "idle" : current));

    recognitionRef.current = recognition;
    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [language, onTranscript]);

  const toggle = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (state === "listening") {
      recognition.stop();
      setState("idle");
      return;
    }
    try {
      recognition.start();
      setState("listening");
    } catch {
      /* start() throws if already running; the state above stays authoritative. */
    }
  }, [state]);

  const listening = state === "listening";
  const canListen = supported && state !== "denied";

  return (
    <div className="rounded-[--radius-card] border border-leaf-200 bg-leaf-50 p-5 text-center">
      <p className="text-lg font-semibold text-leaf-900">{promptLabel}</p>

      {canListen && (
        <>
          <div className="relative mx-auto mt-5 grid size-28 place-items-center">
            {listening && (
              <span
                className="absolute inset-0 rounded-full bg-leaf-500 animate-mic-ring"
                aria-hidden
              />
            )}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={listening}
              aria-label={listening ? listeningLabel : idleLabel}
              className={`relative grid size-24 place-items-center rounded-full text-4xl shadow-lg transition-transform active:scale-95 ${
                listening
                  ? "bg-alert-600 text-white"
                  : "bg-leaf-700 text-white hover:bg-leaf-800"
              }`}
            >
              {listening ? "◼" : "🎤"}
            </button>
          </div>
          <p className="mt-3 text-base font-medium text-leaf-900" aria-live="polite">
            {listening ? listeningLabel : idleLabel}
          </p>
        </>
      )}

      {state === "denied" && (
        <p className="mt-4 rounded-lg bg-turmeric-50 p-3 text-sm text-turmeric-900">
          Microphone access was blocked. Type the symptoms below instead.
        </p>
      )}

      {!supported && (
        <p className="mt-4 rounded-lg bg-bark-100 p-3 text-sm text-bark-800">
          This browser cannot transcribe speech. Type the symptoms below instead.
        </p>
      )}

      <div className="mt-4 text-left">
        <label htmlFor="voice-transcript" className="text-sm font-semibold text-bark-800">
          Transcript
        </label>
        <textarea
          id="voice-transcript"
          value={transcript}
          onChange={(event) => onTranscript(event.target.value)}
          rows={4}
          placeholder="Speech appears here, and can be corrected by hand."
          className="mt-1 w-full rounded-lg border border-bark-200 bg-white p-3 text-base text-bark-900 placeholder:text-bark-400"
        />
      </div>
    </div>
  );
}

/* Minimal shape of the Web Speech API; TypeScript's DOM lib does not ship it. */
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
}
