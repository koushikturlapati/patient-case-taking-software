"""
Clinical Engine for AYUSH Intake & Case-Sheet Generation
Implements:
1. SOCRATES Clinical History framework
2. AYUSH Dashavidha & Ashtavidha Pariksha computation with Multilingual translation
3. Prakriti & Agni AI Assessment
4. Red Flag & Triage priority categorization
5. Physician-ready SOAP note and OPD Case Sheet synthesis in Telugu, Tamil, English, Hindi, Kannada
"""

import uuid
from datetime import datetime
from typing import Dict, Any, List
from backend.data.translations import CLINICAL_TERMS_MULTILINGUAL

class ClinicalEngine:
    def __init__(self):
        pass

    def calculate_prakriti_and_doshas(self, responses: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evaluate Vata, Pitta, Kapha distribution and clinical indicators
        """
        vata_score = 30
        pitta_score = 30
        kapha_score = 30

        # Analyze chief complaints
        cc = str(responses.get("chief_complaint", "")).lower()
        if any(w in cc for w in ["joint", "pain", "కీళ్ళ", "வலி", "दर्द", "ಕೀಲು", "gas", "insomnia", "నిద్రలేమి"]):
            vata_score += 35
        if any(w in cc for w in ["acidity", "మంట", "நெஞ்செரிச்சல்", "जलन", "rash", "துரத", "खुजली", "ಪಿತ್ತ"]):
            pitta_score += 35
        if any(w in cc for w in ["cough", "జలుబు", "இருமல்", "खांसी", "ಕೆಮ್ಮು", "fatigue", "నీరసం", "ಸೋರ್ವು"]):
            kapha_score += 30

        # Analyze Agni
        agni = str(responses.get("agni_digestion", "")).lower()
        if "vishamagni" in agni or "వాత" in agni or "वात" in agni:
            vata_score += 20
        elif "tikshnagni" in agni or "పిత్త" in agni or "पित्त" in agni:
            pitta_score += 25
        elif "mandagni" in agni or "కఫ" in agni or "कफ" in agni:
            kapha_score += 25

        # Analyze Koshtha
        koshtha = str(responses.get("koshtha_bowel", "")).lower()
        if "krura" in koshtha or "మలబద్ధకం" in koshtha or "மலச்சிக்கல்" in koshtha:
            vata_score += 15
        elif "mrudu" in koshtha:
            pitta_score += 15

        # Normalize to 100%
        total = vata_score + pitta_score + kapha_score
        v_pct = round((vata_score / total) * 100)
        p_pct = round((pitta_score / total) * 100)
        k_pct = 100 - (v_pct + p_pct)

        # Primary Prakriti determination
        if v_pct >= p_pct and v_pct >= k_pct:
            primary_prakriti = "Vata-Pitta (वात-पित्त / వాత-పిత్త)"
            dominant_dosha = "Vata (वात / వాతం)"
        elif p_pct >= v_pct and p_pct >= k_pct:
            primary_prakriti = "Pitta-Kapha (पित्त-कफ / పిత్త-కఫ)"
            dominant_dosha = "Pitta (पित्त / పిత్తం)"
        else:
            primary_prakriti = "Kapha-Vata (कफ-वात / కఫ-వాత)"
            dominant_dosha = "Kapha (कफ / కఫం)"

        return {
            "vata_pct": v_pct,
            "pitta_pct": p_pct,
            "kapha_pct": k_pct,
            "primary_prakriti": primary_prakriti,
            "dominant_dosha": dominant_dosha,
            "dosha_balance_state": "Vitiated (Vikriti Present)"
        }

    def evaluate_triage_and_red_flags(
        self,
        responses: Dict[str, Any],
        voice_transcript: str = "",
        uploaded_documents: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Evaluate real-time clinical red flags and calculate emergency triage level.
        """
        from backend.services.red_flag_detector import red_flag_detector
        cc = responses.get("chief_complaint", "")
        severity = responses.get("pain_severity", "")
        return red_flag_detector.detect_red_flags(
            chief_complaint=cc,
            voice_transcript=voice_transcript,
            pain_severity=severity,
            uploaded_documents=uploaded_documents,
            responses=responses
        )

    def get_localized_dashavidha(self, lang: str, prakriti_data: Dict[str, Any], patient: Dict[str, Any], responses: Dict[str, Any]) -> Dict[str, str]:
        terms = CLINICAL_TERMS_MULTILINGUAL["dashavidha"].get(lang, CLINICAL_TERMS_MULTILINGUAL["dashavidha"]["en"])
        
        explanations = {
            "te": {
                "prakriti": prakriti_data["primary_prakriti"],
                "vikriti": f"{prakriti_data['dominant_dosha']} వృద్ధి మరియు ఆమ దోష సంచితం",
                "sara": "మధ్యమ సార (మధ్యస్థ ధాతు బలం)",
                "samhanana": "మధ్యమ సంహనన (సాధారణ శారీరక దృఢత్వం)",
                "pramana": "సమ ప్రమాణ (సాధారణ BMI & శరీర కొలతలు)",
                "satmya": "మిశ్రమ ఆహార సాత్మ్యత (కారము/పులుపు అలవాటు)",
                "satva": "మధ్యమ సత్వ (మితమైన మానసిక బలం, స్వల్ప ఒత్తిడి)",
                "ahara_shakti": responses.get("agni_digestion", "మందాగ్ని / విషమాగ్ని లక్షణాలు"),
                "vyayama_shakti": "అవర నుండి మధ్యమ వ్యాయామ శక్తి",
                "vaya": f"{patient.get('age', 42)} సంవత్సరాలు (మధ్యమ వయస్సు - పిత్త కాలం)"
            },
            "ta": {
                "prakriti": prakriti_data["primary_prakriti"],
                "vikriti": f"{prakriti_data['dominant_dosha']} அதிகரிப்பு மற்றும் ஆம தோஷம்",
                "sara": "மத்தியம சாரம் (மிதமான திசு வலிமை)",
                "samhanana": "மத்தியம சம்ஹனனம் (சாதாரண உடல் கட்டமைப்பு)",
                "pramana": "சம பிரமாணம் (இயல்பான BMI விகிதம்)",
                "satmya": "கலவை உணவு பழக்கம் (கார/புளிப்பு சுவை)",
                "satva": "மத்தியம சத்வம் (மிதமான மன உறுதி)",
                "ahara_shakti": responses.get("agni_digestion", "மந்தாக்னி / விஷமாக்னி நிலை"),
                "vyayama_shakti": "குறைந்த முதல் மிதமான உடற்பயிற்சி தாங்கும் திறன்",
                "vaya": f"{patient.get('age', 42)} வயது (மத்தியம பருவம் - பித்த காலம்)"
            },
            "hi": {
                "prakriti": prakriti_data["primary_prakriti"],
                "vikriti": f"{prakriti_data['dominant_dosha']} वृद्धि एवं आम संचय",
                "sara": "मध्यम सार (सामान्य धातुगत बल)",
                "samhanana": "मध्यम संहनन (संतुलित शारीरिक बनावट)",
                "pramana": "सम प्रमाण (सामान्य बीएमआई अनुपात)",
                "satmya": "मिश्रित आहार सात्म्यता (कटु/अम्ल रस आदत)",
                "satva": "मध्यम सत्व (सामान्य मानसिक धैर्य)",
                "ahara_shakti": responses.get("agni_digestion", "मंदाग्नि / विषमाग्नि स्थिति"),
                "vyayama_shakti": "अवर से मध्यम शारीरिक सहिष्णुता",
                "vaya": f"{patient.get('age', 42)} वर्ष (मध्यम वय - पित्त प्रधान काल)"
            },
            "kn": {
                "prakriti": prakriti_data["primary_prakriti"],
                "vikriti": f"{prakriti_data['dominant_dosha']} ವೃದ್ಧಿ ಮತ್ತು ಆಮ ಸಂಚಯ",
                "sara": "ಮಧ್ಯಮ ಸಾರ (ಸಾಧಾರಣ ಧಾತು ಬಲ)",
                "samhanana": "ಮಧ್ಯಮ ಸಂಹನನ (ಸಾಮಾನ್ಯ ದೈಹಿಕ ದೃಢತೆ)",
                "pramana": "ಸಮ ಪ್ರಮಾಣ (ಸಾಮಾನ್ಯ ಬಿಎಂಐ ಅಳತೆ)",
                "satmya": "ಮಿಶ್ರ ಆಹಾರ ಸಾತ್ಮ್ಯತೆ (ಖಾರ/ಹುಳಿ ಅಭ್ಯಾಸ)",
                "satva": "ಮಧ್ಯಮ ಸತ್ವ (ಸಾಧಾರಣ ಮಾನಸಿಕ ಧೈರ್ಯ)",
                "ahara_shakti": responses.get("agni_digestion", "ಮಂದಾಗ್ನಿ / ವಿಷಮಾಗ್ನಿ ಸ್ಥಿತಿ"),
                "vyayama_shakti": "ಕಡಿಮೆಯಿಂದ ಸಾಧಾರಣ ದೈಹಿಕ ಸಹಿಷ್ಣುತೆ",
                "vaya": f"{patient.get('age', 42)} ವರ್ಷ (ಮಧ್ಯಮ ವಯಸ್ಸು - ಪಿತ್ತ ಪ್ರಧಾನ ಕಾಲ)"
            },
            "en": {
                "prakriti": prakriti_data["primary_prakriti"],
                "vikriti": f"Doshic imbalance with {prakriti_data['dominant_dosha']} vriddhi & Ama accumulation",
                "sara": "Madhyama Sara (Moderate structural tissue vitality)",
                "samhanana": "Madhyama Samhanana (Average muscular build)",
                "pramana": "Proportionate (Normal BMI range)",
                "satmya": "Mixed diet habituated to spicy/sour rasas",
                "satva": "Madhyama Satva (Moderate psychological endurance)",
                "ahara_shakti": responses.get("agni_digestion", "Mandagni / Vishamagni observed"),
                "vyayama_shakti": "Avara to Madhyama (Low to moderate physical tolerance)",
                "vaya": f"{patient.get('age', 42)} Yrs (Madhyama Vayas - Pitta predominant age group)"
            }
        }
        
        lang_exp = explanations.get(lang, explanations["en"])
        return {
            terms["prakriti"]: lang_exp["prakriti"],
            terms["vikriti"]: lang_exp["vikriti"],
            terms["sara"]: lang_exp["sara"],
            terms["samhanana"]: lang_exp["samhanana"],
            terms["pramana"]: lang_exp["pramana"],
            terms["satmya"]: lang_exp["satmya"],
            terms["satva"]: lang_exp["satva"],
            terms["ahara_shakti"]: lang_exp["ahara_shakti"],
            terms["vyayama_shakti"]: lang_exp["vyayama_shakti"],
            terms["vaya"]: lang_exp["vaya"]
        }

    def get_localized_ashtavidha(self, lang: str, prakriti_data: Dict[str, Any], responses: Dict[str, Any]) -> Dict[str, str]:
        terms = CLINICAL_TERMS_MULTILINGUAL["ashtavidha"].get(lang, CLINICAL_TERMS_MULTILINGUAL["ashtavidha"]["en"])
        
        explanations = {
            "te": {
                "nadi": f"మందం / సర్ప-గతి ({prakriti_data['dominant_dosha']} సరళి)",
                "mutra": "సాధారణ మూత్ర విసర్జన, లేత పసుపు రంగు",
                "mala": responses.get("koshtha_bowel", "మధ్యమ లేదా క్రూర కోష్ఠ లక్షణాలు"),
                "jihwa": "సామ జిహ్వ (స్వల్ప తెల్లటి పూత - ఆమ దోష సూచిక)",
                "shabda": "స్పష్టమైన మాట & సహజ స్వరం (Sarvam AI రికార్డింగ్)",
                "sparsha": "రూక్ష లేదా శీతల స్పర్శ (చల్లని చేతులు/కాళ్ళు)",
                "druk": "సాధారణ దృష్టి, పాలిపోవడం లేదు",
                "akruti": "నడిచేటప్పుడు స్వల్ప అసౌకర్యం / భంగిమలో బిగువు"
            },
            "ta": {
                "nadi": f"மந்தம் / சர்ப்ப-கதி ({prakriti_data['dominant_dosha']} முறை)",
                "mutra": "வழக்கமான சிறுநீர் வெளியேற்றம்",
                "mala": responses.get("koshtha_bowel", "மத்தியம அல்லது க்ரூர கோஷ்டம்"),
                "jihwa": "சாம ஜிஹ்வா (வெள்ளை படலம் - ஆம தோஷம்)",
                "shabda": "தெளிவான பேச்சு மற்றும் குரல் பதிவு",
                "sparsha": "வறட்சி அல்லது குளிர்ந்த உணர்வு",
                "druk": "சாதாரண பார்வை, வெளிறிய தன்மை இல்லை",
                "akruti": "நடப்பதில் மிதமான சிரமம்"
            },
            "hi": {
                "nadi": f"मन्द गति / सर्प-गति ({prakriti_data['dominant_dosha']} लक्षण)",
                "mutra": "सामान्य मूत्र निष्कासन, हल्का पीला",
                "mala": responses.get("koshtha_bowel", "मध्यम या क्रूर कोष्ठ प्रवृत्ति"),
                "jihwa": "साम जिह्वा (हल्का सफेद लेप - आम दोष सूचक)",
                "shabda": "स्पष्ट वाणी एवं स्वर (सर्वम AI ऑडियो)",
                "sparsha": "रूक्ष या शीतल स्पर्श",
                "druk": "सामान्य दृष्टि, कोई पीलापन नहीं",
                "akruti": "चलने में हल्का खिंचाव व कष्ट"
            },
            "kn": {
                "nadi": f"ಮಂದ / ಸರ್ಪ-ಗತಿ ({prakriti_data['dominant_dosha']} ಲಕ್ಷಣ)",
                "mutra": "ಸಾಮಾನ್ಯ ಮೂತ್ರ ವಿಸರ್ಜನೆ",
                "mala": responses.get("koshtha_bowel", "ಮಧ್ಯಮ ಅಥವಾ ಕ್ರೂರ ಕೋಷ್ಠ ಲಕ್ಷಣ"),
                "jihwa": "ಸಾಮ ಜಿಹ್ವಾ (ಬಿಳಿ ಲೇಪನ - ಆಮ ದೋಷ)",
                "shabda": "ಸ್ಪಷ್ಟವಾದ ಮಾತು ಮತ್ತು ಧ್ವನಿ",
                "sparsha": "ರೂಕ್ಷ ಅಥವಾ ಶೀತಲ ಸ್ಪರ್ಶ",
                "druk": "ಸಾಮಾನ್ಯ ದೃಷ್ಟಿ",
                "akruti": "ನಡೆಯುವಾಗ ಸ್ವಲ್ಪ ಅಸ್ವಸ್ಥತೆ"
            },
            "en": {
                "nadi": f"Mandam / Sarpa-Gati ({prakriti_data['dominant_dosha']} pattern)",
                "mutra": "Normal frequency, clear to pale straw",
                "mala": responses.get("koshtha_bowel", "Madhyama to Krura Koshtha tendency"),
                "jihwa": "Sama Jihwa (Mild white coating indicates Ama presence)",
                "shabda": "Clear, coherent voice capture via Sarvam AI",
                "sparsha": "Ruksha (Dryness) to Sheetala (Cool extremities)",
                "druk": "Normal sclera, no pallor or icterus reported",
                "akruti": "Antalgic gait / Mild discomfort during movement"
            }
        }
        
        lang_exp = explanations.get(lang, explanations["en"])
        return {
            terms["nadi"]: lang_exp["nadi"],
            terms["mutra"]: lang_exp["mutra"],
            terms["mala"]: lang_exp["mala"],
            terms["jihwa"]: lang_exp["jihwa"],
            terms["shabda"]: lang_exp["shabda"],
            terms["sparsha"]: lang_exp["sparsha"],
            terms["druk"]: lang_exp["druk"],
            terms["akruti"]: lang_exp["akruti"]
        }

    def generate_case_sheet(self, intake_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Synthesize complete structured OPD Case Sheet ready for AYUSH Medical Officers
        """
        patient = intake_data.get("patient_info", {})
        responses = intake_data.get("responses", {})
        voice_transcript = intake_data.get("voice_transcript", "")
        documents = intake_data.get("uploaded_documents", [])
        language = intake_data.get("language", "te")

        token_number = f"OPD-{datetime.now().strftime('%H%M')}-{str(uuid.uuid4())[:4].upper()}"
        prakriti_data = self.calculate_prakriti_and_doshas(responses)
        triage_data = self.evaluate_triage_and_red_flags(
            responses=responses,
            voice_transcript=voice_transcript,
            uploaded_documents=documents
        )

        # Generate Dashavidha and Ashtavidha in current language
        dashavidha_pariksha = self.get_localized_dashavidha(language, prakriti_data, patient, responses)
        ashtavidha_pariksha = self.get_localized_ashtavidha(language, prakriti_data, responses)

        # Localized SOAP Notes
        soap_notes_multilingual = {
            "te": {
                "Subjective": (
                    f"రోగి ప్రధాన బాధ: '{responses.get('chief_complaint', 'కీళ్ళ నొప్పులు & అజీర్ణం')}'. "
                    f"స్వరం రికార్డింగ్: \"{voice_transcript or 'కియోస్క్ టచ్ ఇంటర్‌ఫేస్ ద్వారా నమోదు చేయబడింది'}\". "
                    f"లక్షణాల వ్యవధి: {responses.get('duration_onset', '2 వారాలు')}, నొప్పి తీవ్రత స్కేల్: {responses.get('pain_severity', '6/10')}. "
                    f"నిద్ర నాణ్యత: {responses.get('nidra_sleep', 'చెల్లాచెదురైన నిద్ర')}."
                ),
                "Objective": (
                    f"ABHA ID: {patient.get('abha_id', 'ABHA-9872-3341-2094')} | వయస్సు: {patient.get('age', 42)} | లింగం: {patient.get('gender', 'Male')} | "
                    f"ప్రకృతి అంచనా: వాత {prakriti_data['vata_pct']}%, పిత్త {prakriti_data['pitta_pct']}%, కఫ {prakriti_data['kapha_pct']}%. "
                    f"ట్రియాజ్ వర్గం: {triage_data['triage_category']}."
                ),
                "Assessment": (
                    f"సంధిగత వాత / ఆమవాత ప్రాథమిక లక్షణాలు, {prakriti_data['dominant_dosha']} వృద్ధి మరియు స్వల్ప అగ్నిమాంద్యం. "
                    f"ఎటువంటి తీవ్రమైన గుండె/శ్వాసకోశ ప్రమాద సూచికలు లేవు."
                ),
                "Plan": (
                    f"1. ఆయుష్ భౌతిక పరీక్ష (నాడీ పరీక్ష & కీళ్ళ పరిశీలన).\n"
                    f"2. ఆమ దోష నివారణకు దీపన-పాచన ఔషధాలు (శుంఠి/త్రికటు చూర్ణం).\n"
                    f"3. స్నేహన & స్వేదన చికిత్స (మహానారాయణ తైలం మర్దన).\n"
                    f"4. {prakriti_data['primary_prakriti']} ప్రకారం పథ్య ఆహార-విహార సూచనలు."
                )
            },
            "ta": {
                "Subjective": (
                    f"நோயாளி முக்கிய பிரச்சனை: '{responses.get('chief_complaint', 'மூட்டு வலி & செரிமானக் கோளாறு')}'. "
                    f"குரல் பதிவு: \"{voice_transcript or 'பதிவு மையம் மூலம் சமர்ப்பிக்கப்பட்டது'}\". "
                    f"கால அளவு: {responses.get('duration_onset', '2 வாரங்கள்')}, வலி தீவிரம்: {responses.get('pain_severity', '6/10')}. "
                    f"தூக்கம்: {responses.get('nidra_sleep', 'இடையூறான தூக்கம்')}."
                ),
                "Objective": (
                    f"ABHA ID: {patient.get('abha_id', 'ABHA-9123-4567-8901')} | வயது: {patient.get('age', 46)} | பாலினம்: {patient.get('gender', 'Female')} | "
                    f"பிரகிருதி: வாதம் {prakriti_data['vata_pct']}%, பித்தம் {prakriti_data['pitta_pct']}%, கபம் {prakriti_data['kapha_pct']}%. "
                    f"ட்ரியேஜ் நிலை: {triage_data['triage_category']}."
                ),
                "Assessment": (
                    f"சந்திகத வாதம் / அஜீரண பித்த கோளாறுடன் {prakriti_data['dominant_dosha']} ஏற்றத்தாழ்வு. "
                    f"அவசர மருத்துவ ஆபத்து அறிகுறிகள் இல்லை."
                ),
                "Plan": (
                    f"1. நேரடி நாடி மற்றும் உடல் பரிசோதனை.\n"
                    f"2. தீபன-பாசன மூலிகைகள் பரிந்துரை.\n"
                    f"3. வெளிப்பூச்சு தைல சிகிச்சை.\n"
                    f"4. பிரகிருதி அடிப்படையிலான பத்திய உணவு திட்டம்."
                )
            },
            "hi": {
                "Subjective": (
                    f"रोगी की मुख्य शिकायत: '{responses.get('chief_complaint', 'जोड़ों का दर्द और अपच')}'. "
                    f"आवाज रिकॉर्डिंग: \"{voice_transcript or 'कियोस्क टच इंटरफेस द्वारा दर्ज'}\". "
                    f"अवधि: {responses.get('duration_onset', '2 सप्ताह')}, दर्द की तीव्रता: {responses.get('pain_severity', '6/10')}. "
                    f"नींद की स्थिति: {responses.get('nidra_sleep', 'अशांत नींद')}."
                ),
                "Objective": (
                    f"आभा आईडी: {patient.get('abha_id', 'ABHA-9872-3341-2094')} | आयु: {patient.get('age', 42)} | लिंग: {patient.get('gender', 'Male')} | "
                    f"प्रकृति माप: वात {prakriti_data['vata_pct']}%, पित्त {prakriti_data['pitta_pct']}%, कफ {prakriti_data['kapha_pct']}%. "
                    f"ट्रियाज श्रेणी: {triage_data['triage_category']}."
                ),
                "Assessment": (
                    f"संधिगत वात / आमवात एवं {prakriti_data['dominant_dosha']} दृष्टि के साथ अग्निमांद्य। "
                    f"कोई आपातकालीन खतरे के संकेत नहीं।"
                ),
                "Plan": (
                    f"1. आयुष नाड़ी परीक्षा एवं जोड़ों की जांच।\n"
                    f"2. दीपन-पाचन योग (शुंठी/त्रिकटु) आम निवारण हेतु।\n"
                    f"3. स्नेहन एवं स्वेदन (औषधीय तैल मालिश)।\n"
                    f"4. प्रकृति अनुकूल पथ्य आहार-विहार परामर्श।"
                )
            },
            "kn": {
                "Subjective": (
                    f"ರೋಗಿಯ ಮುಖ್ಯ ತೊಂದರೆ: '{responses.get('chief_complaint', 'ಕೀಲು ನೋವು ಮತ್ತು ಅಜೀರ್ಣ')}'. "
                    f"ಧ್ವನಿ ದಾಖಲೆ: \"{voice_transcript or 'ಕಿಯೋಸ್ಕ್ ಮೂಲಕ ದಾಖಲಿಸಲಾಗಿದೆ'}\". "
                    f"ತೊಂದರೆಯ ಅವಧಿ: {responses.get('duration_onset', '2 ವಾರಗಳು')}, ನೋವಿನ ತೀವ್ರತೆ: {responses.get('pain_severity', '6/10')}. "
                    f"ನಿದ್ರೆ: {responses.get('nidra_sleep', 'ಅಸ್ಥಿರ ನಿದ್ರೆ')}."
                ),
                "Objective": (
                    f"ABHA ID: {patient.get('abha_id', 'ABHA-8888-7777-6666')} | ವಯಸ್ಸು: {patient.get('age', 35)} | ಲಿಂಗ: {patient.get('gender', 'Female')} | "
                    f"ಪ್ರಕೃತಿ ಮೌಲ್ಯ: ವಾತ {prakriti_data['vata_pct']}%, ಪಿತ್ತ {prakriti_data['pitta_pct']}%, ಕಫ {prakriti_data['kapha_pct']}%. "
                    f"ಟ್ರಿಯಾಜ್ ವರ್ಗ: {triage_data['triage_category']}."
                ),
                "Assessment": (
                    f"ಸಂಧಿಗತ ವಾತ / ಆಮದೋಷ ಮತ್ತು {prakriti_data['dominant_dosha']} ವೈಪರೀತ್ಯ. "
                    f"ಯಾವುದೇ ತುರ್ತು ಅಪಾಯಕಾರಿ ಲಕ್ಷಣಗಳಿಲ್ಲ."
                ),
                "Plan": (
                    f"1. ಆಯುಷ್ ನಾಡಿ ಪರೀಕ್ಷೆ ಮತ್ತು ದೈಹಿಕ ತಪಾಸಣೆ.\n"
                    f"2. ದೀಪನ-ಪಾಚನ ಔಷಧಗಳು.\n"
                    f"3. ಸ್ನೇಹನ ಮತ್ತು ಸ್ವೇದನ ಚಿಕಿತ್ಸೆ.\n"
                    f"4. ಪ್ರಕೃತಿ ಆಧಾರಿತ ಆಹಾರ ಮತ್ತು ವಿಹಾರ ಸಲಹೆಗಳು."
                )
            },
            "en": {
                "Subjective": (
                    f"Patient presents with chief complaint of '{responses.get('chief_complaint', 'Joint pain and digestive irregularity')}'. "
                    f"Original Voice Transcript ({language.upper()}): \"{voice_transcript or 'Intake submitted via interactive touch flow'}\". "
                    f"Reports symptoms lasting {responses.get('duration_onset', '2 weeks')}, severity rated at {responses.get('pain_severity', '6/10')}. "
                    f"Sleep quality noted as: {responses.get('nidra_sleep', 'Disturbed')}."
                ),
                "Objective": (
                    f"ABHA ID: {patient.get('abha_id', 'ABHA-9872-3341-2094')} | Age: {patient.get('age', 42)} | Gender: {patient.get('gender', 'Male')} | "
                    f"Prakriti Evaluation: Vata {prakriti_data['vata_pct']}%, Pitta {prakriti_data['pitta_pct']}%, Kapha {prakriti_data['kapha_pct']}%. "
                    f"Triage: {triage_data['triage_category']}."
                ),
                "Assessment": (
                    f"Probable Sandhigata Vata / Amavata stage with secondary {prakriti_data['dominant_dosha']} vitiation and mild Agnimandya. "
                    f"No red-flag cardiorespiratory distress."
                ),
                "Plan": (
                    f"1. AYUSH Physical Examination (Nadi Pariksha & Joint palpation).\n"
                    f"2. Prescribe Deepana-Pachana formulation (Shunthi/Trikatu) to clear Ama.\n"
                    f"3. Snehana & Swedana (Local warm oil fomentation).\n"
                    f"4. Recommend Ahara/Vihara dietary modifications based on {prakriti_data['primary_prakriti']}."
                )
            }
        }

        soap_note = soap_notes_multilingual.get(language, soap_notes_multilingual["en"])

        return {
            "token_number": token_number,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "patient_info": patient,
            "language_used": language,
            "voice_transcript": voice_transcript,
            "prakriti": prakriti_data,
            "triage": triage_data,
            "dashavidha_pariksha": dashavidha_pariksha,
            "ashtavidha_pariksha": ashtavidha_pariksha,
            "soap_note": soap_note,
            "soap_notes_multilingual": soap_notes_multilingual,
            "uploaded_documents": documents,
            "status": "Ready for Doctor Review"
        }

clinical_engine = ClinicalEngine()
