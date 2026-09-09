"""Export the clinical corpora from Python into JSON for the web client.

The kiosk is a static export served from GitHub Pages, so it has to run the
triage and Prakriti logic in the browser with no backend reachable. That means
the multilingual lexicons live in two runtimes at once.

Rather than hand-maintaining a second copy in TypeScript and letting the two
drift, the Python modules stay authoritative and this script emits the data the
client needs. CI re-runs it and fails if the checked-in JSON is stale, so a new
Telugu red-flag keyword can never reach the backend without reaching the kiosk.

Usage:
    python scripts/export_clinical_data.py           # write the file
    python scripts/export_clinical_data.py --check   # verify it is current
"""

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from backend.data.translations import (  # noqa: E402
    CLINICAL_QUESTIONS,
    CLINICAL_TERMS_MULTILINGUAL,
    LANGUAGES,
    UI_STRINGS,
)
from backend.services.clinical_engine import clinical_engine  # noqa: E402
from backend.services.red_flag_detector import red_flag_detector  # noqa: E402

OUTPUT_PATH = REPO_ROOT / "web" / "src" / "data" / "clinical-data.json"
FIXTURES_PATH = REPO_ROOT / "web" / "src" / "data" / "parity-fixtures.json"

# Inputs chosen to exercise each triage tier, every critical category, all five
# languages, and the Prakriti rounding edge cases.
TRIAGE_CASES = [
    {"chief_complaint": "mild seasonal cough", "pain_severity": "3/10"},
    {"chief_complaint": "severe crushing chest pain"},
    {"chief_complaint": "sudden weakness on the right side"},
    {"chief_complaint": "acute urinary retention since morning"},
    {"chief_complaint": "vomiting blood after dinner"},
    {"chief_complaint": "throat tightness and stridor after a new tablet"},
    {"voice_transcript": "గుండె నొప్పి చాలా ఎక్కువగా ఉంది"},
    {"voice_transcript": "மார்பு வலி மற்றும் மூச்சுத் திணறல்"},
    {"voice_transcript": "ಎದೆ ನೋವು ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ"},
    {"voice_transcript": "सीने में दर्द और सांस फूलना"},
    {"pain_severity": "unbearable pain"},
    {"chief_complaint": "chest pain", "pain_severity": "unbearable pain"},
    {"responses": {"associated_symptoms": "coughing blood since morning"}},
    {
        "chief_complaint": "routine post-operative review",
        "uploaded_documents": [{"summary": "Post-TURBT hematuria under evaluation"}],
    },
    {},
]

PRAKRITI_CASES = [
    {},
    {"chief_complaint": "joint pain and stiffness", "agni_digestion": "vishamagni", "koshtha_bowel": "krura koshtha"},
    {"chief_complaint": "acidity and heartburn", "agni_digestion": "tikshnagni"},
    {"chief_complaint": "fatigue and cough", "agni_digestion": "mandagni"},
    {"chief_complaint": "కీళ్ళ నొప్పులు"},
    {"chief_complaint": "மூட்டு வலி"},
    {"chief_complaint": "जोड़ों का दर्द"},
    {"chief_complaint": "ಕೀಲು ನೋವು"},
    {"chief_complaint": "joint pain", "agni_digestion": "mandagni", "koshtha_bowel": "mrudu"},
]


def build_payload() -> dict:
    return {
        "_generated_by": "scripts/export_clinical_data.py",
        "_do_not_edit": "Edit the Python modules under backend/ and re-run the script.",
        "languages": LANGUAGES,
        "uiStrings": UI_STRINGS,
        "questions": CLINICAL_QUESTIONS,
        "clinicalTerms": CLINICAL_TERMS_MULTILINGUAL,
        "redFlagPatterns": red_flag_detector.red_flag_patterns,
    }


def build_fixtures() -> dict:
    """Golden outputs the TypeScript port must reproduce exactly."""
    return {
        "_generated_by": "scripts/export_clinical_data.py",
        "_purpose": "Golden outputs from the Python engine; web/ asserts byte-equality against these.",
        "triage": [
            {"input": case, "expected": red_flag_detector.detect_red_flags(**case)}
            for case in TRIAGE_CASES
        ],
        "prakriti": [
            {"input": case, "expected": clinical_engine.calculate_prakriti_and_doshas(case)}
            for case in PRAKRITI_CASES
        ],
    }


def serialize(payload: dict) -> str:
    # Sorted keys and a trailing newline keep the diff stable between runs.
    return json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Exit non-zero if the committed JSON differs from the Python source.",
    )
    args = parser.parse_args()

    artifacts = {
        OUTPUT_PATH: serialize(build_payload()),
        FIXTURES_PATH: serialize(build_fixtures()),
    }

    if args.check:
        stale = []
        for path, rendered in artifacts.items():
            if not path.exists() or path.read_text(encoding="utf-8") != rendered:
                stale.append(path.relative_to(REPO_ROOT).as_posix())
        if stale:
            print(
                "Out of date: " + ", ".join(stale) + "\n"
                "Run: python scripts/export_clinical_data.py"
            )
            return 1
        print("Exported clinical data is up to date.")
        return 0

    for path, rendered in artifacts.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(rendered, encoding="utf-8")
        print(f"Wrote {path.relative_to(REPO_ROOT).as_posix()} ({len(rendered):,} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
