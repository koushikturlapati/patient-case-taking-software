"""
Multilingual clinical translation dictionary and intake prompts
Languages supported: Telugu (te), Tamil (ta), English (en), Hindi (hi), Kannada (kn)
"""

LANGUAGES = {
    "te": {
        "code": "te-IN",
        "name": "Telugu",
        "native": "తెలుగు"
    },
    "ta": {
        "code": "ta-IN",
        "name": "Tamil",
        "native": "தமிழ்"
    },
    "en": {
        "code": "en-IN",
        "name": "English",
        "native": "English"
    },
    "hi": {
        "code": "hi-IN",
        "name": "Hindi",
        "native": "हिन्दी"
    },
    "kn": {
        "code": "kn-IN",
        "name": "Kannada",
        "native": "ಕನ್ನಡ"
    }
}

UI_STRINGS = {
    "te": {
        "app_title": "ఆయుష్ స్మార్ట్ కేస్-టేకింగ్ సిస్టమ్",
        "app_subtitle": "SIH 26047 - బహుభాషా రోగి చరిత్ర & డాక్టర్ సహాయక వేదిక",
        "patient_kiosk": "రోగి కియోస్క్ (Patient Intake)",
        "doctor_portal": "వైద్యుల OPD పోర్టల్ (Doctor Portal)",
        "select_language": "దయచేసి మీ భాషను ఎంచుకోండి",
        "abha_title": "ఆయుష్మాన్ భారత్ హెల్త్ ఖాతా (ABHA)",
        "abha_placeholder": "14 అంకెల ABHA నంబర్ లేదా మొబైల్ నంబర్",
        "verify_abha": "ధృవీకరించండి (Verify)",
        "skip_guest": "అతిథిగా కొనసాగించండి (Continue as Guest)",
        "voice_instruction": "మైక్రోఫోన్ బటన్ నొక్కి మీ సమస్యను మీ స్వంత మాటల్లో చెప్పండి",
        "listening": "మీ మాటలు వింటున్నాము...",
        "processing": "సర్వం AI ద్వారా విశ్లేషిస్తున్నాము...",
        "chief_complaints_title": "మీ ప్రధాన సమస్య ఏమిటి?",
        "socrates_title": "లక్షణాల వివరాలు (SOCRATES)",
        "ayush_title": "ఆయుష్ దశవిధ & అష్టవిధ పరీక్ష విచారణ",
        "doc_upload_title": "గత ప్రిస్క్రిప్షన్ / ల్యాబ్ నివేదికలను అప్‌లోడ్ చేయండి",
        "submit_intake": "కేస్ వివరాలను వైద్యునికి పంపండి",
        "case_submitted": "మీ కేస్ విజయవంతంగా నమోదు చేయబడింది! టోకెన్ నంబర్: ",
        "next": "తరువాత",
        "back": "వెనుకకు",
        "speak": "వాయిస్ వినండి",
        "prakriti_title": "శరీర ప్రకృతి విశ్లేషణ (Prakriti)",

        # Doctor Portal Specifics
        "live_opd_queue": "ప్రత్యక్ష OPD క్యూ",
        "refresh_queue": "తాజాకరించు",
        "case_sheet_heading": "ఆయుష్ మంత్రిత్వ శాఖ - ప్రభుత్వ ఆసుపత్రి OPD",
        "case_sheet_subheading": "SIH 26047 AI-సహాయక క్లినికల్ కేస్ షీట్ | ABHA అనుసంధానం",
        "patient_label": "రోగి పేరు",
        "age_gender_label": "వయస్సు / లింగం",
        "abha_id_label": "ABHA గుర్తింపు సంఖ్య",
        "intake_lang_label": "ఇంటేక్ భాష",
        "chief_complaint_section": "ప్రధాన సమస్య & రోగి వాయిస్ రికార్డింగ్",
        "primary_symptoms": "రోగి స్వయంగా చెప్పిన బాధ:",
        "prakriti_section": "ఆయుష్ ప్రకృతి నిర్ధారణ & దోష సమతుల్యత",
        "prakriti_diag": "శరీర ప్రకృతి నిర్ధారణ",
        "dominant_dosha": "ప్రధాన దోష అసమతుల్యత",
        "dashavidha_section": "దశవిధ పరీక్ష (10 రకాల ఆయుష్ పరీక్ష)",
        "ashtavidha_section": "అష్టవిధ పరీక్ష (8 రకాల క్లినికల్ సూచికలు)",
        "history_timeline_section": "గత వైద్య నివేదికల కాలక్రమం (OCR)",
        "soap_section": "వైద్యుల నిర్మాణాత్మక SOAP కేస్ నివేదిక",
        "soap_s": "S - సబ్జెక్టివ్ హిస్టరీ (రోగి చెప్పిన వివరాలు)",
        "soap_o": "O - ఆబ్జెక్టివ్ & పరీక్ష (ల్యాబ్ & ప్రకృతి కొలతలు)",
        "soap_a": "A - ఆయుష్ క్లినికల్ నిర్ధారణ (రోగ & దోష అంచనా)",
        "soap_p": "P - చికిత్సా ప్రణాళిక & ఆహార-విహార సూచనలు",
        "doctor_actions": "వైద్యుల ప్రత్యక్ష చర్యలు",
        "approve_prescription": "ఆమోదించి మందులు పంపండి",
        "print_case": "కేస్ షీట్ ప్రింట్ / PDF",
        "waiting_doctor": "వైద్యుల కోసం వేచి ఉంది",
        "completed": "పూర్తయింది"
    },
    "ta": {
        "app_title": "ஆயுஷ் ஸ்மார்ட் கேஸ்-டேக்கிங் தளம்",
        "app_subtitle": "SIH 26047 - பலமொழி நோயாளி வரலாறு & மருத்துவர் உதவி அமைப்பு",
        "patient_kiosk": "நோயாளி பதிவு மையம் (Patient Intake)",
        "doctor_portal": "மருத்துவர் OPD தளம் (Doctor Portal)",
        "select_language": "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
        "abha_title": "ஆயுஷ்மான் பாரத் சுகாதார கணக்கு (ABHA)",
        "abha_placeholder": "14 இலக்க ABHA எண் அல்லது மொபைல் எண்",
        "verify_abha": "சரிபார்க்கவும் (Verify)",
        "skip_guest": "விருந்தினராக தொடரவும் (Continue as Guest)",
        "voice_instruction": "மைக் பொத்தானை அழுத்தி உங்கள் உடல்நலப் பிரச்சனையை உங்கள் மொழியில் பேசுங்கள்",
        "listening": "கேட்கிறது...",
        "processing": "சர்வம் AI மூலம் பகுப்பாய்வு செய்யப்படுகிறது...",
        "chief_complaints_title": "உங்கள் முக்கிய பிரச்சனை என்ன?",
        "socrates_title": "அறிகுறிகளின் விவரங்கள் (SOCRATES)",
        "ayush_title": "ஆயுஷ் தசவித & அஷ்டவித பரிசோதனை விவரங்கள்",
        "doc_upload_title": "பழைய மருத்துவ சீட்டு / ஆய்வக அறிக்கைகளை பதிவேற்றவும்",
        "submit_intake": "விவரங்களை மருத்துவரிடம் சமர்ப்பிக்கவும்",
        "case_submitted": "உங்கள் பதிவு வெற்றிகரமாக முடிந்தது! டோக்கன் எண்: ",
        "next": "அடுத்து",
        "back": "பின்செல்",
        "speak": "குரல் கேட்க",
        "prakriti_title": "உடல் பிரகிருதி மதிப்பீடு (Prakriti)",

        # Doctor Portal Specifics
        "live_opd_queue": "நேரடி OPD வரிசை",
        "refresh_queue": "புதுப்பி",
        "case_sheet_heading": "ஆயுஷ் அமைச்சகம் - அரசு மருத்துவமனை OPD",
        "case_sheet_subheading": "SIH 26047 AI-உதவி மருத்துவ குறிப்பு | ABHA ஒருங்கிணைப்பு",
        "patient_label": "நோயாளி பெயர்",
        "age_gender_label": "வயது / பாலினம்",
        "abha_id_label": "ABHA அடையாள எண்",
        "intake_lang_label": "பதிவு மொழி",
        "chief_complaint_section": "முக்கிய பிரச்சனை & நோயாளி குரல் பதிவு",
        "primary_symptoms": "நோயாளி கூறிய அறிகுறிகள்:",
        "prakriti_section": "ஆயுஷ் பிரகிருதி மதிப்பீடு & தோஷ நிலை",
        "prakriti_diag": "உடல் பிரகிருதி கண்டறிதல்",
        "dominant_dosha": "முதன்மை தோஷ ஏற்றத்தாழ்வு",
        "dashavidha_section": "தசவித பரிசோதனை (10 வகையான ஆயுஷ் ஆய்வு)",
        "ashtavidha_section": "அஷ்டவித பரிசோதனை (8 மருத்துவ குறிகாட்டிகள்)",
        "history_timeline_section": "முந்தைய மருத்துவ பதிவுகளின் காலவரிசை (OCR)",
        "soap_section": "மருத்துவரின் கட்டமைக்கப்பட்ட SOAP அறிக்கை",
        "soap_s": "S - நோயாளி விவரித்த வரலாறு (Subjective)",
        "soap_o": "O - புறநிலை & பரிசோதனை முடிவுகள் (Objective)",
        "soap_a": "A - ஆயுஷ் மருத்துவ மதிப்பீடு (Assessment)",
        "soap_p": "P - சிகிச்சை திட்டம் & உணவு ஆலோசனை (Plan)",
        "doctor_actions": "மருத்துவரின் நேரடி நடவடிக்கைகள்",
        "approve_prescription": "ஒப்புதல் அளித்து மருந்து சீட்டை அனுப்பவும்",
        "print_case": "மருத்துவ குறிப்பை அச்சிட / PDF",
        "waiting_doctor": "மருத்துவருக்காக காத்திருக்கிறது",
        "completed": "முடிக்கப்பட்டது"
    },
    "en": {
        "app_title": "AYUSH Smart Case-Taking System",
        "app_subtitle": "SIH 26047 - Multilingual Patient Intake & Doctor Assistance Platform",
        "patient_kiosk": "Patient Intake Kiosk",
        "doctor_portal": "Doctor OPD Dashboard",
        "select_language": "Select Your Language",
        "abha_title": "Ayushman Bharat Health Account (ABHA)",
        "abha_placeholder": "Enter 14-digit ABHA Number or Mobile",
        "verify_abha": "Verify ABHA",
        "skip_guest": "Continue as Walk-in / Guest",
        "voice_instruction": "Press the microphone and speak your health symptoms in your language",
        "listening": "Listening to your voice...",
        "processing": "Processing with Sarvam AI...",
        "chief_complaints_title": "What is your main health concern?",
        "socrates_title": "Symptom Exploration (SOCRATES Clinical Framework)",
        "ayush_title": "AYUSH Dashavidha & Ashtavidha Assessment",
        "doc_upload_title": "Upload Past Prescriptions / Lab Reports",
        "submit_intake": "Submit Case to OPD Doctor",
        "case_submitted": "Intake completed successfully! Your OPD Token is: ",
        "next": "Next Step",
        "back": "Previous",
        "speak": "Listen Prompt",
        "prakriti_title": "Prakriti & Dosha Constitution",

        # Doctor Portal Specifics
        "live_opd_queue": "Live OPD Queue",
        "refresh_queue": "Refresh",
        "case_sheet_heading": "MINISTRY OF AYUSH - GOVERNMENT OPD",
        "case_sheet_subheading": "SIH 26047 AI-Assisted Clinical Case Sheet | ABHA Integrated",
        "patient_label": "Patient Name",
        "age_gender_label": "Age / Gender",
        "abha_id_label": "ABHA ID",
        "intake_lang_label": "Intake Language",
        "chief_complaint_section": "Chief Complaint & Patient Voice Intake",
        "primary_symptoms": "Primary Reported Symptoms:",
        "prakriti_section": "AYUSH Prakriti Assessment & Dosha Balance",
        "prakriti_diag": "Constitution Diagnosis",
        "dominant_dosha": "Dominant Vitiation",
        "dashavidha_section": "Dashavidha Pariksha (10-Fold AYUSH Examination)",
        "ashtavidha_section": "Ashtavidha Pariksha (8-Fold Clinical Pointers)",
        "history_timeline_section": "Historical Medical Timeline (OCR Processed)",
        "soap_section": "Physician Structured SOAP Case Formulation",
        "soap_s": "S - Subjective History",
        "soap_o": "O - Objective & Examination",
        "soap_a": "A - Clinical AYUSH Assessment",
        "soap_p": "P - Prescribed Treatment Plan & Ahara/Vihara Advisory",
        "doctor_actions": "Medical Officer Direct Actions",
        "approve_prescription": "Approve & Finalize Prescription",
        "print_case": "Print / Export Case PDF",
        "waiting_doctor": "Waiting for Doctor",
        "completed": "Completed"
    },
    "hi": {
        "app_title": "आयुष स्मार्ट केस-टेकिंग सिस्टम",
        "app_subtitle": "SIH 26047 - बहुभाषी रोगी इतिहास एवं चिकित्सक सहायता प्रणाली",
        "patient_kiosk": "रोगी इंटेक कियोस्क (Patient Intake)",
        "doctor_portal": "चिकित्सक ओपीडी डैशबोर्ड (Doctor Portal)",
        "select_language": "कृपया अपनी भाषा चुनें",
        "abha_title": "आयुष्मान भारत हेल्थ अकाउंट (ABHA)",
        "abha_placeholder": "14 अंकों का आभा नंबर या मोबाइल नंबर दर्ज करें",
        "verify_abha": "सत्यापित करें (Verify)",
        "skip_guest": "अतिथि के रूप में जारी रखें (Continue as Guest)",
        "voice_instruction": "माइक बटन दबाएं और अपनी स्वास्थ्य समस्या अपनी भाषा में बताएं",
        "listening": "सुन रहे हैं...",
        "processing": "सर्वम AI द्वारा प्रोसेस किया जा रहा है...",
        "chief_complaints_title": "आपकी मुख्य समस्या क्या है?",
        "socrates_title": "लक्षणों का विवरण (SOCRATES फ्रेमवर्क)",
        "ayush_title": "आयुष दशविध एवं अष्टविध परीक्षा विवरण",
        "doc_upload_title": "पुराने पर्चे / लैब रिपोर्ट अपलोड करें",
        "submit_intake": "ओपीडी डॉक्टर को केस भेजें",
        "case_submitted": "आपका पंजीकरण सफल रहा! टोकन नंबर: ",
        "next": "आगे बढ़ें",
        "back": "पीछे",
        "speak": "आवाज सुनें",
        "prakriti_title": "प्रकृति एवं दोष विश्लेषण (Prakriti)",

        # Doctor Portal Specifics
        "live_opd_queue": "लाइव ओपीडी कतार",
        "refresh_queue": "रिफ्रेश",
        "case_sheet_heading": "आयुष मंत्रालय - सरकारी ओपीडी",
        "case_sheet_subheading": "SIH 26047 AI-सहायक नैदानिक केस शीट | ABHA एकीकृत",
        "patient_label": "रोगी का नाम",
        "age_gender_label": "आयु / लिंग",
        "abha_id_label": "आभा आईडी (ABHA)",
        "intake_lang_label": "इंटेक भाषा",
        "chief_complaint_section": "मुख्य समस्या एवं रोगी आवाज रिकॉर्डिंग",
        "primary_symptoms": "रोगी द्वारा बताए गए मुख्य लक्षण:",
        "prakriti_section": "आयुष प्रकृति निर्धारण एवं दोष संतुलन",
        "prakriti_diag": "शारीरिक प्रकृति निदान",
        "dominant_dosha": "प्रमुख दोष असंतुलन",
        "dashavidha_section": "दशविध परीक्षा (10-चरणीय आयुष परीक्षण)",
        "ashtavidha_section": "अष्टविध परीक्षा (8-चरणीय नैदानिक संकेत)",
        "history_timeline_section": "पुराने मेडिकल रिकॉर्ड की समयरेखा (OCR)",
        "soap_section": "चिकित्सक संरचित SOAP केस विवरण",
        "soap_s": "S - रोगी का मौखिक विवरण (Subjective)",
        "soap_o": "O - नैदानिक परीक्षण एवं आंकड़े (Objective)",
        "soap_a": "A - आयुष रोग एवं दोष निदान (Assessment)",
        "soap_p": "P - उपचार योजना एवं आहार-विहार परामर्श (Plan)",
        "doctor_actions": "चिकित्सक की सीधी कार्रवाइयां",
        "approve_prescription": "अनुमोदित करें और पर्चा भेजें",
        "print_case": "केस शीट प्रिंट / PDF",
        "waiting_doctor": "चिकित्सक की प्रतीक्षा",
        "completed": "परामर्श पूर्ण"
    },
    "kn": {
        "app_title": "ಆಯುಷ್ ಸ್ಮಾರ್ಟ್ ಕೇಸ್-ಟೇಕಿಂಗ್ ವ್ಯವಸ್ಥೆ",
        "app_subtitle": "SIH 26047 - ಬಹುಭಾಷಾ ರೋಗಿ ಇತಿಹಾಸ & ವೈದ್ಯರ ಸಹಾಯಕ ವೇದಿಕೆ",
        "patient_kiosk": "ರೋಗಿ ನೋಂದಣಿ ಕಿಯೋಸ್ಕ್ (Patient Intake)",
        "doctor_portal": "ವೈದ್ಯರ OPD ಪೋರ್ಟಲ್ (Doctor Portal)",
        "select_language": "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        "abha_title": "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆರೋಗ್ಯ ಖಾತೆ (ABHA)",
        "abha_placeholder": "14 ಅಂಕಿಯ ABHA ಸಂಖ್ಯೆ ಅಥವಾ ಮೊಬೈಲ್ ನಮೂದಿಸಿ",
        "verify_abha": "ಪರಿಶೀಲಿಸಿ (Verify)",
        "skip_guest": "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ (Continue as Guest)",
        "voice_instruction": "ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ ನಿಮ್ಮ ಆರೋಗ್ಯದ ತೊಂದರೆಯನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ",
        "listening": "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...",
        "processing": "ಸರ್ವಮ್ AI ಮೂಲಕ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
        "chief_complaints_title": "ನಿಮ್ಮ ಮುಖ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಏನು?",
        "socrates_title": "ರೋಗಲಕ್ಷಣಗಳ ವಿವರಣೆ (SOCRATES)",
        "ayush_title": "ಆಯುಷ್ ದಶವಿಧ & ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ ವಿವರಗಳು",
        "doc_upload_title": "ಹಳೆಯ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ / ಲ್ಯಾಬ್ ವರದಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
        "submit_intake": "ವೈದ್ಯರಿಗೆ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ",
        "case_submitted": "ನಿಮ್ಮ ನಮೂದು ಯಶಸ್ವಿಯಾಗಿದೆ! ಟೋಕನ್ ಸಂಖ್ಯೆ: ",
        "next": "ಮುಂದೆ",
        "back": "ಹಿಂದೆ",
        "speak": "ಧ್ವನಿ ಆಲಿಸಿ",
        "prakriti_title": "ಪ್ರಕೃತಿ ಮತ್ತು ದೋಷ ವಿಶ್ಲೇಷಣೆ (Prakriti)",

        # Doctor Portal Specifics
        "live_opd_queue": "ನೇರ OPD ಸರದಿ",
        "refresh_queue": "ನವೀಕರಿಸಿ",
        "case_sheet_heading": "ಆಯುಷ್ ಸಚಿವಾಲಯ - ಸರ್ಕಾರಿ OPD",
        "case_sheet_subheading": "SIH 26047 AI-ಸಹಾಯಿತ ವೈದ್ಯಕೀಯ ಕೇಸ್ ಶೀಟ್ | ABHA ಸಂಯೋಜನೆ",
        "patient_label": "ರೋಗಿಯ ಹೆಸರು",
        "age_gender_label": "ವಯಸ್ಸು / ಲಿಂಗ",
        "abha_id_label": "ABHA ಗುರುತಿನ ಸಂಖ್ಯೆ",
        "intake_lang_label": "ದಾಖಲಾತಿ ಭಾಷೆ",
        "chief_complaint_section": "ಮುಖ್ಯ ಸಮಸ್ಯೆ & ರೋಗಿಯ ಧ್ವನಿ ದಾಖಲೆ",
        "primary_symptoms": "ರೋಗಿ ತಿಳಿಸಿದ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು:",
        "prakriti_section": "ಆಯುಷ್ ಪ್ರಕೃತಿ ಮೌಲ್ಯಮಾಪನ & ದೋಷ ಸಮತೋಲನ",
        "prakriti_diag": "ದೇಹದ ಪ್ರಕೃತಿ ರೋಗನಿರ್ಣಯ",
        "dominant_dosha": "ಪ್ರಮುಖ ದೋಷ ವೈಪರೀತ್ಯ",
        "dashavidha_section": "ದಶವಿಧ ಪರೀಕ್ಷೆ (10 ಹಂತದ ಆಯುಷ್ ತಪಾಸಣೆ)",
        "ashtavidha_section": "ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ (8 ವೈದ್ಯಕೀಯ ಸೂಚಕಗಳು)",
        "history_timeline_section": "ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳ ಕಾಲಾನುಕ್ರಮ (OCR)",
        "soap_section": "ವೈದ್ಯರ ರಚನಾತ್ಮಕ SOAP ವರದಿ",
        "soap_s": "S - ರೋಗಿಯ ವಿವರಣೆ (Subjective)",
        "soap_o": "O - ತಪಾಸಣೆ ಮತ್ತು ಪರೀಕ್ಷೆಗಳು (Objective)",
        "soap_a": "A - ಆಯುಷ್ ರೋಗ ಮೌಲ್ಯಮಾಪನ (Assessment)",
        "soap_p": "P - ಚಿಕಿತ್ಸಾ ಯೋಜನೆ ಮತ್ತು ಆಹಾರ ಸಲಹೆ (Plan)",
        "doctor_actions": "ವೈದ್ಯರ ನೇರ ಕ್ರಮಗಳು",
        "approve_prescription": "ಅನುಮೋದಿಸಿ ಮತ್ತು ಔಷಧ ಚೀಟಿ ಕಳುಹಿಸಿ",
        "print_case": "ಕೇಸ್ ಶೀಟ್ ಪ್ರಿಂಟ್ / PDF",
        "waiting_doctor": "ವೈದ್ಯರಿಗಾಗಿ ಕಾಯುತ್ತಿದ್ದಾರೆ",
        "completed": "ಪೂರ್ಣಗೊಂಡಿದೆ"
    },
    "kn": {
        "app_title": "ಆಯುಷ್ ಸ್ಮಾರ್ಟ್ ಕೇಸ್-ಟೇಕಿಂಗ್ ವ್ಯವಸ್ಥೆ",
        "app_subtitle": "SIH 26047 - ಬಹುಭಾಷಾ ರೋಗಿ ಇತಿಹಾಸ & ವೈದ್ಯರ ಸಹಾಯಕ ವೇದಿಕೆ",
        "patient_kiosk": "ರೋಗಿ ನೋಂದಣಿ ಕಿಯೋಸ್ಕ್ (Patient Intake)",
        "doctor_portal": "ವೈದ್ಯರ OPD ಪೋರ್ಟಲ್ (Doctor Portal)",
        "select_language": "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        "abha_title": "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆರೋಗ್ಯ ಖಾತೆ (ABHA)",
        "abha_placeholder": "14 ಅಂಕಿಯ ABHA ಸಂಖ್ಯೆ ಅಥವಾ ಮೊಬೈಲ್ ನಮೂದಿಸಿ",
        "verify_abha": "ಪರಿಶೀಲಿಸಿ (Verify)",
        "skip_guest": "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ (Continue as Guest)",
        "voice_instruction": "ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ ನಿಮ್ಮ ಆರೋಗ್ಯದ ತೊಂದರೆಯನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ",
        "listening": "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...",
        "processing": "ಸರ್ವಮ್ AI ಮೂಲಕ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
        "chief_complaints_title": "ನಿಮ್ಮ ಮುಖ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಏನು?",
        "socrates_title": "ರೋಗಲಕ್ಷಣಗಳ ವಿವರಣೆ (SOCRATES)",
        "ayush_title": "ಆಯುಷ್ ದಶವಿಧ & ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ ವಿವರಗಳು",
        "doc_upload_title": "ಹಳೆಯ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ / ಲ್ಯಾಬ್ ವರದಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
        "submit_intake": "ವೈದ್ಯರಿಗೆ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ",
        "case_submitted": "ನಿಮ್ಮ ನಮೂದು ಯಶಸ್ವಿಯಾಗಿದೆ! ಟೋಕನ್ ಸಂಖ್ಯೆ: ",
        "next": "ಮುಂದೆ",
        "back": "ಹಿಂದೆ",
        "speak": "ಧ್ವನಿ ಆಲಿಸಿ",
        "prakriti_title": "ಪ್ರಕೃತಿ ಮತ್ತು ದೋಷ ವಿಶ್ಲೇಷಣೆ (Prakriti)",

        # Doctor Portal Specifics
        "live_opd_queue": "ನೇರ OPD ಸರದಿ",
        "refresh_queue": "ನವೀಕರಿಸಿ",
        "case_sheet_heading": "ಆಯುಷ್ ಸಚಿವಾಲಯ - ಸರ್ಕಾರಿ OPD",
        "case_sheet_subheading": "SIH 26047 AI-ಸಹಾಯಿತ ವೈದ್ಯಕೀಯ ಕೇಸ್ ಶೀಟ್ | ABHA ಸಂಯೋಜನೆ",
        "patient_label": "ರೋಗಿಯ ಹೆಸರು",
        "age_gender_label": "ವಯಸ್ಸು / ಲಿಂಗ",
        "abha_id_label": "ABHA ಗುರುತಿನ ಸಂಖ್ಯೆ",
        "intake_lang_label": "ದಾಖಲಾತಿ ಭಾಷೆ",
        "chief_complaint_section": "🗣️ ಮುಖ್ಯ ಸಮಸ್ಯೆ & ರೋಗಿಯ ಧ್ವನಿ ದಾಖಲೆ",
        "primary_symptoms": "ರೋಗಿ ತಿಳಿಸಿದ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು:",
        "prakriti_section": "🌿 ಆಯುಷ್ ಪ್ರಕೃತಿ ಮೌಲ್ಯಮಾಪನ & ದೋಷ ಸಮತೋಲನ",
        "prakriti_diag": "ದೇಹದ ಪ್ರಕೃತಿ ರೋಗನಿರ್ಣಯ",
        "dominant_dosha": "ಪ್ರಮುಖ ದೋಷ ವೈಪರೀತ್ಯ",
        "dashavidha_section": "📋 ದಶವಿಧ ಪರೀಕ್ಷೆ (10 ಹಂತದ ಆಯುಷ್ ತಪಾಸಣೆ)",
        "ashtavidha_section": "🔍 ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ (8 ವೈದ್ಯಕೀಯ ಸೂಚಕಗಳು)",
        "history_timeline_section": "📂 ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳ ಕಾಲಾನುಕ್ರಮ (OCR)",
        "soap_section": "🩺 ವೈದ್ಯರ ರಚನಾತ್ಮಕ SOAP ವರದಿ",
        "soap_s": "S - ರೋಗಿಯ ವಿವರಣೆ (Subjective)",
        "soap_o": "O - ತಪಾಸಣೆ ಮತ್ತು ಪರೀಕ್ಷೆಗಳು (Objective)",
        "soap_a": "A - ಆಯುಷ್ ರೋಗ ಮೌಲ್ಯಮಾಪನ (Assessment)",
        "soap_p": "P - ಚಿಕಿತ್ಸಾ ಯೋಜನೆ ಮತ್ತು ಆಹಾರ ಸಲಹೆ (Plan)",
        "doctor_actions": "👨‍⚕️ ವೈದ್ಯರ ನೇರ ಕ್ರಮಗಳು",
        "approve_prescription": "✅ ಅನುಮೋದಿಸಿ ಮತ್ತು ಔಷಧ ಚೀಟಿ ಕಳುಹಿಸಿ",
        "print_case": "🖨️ ಕೇಸ್ ಶೀಟ್ ಪ್ರಿಂಟ್ / PDF",
        "waiting_doctor": "ವೈದ್ಯರಿಗಾಗಿ ಕಾಯುತ್ತಿದ್ದಾರೆ",
        "completed": "ಪೂರ್ಣಗೊಂಡಿದೆ"
    }
}

