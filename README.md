# 🌿 AYUSH Smart Multilingual Case-Taking Platform
### Smart India Hackathon (SIH) Problem Statement 26047 | Ministry of Ayush

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python)](https://www.python.org)
[![Sarvam AI](https://img.shields.io/badge/Sarvam_AI-Multilingual_Speech_%26_NLP-orange)](https://www.sarvam.ai)
[![Tesseract OCR](https://img.shields.io/badge/Neural_OCR-Tesseract.js-blue)](https://github.com/naptha/tesseract.js)
[![ABDM Ready](https://img.shields.io/badge/ABDM-ABHA_Sandbox-green)](https://abdm.gov.in)

---

## 📖 Overview

The **AYUSH Smart Multilingual Case-Taking Platform** is an AI-powered, voice-first clinical intake and decision support system designed specifically for **Ministry of Ayush OPDs, Dispensaries, and Wellness Kiosks**.

It bridges linguistic barriers across rural and semi-urban India, enabling patients to articulate symptoms naturally in their mother tongue while automatically generating structured classical **Dashavidha & Ashtavidha Pariksha**, **Prakriti & Dosha balance gauges**, **Red Flag emergency alerts**, and standardized **SOAP clinical notes** for AYUSH Medical Officers.

---

## ✨ Key Features

### 1. 🗣️ Multilingual Voice-First Intake (Sarvam AI Suite)
- Seamless voice intake across **5 Indian Regional Languages**:
  - **Telugu (తెలుగు)** `te-IN`
  - **Tamil (தமிழ்)** `ta-IN`
  - **Kannada (ಕನ್ನಡ)** `kn-IN`
  - **Hindi (हिन्दी)** `hi-IN`
  - **English (India)** `en-IN`
- **Sarvam Saaras STT** for low-latency Indic Speech-to-Text.
- **Sarvam Bulbul TTS** for voice prompts & accessibility for illiterate patients.
- **Sarvam Mayura Machine Translation** for Indic-to-Indic and Indic-to-English clinical conversion.

### 2. 🚨 Real-Time Clinical Red Flag Detection & Multi-Tier Triage
- Dedicated clinical safety engine (`red_flag_detector.py`) scanning voice transcripts, questionnaires, and documents.
- Detects life-threatening triggers:
  - 🫀 **Cardiorespiratory**: Crushing chest pain, angina, acute dyspnea (*గుండె నొప్పి, மார்பు வலி, सीने में दर्द*).
  - 🧠 **Neurological**: Stroke signs, sudden limb weakness, slurred speech (*పక్షవాతం, பக்கவாதம், लकवा*).
  - 🩸 **Urological**: Continuous hematuria with clots, acute urinary retention.
  - 🩺 **Gastrointestinal**: Hematemesis (vomiting blood), melena, rigid abdomen.
- **Three-Tier Triage**:
  - 🔴 **Code Red (Emergency / Resuscitation)**: Strobe alert, immediate hospital protocol, priority queue bypass.
  - 🟡 **Code Yellow (Priority Fast-track)**: Consult within 15 mins.
  - 🟢 **Code Green (Standard OPD)**: Routine AYUSH care.

### 3. 📑 Neural Optical Character Recognition (OCR) & Translation
- Powered by **Tesseract.js Neural Engine** directly in the browser with real-time pixel scanning progress.
- Extracts hospital discharge summaries (e.g., **Department of Urology, Gandhi Hospital**) and regional prescription slips.
- Automatically extracts:
  - Patient demographics (Autofills name, age, mobile)
  - Diagnoses & operative findings (e.g., *S/P TURBT, Bosniak 1 renal cyst*)
  - Biomarkers & labs (*Creatinine, Hb, Electrolytes*)
  - Prescriptions & dosages (*Tab. Oflox 200mg, Dolo 650mg, PanTop*)

### 4. 🌿 Classical AYUSH Diagnostic Engine
- **Dashavidha Pariksha (10-fold examination)**: *Prakriti, Vikriti, Sara, Samhanana, Pramana, Satmya, Satwa, Ahara Shakti, Vyayama Shakti, Vaya*.
- **Ashtavidha Pariksha (8 clinical pointers)**: *Nadi, Mutra, Mala, Jihwa, Shabda, Sparsha, Druk, Akruti*.
- **Prakriti & Dosha Calculator**: Real-time Tri-Dosha percentage breakdown (*Vata %, Pitta %, Kapha %*).
- **SOCRATES Symptom Exploration**: Onset, character, radiation, severity (VAS 1-10), Agni, and Koshtha.

### 5. 🏥 Doctor OPD Portal & ABDM / ABHA Integration
- Dynamic live queue with real-time triage status tags.
- Instant 60-second patient summary view.
- 1-Click PDF export & print formatted clinical case sheet.
- Validates 14-digit **ABHA ID** with ABDM digital consent receipt.

---

## 🏗️ Architecture

```
                                 [ Patient Kiosk / Mobile Web UI ]
                                                 │
            ┌────────────────────────────────────┼────────────────────────────────────┐
            │                                    │                                    │
    [ Voice Intake ]                    [ Document Upload ]                  [ Intake Questions ]
 (Sarvam Saaras STT)                   (Neural Tesseract OCR)               (SOCRATES & Prakriti)
            │                                    │                                    │
            └────────────────────────────────────┼────────────────────────────────────┘
                                                 ▼
                              [ FastAPI Backend Server (:8000) ]
                                                 │
                 ┌───────────────────────────────┼───────────────────────────────┐
                 │                               │                               │
       [ Sarvam AI Service ]          [ Red Flag Detector ]            [ Clinical Engine ]
     • Bulbul TTS                   • Cardiorespiratory Risks        • Dashavidha Pariksha
     • Mayura Translation           • Stroke / FAST Neuro Signs      • Ashtavidha Pariksha
     • Regional Lexicon             • Urological Hemorrhage          • Tri-Dosha Prakriti Gauge
                                    • Multi-Tier Triage              • Structured SOAP Notes
                                                 │
                                                 ▼
                                     [ Doctor OPD Portal ]
                                  • Priority Patient Queue
                                  • 1-Click Printable Case Sheet
                                  • ABDM / ABHA Integration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10 or higher
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/koushikturlapati/patient-case-taking-software.git
cd patient-case-taking-software
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Platform
```bash
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### 4. Open in Browser
Visit **[http://localhost:8000](http://localhost:8000)** in any modern web browser.

---

## 🧪 Interactive Demo Presets

The application includes built-in 1-click presets for instant hackathon demonstrations:
- 🏛️ **Telugu Joint Pain**: Ramesh Kumar (42M) - *Sandhivata, Vishamagni, Krura Koshtha*
- 🛕 **Tamil Hyperacidity**: Selvi Soundar (46F) - *Amlapitta, Tikshnagni, Mridu Koshtha*
- 🌾 **Kannada Fatigue**: Kavitha Gowda (35F) - *Amavata, Mandagni, Madhyama Koshtha*
- 🚨 **Code Red Emergency (Telugu)**: Venkateswarlu (54M) - *Acute Crushing Chest Pain & Dyspnea*
- 🚨 **Code Red Stroke (Tamil)**: Muthuvel (62M) - *Sudden Right Hemiparesis & Slurred Speech*
- 🏥 **Gandhi Hospital Urology Summary**: Narasimha Rao (58M) - *Post-TURBT Scopy Evaluation & Discharge Rx*

---

## 📁 Project Structure

```
patient-case-taking-software/
├── backend/
│   ├── config.py                   # Environment loading, CORS allow-list & API keys
│   ├── main.py                     # FastAPI REST server & routing
│   ├── data/
│   │   └── translations.py         # 5-Language UI strings, questionnaire & clinical terms
│   └── services/
│       ├── abha_service.py         # ABHA sandbox validation & consent
│       ├── clinical_engine.py      # Dashavidha, Ashtavidha, Prakriti & SOAP synthesis
│       ├── document_ocr.py         # Multilingual prescription & discharge summary parser
│       ├── red_flag_detector.py    # Real-time multi-tier emergency triage model
│       └── sarvam_service.py       # Sarvam AI STT, TTS, & Translation client
├── tests/                          # Pytest suite for the clinical & API layers
│   ├── test_api.py                 # FastAPI endpoint contract tests
│   ├── test_clinical_engine.py     # Prakriti, Pariksha & SOAP case-sheet tests
│   └── test_red_flag_detector.py   # Multilingual triage safety tests
├── .github/workflows/ci.yml        # Lint + test automation on every push and PR
├── index.html                      # Dual Patient Kiosk & Doctor OPD Portal UI
├── app.js                          # Client logic, voice recording, Tesseract.js OCR, triage
├── styles.css                      # Responsive Ayush-themed styling & strobe animations
├── requirements.txt                # Python runtime dependencies
├── requirements-dev.txt            # Test & lint dependencies
├── .env.example                    # Template for local configuration
├── CONTRIBUTING.md                 # Contribution workflow
├── LICENSE                         # MIT License
└── README.md                       # Comprehensive documentation
```

> The static kiosk (`index.html`, `app.js`, `styles.css`) lives at the repository root so that
> GitHub Pages can serve the offline demo directly from `main`. The FastAPI server serves the
> same files locally, so both entry points stay in sync.

---

## ⚙️ Configuration

Copy the template and fill in whatever you have. Every value is optional, and the platform
degrades to its offline simulation engine when a key is absent, so the demo always runs.

```bash
cp .env.example .env
```

| Variable | Purpose | Default |
| --- | --- | --- |
| `SARVAM_API_KEY` | Enables live Saaras STT, Bulbul TTS and Mayura translation | _empty_ (simulation mode) |
| `ALLOWED_ORIGINS` | Comma-separated CORS allow-list | `http://localhost:8000,http://127.0.0.1:8000,http://localhost:3000,http://127.0.0.1:3000` |

---

## 🧑‍💻 Development

Install the test and lint tooling, then run the suite:

```bash
pip install -r requirements-dev.txt
pytest
ruff check .
```

Continuous integration runs the same commands against Python 3.10, 3.11 and 3.12 on every
push and pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

---

## 📜 License & Acknowledgments

Released under the [MIT License](LICENSE).

Built for **Smart India Hackathon (SIH)** under Problem Statement **26047** by the Ministry of
Ayush, Government of India. Powered by [Sarvam AI](https://sarvam.ai) and
[FastAPI](https://fastapi.tiangolo.com).
