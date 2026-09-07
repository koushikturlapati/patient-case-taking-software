"""
FastAPI Main Application for SIH 26047 - Multilingual AYUSH Case Taking & Prescription OCR
"""

import os
import asyncio
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

from backend.data.translations import LANGUAGES, UI_STRINGS, CLINICAL_QUESTIONS
from backend.services.sarvam_service import sarvam_client, LANGUAGE_MAP
from backend.services.clinical_engine import clinical_engine
from backend.services.document_ocr import doc_ocr_service
from backend.services.abha_service import abha_service

app = FastAPI(
    title="SIH 26047 - Multilingual AYUSH Case-Taking Platform",
    description="Patient Intake Kiosk, Prescription OCR & Doctor Case-Sheet Engine powered by Sarvam AI in 5 Indian Languages",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for active OPD cases during hospital session
OPD_CASES_DB: Dict[str, Dict[str, Any]] = {}
DOCTOR_QUEUE: List[Dict[str, Any]] = []

# Base directory paths
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

# Models
class SarvamConfig(BaseModel):
    api_key: str

class AbhaVerifyRequest(BaseModel):
    identifier: str

class SynthesisRequest(BaseModel):
    text: str
    language_code: str = "te-IN"

class SampleOcrRequest(BaseModel):
    language: str = "telugu"

class IntakeSubmitRequest(BaseModel):
    patient_info: Dict[str, Any]
    language: str
    responses: Dict[str, Any]
    voice_transcript: Optional[str] = ""
    uploaded_documents: Optional[List[Dict[str, Any]]] = []

class RedFlagCheckRequest(BaseModel):
    chief_complaint: Optional[str] = ""
    voice_transcript: Optional[str] = ""
    pain_severity: Optional[str] = ""
    responses: Optional[Dict[str, Any]] = {}
    uploaded_documents: Optional[List[Dict[str, Any]]] = []

class DoctorUpdateNotes(BaseModel):
    token_number: str
    doctor_notes: str
    prescriptions: List[str]
    status: str = "Consultation Completed"


# Pre-populate sample cases for instant demonstration
def seed_sample_cases():
    tel_preset = doc_ocr_service.preset_prescriptions["telugu"]
    sample_1 = {
        "patient_info": {
            "name": "రమేష్ కుమార్ (Ramesh Kumar)",
            "abha_id": "98-7233-4120-9411",
            "age": 42,
            "gender": "Male",
            "mobile": "9876543210"
        },
        "language": "te",
        "responses": {
            "chief_complaint": "కీళ్ళ నొప్పులు & వాపు (Joint Pain & Stiffness)",
            "duration_onset": "1-3 నెలలు (1-3 Months)",
            "pain_severity": "తీవ్రమైనది (7-8) (Severe)",
            "agni_digestion": "విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)",
            "koshtha_bowel": "క్రూర కోష్ఠ (మలబద్ధకం, గట్టిగా రావడం - వాత)",
            "nidra_sleep": "చెల్లాచెదురైన నిద్ర / మధ్యలో మెలకువ రావడం"
        },
        "voice_transcript": "గత రెండు నెలలుగా మోకాళ్ళలో చాలా నొప్పి ఉంది, చలికి నొప్పులు ఇంకా ఎక్కువవుతున్నాయి. ఉదయాన్నే నడవలేకపోతున్నాను.",
        "uploaded_documents": [
            {
                "document_id": "DOC-TEL-01",
                "filename": "telugu_ayush_prescription.jpg",
                "document_type": "Telugu Handwritten Prescription (OCR + Translated)",
                "detected_language": "Telugu (తెలుగు)",
                "raw_ocr_text": tel_preset["raw_ocr_text"],
                "translated_clinical_english": tel_preset["translated_clinical_english"],
                "extracted_entities": tel_preset["extracted_entities"],
                "summary": tel_preset["summary"],
                "date_extracted": "2026-01-12"
            }
        ]
    }
    case_1 = clinical_engine.generate_case_sheet(sample_1)
    case_1["token_number"] = "OPD-101-TEL"
    OPD_CASES_DB["OPD-101-TEL"] = case_1
    DOCTOR_QUEUE.append({
        "token_number": "OPD-101-TEL",
        "patient_name": "Ramesh Kumar (రమేష్ కుమార్)",
        "age": 42,
        "gender": "Male",
        "language": "Telugu (తెలుగు)",
        "chief_complaint": "Joint Pain & Stiffness (Bilateral Knees)",
        "prakriti": case_1["prakriti"]["primary_prakriti"],
        "triage": case_1["triage"]["triage_category"],
        "time": "10:15 AM",
        "status": "Waiting for Doctor"
    })

    tam_preset = doc_ocr_service.preset_prescriptions["tamil"]
    sample_2 = {
        "patient_info": {
            "name": "Selvi Soundar (செல்வி)",
            "abha_id": "91-2345-6789-0122",
            "age": 46,
            "gender": "Female",
            "mobile": "9123456789"
        },
        "language": "ta",
        "responses": {
            "chief_complaint": "செரிமானக் கோளாறு (Indigestion & Acidity)",
            "duration_onset": "1-2 வாரங்கள்",
            "pain_severity": "மத்தியமம் (4-6)",
            "agni_digestion": "தீக்ஷ்ணாக்னி (அதிக பசி, நெஞ்செரிச்சல்)",
            "koshtha_bowel": "மிருது கோஷ்டம் (எளிதான மலம் கழிவு)",
            "nidra_sleep": "ஆழ்ந்த நிம்மதியான தூக்கம்"
        },
        "voice_transcript": "சாப்பிட்ட பிறகு நெஞ்செரிச்சல் மற்றும் புளித்த ஏப்பம் வருகிறது. காரமான உணவு சாப்பிட்டால் வயிற்று வலி அதிகமாகிறது.",
        "uploaded_documents": [
            {
                "document_id": "DOC-TAM-01",
                "filename": "tamil_dispensary_slip.jpg",
                "document_type": "Tamil Prescription Slip (OCR + Translated)",
                "detected_language": "Tamil (தமிழ்)",
                "raw_ocr_text": tam_preset["raw_ocr_text"],
                "translated_clinical_english": tam_preset["translated_clinical_english"],
                "extracted_entities": tam_preset["extracted_entities"],
                "summary": tam_preset["summary"],
                "date_extracted": "2026-01-18"
            }
        ]
    }
    case_2 = clinical_engine.generate_case_sheet(sample_2)
    case_2["token_number"] = "OPD-102-TAM"
    OPD_CASES_DB["OPD-102-TAM"] = case_2
    DOCTOR_QUEUE.append({
        "token_number": "OPD-102-TAM",
        "patient_name": "Selvi Soundar (செல்வி)",
        "age": 46,
        "gender": "Female",
        "language": "Tamil (தமிழ்)",
        "chief_complaint": "Severe Dyspepsia & Hyperacidity",
        "prakriti": case_2["prakriti"]["primary_prakriti"],
        "triage": case_2["triage"]["triage_category"],
        "time": "10:22 AM",
        "status": "Waiting for Doctor"
    })

seed_sample_cases()


# API Routes
@app.get("/api/languages")
def get_languages():
    return LANGUAGES

@app.get("/api/translations/{lang}")
def get_translations(lang: str):
    return {
        "strings": UI_STRINGS.get(lang, UI_STRINGS["en"]),
        "language_info": LANGUAGES.get(lang, LANGUAGES["en"])
    }

@app.get("/api/questions/{lang}")
def get_questions(lang: str):
    selected_lang = lang if lang in UI_STRINGS else "en"
    localized_questions = []
    for q in CLINICAL_QUESTIONS:
        localized_questions.append({
            "id": q["id"],
            "category": q["category"],
            "prompt": q["prompts"].get(selected_lang, q["prompts"]["en"]),
            "options": q["options"].get(selected_lang, q["options"]["en"])
        })
    return localized_questions

@app.get("/api/config")
def get_config_status():
    return {
        "sarvam_api_configured": bool(sarvam_client.api_key),
        "sarvam_key_preview": f"••••••••{sarvam_client.api_key[-4:]}" if sarvam_client.api_key else "Not Configured (Running in Simulation Mode)",
        "supported_languages": list(LANGUAGES.keys())
    }

@app.post("/api/config/sarvam-key")
def update_sarvam_key(config: SarvamConfig):
    sarvam_client.set_api_key(config.api_key)
    return {
        "status": "success",
        "message": "Sarvam API Key updated successfully.",
        "active": bool(sarvam_client.api_key)
    }

@app.post("/api/abha/verify")
def verify_abha(req: AbhaVerifyRequest):
    result = abha_service.verify_and_fetch_profile(req.identifier)
    return result

@app.post("/api/voice/transcribe")
async def transcribe_voice(
    file: Optional[UploadFile] = File(None),
    language_code: str = Form("te-IN")
):
    audio_bytes = b""
    if file:
        audio_bytes = await file.read()
    result = await sarvam_client.speech_to_text(audio_bytes, language_code)
    return result

@app.post("/api/voice/synthesize")
async def synthesize_voice(req: SynthesisRequest):
    result = await sarvam_client.text_to_speech(req.text, req.language_code)
    return result

@app.post("/api/documents/upload")
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = Form("prescription"),
    target_lang: str = Form("en"),
    raw_text_override: Optional[str] = Form(None)
):
    parsed = await doc_ocr_service.parse_and_translate_document(
        filename=file.filename,
        doc_type=doc_type,
        target_lang=target_lang,
        raw_text_override=raw_text_override
    )
    return {
        "status": "success",
        "document": parsed
    }