CLINICAL_QUESTIONS = [
    {
        "id": "chief_complaint",
        "category": "chief_complaints",
        "prompts": {
            "te": "మీరు ఈరోజు ఆసుపత్రికి ఎందుకు వచ్చారు? ప్రధాన బాధ లేదా సమస్యను చెప్పండి.",
            "ta": "இன்று நீங்கள் மருத்துவமனைக்கு வந்ததற்கான முக்கிய காரணம் அல்லது பிரச்சனை என்ன?",
            "en": "What is the primary health problem or symptom bringing you to the OPD today?",
            "hi": "आज आप अस्पताल किस मुख्य समस्या या तकलीफ के लिए आए हैं?",
            "kn": "ಇಂದು ನೀವು ಆಸ್ಪತ್ರೆಗೆ ಬಂದಿರುವ ಮುಖ್ಯ ತೊಂದರೆ ಅಥವಾ ಸಮಸ್ಯೆ ಏನು?"
        },
        "options": {
            "te": ["కీళ్ళ నొప్పులు & వాపు", "అజీర్ణం / గ్యాస్ & కడుపునొప్పి", "దీర్ఘకాలిక దగ్గు & జలుబు", "చర్మ దురద & దద్దుర్లు", "తల తిరగడం & నీరసం", "నిద్రలేమి & ఆందోళన"],
            "ta": ["மூட்டு வலி மற்றும் வீக்கம்", "செரிமானக் கோளாறு / வாயு", "நீண்டகால இருமல் & சளி", "தோல் அரிப்பு & தடிப்பு", "தலைசுற்றல் & சோர்வு", "தூக்கமின்மை & பதற்றம்"],
            "en": ["Joint Pain & Stiffness", "Indigestion, Acidity & Gas", "Chronic Cough & Breathlessness", "Skin Rash & Itching", "Fatigue & Dizziness", "Insomnia & Stress/Anxiety"],
            "hi": ["जोड़ों का दर्द और सूजन", "अपच, गैस और पेट दर्द", "पुरानी खांसी और सांस फूलना", "त्वचा पर खुजली और चकत्ते", "थकान और कमजोरी", "अनिद्रा और तनाव"],
            "kn": ["ಕೀಲು ನೋವು ಮತ್ತು ಊತ", "ಅಜೀರ್ಣ, ಗ್ಯಾಸ್ಟ್ರಿಕ್ & ಹೊಟ್ಟೆನೋವು", "ದೀರ್ಘಕಾಲದ ಕೆಮ್ಮು & ಶೀತ", "ಚರ್ಮದ ತುರಿಕೆ & ದದ್ದು", "ಆಯಾಸ ಮತ್ತು ತಲೆಸುತ್ತು", "ನಿದ್ರಾಹೀನತೆ & ಆತಂಕ"]
        }
    },
    {
        "id": "duration_onset",
        "category": "socrates",
        "prompts": {
            "te": "ఈ సమస్య మీకు ఎన్ని రోజులుగా లేదా నెలలుగా ఉంది?",
            "ta": "இந்த பிரச்சனை எத்தனை நாட்களாக அல்லது மாதங்களாக உள்ளது?",
            "en": "How long have you been experiencing these symptoms?",
            "hi": "यह समस्या आपको कितने दिनों या महीनों से हो रही है?",
            "kn": "ಈ ಸಮಸ್ಯೆ ನಿಮಗೆ ಎಷ್ಟು ದಿನಗಳಿಂದ ಅಥವಾ ತಿಂಗಳುಗಳಿಂದ ಇದೆ?"
        },
        "options": {
            "te": ["1-3 రోజులు (తీవ్రమైనది)", "1-2 వారాలు", "1-3 నెలలు", "6 నెలల కంటే ఎక్కువ (దీర్ఘకాలికం)"],
            "ta": ["1-3 நாட்கள் (தீவிரமானது)", "1-2 வாரங்கள்", "1-3 மாதங்கள்", "6 மாதங்களுக்கு மேல்"],
            "en": ["1-3 Days (Acute)", "1-2 Weeks", "1-3 Months", "More than 6 Months (Chronic)"],
            "hi": ["1-3 दिन (अचानक/तीव्र)", "1-2 सप्ताह", "1-3 महीने", "6 महीने से अधिक (दीर्घकालिक)"],
            "kn": ["1-3 ದಿನಗಳು (ತೀವ್ರ)", "1-2 ವಾರಗಳು", "1-3 ತಿಂಗಳುಗಳು", "6 ತಿಂಗಳುಗಳಿಗಿಂತ ಹೆಚ್ಚು"]
        }
    },
    {
        "id": "pain_severity",
        "category": "socrates",
        "prompts": {
            "te": "మీ నొప్పి లేదా అసౌకర్యం తీవ్రత ఎంత ఉంది? (1 నుండి 10 స్కేల్)",
            "ta": "உங்கள் வலி அல்லது அசௌகரியத்தின் தீவிரம் எவ்வளவு? (1 முதல் 10 வரை)",
            "en": "How severe is your pain or discomfort on a scale of 1 to 10?",
            "hi": "आपका दर्द या परेशानी कितनी तीव्र है? (1 से 10 के पैमाने पर)",
            "kn": "ನಿಮ್ಮ ನೋವು ಅಥವಾ ತೊಂದರೆಯ ತೀವ್ರತೆ ಎಷ್ಟಿದೆ? (1 ರಿಂದ 10 ಸ್ಕೇಲ್)"
        },
        "options": {
            "te": ["తేలికపాటి (1-3)", "మధ్యస్థం (4-6)", "తీవ్రమైనది (7-8)", "అత్యంత తీవ్రం (9-10)"],
            "ta": ["லேசானது (1-3)", "மிதமானது (4-6)", "கடுமையானது (7-8)", "மிகக் கடுமையானது (9-10)"],
            "en": ["Mild (1-3)", "Moderate (4-6)", "Severe (7-8)", "Very Severe / Unbearable (9-10)"],
            "hi": ["हल्का (1-3)", "मध्यम (4-6)", "गंभीर (7-8)", "असहनीय (9-10)"],
            "kn": ["ಸೌಮ್ಯ (1-3)", "ಮಧ್ಯಮ (4-6)", "ತೀವ್ರ (7-8)", "ಅಸಹನೀಯ (9-10)"]
        }
    },
    {
        "id": "agni_digestion",
        "category": "ayush_dashavidha",
        "prompts": {
            "te": "ఆయుష్ అగ్ని పరీక్ష: మీ ఆకలి మరియు జీర్ణక్రియ ఎలా ఉంది?",
            "ta": "ஆயுஷ் அக்னி பரிசோதனை: உங்கள் பசி மற்றும் செரிமானம் எப்படி உள்ளது?",
            "en": "AYUSH Agni Examination: How is your appetite and digestion?",
            "hi": "आयुष अग्नि परीक्षा: आपकी भूख और पाचन क्रिया कैसी है?",
            "kn": "ಆಯುಷ್ ಅಗ್ನಿ ಪರೀಕ್ಷೆ: ನಿಮ್ಮ ಹಸಿವು ಮತ್ತು ಜೀರ್ಣಕ್ರಿಯೆ ಹೇಗಿದೆ?"
        },
        "options": {
            "te": ["సమాగ్ని (సమతుల్య ఆకలి & మంచి జీర్ణం)", "మందాగ్ని (తక్కువ ఆకలి, తిన్నది అరగదు - కఫ)", "తీక్ష్ణాగ్ని (అతి ఆకలి, మంట - పిత్త)", "విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)"],
            "ta": ["சமாக்னி (சீரான பசி மற்றும் நல்ல செரிமானம்)", "மந்தாக்னி (குறைந்த பசி, மந்தமான செரிமானம்)", "தீக்ஷ்ணாக்னி (அதிக பசி, நெஞ்செரிச்சல்)", "விஷமாக்னி (மாறிக்கொண்டே இருக்கும் பசி)"],
            "en": ["Samagni (Balanced appetite & normal digestion)", "Mandagni (Low appetite, heavy stomach, sluggish - Kapha)", "Tikshnagni (Excessive sharp hunger, hyperacidity - Pitta)", "Vishamagni (Irregular/unpredictable digestion - Vata)"],
            "hi": ["समाग्नि (संतुलित भूख और सामान्य पाचन)", "मंदाग्नि (कम भूख, भारीपन, मंद पाचन - कफ)", "तीक्ष्णाग्नि (अत्यधिक भूख, जलन, एसिडिटी - पित्त)", "विषमाग्नि (अनियमित कभी भूख कभी नहीं - वात)"],
            "kn": ["ಸಮಾಗ್ನಿ (ಸಮತೋಲಿತ ಹಸಿವು ಮತ್ತು ಉತ್ತಮ ಜೀರ್ಣಕ್ರಿಯೆ)", "ಮಂದಾಗ್ನಿ (ಕಡಿಮೆ ಹಸಿವು, ಹೊಟ್ಟೆ ಭಾರ - ಕಫ)", "ತೀಕ್ಷ್ಣಾಗ್ನಿ (ಅತಿಯಾದ ಹಸಿವು, ಎದೆಯುರಿ - ಪಿತ್ತ)", "ವಿಷಮಾಗ್ನಿ (ಅಸ್ಥಿರವಾದ ಹಸಿವು - ವಾತ)"]
        }
    },
    {
        "id": "koshtha_bowel",
        "category": "ayush_dashavidha",
        "prompts": {
            "te": "ఆయుష్ కోష్ఠ పరీక్ష: మీ మల విసర్జన మరియు పేగుల పనితీరు ఎలా ఉంది?",
            "ta": "ஆயுஷ் கோஷ்ட பரிசோதனை: உங்கள் மலம் கழித்தல் மற்றும் குடல் இயக்கம் எப்படி உள்ளது?",
            "en": "AYUSH Koshtha Examination: How are your bowel movements?",
            "hi": "आयुष कोष्ठ परीक्षा: आपका पेट साफ और मल त्याग कैसा रहता है?",
            "kn": "ಆಯುಷ್ ಕೋಷ್ಠ ಪರೀಕ್ಷೆ: ನಿಮ್ಮ ಮಲವಿಸರ್ಜನೆ ಮತ್ತು ಕರುಳಿನ ಕ್ರಿಯೆ ಹೇಗಿದೆ?"
        },
        "options": {
            "te": ["మృదు కోష్ఠ (తేలికగా సాఫీగా అవుతుంది / తరచూ లూజ్ మోషన్)", "మధ్యమ కోష్ఠ (క్రమబద్ధంగా రోజూ ఒక్కసారి అవుతుంది)", "క్రూర కోష్ఠ (మలబద్ధకం, గట్టిగా రావడం - వాత)"],
            "ta": ["மிருது கோஷ்டம் (எளிதான மலம் கழிவு / அடிக்கடி இளகிய மலம்)", "மத்தியம கோஷ்டம் (வழக்கமான சீரான குடல் இயக்கம்)", "க்ரூர கோஷ்டம் (மலச்சிக்கல், கடினமான மலம்)"],
            "en": ["Mrudu Koshtha (Soft/easy, tendency for loose stools - Pitta)", "Madhyama Koshtha (Regular, once daily, normal consistency)", "Krura Koshtha (Constipated, dry, hard stools - Vata)"],
            "hi": ["मृदु कोष्ठ (आसानी से साफ / दस्त की प्रवृत्ति - पित्त)", "मध्यम कोष्ठ (नियमित, दिन में एक बार सामान्य)", "क्रूर कोष्ठ (कब्ज, सूखा, कठिन मल - वात)"],
            "kn": ["ಮೃದು ಕೋಷ್ಠ (ಸುಲಭವಾಗಿ ಆಗುತ್ತದೆ / ಮೃದು ಮಲ - ಪಿತ್ತ)", "ಮಧ್ಯಮ ಕೋಷ್ಠ (ನಿಯಮಿತ, ದಿನಕ್ಕೆ ಒಮ್ಮೆ ಸಾಮಾನ್ಯ)", "ಕ್ರೂರ ಕೋಷ್ಠ (ಮಲಬದ್ಧತೆ, ಗಟ್ಟಿ ಮಲ - ವಾತ)"]
        }
    },
    {
        "id": "nidra_sleep",
        "category": "ayush_dashavidha",
        "prompts": {
            "te": "మీ నిద్ర ఎలా ఉంది మరియు రోజువారీ అలసట ఎలా ఉంది?",
            "ta": "உங்கள் தூக்கம் மற்றும் தினசரி சோர்வு நிலை எப்படி உள்ளது?",
            "en": "AYUSH Nidra Examination: How is your sleep pattern and restfulness?",
            "hi": "आपकी नींद और मानसिक शांति कैसी रहती है?",
            "kn": "ನಿಮ್ಮ ನಿದ್ರೆ ಮತ್ತು ಮಾನಸಿಕ ವಿಶ್ರಾಂತಿ ಹೇಗಿದೆ?"
        },
        "options": {
            "te": ["గాఢమైన నిద్ర (7-8 గంటలు సుఖంగా)", "చెల్లాచెదురైన నిద్ర / మధ్యలో మెలకువ రావడం", "నిద్ర పట్టకపోవడం (ఇన్సోమ్నియా - వాత/పిత్త)", "అతినిద్ర మరియు నిరంతర బద్ధకం (కఫ)"],
            "ta": ["ஆழ்ந்த நிம்மதியான தூக்கம் (7-8 மணிநேரம்)", "இடையிடையே விழிப்பு வரும் தூக்கம்", "தூக்கமின்மை / தள்ளிப்போகும் தூக்கம்", "அதிக தூக்கம் மற்றும் பகல் சோர்வு"],
            "en": ["Deep & Sound Sleep (7-8 hours restful)", "Disturbed / Frequent awakenings (Vata)", "Difficulty falling asleep / Insomnia (Pitta/Vata)", "Excessive sleepiness / Lethargy (Kapha)"],
            "hi": ["गहरी और आरामदायक नींद (7-8 घंटे)", "बार-बार टूटने वाली नींद (वात)", "नींद न आना / अनिद्रा (पित्त/वात)", "अत्यधिक नींद और सुस्ती (कफ)"],
            "kn": ["ಗಾಢ ಮತ್ತು ನೆಮ್ಮದಿಯ ನಿದ್ರೆ (7-8 ಗಂಟೆಗಳು)", "ಮಧ್ಯೆ ಮಧ್ಯೆ ಎಚ್ಚರವಾಗುವ ನಿದ್ರೆ (ವಾತ)", "ನಿದ್ರೆ ಬಾರದಿರುವುದು (ಪಿತ್ತ/ವಾತ)", "ಅತಿಯಾದ ನಿದ್ರೆ ಮತ್ತು ಆಲಸ್ಯ (ಕಫ)"]
        }
    },
    {
        "id": "prakriti_vihara",
        "category": "ayush_prakriti",
        "prompts": {
            "te": "వాతావరణ మార్పులకు మీ శరీరం ఎలా ప్రతిస్పందిస్తుంది?",
            "ta": "வானிலை மாற்றங்களுக்கு உங்கள் உடல் எவ்வாறு எதிர்வினையாற்றுகிறது?",
            "en": "Ayush Constitution: How does your body react to climate and temperature?",
            "hi": "मौसम के बदलाव पर आपका शरीर कैसा महसूस करता है?",
            "kn": "ಹವಾಮಾನ ಬದಲಾವಣೆಗೆ ನಿಮ್ಮ ದೇಹ ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ?"
        },
        "options": {
            "te": ["చలి అస్సలు పడదు, వేడి ఇష్టం (వాత ప్రధానం)", "వేడి అస్సలు పడదు, చల్లదనం ఇష్టం, ఎక్కువ చెమట (పిత్త ప్రధానం)", "చలి మరియు వర్షం పడదు, బరువు తేలికగా పెరుగుతాను (కఫ ప్రధానం)", "అన్ని వాతావరణాలూ సమానంగా తట్టుకుంటాను (సమ ప్రకృతి)"],
            "ta": ["குளிரை தாங்க முடியாது, வெதுவெதுப்பு பிடிக்கும் (வாதம்)", "வெப்பத்தை தாங்க முடியாது, அதிக வியர்வை (பித்தம்)", "ஈரப்பதம் மற்றும் குளிர் ஒத்துக்கொள்ளாது (கபம்)", "எல்லா காலநிலைகளையும் சமமாக தாங்குவேன் (சமம்)"],
            "en": ["Intolerant to cold/wind, prefers warmth, dry skin (Vata Predominant)", "Intolerant to heat, sweats easily, irritable in sun (Pitta Predominant)", "Intolerant to cold/damp, heavy build, slow digestion (Kapha Predominant)", "Well-balanced in all seasons (Sama Prakriti)"],
            "hi": ["सर्दी और ठंडी हवा बर्दाश्त नहीं, गर्मी पसंद (वात प्रधान)", "गर्मी और धूप बर्दाश्त नहीं, पसीना ज्यादा (पित्त प्रधान)", "ठंड और नमी से कफ/वजन बढ़ता है (कफ प्रधान)", "सभी मौसम आसानी से अनुकूल (सम प्रकृति)"],
            "kn": ["ಚಳಿ ತಡೆಯಲು ಆಗಲ್ಲ, ಬೆಚ್ಚಗಿರುವುದು ಇಷ್ಟ (ವಾತ)", "ಶಾಖ ತಡೆಯಲು ಆಗಲ್ಲ, ಅತಿಯಾದ ಬೆವರು (ಪಿತ್ತ)", "ಚಳಿ ಮತ್ತು ತೇವಾಂಶದಿಂದ ತೂಕ ಹೆಚ್ಚಳ (ಕಫ)", "ಎಲ್ಲಾ ಹವಾಮಾನವನ್ನು ಸುಲಭವಾಗಿ ತಡೆದುಕೊಳ್ಳುತ್ತೇನೆ (ಸಮ)"]
        }
    }
]

