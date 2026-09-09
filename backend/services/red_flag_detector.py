"""
Clinical Red Flag Detection & Multi-tier Triage Model
Implements real-time clinical safety scoring across Telugu, Tamil, Kannada, Hindi, and English.
Detects life-threatening emergencies, cardiorespiratory distress, neurological signs, gross hematuria, and severe acute pain.
"""

from typing import Any, Dict, List, Optional


class RedFlagDetector:
    def __init__(self):
        # Comprehensive Multilingual Clinical Lexicon for Emergency Triggers
        self.red_flag_patterns = {
            "CARDIO_RESPIRATORY": {
                "system": "Cardiorespiratory System",
                "severity": "CRITICAL",
                "level": "RED",
                "keywords": {
                    "te": ["గుండె నొప్పి", "ఛాతీలో నొప్పి", "గుండెల్లో మంట లేదా భారం", "ఊపిరి ఆడట్లేదు", "ఆయాసం", "రక్తం దగ్గు", "శ్వాస తీసుకోవడంలో తీవ్రమైన ఇబ్బంది"],
                    "ta": ["மார்பு வலி", "நெஞ்சு வலி", "மூச்சுத் திணறல்", "மூச்சு விட முடியவில்லை", "ரத்த இருமல்", "இதய அடைப்பு"],
                    "hi": ["सीने में दर्द", "छाती में तेज दर्द", "सांस फूलना", "सांस लेने में भारी तकलीफ", "खांसी में खून आना", "दम घुटना"],
                    "kn": ["ಎದೆ ನೋವು", "ಎದೆಬಡಿತ", "ಉಸಿರಾಟದ ತೊಂದರೆ", "ಉಸಿರಾಟ ತೊಂದರೆ", "ರಕ್ತ ಕೆಮ್ಮುವುದು", "ಉಸಿರು ಕಟ್ಟುವುದು"],
                    "en": ["chest pain", "angina", "crushing chest pressure", "shortness of breath", "breathlessness", "dyspnea", "coughing blood", "hemoptysis", "radiating pain to left arm"]
                },
                "clinical_risk": "Acute Coronary Syndrome (ACS) / Myocardial Infarction / Pulmonary Embolism / Acute Respiratory Failure",
                "recommended_action": "CRITICAL EMERGENCY ALERT: Immediate Emergency Transfer! Stat 12-Lead ECG, High-Flow Oxygen support, IV access, and urgent Cardiologist / Medical Officer review."
            },
            "NEUROLOGICAL_STROKE": {
                "system": "Central Nervous System / Neurovascular",
                "severity": "CRITICAL",
                "level": "RED",
                "keywords": {
                    "te": ["పక్షవాతం", "కాలు చెయ్యి పడిపోవడం", "మాట తడబడటం", "స్పృహ తప్పిపోవడం", "మూర్ఛ", "ఒక్కసారిగా కంటిచూపు పోవడం", "తీవ్రమైన తలనొప్పి"],
                    "ta": ["பக்கவாதம்", "கை கால் செயலிழப்பு", "பேச்சு குளறுதல்", "மயக்கம்", "வலிப்பு", "திடீர் பார்வை இழப்பு"],
                    "kn": ["ಪಾರ್ಶ್ವವಾಯು", "ಕೈ ಕಾಲು ಸ್ವಾಧೀನ ಕಳೆದುಕೊಳ್ಳುವುದು", "ಮಾತು ತೊದಲುವಿಕೆ", "ಮೂರ್ಛೆ", "ಫಿಟ್ಸ್", "ತೀವ್ರ ತಲೆನೋವು"],
                    "hi": ["लकवा", "पक्षाघात", "अचानक हाथ पैर कमजोर", "बोली लड़खड़ाना", "बेहोशी", "मिर्गी का दौरा", "अचानक तेज असहनीय सिरदर्द"],
                    "en": ["stroke", "sudden weakness", "facial drooping", "slurred speech", "loss of consciousness", "syncope", "seizure", "thunderclap headache", "hemiparesis"]
                },
                "clinical_risk": "Acute Ischemic Stroke / Intracranial Hemorrhage / Status Epilepticus",
                "recommended_action": "CODE STROKE PROTOCOL: Immediate Non-contrast Brain CT scan, NIHSS assessment, airway protection, and Neurologist consultation within Golden Hour."
            },
            "UROLOGICAL_HEMORRHAGE": {
                "system": "Urological & Nephrological System",
                "severity": "CRITICAL",
                "level": "RED",
                "keywords": {
                    "te": ["మూత్రంలో రక్తం గడ్డలు", "ఎర్రటి మూత్రం ఎక్కువగా రావడం", "మూత్రం అసలు రాకపోవడం", "విపరీతమైన నడుము నొప్పి జ్వరం"],
                    "ta": ["சிறுநீரில் ரத்தம்", "ரத்தக் கட்டிகள் சிறுநீரில்", "சிறுநீர் அடைப்பு", "கடுமையான இடுப்பு வலி"],
                    "kn": ["ಮೂತ್ರದಲ್ಲಿ ರಕ್ತ", "ರಕ್ತ ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ", "ಮೂತ್ರ ಕಟ್ಟುವುದು", "ತೀವ್ರ ಕಿಡ್ನಿ ನೋವು"],
                    "hi": ["पेशाब में खून आना", "पेशाब में खून के थक्के", "पेशाब बिल्कुल रुक जाना", "तीव्र पेट/कमर दर्द बुखार के साथ"],
                    "en": ["gross hematuria with clots", "continuous blood in urine", "acute urinary retention", "anuria", "severe flank pain with high fever", "severe urological bleed"]
                },
                "clinical_risk": "Active Urological Bleed / Bladder Tamponade / Acute Obstructive Uropathy / Urosepsis",
                "recommended_action": "URGENT UROLOGIST EVALUATION: 3-way Foley catheter continuous bladder irrigation, Stat CBC, Sr. Creatinine, and emergency ultrasound."
            },
            "GASTROINTESTINAL_BLEED": {
                "system": "Gastrointestinal System",
                "severity": "CRITICAL",
                "level": "RED",
                "keywords": {
                    "te": ["రక్తం వాంతులు", "నల్లటి మల విసర్జన", "కడుపు బిర్రబిగిసి విపరీతమైన నొప్పి"],
                    "ta": ["ரத்த வாந்தி", "கருப்பு மலம்", "வயிற்றில் கடுமையான தாங்கமுடியாத வலி"],
                    "kn": ["ರಕ್ತ ವಾಂತಿ", "ಕಪ್ಪು ಮಲ", "ತೀವ್ರ ಹೊಟ್ಟೆನೋವು"],
                    "hi": ["खून की उल्टी", "काला बदबूदार मल", "पेट में असहनीय तेज दर्द और कड़ापन"],
                    "en": ["vomiting blood", "hematemesis", "black tarry stools", "melena", "acute rigid abdomen", "peritonitis"]
                },
                "clinical_risk": "Upper GI Bleed / Peptic Ulcer Perforation / Acute Surgical Abdomen",
                "recommended_action": "URGENT SURGICAL TRIAGE: NPO (Nil per oral), IV Fluids, Cross-match blood, and emergency endoscopy."
            },
            "ANAPHYLAXIS_SEVERE_ALLERGY": {
                "system": "Immunological / Systemic",
                "severity": "CRITICAL",
                "level": "RED",
                "keywords": {
                    "te": ["గొంతు పట్టేయడం", "పెదవులు వాపు ఊపిరి ఆడకపోవడం", "మందు పడక శరీరం అంతా దద్దుర్లు"],
                    "ta": ["தொண்டை அடைப்பு", "உதடு வீக்கம் மற்றும் மூச்சுத் திணறல்", "கடுமையான அலர்ஜி"],
                    "kn": ["ಗಂಟಲು ಕಟ್ಟುವಿಕೆ", "ತುಟಿ ಊತ ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ", "ತೀವ್ರ ಅಲರ್ಜಿ"],
                    "hi": ["गले में घुटन", "होंठ-चेहरे पर भारी सूजन और सांस न आना", "गंभीर एलर्जी झटका"],
                    "en": ["throat tightness", "lip and tongue swelling", "angioedema", "anaphylaxis", "severe drug reaction", "stridor"]
                },
                "clinical_risk": "Severe Anaphylactic Shock / Acute Laryngeal Edema",
                "recommended_action": "IMMEDIATE ALLERGY ACTION: Intramuscular Epinephrine (Adrenaline 1:1000 0.5mg), IV Corticosteroids, Antihistamines, and Airway support."
            },
            "HIGH_PAIN_SEVERITY": {
                "system": "Acute Symptom Distress",
                "severity": "HIGH_URGENCY",
                "level": "YELLOW",
                "keywords": {
                    "te": ["అత్యంత తీవ్రం", "9-10", "తట్టుకోలేనంత నొప్పి", "తీవ్రమైన నొప్పి"],
                    "ta": ["மிகக் கடுமையானது", "9-10", "தாங்க முடியாத வலி"],
                    "kn": ["ಅಸಹನೀಯ", "9-10", "ತಡೆಯಲಾರದ ನೋವು"],
                    "hi": ["असहनीय दर्द", "9-10", "बेहद तेज दर्द"],
                    "en": ["9-10", "unbearable pain", "very severe pain", "excruciating", "10/10"]
                },
                "clinical_risk": "Acute Severe Pain Crisis requiring rapid analgesia before routine intake",
                "recommended_action": "PRIORITY FAST-TRACK: Fast-track OPD consultation within 15 minutes. Administer immediate pain relief / soothing formulation."
            }
        }

    def detect_red_flags(
        self,
        chief_complaint: str = "",
        voice_transcript: str = "",
        pain_severity: str = "",
        uploaded_documents: Optional[List[Dict[str, Any]]] = None,
        responses: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Analyze multi-modal patient inputs to detect critical red flags and calculate triage category.
        """
        uploaded_documents = uploaded_documents or []
        responses = responses or {}

        # Combine all textual expressions from patient into unified search space
        combined_text = " ".join([
            str(chief_complaint),
            str(voice_transcript),
            str(pain_severity),
            " ".join([str(v) for v in responses.values()])
        ]).lower()

        detected_flags = []
        is_emergency = False
        highest_severity = "GREEN"

        # 1. Textual & Vernacular Keyword Analysis across categories
        for code, category in self.red_flag_patterns.items():
            for lang, keywords in category["keywords"].items():
                for kw in keywords:
                    if kw.lower() in combined_text:
                        flag_entry = {
                            "code": code,
                            "system": category["system"],
                            "severity": category["severity"],
                            "matched_keyword": kw,
                            "language_detected": lang.upper(),
                            "clinical_risk": category["clinical_risk"],
                            "recommended_action": category["recommended_action"]
                        }
                        if not any(f["code"] == code for f in detected_flags):
                            detected_flags.append(flag_entry)

                        if category["level"] == "RED":
                            highest_severity = "RED"
                            is_emergency = True
                        elif category["level"] == "YELLOW" and highest_severity != "RED":
                            highest_severity = "YELLOW"
                        break

        # 2. Check Document / OCR Findings for Clinical Red Flags (e.g. elevated Creatinine, Hematuria post-TURBT)
        for doc in uploaded_documents:
            doc_str = str(doc).lower()
            if "hematuria" in doc_str or "రక్తం" in doc_str:
                if not any(f["code"] == "UROLOGICAL_HEMORRHAGE" for f in detected_flags):
                    detected_flags.append({
                        "code": "UROLOGICAL_HEMORRHAGE",
                        "system": "Urological Surveillance",
                        "severity": "HIGH_URGENCY",
                        "matched_keyword": "Post TURBT Hematuria in Hospital Records",
                        "language_detected": "EN",
                        "clinical_risk": "Hematuria under evaluation with history of Papillary Urothelial Ca",
                        "recommended_action": "Close urological surveillance required; ensure repeat cystoscopy follow-up and monitoring of renal labs."
                    })
                    if highest_severity != "RED":
                        highest_severity = "YELLOW"

        # 3. Final Triage Categorization
        if highest_severity == "RED":
            triage_category = "Priority / Urgent Attention (Red)"
            triage_badge_color = "#dc2626"
            triage_banner_text = "CRITICAL RED FLAG DETECTED: Immediate Medical Officer / Emergency Resuscitation Required!"
            ayush_safety_guideline = "Emergency Red Flag: Routine non-urgent Ayurvedic procedures must be deferred until vital stabilization."
        elif highest_severity == "YELLOW":
            triage_category = "High Discomfort / Fast-Track (Yellow)"
            triage_badge_color = "#ca8a04"
            triage_banner_text = "HIGH PRIORITY OPD: Patient requires expedited clinical attention within 15 minutes."
            ayush_safety_guideline = "Monitor vitals closely. Initiate symptomatic pacifying measures (Shamana) alongside diagnostic evaluation."
        else:
            triage_category = "Standard OPD (Green)"
            triage_badge_color = "#16a34a"
            triage_banner_text = "Routine OPD Case: No acute emergency red flags detected."
            ayush_safety_guideline = "Safe for comprehensive AYUSH intake, Dashavidha Pariksha, and holistic Panchakarma/Shamana therapy."

        return {
            "triage_level": highest_severity,
            "triage_category": triage_category,
            "triage_badge_color": triage_badge_color,
            "is_emergency": is_emergency,
            "triage_banner_text": triage_banner_text,
            "ayush_safety_guideline": ayush_safety_guideline,
            "total_red_flags_count": len(detected_flags),
            "detected_red_flags": detected_flags if detected_flags else [{
                "code": "NO_RED_FLAGS",
                "system": "All Organ Systems Stable",
                "severity": "NORMAL",
                "matched_keyword": "None",
                "clinical_risk": "No acute life-threatening triggers detected",
                "recommended_action": "Proceed with standard out-patient AYUSH consultation"
            }]
        }

        return {
            "triage_level": highest_severity,
            "triage_category": triage_category,
            "triage_badge_color": triage_badge_color,
            "is_emergency": is_emergency,
            "triage_banner_text": triage_banner_text,
            "ayush_safety_guideline": ayush_safety_guideline,
            "total_red_flags_count": len(detected_flags),
            "detected_red_flags": detected_flags if detected_flags else [{
                "code": "NO_RED_FLAGS",
                "system": "All Organ Systems Stable",
                "severity": "NORMAL",
                "matched_keyword": "None",
                "clinical_risk": "No acute life-threatening triggers detected",
                "recommended_action": "Proceed with standard out-patient AYUSH consultation"
            }]
        }

red_flag_detector = RedFlagDetector()