@app.post("/api/documents/sample-ocr")
async def sample_prescription_ocr(req: SampleOcrRequest):
    parsed = await doc_ocr_service.parse_and_translate_document(
        filename=f"sample_{req.language}_prescription.jpg",
        doc_type="prescription"
    )
    return {
        "status": "success",
        "document": parsed
    }

@app.post("/api/clinical/detect-red-flags")
def detect_red_flags_endpoint(req: RedFlagCheckRequest):
    from backend.services.red_flag_detector import red_flag_detector
    result = red_flag_detector.detect_red_flags(
        chief_complaint=req.chief_complaint or "",
        voice_transcript=req.voice_transcript or "",
        pain_severity=req.pain_severity or "",
        responses=req.responses or {},
        uploaded_documents=req.uploaded_documents or []
    )
    return {
        "status": "success",
        "red_flag_analysis": result
    }

@app.post("/api/intake/submit")
def submit_patient_intake(intake: IntakeSubmitRequest):
    case_sheet = clinical_engine.generate_case_sheet(intake.dict())
    token = case_sheet["token_number"]
    OPD_CASES_DB[token] = case_sheet

    # Add to Doctor OPD queue
    DOCTOR_QUEUE.insert(0, {
        "token_number": token,
        "patient_name": intake.patient_info.get("name", "Patient Walk-in"),
        "age": intake.patient_info.get("age", 40),
        "gender": intake.patient_info.get("gender", "Unspecified"),
        "language": LANGUAGES.get(intake.language, {}).get("name", "Telugu"),
        "chief_complaint": intake.responses.get("chief_complaint", "General Malaise"),
        "prakriti": case_sheet["prakriti"]["primary_prakriti"],
        "triage": case_sheet["triage"]["triage_category"],
        "time": "Just now",
        "status": "Waiting for Doctor"
    })

    return {
        "status": "success",
        "token_number": token,
        "case_sheet": case_sheet
    }

@app.get("/api/doctor/queue")
def get_doctor_queue():
    return DOCTOR_QUEUE

@app.get("/api/doctor/case/{token_id}")
def get_case_by_token(token_id: str):
    if token_id in OPD_CASES_DB:
        return OPD_CASES_DB[token_id]
    raise HTTPException(status_code=404, detail="Case record not found.")

@app.post("/api/doctor/update-notes")
def update_doctor_notes(req: DoctorUpdateNotes):
    if req.token_number in OPD_CASES_DB:
        OPD_CASES_DB[req.token_number]["doctor_plan"] = req.doctor_notes
        OPD_CASES_DB[req.token_number]["prescriptions"] = req.prescriptions
        OPD_CASES_DB[req.token_number]["status"] = req.status
        # Update queue status
        for item in DOCTOR_QUEUE:
            if item["token_number"] == req.token_number:
                item["status"] = req.status
                break
        return {"status": "success", "message": "OPD Case updated by doctor."}
    raise HTTPException(status_code=404, detail="Case record not found.")

# Serve Frontend static files
if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

@app.get("/")
def serve_index():
    index_file = FRONTEND_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"message": "Frontend build in progress. Access /docs for API documentation."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