# Multilingual Dashavidha & Ashtavidha Labels
CLINICAL_TERMS_MULTILINGUAL = {
    "dashavidha": {
        "te": {
            "prakriti": "1. ప్రకృతి (శరీర రాజ్యాంగం)",
            "vikriti": "2. వికృతి (వ్యాధి అసమతుల్యత)",
            "sara": "3. సార (ధాతు బలం & శ్రేష్ఠత)",
            "samhanana": "4. సంహనన (శరీర నిర్మాణం / దృఢత్వం)",
            "pramana": "5. ప్రమాణ (శరీర కొలతలు / నిష్పత్తి)",
            "satmya": "6. సాత్మ్య (అనుకూలత & అలవాట్లు)",
            "satva": "7. సత్వ (మానసిక దృఢత్వం & ఓర్పు)",
            "ahara_shakti": "8. ఆహార శక్తి (జీర్ణ సామర్థ్యం & ఆకలి)",
            "vyayama_shakti": "9. వ్యాయామ శక్తి (శారీరక బలం & శ్రమ శక్తి)",
            "vaya": "10. వయస్సు (జీవిత దశ)"
        },
        "ta": {
            "prakriti": "1. பிரகிருதி (உடல் அமைப்பு)",
            "vikriti": "2. விகிருதி (தோஷ ஏற்றத்தாழ்வு)",
            "sara": "3. சாரம் (திசுக்களின் வலிமை)",
            "samhanana": "4. சம்ஹனனம் (உடல் கட்டமைப்பு / உறுதி)",
            "pramana": "5. பிரமாணம் (உடல் அளவீடுகள்)",
            "satmya": "6. சாத்மியம் (பழக்கவழக்கங்கள் & சகிப்புத்தன்மை)",
            "satva": "7. சத்வம் (மன உறுதி & பலம்)",
            "ahara_shakti": "8. ஆகார சக்தி (செரிமானத் திறன் & பசி)",
            "vyayama_shakti": "9. வியாயாம சக்தி (உடற்பயிற்சி / தாங்கும் திறன்)",
            "vaya": "10. வயது (வாழ்க்கை பருவம்)"
        },
        "hi": {
            "prakriti": "1. प्रकृति (शारीरिक गठन)",
            "vikriti": "2. विकृति (दोष असंतुलन)",
            "sara": "3. सार (धातुगत उत्कृष्टता व बल)",
            "samhanana": "4. संहनन (शारीरिक बनावट व सुदृढ़ता)",
            "pramana": "5. प्रमाण (शारीरिक माप व अनुपात)",
            "satmya": "6. सात्म्य (अनुकूलता व आदतें)",
            "satva": "7. सत्व (मानसिक बल व धैर्य)",
            "ahara_shakti": "8. आहार शक्ति (पाचन शक्ति व क्षुधा)",
            "vyayama_shakti": "9. व्यायाम शक्ति (शारीरिक सहिष्णुता व बल)",
            "vaya": "10. वय (आयु व जीवनकाल)"
        },
        "kn": {
            "prakriti": "1. ಪ್ರಕೃತಿ (ಶಾರೀರಿಕ ಸಂರಚನೆ)",
            "vikriti": "2. ವಿಕೃತಿ (ದೋಷ ವೈಪರೀತ್ಯ)",
            "sara": "3. ಸಾರ (ಧಾತು ಶ್ರೇಷ್ಠತೆ ಮತ್ತು ಬಲ)",
            "samhanana": "4. ಸಂಹನನ (ದೇಹದ ದೃಢತೆ / ರಚನೆ)",
            "pramana": "5. ಪ್ರಮಾಣ (ದೇಹದ ಅಳತೆಗಳು)",
            "satmya": "6. ಸಾತ್ಮ್ಯ (ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಅಭ್ಯಾಸಗಳು)",
            "satva": "7. ಸತ್ವ (ಮಾನಸಿಕ ಬಲ ಮತ್ತು ಧೈರ್ಯ)",
            "ahara_shakti": "8. ಆಹಾರ ಶಕ್ತಿ (ಜೀರ್ಣ ಶಕ್ತಿ ಮತ್ತು ಹಸಿವು)",
            "vyayama_shakti": "9. ವ್ಯಾಯಾಮ ಶಕ್ತಿ (ದೈಹಿಕ ಸಹಿಷ್ಣುತೆ ಮತ್ತು ಬಲ)",
            "vaya": "10. ವಯಸ್ಸು (ಜೀವನದ ಹಂತ)"
        },
        "en": {
            "prakriti": "1. Prakriti (Constitution)",
            "vikriti": "2. Vikriti (Pathology & Dosha Vitiation)",
            "sara": "3. Sara (Tissue Essence & Vitality)",
            "samhanana": "4. Samhanana (Compactness & Muscle Build)",
            "pramana": "5. Pramana (Anthropometry & Proportions)",
            "satmya": "6. Satmya (Adaptability & Habituation)",
            "satva": "7. Satva (Mental Tone & Psychological Endurance)",
            "ahara_shakti": "8. Ahara Shakti (Digestive & Assimilative Capacity)",
            "vyayama_shakti": "9. Vyayama Shakti (Physical Work Capacity)",
            "vaya": "10. Vaya (Age & Chronological Stage)"
        }
    },
    "ashtavidha": {
        "te": {
            "nadi": "నాడి (Nadi - పల్స్)",
            "mutra": "మూత్ర (Mutra - మూత్రం)",
            "mala": "మల (Mala - మల విసర్జన)",
            "jihwa": "జిహ్వ (Jihwa - నాలుక పూత)",
            "shabda": "శబ్ద (Shabda - స్వరం / మాట)",
            "sparsha": "స్పర్శ (Sparsha - చర్మ స్పర్శ)",
            "druk": "దృక్ (Druk - కళ్ళు / చూపు)",
            "akruti": "ఆకృతి (Akruti - భంగిమ / రూపం)"
        },
        "ta": {
            "nadi": "நாடி (Nadi - நாடித் துடிப்பு)",
            "mutra": "மூத்திரம் (Mutra - சிறுநீர்)",
            "mala": "மலம் (Mala - மலக்கழிவு)",
            "jihwa": "ஜிஹ்வா (Jihwa - நாக்கு)",
            "shabda": "சப்தம் (Shabda - பேச்சு / குரல்)",
            "sparsha": "ஸ்பரிசம் (Sparsha - தொடு உணர்வு)",
            "druk": "திருக் (Druk - கண் பார்வை)",
            "akruti": "ஆக்ருதி (Akruti - உடல் தோற்றம்)"
        },
        "hi": {
            "nadi": "नाड़ी (Nadi - नाड़ी गति)",
            "mutra": "मूत्र (Mutra - मूत्र परीक्षा)",
            "mala": "मल (Mala - मल त्याग)",
            "jihwa": "जिह्वा (Jihwa - जीभ का लेप)",
            "shabda": "शब्द (Shabda - वाणी व स्वर)",
            "sparsha": "स्पर्श (Sparsha - त्वचा का स्पर्श)",
            "druk": "दृक (Druk - नेत्र दृष्टि)",
            "akruti": "आकृति (Akruti - शारीरिक चाल-ढाल)"
        },
        "kn": {
            "nadi": "ನಾಡಿ (Nadi - ನಾಡಿ ಗತಿ)",
            "mutra": "ಮೂತ್ರ (Mutra - ಮೂತ್ರ ಪರೀಕ್ಷೆ)",
            "mala": "ಮಲ (Mala - ಮಲ ವಿಸರ್ಜನೆ)",
            "jihwa": "ಜಿಹ್ವಾ (Jihwa - ನಾಲಿಗೆ ಲೇಪನ)",
            "shabda": "ಶಬ್ದ (Shabda - ಧ್ವನಿ / ಮಾತು)",
            "sparsha": "ಸ್ಪರ್ಶ (Sparsha - ಚರ್ಮದ ಸ್ಪರ್ಶ)",
            "druk": "ದೃಕ್ (Druk - ಕಣ್ಣುಗಳು)",
            "akruti": "ಆಕೃತಿ (Akruti - ದೈಹಿಕ ಭಂಗಿ)"
        },
        "en": {
            "nadi": "Nadi (Pulse Rate & Quality)",
            "mutra": "Mutra (Urine Character)",
            "mala": "Mala (Fecal Consistency & Bowel Tone)",
            "jihwa": "Jihwa (Tongue Appearance & Ama Coating)",
            "shabda": "Shabda (Voice Clarity & Speech Tone)",
            "sparsha": "Sparsha (Skin Texture & Temperature)",
            "druk": "Druk (Eyes & Sclera Appearance)",
            "akruti": "Akruti (Gait & Facial Expression)"
        }
    }
}
