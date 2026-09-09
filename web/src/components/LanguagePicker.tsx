"use client";

import { LANGUAGES } from "@/lib/languages";
import type { LanguageCode } from "@/lib/types";

export function LanguagePicker({
  value,
  onChange,
  size = "compact",
}: {
  value: LanguageCode;
  onChange: (language: LanguageCode) => void;
  size?: "compact" | "hero";
}) {
  const hero = size === "hero";

  return (
    <div
      role="radiogroup"
      aria-label="Select language"
      className={hero ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "flex flex-wrap gap-2"}
    >
      {LANGUAGES.map((language) => {
        const selected = language.code === value;
        return (
          <button
            key={language.code}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(language.code)}
            // The endonym is what a patient recognises; the English name is
            // announced for staff and screen readers.
            aria-label={`${language.nativeName} (${language.englishName})`}
            className={
              hero
                ? `rounded-[--radius-card] border-2 p-5 text-center transition ${
                    selected
                      ? "border-leaf-700 bg-leaf-700 text-white shadow-lg"
                      : "border-bark-200 bg-white text-bark-900 hover:border-leaf-500"
                  }`
                : `min-h-11 rounded-full border px-4 py-2 text-base font-medium transition ${
                    selected
                      ? "border-leaf-700 bg-leaf-700 text-white"
                      : "border-bark-200 bg-white text-bark-800 hover:border-leaf-500"
                  }`
            }
          >
            <span className={hero ? "block text-2xl font-bold" : ""}>{language.nativeName}</span>
            {hero && (
              <span className="mt-1 block text-sm opacity-75">{language.englishName}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
