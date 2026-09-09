# Contributing

Thanks for helping improve the AYUSH Smart Multilingual Case-Taking Platform
(SIH Problem Statement 26047).

## Getting set up

```bash
git clone https://github.com/koushikturlapati/patient-case-taking-software.git
cd patient-case-taking-software

python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements-dev.txt
cp .env.example .env
```

Run the platform:

```bash
python -m uvicorn backend.main:app --reload --port 8000
```

The kiosk is at <http://localhost:8000> and the interactive API docs at
<http://localhost:8000/docs>.

## Before you open a pull request

```bash
pytest              # the full suite must pass
ruff check .        # no lint errors
ruff format .       # apply formatting
```

CI runs exactly these commands against Python 3.10, 3.11 and 3.12.

## Branching and commits

Branch off `main` using a descriptive prefix:

| Prefix | Use for |
| --- | --- |
| `feat/` | New capability |
| `fix/` | Bug fix |
| `refactor/` | Restructuring with no behaviour change |
| `docs/` | Documentation only |
| `test/` | Tests only |

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
fix(abha): match profiles on the full 14-digit ABHA number
```

## Working on the clinical layer

This project makes triage decisions about real patients, so changes under
`backend/services/` carry extra weight:

- **Never let a change downgrade an emergency.** `tests/test_red_flag_detector.py`
  encodes the safety contract. Add a case there before changing detection logic.
- **Keep all five languages in step.** Telugu, Tamil, Kannada, Hindi and English
  are first-class. A new clinical keyword or UI string needs all five, and
  English is the fallback when a locale is missing.
- **Prefer explicit fallbacks over silent ones.** When an external service such
  as Sarvam AI is unavailable, the response should say so rather than pass
  simulated output off as live output.

## Reporting bugs

Open an issue with the steps to reproduce, what you expected, what happened, and
your Python version. For anything that affects triage or patient safety, please
say so in the title so it can be prioritised.
