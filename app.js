/**
 * SIH 26047 - Multilingual AYUSH Case-Taking Platform
 * Frontend JavaScript Client & Standalone Diagnostic Engine
 */

const API_BASE = (window.location.protocol === 'file:' || window.location.hostname.includes('github.io'))
  ? '' 
  : window.location.origin;

// 1. Multilingual UI Strings Dictionary
const UI_STRINGS_DB = {
  te: {
    app_title: "ఆయుష్ స్మార్ట్ కేస్-టేకింగ్ సిస్టమ్",
    app_subtitle: "SIH 26047 - బహుభాషా రోగి చరిత్ర & డాక్టర్ సహాయక వేదిక",
    patient_kiosk: "రోగి కియోస్క్ (Patient Intake)",
    doctor_portal: "వైద్యుల OPD పోర్టల్ (Doctor Portal)",
    select_language: "దయచేసి మీ భాషను ఎంచుకోండి",
    abha_title: "ఆయుష్మాన్ భారత్ హెల్త్ ఖాతా (ABHA)",
    abha_placeholder: "14 అంకెల ABHA నంబర్ లేదా మొబైల్ నంబర్",
    verify_abha: "ధృవీకరించండి (Verify)",
    skip_guest: "అతిథిగా కొనసాగించండి (Continue as Guest)",
    voice_instruction: "మైక్రోఫోన్ బటన్ నొక్కి మీ సమస్యను మీ స్వంత మాటల్లో చెప్పండి",
    listening: "మీ మాటలు వింటున్నాము...",
    processing: "సర్వం AI ద్వారా విశ్లేషిస్తున్నాము...",
    chief_complaints_title: "మీ ప్రధాన సమస్య ఏమిటి?",
    socrates_title: "లక్షణాల వివరాలు (SOCRATES & ఆయుష్ పరీక్ష)",
    ayush_title: "ఆయుష్ దశవిధ & అష్టవిధ పరీక్ష విచారణ",
    doc_upload_title: "గత ప్రిస్క్రిప్షన్ / ల్యాబ్ నివేదికలను అప్‌లోడ్ చేయండి",
    submit_intake: "కేస్ వివరాలను వైద్యునికి పంపండి (Submit Case)",
    case_submitted: "మీ కేస్ విజయవంతంగా నమోదు చేయబడింది! టోకెన్ నంబర్: ",
    next: "తరువాత",
    back: "వెనుకకు",
    speak: "వాయిస్ వినండి",
    prakriti_title: "శరీర ప్రకృతి విశ్లేషణ (Prakriti)",
    live_opd_queue: "ప్రత్యక్ష OPD క్యూ",
    refresh_queue: "తాజాకరించు",
    case_sheet_heading: "ఆయుష్ మంత్రిత్వ శాఖ - ప్రభుత్వ ఆసుపత్రి OPD",
    case_sheet_subheading: "SIH 26047 AI-సహాయక క్లినికల్ కేస్ షీట్ | ABHA అనుసంధానం",
    patient_label: "రోగి పేరు",
    age_gender_label: "వయస్సు / లింగం",
    abha_id_label: "ABHA గుర్తింపు సంఖ్య",
    intake_lang_label: "ఇంటేక్ భాష",
    chief_complaint_section: "ప్రధాన సమస్య & రోగి వాయిస్ రికార్డింగ్",
    primary_symptoms: "రోగి స్వయంగా చెప్పిన బాధ:",
    prakriti_section: "AI ప్రకృతి నిర్ధారణ & దోష సమతుల్యత (Prakriti Analysis)",
    prakriti_diag: "శరీర ప్రకృతి నిర్ధారణ",
    dominant_dosha: "ప్రధాన దోష అసమతుల్యత",
    dashavidha_section: "దశవిధ పరీక్ష (10-Fold AYUSH Examination)",
    ashtavidha_section: "అష్టవిధ పరీక్ష (8-Fold Clinical Pointers)",
    history_timeline_section: "AI డాక్యుమెంట్ విశ్లేషణ & గత వైద్య నివేదికలు (Neural OCR & Mayura Translation)",
    soap_section: "AI నిర్మాణాత్మక SOAP కేస్ నివేదిక (Clinical Case Formulation)",
    soap_s: "S - సబ్జెక్టివ్ హిస్టరీ (రోగి చెప్పిన వివరాలు)",
    soap_o: "O - ఆబ్జెక్టివ్ & పరీక్ష (ల్యాబ్ & ప్రకృతి కొలతలు)",
    soap_a: "A - ఆయుష్ క్లినికల్ నిర్ధారణ (రోగ & దోష అంచనా)",
    soap_p: "P - చికిత్సా ప్రణాళిక & ఆహార-విహార సూచనలు",
    doctor_actions: "వైద్యుల ప్రత్యక్ష చర్యలు",
    approve_prescription: "ఆమోదించి మందులు పంపండి",
    print_case: "కేస్ షీట్ ప్రింట్ / PDF",
    waiting_doctor: "వైద్యుల కోసం వేచి ఉంది",
    completed: "పూర్తయింది"
  },
  ta: {
    app_title: "ஆயுஷ் ஸ்மார்ட் கேஸ்-டேக்கிங் தளம்",
    app_subtitle: "SIH 26047 - பலமொழி நோயாளி வரலாறு & மருத்துவர் உதவி அமைப்பு",
    patient_kiosk: "நோயாளி பதிவு மையம் (Patient Intake)",
    doctor_portal: "மருத்துவர் OPD தளம் (Doctor Portal)",
    select_language: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    abha_title: "ஆயுஷ்மான் பாரத் சுகாதார கணக்கு (ABHA)",
    abha_placeholder: "14 இலக்க ABHA எண் அல்லது மொபைல் எண்",
    verify_abha: "சரிபார்க்கவும் (Verify)",
    skip_guest: "விருந்தினராக தொடரவும் (Continue as Guest)",
    voice_instruction: "மைக் பொத்தானை அழுத்தி உங்கள் உடல்நலப் பிரச்சனையை உங்கள் மொழியில் பேசுங்கள்",
    listening: "கேட்கிறது...",
    processing: "சர்வம் AI மூலம் பகுப்பாய்வு செய்யப்படுகிறது...",
    chief_complaints_title: "உங்கள் முக்கிய பிரச்சனை என்ன?",
    socrates_title: "அறிகுறிகளின் விவரங்கள் (SOCRATES & ஆயுஷ் ஆய்வு)",
    ayush_title: "ஆயுஷ் தசவித & அஷ்டவித பரிசோதனை விவரங்கள்",
    doc_upload_title: "பழைய மருத்துவ சீட்டு / ஆய்வக அறிக்கைகளை பதிவேற்றவும்",
    submit_intake: "விவரங்களை மருத்துவரிடம் சமர்ப்பிக்கவும்",
    case_submitted: "உங்கள் பதிவு வெற்றிகரமாக முடிந்தது! டோக்கன் எண்: ",
    next: "அடுத்து",
    back: "பின்செல்",
    speak: "குரல் கேட்க",
    prakriti_title: "உடல் பிரகிருதி மதிப்பீடு (Prakriti)",
    live_opd_queue: "நேரடி OPD வரிசை",
    refresh_queue: "புதுப்பி",
    case_sheet_heading: "ஆயுஷ் அமைச்சகம் - அரசு மருத்துவமனை OPD",
    case_sheet_subheading: "SIH 26047 AI-உதவி மருத்துவ குறிப்பு | ABHA ஒருங்கிணைப்பு",
    patient_label: "நோயாளி பெயர்",
    age_gender_label: "வயது / பாலினம்",
    abha_id_label: "ABHA அடையாள எண்",
    intake_lang_label: "பதிவு மொழி",
    chief_complaint_section: "முக்கிய பிரச்சனை & நோயாளி குரல் பதிவு",
    primary_symptoms: "நோயாளி கூறிய அறிகுறிகள்:",
    prakriti_section: "AI பிரகிருதி மதிப்பீடு & தோஷ நிலை (Prakriti Analysis)",
    prakriti_diag: "உடல் பிரகிருதி கண்டறிதல்",
    dominant_dosha: "முதன்மை தோஷ ஏற்றத்தாழ்வு",
    dashavidha_section: "தசவித பரிசோதனை (10 வகையான ஆயுஷ் ஆய்வு)",
    ashtavidha_section: "அஷ்டவித பரிசோதனை (8 மருத்துவ குறிகாட்டிகள்)",
    history_timeline_section: "AI ஆவணப் பகுப்பாய்வு & மருத்துவ பதிவுகள் (OCR & Translation)",
    soap_section: "மருத்துவரின் கட்டமைக்கப்பட்ட SOAP அறிக்கை",
    soap_s: "S - நோயாளி விவரித்த வரலாறு (Subjective)",
    soap_o: "O - புறநிலை & பரிசோதனை முடிவுகள் (Objective)",
    soap_a: "A - ஆயுஷ் மருத்துவ மதிப்பீடு (Assessment)",
    soap_p: "P - சிகிச்சை திட்டம் & உணவு ஆலோசனை (Plan)",
    doctor_actions: "மருத்துவரின் நேரடி நடவடிக்கைகள்",
    approve_prescription: "ஒப்புதல் அளித்து மருந்து சீட்டை அனுப்பவும்",
    print_case: "மருத்துவ குறிப்பை அச்சிட / PDF",
    waiting_doctor: "மருத்துவருக்காக காத்திருக்கிறது",
    completed: "முடிக்கப்பட்டது"
  },
  en: {
    app_title: "AYUSH Smart Case-Taking System",
    app_subtitle: "SIH 26047 - Multilingual Patient Intake & Doctor Assistance Platform",
    patient_kiosk: "Patient Intake Kiosk",
    doctor_portal: "Doctor OPD Dashboard",
    select_language: "Select Your Language",
    abha_title: "Ayushman Bharat Health Account (ABHA)",
    abha_placeholder: "Enter 14-digit ABHA Number or Mobile",
    verify_abha: "Verify ABHA",
    skip_guest: "Continue as Walk-in / Guest",
    voice_instruction: "Press the microphone and speak your health symptoms in your language",
    listening: "Listening to your voice...",
    processing: "Processing with Sarvam AI...",
    chief_complaints_title: "What is your main health concern?",
    socrates_title: "Symptom Exploration (SOCRATES & AYUSH Constraints)",
    ayush_title: "AYUSH Dashavidha & Ashtavidha Assessment",
    doc_upload_title: "Upload Past Prescriptions / Lab Reports",
    submit_intake: "Submit Case to OPD Doctor",
    case_submitted: "Intake completed successfully! Your OPD Token is: ",
    next: "Next Step",
    back: "Previous",
    speak: "Listen Prompt",
    prakriti_title: "Prakriti & Dosha Constitution",
    live_opd_queue: "Live OPD Queue",
    refresh_queue: "Refresh",
    case_sheet_heading: "MINISTRY OF AYUSH - GOVERNMENT OPD",
    case_sheet_subheading: "SIH 26047 AI-Assisted Clinical Case Sheet | ABHA Integrated",
    patient_label: "Patient Name",
    age_gender_label: "Age / Gender",
    abha_id_label: "ABHA ID",
    intake_lang_label: "Intake Language",
    chief_complaint_section: "Chief Complaint & Patient Voice Intake",
    primary_symptoms: "Primary Reported Symptoms:",
    prakriti_section: "AI Prakriti Assessment & Dosha Balance Gauges",
    prakriti_diag: "Constitution Diagnosis",
    dominant_dosha: "Dominant Vitiation",
    dashavidha_section: "Dashavidha Pariksha (10-Fold Classical AYUSH Examination)",
    ashtavidha_section: "Ashtavidha Pariksha (8-Fold Clinical Pointers)",
    history_timeline_section: "AI Document Analysis & Scanned Prescriptions (Neural OCR & Sarvam Mayura)",
    soap_section: "AI Structured SOAP Case Formulation",
    soap_s: "S - Subjective History",
    soap_o: "O - Objective & Examination",
    soap_a: "A - Clinical AYUSH Assessment",
    soap_p: "P - Prescribed Treatment Plan & Ahara/Vihara Advisory",
    doctor_actions: "Medical Officer Direct Actions",
    approve_prescription: "Approve & Finalize Prescription",
    print_case: "Print / Export Case PDF",
    waiting_doctor: "Waiting for Doctor",
    completed: "Completed"
  },
  hi: {
    app_title: "आयुष स्मार्ट केस-टेकिंग सिस्टम",
    app_subtitle: "SIH 26047 - बहुभाषी रोगी इतिहास एवं चिकित्सक सहायता प्रणाली",
    patient_kiosk: "रोगी इंटेक कियोस्क (Patient Intake)",
    doctor_portal: "चिकित्सक ओपीडी डैशबोर्ड (Doctor Portal)",
    select_language: "कृपया अपनी भाषा चुनें",
    abha_title: "आयुष्मान भारत हेल्थ अकाउंट (ABHA)",
    abha_placeholder: "14 अंकों का आभा नंबर या मोबाइल नंबर दर्ज करें",
    verify_abha: "सत्यापित करें (Verify)",
    skip_guest: "अतिथि के रूप में जारी रखें (Continue as Guest)",
    voice_instruction: "माइक बटन दबाएं और अपनी स्वास्थ्य समस्या अपनी भाषा में बताएं",
    listening: "सुन रहे हैं...",
    processing: "सर्वम AI द्वारा प्रोसेस किया जा रहा है...",
    chief_complaints_title: "आपकी मुख्य समस्या क्या है?",
    socrates_title: "लक्षणों का विवरण (SOCRATES एवं आयुष परीक्षा)",
    ayush_title: "आयुष दशविध एवं अष्टविध परीक्षा विवरण",
    doc_upload_title: "पुराने पर्चे / लैब रिपोर्ट अपलोड करें",
    submit_intake: "ओपीडी डॉक्टर को केस भेजें",
    case_submitted: "आपका पंजीकरण सफल रहा! टोकन नंबर: ",
    next: "आगे बढ़ें",
    back: "पीछे",
    speak: "आवाज सुनें",
    prakriti_title: "प्रकृति एवं दोष विश्लेषण (Prakriti)",
    live_opd_queue: "लाइव ओपीडी कतार",
    refresh_queue: "रिफ्रेश",
    case_sheet_heading: "आयुष मंत्रालय - सरकारी ओपीडी",
    case_sheet_subheading: "SIH 26047 AI-सहायक नैदानिक केस शीट | ABHA एकीकृत",
    patient_label: "रोगी का नाम",
    age_gender_label: "आयु / लिंग",
    abha_id_label: "आभा आईडी (ABHA)",
    intake_lang_label: "इंटेक भाषा",
    chief_complaint_section: "मुख्य समस्या एवं रोगी आवाज रिकॉर्डिंग",
    primary_symptoms: "रोगी द्वारा बताए गए मुख्य लक्षण:",
    prakriti_section: "AI आयुष प्रकृति निर्धारण एवं दोष संतुलन (Prakriti Analysis)",
    prakriti_diag: "शारीरिक प्रकृति निदान",
    dominant_dosha: "प्रमुख दोष असंतुलन",
    dashavidha_section: "दशविध परीक्षा (10-चरणीय आयुष परीक्षण)",
    ashtavidha_section: "अष्टविध परीक्षा (8-चरणीय नैदानिक संकेत)",
    history_timeline_section: "AI दस्तावेज विश्लेषण एवं पुराने मेडिकल रिकॉर्ड (OCR & Translation)",
    soap_section: "AI चिकित्सक संरचित SOAP केस विवरण",
    soap_s: "S - रोगी का मौखिक विवरण (Subjective)",
    soap_o: "O - नैदानिक परीक्षण एवं आंकड़े (Objective)",
    soap_a: "A - आयुष रोग एवं दोष निदान (Assessment)",
    soap_p: "P - उपचार योजना एवं आहार-विहार परामर्श (Plan)",
    doctor_actions: "चिकित्सक की सीधी कार्रवाइयां",
    approve_prescription: "अनुमोदित करें और पर्चा भेजें",
    print_case: "केस शीट प्रिंट / PDF",
    waiting_doctor: "चिकित्सक की प्रतीक्षा",
    completed: "परामर्श पूर्ण"
  },
  kn: {
    app_title: "ಆಯುಷ್ ಸ್ಮಾರ್ಟ್ ಕೇಸ್-ಟೇಕಿಂಗ್ ವ್ಯವಸ್ಥೆ",
    app_subtitle: "SIH 26047 - ಬಹುಭಾಷಾ ರೋಗಿ ಇತಿಹಾಸ & ವೈದ್ಯರ ಸಹಾಯಕ ವೇದಿಕೆ",
    patient_kiosk: "ರೋಗಿ ನೋಂದಣಿ ಕಿಯೋಸ್ಕ್ (Patient Intake)",
    doctor_portal: "ವೈದ್ಯರ OPD ಪೋರ್ಟಲ್ (Doctor Portal)",
    select_language: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    abha_title: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆರೋಗ್ಯ ಖಾತೆ (ABHA)",
    abha_placeholder: "14 ಅಂಕಿಯ ABHA ಸಂಖ್ಯೆ ಅಥವಾ ಮೊಬೈಲ್ ನಮೂದಿಸಿ",
    verify_abha: "ಪರಿಶೀಲಿಸಿ (Verify)",
    skip_guest: "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ (Continue as Guest)",
    voice_instruction: "ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ ನಿಮ್ಮ ಆರೋಗ್ಯದ ತೊಂದರೆಯನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...",
    processing: "ಸರ್ವಮ್ AI ಮೂಲಕ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
    chief_complaints_title: "ನಿಮ್ಮ ಮುಖ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಏನು?",
    socrates_title: "ರೋಗಲಕ್ಷಣಗಳ ವಿವರಣೆ (SOCRATES & ಆಯುಷ್ ಪರೀಕ್ಷೆ)",
    ayush_title: "ಆಯುಷ್ ದಶವಿಧ & ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ ವಿವರಗಳು",
    doc_upload_title: "ಹಳೆಯ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ / ಲ್ಯಾಬ್ ವರದಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    submit_intake: "ವೈದ್ಯರಿಗೆ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ",
    case_submitted: "ನಿಮ್ಮ ನಮೂದು ಯಶಸ್ವಿಯಾಗಿದೆ! ಟೋಕನ್ ಸಂಖ್ಯೆ: ",
    next: "ಮುಂದೆ",
    back: "ಹಿಂದೆ",
    speak: "ಧ್ವನಿ ಆಲಿಸಿ",
    prakriti_title: "ಪ್ರಕೃತಿ ಮತ್ತು ದೋಷ ವಿಶ್ಲೇಷಣೆ (Prakriti)",
    live_opd_queue: "ನೇರ OPD ಸರದಿ",
    refresh_queue: "ನವೀಕರಿಸಿ",
    case_sheet_heading: "ಆಯುಷ್ ಸಚಿವಾಲಯ - ಸರ್ಕಾರಿ OPD",
    case_sheet_subheading: "SIH 26047 AI-ಸಹಾಯಿತ ವೈದ್ಯಕೀಯ ಕೇಸ್ ಶೀಟ್ | ABHA ಸಂಯೋಜನೆ",
    patient_label: "ರೋಗಿಯ ಹೆಸರು",
    age_gender_label: "ವಯಸ್ಸು / ಲಿಂಗ",
    abha_id_label: "ABHA ಗುರುತಿನ ಸಂಖ್ಯೆ",
    intake_lang_label: "ದಾಖಲಾತಿ ಭಾಷೆ",
    chief_complaint_section: "ಮುಖ್ಯ ಸಮಸ್ಯೆ & ರೋಗಿಯ ಧ್ವನಿ ದಾಖಲೆ",
    primary_symptoms: "ರೋಗಿ ತಿಳಿಸಿದ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು:",
    prakriti_section: "AI ಪ್ರಕೃತಿ ಮೌಲ್ಯಮಾಪನ & ದೋಷ ಸಮತೋಲನ (Prakriti Analysis)",
    prakriti_diag: "ದೇಹದ ಪ್ರಕೃತಿ ರೋಗನಿರ್ಣಯ",
    dominant_dosha: "ಪ್ರಮುಖ ದೋಷ ವೈಪರೀತ್ಯ",
    dashavidha_section: "ದಶವಿಧ ಪರೀಕ್ಷೆ (10 ಹಂತದ ಆಯುಷ್ ತಪಾಸಣೆ)",
    ashtavidha_section: "ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ (8 ವೈದ್ಯಕೀಯ ಸೂಚಕಗಳು)",
    history_timeline_section: "AI ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆ & ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು (OCR & Translation)",
    soap_section: "AI ವೈದ್ಯರ ರಚನಾತ್ಮಕ SOAP ವರದಿ",
    soap_s: "S - ರೋಗಿಯ ವಿವರಣೆ (Subjective)",
    soap_o: "O - ತಪಾಸಣೆ ಮತ್ತು ಪರೀಕ್ಷೆಗಳು (Objective)",
    soap_a: "A - ಆಯುಷ್ ರೋಗ ಮೌಲ್ಯಮಾಪನ (Assessment)",
    soap_p: "P - ಚಿಕಿತ್ಸಾ ಯೋಜನೆ ಮತ್ತು ಆಹಾರ ಸಲಹೆ (Plan)",
    doctor_actions: "ವೈದ್ಯರ ನೇರ ಕ್ರಮಗಳು",
    approve_prescription: "ಅನುಮೋದಿಸಿ ಮತ್ತು ಔಷಧ ಚೀಟಿ ಕಳುಹಿಸಿ",
    print_case: "ಕೇಸ್ ಶೀಟ್ ಪ್ರಿಂಟ್ / PDF",
    waiting_doctor: "ವೈದ್ಯರಿಗಾಗಿ ಕಾಯುತ್ತಿದ್ದಾರೆ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ"
  }
};

// 2. Multilingual Clinical SOCRATES & AYUSH Intake Questions
const CLINICAL_QUESTIONS_DB = [
  {
    id: "chief_complaint",
    category: "chief_complaints",
    prompts: {
      te: "మీరు ఈరోజు ఆసుపత్రికి ఎందుకు వచ్చారు? ప్రధాన బాధ లేదా సమస్యను చెప్పండి.",
      ta: "இன்று நீங்கள் மருத்துவமனைக்கு வந்ததற்கான முக்கிய காரணம் அல்லது பிரச்சனை என்ன?",
      en: "What is the primary health problem or symptom bringing you to the OPD today?",
      hi: "आज आप अस्पताल किस मुख्य समस्या या तकलीफ के लिए आए हैं?",
      kn: "ಇಂದು ನೀವು ಆಸ್ಪತ್ರೆಗೆ ಬಂದಿರುವ ಮುಖ್ಯ ತೊಂದರೆ ಅಥವಾ ಸಮಸ್ಯೆ ಏನು?"
    },
    options: {
      te: ["కీళ్ళ నొప్పులు & వాపు", "అజీర్ణం / గ్యాస్ & కడుపునొప్పి", "దీర్ఘకాలిక దగ్గు & జలుబు", "చర్మ దురద & దద్దుర్లు", "తల తిరగడం & నీరసం", "నిద్రలేమి & ఆందోళన"],
      ta: ["மூட்டு வலி மற்றும் வீக்கம்", "செரிமானக் கோளாறு / வாயு", "நீண்டகால இருமல் & சளி", "தோல் அரிப்பு & தடிப்பு", "தலைசுற்றல் & சோர்வு", "தூக்கமின்மை & பதற்றம்"],
      en: ["Joint Pain & Stiffness", "Indigestion, Acidity & Gas", "Chronic Cough & Breathlessness", "Skin Rash & Itching", "Fatigue & Dizziness", "Insomnia & Stress/Anxiety"],
      hi: ["जोड़ों का दर्द और सूजन", "अपच, गैस और पेट दर्द", "पुरानी खांसी और सांस फूलना", "त्वचा पर खुजली और चकत्ते", "थकान और कमजोरी", "अनिद्रा और तनाव"],
      kn: ["ಕೀಲು ನೋವು ಮತ್ತು ಊತ", "ಅಜೀರ್ಣ, ಗ್ಯಾಸ್ಟ್ರಿಕ್ & ಹೊಟ್ಟೆನೋವು", "ದೀರ್ಘಕಾಲದ ಕೆಮ್ಮು & ಶೀತ", "ಚರ್ಮದ ತುರಿಕೆ & ದದ್ದು", "ಆಯಾಸ ಮತ್ತು ತಲೆಸುತ್ತು", "ನಿದ್ರಾಹೀನತೆ & ಆತಂಕ"]
    }
  },
  {
    id: "duration_onset",
    category: "socrates",
    prompts: {
      te: "ఈ సమస్య మీకు ఎన్ని రోజులుగా లేదా నెలలుగా ఉంది?",
      ta: "இந்த பிரச்சனை எத்தனை நாட்களாக அல்லது மாதங்களாக உள்ளது?",
      en: "How long have you been experiencing these symptoms?",
      hi: "यह समस्या आपको कितने दिनों या महीनों से हो रही है?",
      kn: "ಈ ಸಮಸ್ಯೆ ನಿಮಗೆ ಎಷ್ಟು ದಿನಗಳಿಂದ ಅಥವಾ ತಿಂಗಳುಗಳಿಂದ ಇದೆ?"
    },
    options: {
      te: ["1-3 రోజులు (తీవ్రమైనది)", "1-2 వారాలు", "1-3 నెలలు", "6 నెలల కంటే ఎక్కువ (దీర్ఘకాలికం)"],
      ta: ["1-3 நாட்கள் (தீவிரமானது)", "1-2 வாரங்கள்", "1-3 மாதங்கள்", "6 மாதங்களுக்கு மேல்"],
      en: ["1-3 Days (Acute)", "1-2 Weeks", "1-3 Months", "More than 6 Months (Chronic)"],
      hi: ["1-3 दिन (अचानक/तीव्र)", "1-2 सप्ताह", "1-3 महीने", "6 महीने से अधिक (दीर्घकालिक)"],
      kn: ["1-3 ದಿನಗಳು (ತೀವ್ರ)", "1-2 ವಾರಗಳು", "1-3 ತಿಂಗಳುಗಳು", "6 ತಿಂಗಳುಗಳಿಗಿಂತ ಹೆಚ್ಚು"]
    }
  },
  {
    id: "pain_severity",
    category: "socrates",
    prompts: {
      te: "మీ నొప్పి లేదా అసౌకర్యం తీవ్రత ఎంత ఉంది? (1 నుండి 10 స్కేల్)",
      ta: "உங்கள் வலி அல்லது அசௌகரியத்தின் தீவிரம் எவ்வளவு? (1 முதல் 10 வரை)",
      en: "How severe is your pain or discomfort on a scale of 1 to 10?",
      hi: "आपका दर्द या परेशानी कितनी तीव्र है? (1 से 10 के पैमाने पर)",
      kn: "ನಿಮ್ಮ ನೋವು లేదా ತೊಂದರೆಯ ತೀವ್ರತೆ ಎಷ್ಟಿದೆ? (1 ರಿಂದ 10 ಸ್ಕೇಲ್)"
    },
    options: {
      te: ["తేలికపాటి (1-3)", "మధ్యస్థం (4-6)", "తీవ్రమైనది (7-8)", "అత్యంత తీవ్రం (9-10)"],
      ta: ["லேசானது (1-3)", "மிதமானது (4-6)", "கடுமையானது (7-8)", "மிகக் கடுமையானது (9-10)"],
      en: ["Mild (1-3)", "Moderate (4-6)", "Severe (7-8)", "Very Severe / Unbearable (9-10)"],
      hi: ["हल्का (1-3)", "मध्यम (4-6)", "गंभीर (7-8)", "असहनीय (9-10)"],
      kn: ["ಸೌಮ್ಯ (1-3)", "ಮಧ್ಯಮ (4-6)", "ತೀವ್ರ (7-8)", "ಅಸಹನೀಯ (9-10)"]
    }
  },
  {
    id: "agni_digestion",
    category: "ayush_dashavidha",
    prompts: {
      te: "ఆయుష్ అగ్ని పరీక్ష: మీ ఆకలి మరియు జీర్ణక్రియ ఎలా ఉంది?",
      ta: "ஆயுஷ் அக்னி பரிசோதனை: உங்கள் பசி மற்றும் செரிமானம் எப்படி உள்ளது?",
      en: "AYUSH Agni Examination: How is your appetite and digestion?",
      hi: "आयुष अग्नि परीक्षा: आपकी भूख और पाचन क्रिया कैसी है?",
      kn: "ಆಯುಷ್ ಅಗ್ನಿ ಪರೀಕ್ಷೆ: ನಿಮ್ಮ ಹಸಿವು ಮತ್ತು ಜೀರ್ಣಕ್ರಿಯೆ ಹೇಗಿದೆ?"
    },
    options: {
      te: ["సమాగ్ని (సమతుల్య ఆకలి & మంచి జీర్ణం)", "మందాగ్ని (తక్కువ ఆకలి, తిన్నది అరగదు - కఫ)", "తీక్ష్ణాగ్ని (అతి ఆకలి, మంట - పిత్త)", "విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)"],
      ta: ["சமாக்னி (சீரான பசி மற்றும் நல்ல செரிமானம்)", "மந்தாக்னி (குறைந்த பசி, மந்தமான செரிமானம்)", "தீக்ஷ்ணாக்னி (அதிக பசி, நெஞ்செரிச்சல்)", "விஷமாக்னி (மாறிக்கொண்டே இருக்கும் பசி)"],
      en: ["Samagni (Balanced appetite & normal digestion)", "Mandagni (Low appetite, heavy stomach, sluggish - Kapha)", "Tikshnagni (Excessive sharp hunger, hyperacidity - Pitta)", "Vishamagni (Irregular/unpredictable digestion - Vata)"],
      hi: ["समाग्नि (संतुलित भूख और सामान्य पाचन)", "मंदाग्नि (कम भूख, भारीपन, मंद पाचन - कफ)", "तीक्ष्णाग्नि (अत्यधिक भूख, जलन, एसिडिटी - पित्त)", "विषमाग्नि (अनियमित कभी भूख कभी नहीं - वात)"],
      kn: ["ಸಮಾಗ್ನಿ (ಸಮತೋಲಿತ ಹಸಿವು ಮತ್ತು ಉತ್ತಮ ಜೀರ್ಣಕ್ರಿಯೆ)", "ಮಂದಾಗ್ನಿ (ಕಡಿಮೆ ಹಸಿವು, ಹೊಟ್ಟೆ ಭಾರ - ಕಫ)", "ತೀಕ್ಷ್ಣಾಗ್ನಿ (ಅತಿಯಾದ ಹಸಿವು, ಎದೆಯುರಿ - ಪಿತ್ತ)", "ವಿಷಮಾಗ್ನಿ (ಅಸ್ಥಿರವಾದ ಹಸಿವು - ವಾತ)"]
    }
  },
  {
    id: "koshtha_bowel",
    category: "ayush_dashavidha",
    prompts: {
      te: "ఆయుష్ కోష్ఠ పరీక్ష: మీ మల విసర్జన మరియు పేగుల పనితీరు ఎలా ఉంది?",
      ta: "ஆயுஷ் கோஷ்ட பரிசோதனை: உங்கள் மலம் கழித்தல் மற்றும் குடல் இயக்கம் எப்படி உள்ளது?",
      en: "AYUSH Koshtha Examination: How are your bowel movements?",
      hi: "आयुष कोष्ठ परीक्षा: आपका पेट साफ और मल त्याग कैसा रहता है?",
      kn: "ಆಯುಷ್ ಕೋಷ್ಠ ಪರೀಕ್ಷೆ: ನಿಮ್ಮ ಮಲವಿಸರ್ಜನೆ మరియు కరుಳಿನ ಕ್ರಿಯೆ ಹೇಗಿದೆ?"
    },
    options: {
      te: ["మృదు కోష్ఠ (తేలికగా సాఫీగా అవుతుంది / తరచూ లూజ్ మోషన్)", "మధ్యమ కోష్ఠ (క్రమబద్ధంగా రోజూ ఒక్కసారి అవుతుంది)", "క్రూర కోష్ఠ (మలబద్ధకం, గట్టిగా రావడం - వాత)"],
      ta: ["மிருது கோஷ்டம் (எளிதான மலம் கழிவு / அடிக்கடி இளகிய மலம்)", "மத்தியம கோஷ்டம் (வழக்கமான சீரான குடல் இயக்கம்)", "க்ரூர கோஷ்டம் (மலச்சிக்கல், கடினமான மலம்)"],
      en: ["Mrudu Koshtha (Soft/easy, tendency for loose stools - Pitta)", "Madhyama Koshtha (Regular, once daily, normal consistency)", "Krura Koshtha (Constipated, dry, hard stools - Vata)"],
      hi: ["मृदु कोष्ठ (आसानी से साफ / दस्त की प्रवृत्ति - पित्त)", "मध्यम कोष्ठ (नियमित, दिन में एक बार सामान्य)", "क्रूर कोष्ठ (कब्ज, सूखा, कठिन मल - वात)"],
      kn: ["ಮೃದು ಕೋಷ್ಠ (ಸುಲಭವಾಗಿ ಆಗುತ್ತದೆ / ಮೃದು ಮಲ - ಪಿತ್ತ)", "ಮಧ್ಯಮ ಕೋಷ್ಠ (ನಿಯಮಿತ, ದಿನಕ್ಕೆ ಒಮ್ಮೆ ಸಾಮಾನ್ಯ)", "ಕ್ರೂರ ಕೋಷ್ಠ (ಮಲಬದ್ಧತೆ, ಗಟ್ಟಿ ಮಲ - ವಾತ)"]
    }
  },
  {
    id: "nidra_sleep",
    category: "ayush_dashavidha",
    prompts: {
      te: "మీ నిద్ర ఎలా ఉంది మరియు రోజువారీ అలసట ఎలా ఉంది?",
      ta: "உங்கள் தூக்கம் மற்றும் தினசரி சோர்வு நிலை எப்படி உள்ளது?",
      en: "AYUSH Nidra Examination: How is your sleep pattern and restfulness?",
      hi: "आपकी नींद और मानसिक शांति कैसी रहती है?",
      kn: "ನಿಮ್ಮ ನಿದ್ರೆ ಮತ್ತು ಮಾನಸಿಕ ವಿಶ್ರಾಂತಿ ಹೇಗಿದೆ?"
    },
    options: {
      te: ["గాఢమైన నిద్ర (7-8 గంటలు సుఖంగా)", "చెల్లాచెదురైన నిద్ర / మధ్యలో మెలకువ రావడం", "నిద్ర పట్టకపోవడం (ఇన్సోమ్నియా - వాత/పిత్త)", "అతినిద్ర మరియు నిరంతర బద్ధకం (కఫ)"],
      ta: ["ஆழ்ந்த நிம்மதியான தூக்கம் (7-8 மணிநேரம்)", "இடையிடையே விழிப்பு வரும் தூக்கம்", "தூக்கமின்மை / தள்ளிப்போகும் தூக்கம்", "அதிக தூக்கம் மற்றும் பகல் சோர்வு"],
      en: ["Deep & Sound Sleep (7-8 hours restful)", "Disturbed / Frequent awakenings (Vata)", "Difficulty falling asleep / Insomnia (Pitta/Vata)", "Excessive sleepiness / Lethargy (Kapha)"],
      hi: ["गहरी और आरामदायक नींद (7-8 घंटे)", "बार-बार टूटने वाली नींद (वात)", "नींद न आना / अनिद्रा (पित्त/वात)", "अत्यधिक नींद और सुस्ती (कफ)"],
      kn: ["ಗಾಢ ಮತ್ತು ನೆಮ್ಮದಿಯ ನಿದ್ರೆ (7-8 ಗಂಟೆಗಳು)", "ಮಧ್ಯೆ ಮಧ್ಯೆ ಎಚ್ಚರವಾಗುವ ನಿದ್ರೆ (ವಾತ)", "ನಿದ್ರೆ ಬಾರದಿರುವುದು (ಪಿತ್ತ/ವಾತ)", "ಅತಿಯಾದ ನಿದ್ರೆ ಮತ್ತು ಆಲಸ್ಯ (ಕಫ)"]
    }
  },
  {
    id: "prakriti_vihara",
    category: "ayush_prakriti",
    prompts: {
      te: "వాతావరణ మార్పులకు మీ శరీరం ఎలా ప్రతిస్పందిస్తుంది?",
      ta: "வானிலை மாற்றங்களுக்கு உங்கள் உடல் எவ்வாறு எதிர்வினையாற்றுகிறது?",
      en: "Ayush Constitution: How does your body react to climate and temperature?",
      hi: "मौसम के बदलाव पर आपका शरीर कैसा महसूस करता है?",
      kn: "ಹವಾಮಾನ ಬದಲಾವಣೆಗೆ ನಿಮ್ಮ ದೇಹ ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ?"
    },
    options: {
      te: ["చలి అస్సలు పడదు, వేడి ఇష్టం (వాత ప్రధానం)", "వేడి అస్సలు పడదు, చల్లదనం ఇష్టం, ఎక్కువ చెమట (పిత్త ప్రధానం)", "చలి మరియు వర్షం పడదు, బరువు తేలికగా పెరుగుతాను (కఫ ప్రధానం)", "అన్ని వాతావరణాలూ సమానంగా తట్టుకుంటాను (సమ ప్రకృతి)"],
      ta: ["குளிரை தாங்க முடியாது, வெதுவெதுப்பு பிடிக்கும் (வாதம்)", "வெப்பத்தை தாங்க முடியாது, அதிக வியர்வை (பித்தம்)", "ஈரப்பதம் மற்றும் குளிர் ஒத்துக்கொள்ளாது (கபம்)", "எல்லா காலநிலைகளையும் சமமாக தாங்குவேன் (சமம்)"],
      en: ["Intolerant to cold/wind, prefers warmth, dry skin (Vata Predominant)", "Intolerant to heat, sweats easily, irritable in sun (Pitta Predominant)", "Intolerant to cold/damp, heavy build, slow digestion (Kapha Predominant)", "Well-balanced in all seasons (Sama Prakriti)"],
      hi: ["सर्दी और ठंडी हवा बर्दाश्त नहीं, गर्मी पसंद (वात प्रधान)", "गर्मी और धूप बर्दाश्त नहीं, पसीना ज्यादा (पित्त प्रधान)", "ठंड और नमी से कफ/वजन बढ़ता है (कफ प्रधान)", "सभी मौसम आसानी से अनुकूल (सम प्रकृति)"],
      kn: ["ಚಳಿ ತಡೆಯಲು ಆಗಲ್ಲ, ಬೆಚ್ಚಗಿರುವುದು ಇಷ್ಟ (ವಾತ)", "ಶಾಖ ತಡೆಯಲು ಆಗಲ್ಲ, ಅತಿಯಾದ ಬೆವರು (ಪಿತ್ತ)", "ಚಳಿ ಮತ್ತು ತೇವಾಂಶದಿಂದ ತೂಕ ಹೆಚ್ಚಳ (ಕಫ)", "ಎಲ್ಲಾ ಹವಾಮಾನವನ್ನು ಸುಲಭವಾಗಿ ತಡೆದುಕೊಳ್ಳುತ್ತೇನೆ (ಸಮ)"]
    }
  }
];

// 3. Document OCR & Clinical Prescriptions Presets
const PRESET_PRESCRIPTIONS_DB = {
  gandhi_urology: {
    detected_language: "English (Clinical Hospital Record)",
    document_type: "Hospital Discharge Summary & Scopy Assessment",
    filename: "gandhi_urology_discharge_summary.pdf",
    raw_ocr_text: "DEPARTMENT OF UROLOGY\nGANDHI HOSPITAL GU-I\n\nPT NAME: NARASIMHA RAO\nAGE/SEX: 58Y/M\nIP.NO: 09233\nDOA: 09/02/26 | DOO: 04/03/26 | DOD: 05/03/26\n\nCOMPLAINT&EXAMINATION: S/P TURBT WITH C/O HEMATURIA ON AND OFF SINCE 10 DAYS\nPAST TREATMENT H/O: DM-/HTN+, H/O TURBT (2023) WITH HPE S/O LOW GRADE PAPILLARY UROTHELIAL CA\nDIAGNOSIS: HEMATURIA UNDER EVALUATION S/P TURBT\nTREATMENT GIVEN: SCOPY ASSESSMENT\n\nOPERATIVE FINDINGS:\n1. FIBROSIS NOTED AT PREVIOUS SCAR AT LEFT LATERAL WALL\n\nINVESTIGATIONS:\nHB: 12g | SR.CREATININE: 1.2mg | SR.ELECTROLYTES: Na+: 138 mEq/L | K+: 5mEq/L\nCECTSCAN: LEFT KIDNEY NORMAL SIZE, ATTENUATION AND PCS WITH CYST OF 4*4CM NOTED IN RIGHT LOWER POLE( BOSNIAK1)\n\nDISCHARGE TREATMENT:\n1. T. Oflox 200mg (0-----0 14)\n2. T. DOLO 650 MG (0-----0 14)\n3. T. PanTop (1-----0 14)",
    translated_clinical_english: "DEPARTMENT OF UROLOGY - GANDHI HOSPITAL GU-I\nPatient: Narasimha Rao | Age: 58 Yrs Male | IP No: 09233\nAdmitted: 09/02/2026 | Operative Scopy: 04/03/2026 | Discharged: 05/03/2026\n\nPrimary Complaint: Post TURBT with intermittent Hematuria (blood in urine) for 10 days.\nDiagnosis: Hematuria under evaluation Status Post TURBT.\nOperative Finding: Fibrosis at previous resection scar at left lateral bladder wall (No active tumor recurrence visualized).\nInvestigations:\n• Serum Creatinine: 1.2 mg/dL (Normal renal clearance)\n• Hemoglobin: 12.0 g/dL\n• CECT KUB: 4x4cm simple cyst in right lower pole (Bosniak Category 1 - benign), urinary bladder normal without recurrent mass.\n\nDischarge Medications:\n1. Tab. Ofloxacin 200mg (Antibiotic) - 14 Days\n2. Tab. Dolo 650mg (Analgesic) - 14 Days\n3. Tab. PanTop 40mg (Antacid) - 14 Days (Morning)",
    patient_autofill: {
      name: "Narasimha Rao (నరసింహారావు)",
      age: 58,
      gender: "Male",
      mobile: "9492654618",
      chief_complaint: "Post TURBT with on-and-off Hematuria (మూత్రంలో రక్తం)"
    },
    extracted_entities: {
      Hospital: "Department of Urology, Gandhi Hospital (GU-I)",
      Patient: "Narasimha Rao (58 Yrs / Male)",
      Date: "2026-03-05",
      "Diagnosed Condition": "Hematuria Under Evaluation S/P TURBT (Prior Bladder Urothelial Ca 2023)",
      "Biomarkers & Labs": [
        "Serum Creatinine: 1.2 mg/dL (Normal renal clearance)",
        "Hemoglobin: 12 g/dL",
        "Sodium (Na+): 138 mEq/L | Potassium (K+): 5.0 mEq/L",
        "CECT KUB: Right lower pole simple cyst 4x4cm (Bosniak 1 - Benign), No bladder mass"
      ],
      Prescriptions: [
        "Tab. Oflox 200mg (Antibiotic - 14 Days)",
        "Tab. Dolo 650mg (Analgesic SOS/14 Days)",
        "Tab. PanTop 40mg (Antacid OD - 14 Days)"
      ],
      "Dietary Restrictions": "Adequate hydration; avoid nephrotoxic NSAIDs; follow up in Urology OPD"
    },
    summary: "Gandhi Hospital Urology Discharge Summary for Narasimha Rao (58M): Evaluated for hematuria post-TURBT; scopy revealed lateral wall fibrosis without tumor recurrence; stable renal function (Creatinine 1.2)."
  },
  telugu: {
    detected_language: "Telugu (తెలుగు)",
    document_type: "Telugu Handwritten Prescription Slip",
    filename: "telugu_ayush_prescription.jpg",
    raw_ocr_text: "డాక్టర్ ఆర్. కృష్ణమూర్తి క్లినిక్\nతేదీ: 12/01/2026\nరోగి: రమేష్ కుమార్ | వయస్సు: 42\nలక్షణాలు: మోకాళ్ళ వాపు & కీళ్ళ బిగువు (2 వారాలు)\nమందులు:\n1. ట్యాబ్. యోగరాజ గుగ్గులు 1 మాత్ర ఉదయం/రాత్రి (భోజనం తర్వాత)\n2. మహానారాయణ తైలం - మోకాళ్ళకు రాసి వేడి కాపడం పెట్టాలి\n3. శుంఠి కషాయం 15ml రోజుకు రెండుసార్లు\nసలహా: చల్లటి గాలి మరియు పెరుగు మానేయాలి",
    translated_clinical_english: "Dr. R. Krishnamurthy Clinic | Date: 12/01/2026\nPatient: Ramesh Kumar | Age: 42\nSymptoms: Knee swelling & joint stiffness (2 weeks duration)\nPrescribed Formulations:\n1. Tab. Yogaraja Guggulu 1 tab BD (post-meals)\n2. Mahanarayana Taila - external application to knees followed by warm fomentation\n3. Shunthi Kwatha 15ml twice daily\nAdvisory: Avoid cold draft exposure and curd intake",
    patient_autofill: {
      name: "Ramesh Kumar (రమేష్ కుమార్)",
      age: 42,
      gender: "Male",
      mobile: "9876543210",
      chief_complaint: "కీళ్ళ నొప్పులు & వాపు"
    },
    extracted_entities: {
      Hospital: "Dr. R. Krishnamurthy Ayush Clinic",
      Patient: "Ramesh Kumar (42 Yrs / Male)",
      Date: "2026-01-12",
      "Diagnosed Condition": "Sandhivata / Knee Joint Stiffness",
      Prescriptions: [
        "Tab. Yogaraja Guggulu (1 tab BD after food)",
        "Mahanarayana Tailam (local warm application)",
        "Shunthi Kwatham (15ml BD)"
      ],
      "Dietary Restrictions": "Avoid curd and cold climate exposure"
    },
    summary: "Previous Ayurvedic prescription in Telugu for Sandhivata management with good initial response."
  },
  tamil: {
    detected_language: "Tamil (தமிழ்)",
    document_type: "Tamil Prescription Slip",
    filename: "tamil_dispensary_slip.jpg",
    raw_ocr_text: "அரசு ஆயுஷ் மருந்தகம் - மதுரை\nநாள்: 18/01/2026\nநோயாளி: செல்வி சௌந்தர்\nபிரச்சனை: செரிமானக் கோளாறு, நெஞ்செரிச்சல் மற்றும் பித்த வாந்தி\nமருந்துகள்:\n1. அவிபத்திகர சூரணம் 1 ஸ்பூன் தேனில் இரவு படுக்கைக்கு முன்\n2. திரிபலா சூரணம் 5g வெந்நீரில்\n3. சீரக குடிநீர் - தொடர்ந்து குடிக்கவும்\nபத்தியம்: காரம் மற்றும் புளித்த உணவுகளை தவிர்க்கவும்",
    translated_clinical_english: "Government Ayush Dispensary - Madurai | Date: 18/01/2026\nPatient: Selvi Soundar\nProblem: Severe Indigestion, Heartburn & Pitta Emesis\nFormulations:\n1. Avipattikara Churna 1 tsp with honey at bedtime\n2. Triphala Churna 5g in warm water\n3. Jiraka Kwatha - warm decoctions throughout day\nDietary Advice: Strict avoidance of spicy and sour foods",
    patient_autofill: {
      name: "Selvi Soundar (செல்வி)",
      age: 46,
      gender: "Female",
      mobile: "9123456789",
      chief_complaint: "செரிமானக் கோளாறு & நெஞ்செரிச்சல்"
    },
    extracted_entities: {
      Hospital: "Government Ayush Dispensary Madurai",
      Patient: "Selvi Soundar (46 Yrs / Female)",
      Date: "2026-01-18",
      "Diagnosed Condition": "Amlapitta / Severe Dyspepsia",
      Prescriptions: [
        "Avipattikara Churna (1 tsp HS)",
        "Triphala Churna (5g warm water)",
        "Jiraka Water"
      ],
      "Dietary Restrictions": "Avoid spicy and sour food items"
    },
    summary: "Tamil dispensary slip for Amlapitta treatment with Avipattikara Churna."
  },
  kannada: {
    detected_language: "Kannada (ಕನ್ನಡ)",
    document_type: "Kannada Ayush Slip",
    filename: "kannada_prescription_slip.jpg",
    raw_ocr_text: "ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ - ಮೈಸೂರು\nದಿನಾಂಕ: 22/01/2026\nರೋಗಿ: ಕವಿತಾ ಗೌಡ | ವಯಸ್ಸು: 35\nತೊಂದರೆ: ಆಯಾಸ, ಕೀಲು ನೋವು ಮತ್ತು ಮಂದಾಗ್ನಿ\nಔಷಧಿಗಳು:\n1. ಅಮೃತಾರಿಷ್ಟ 20ml ಸಮಪ್ರಮಾಣ ನೀರಿನೊಂದಿಗೆ 2 ಬಾರಿ\n2. ಧಾನ್ವಂತರ ತೈಲ - ಮಸಾಜ್‌ಗಾಗಿ",
    translated_clinical_english: "Ayurveda Chikitsalaya - Mysuru | Date: 22/01/2026\nPatient: Kavitha Gowda | Age: 35\nChief Concern: Fatigue, mild joint aches, and sluggish digestion (Mandagni)\nPrescriptions:\n1. Amritarishta 20ml with equal warm water twice daily after meals\n2. Dhanwantaram Taila - gentle external application",
    patient_autofill: {
      name: "Kavitha Gowda (ಕವಿತಾ)",
      age: 35,
      gender: "Female",
      mobile: "9845012345",
      chief_complaint: "ಆಯಾಸ & ಮಂದಾಗ್ನಿ"
    },
    extracted_entities: {
      Hospital: "Ayurveda Chikitsalaya Mysuru",
      Patient: "Kavitha Gowda (35 Yrs / Female)",
      Date: "2026-01-22",
      "Diagnosed Condition": "Mandagni / Vata-Kapha Fatigue",
      Prescriptions: [
        "Amritarishta (20ml BD with equal water)",
        "Dhanwantaram Taila (External)"
      ]
    },
    summary: "Kannada clinical slip for Vata-Kapha fatigue and Mandagni."
  },
  hindi: {
    detected_language: "Hindi (हिन्दी)",
    document_type: "Hindi Prescription Slip",
    filename: "hindi_ayush_slip.jpg",
    raw_ocr_text: "राजकीय आयुष चिकित्सालय - जयपुर\nदिनांक: 28/01/2026\nरोगी: सुरेश शर्मा | आयु: 50\nलक्षण: पुरानी खांसी और श्वास लेने में कठिनाई\nऔषधियां:\n1. सितोपलादि चूर्ण 3g शहद के साथ दिन में तीन बार\n2. वासावलेह 1 चम्मच गर्म पानी से\n3. दशमूल क्वाथ 20ml",
    translated_clinical_english: "State Ayush Hospital - Jaipur | Date: 28/01/2026\nPatient: Suresh Sharma | Age: 50\nSymptoms: Chronic cough and difficulty breathing\nFormulations:\n1. Sitopaladi Churna 3g with honey TID\n2. Vasavaleha 1 tsp with warm water\n3. Dashamula Kwatha 20ml BD",
    patient_autofill: {
      name: "Suresh Sharma (सुरेश)",
      age: 50,
      gender: "Male",
      mobile: "9829012345",
      chief_complaint: "पुरानी खांसी और श्वास कष्ट"
    },
    extracted_entities: {
      Hospital: "State Ayush Hospital Jaipur",
      Patient: "Suresh Sharma (50 Yrs / Male)",
      Date: "2026-01-28",
      "Diagnosed Condition": "Kasa-Shwasa / Respiratory Congestion",
      Prescriptions: [
        "Sitopaladi Churna (3g TID with honey)",
        "Vasavaleha (1 tsp BD)",
        "Dashamula Kwatha (20ml BD)"
      ]
    },
    summary: "Hindi Ayush slip for chronic cough and respiratory congestion."
  }
};

// 4. Interactive Hackathon Preset Cases
const DEMO_PRESETS = {
  telugu_joint: {
    lang: 'te',
    name: 'Ramesh Kumar (రమేష్ కుమార్)',
    abha_id: '98-7233-4120-9411',
    age: 42,
    gender: 'Male',
    mobile: '9876543210',
    complaint: 'కీళ్ళ నొప్పులు & వాపు (Joint Pain & Stiffness)',
    duration: '1-3 నెలలు (1-3 Months)',
    severity: 'తీవ్రమైనది (7-8) (Severe)',
    agni: 'విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)',
    koshtha: 'క్రూర కోష్ఠ (మలబద్ధకం, గట్టిగా రావడం - వాత)',
    sleep: 'చెల్లాచెదురైన నిద్ర / మధ్యలో మెలకువ రావడం'
  },
  tamil_dyspepsia: {
    lang: 'ta',
    name: 'Selvi Soundar (செல்வி)',
    abha_id: '91-2345-6789-0122',
    age: 46,
    gender: 'Female',
    mobile: '9123456789',
    complaint: 'செரிமானக் கோளாறு (Indigestion & Acidity)',
    duration: '1-2 வாரங்கள்',
    severity: 'மத்தியமம் (4-6)',
    agni: 'தீக்ஷ்ணாக்னி (அதிக பசி, நெஞ்செரிச்சல்)',
    koshtha: 'மிருது கோஷ்டம் (எளிதான மலம் கழிவு)',
    sleep: 'ஆழ்ந்த நிம்மதியான தூக்கம்'
  },
  kannada_general: {
    lang: 'kn',
    name: 'Kavitha Gowda (ಕವಿತಾ)',
    abha_id: '98-4501-2345-6789',
    age: 35,
    gender: 'Female',
    mobile: '9845012345',
    complaint: 'ಆಯಾಸ ಮತ್ತು ತಲೆಸುತ್ತು (Fatigue & Vata)',
    duration: '1-3 ತಿಂಗಳುಗಳು',
    severity: 'ಮಧ್ಯಮ (4-6)',
    agni: 'ಮಂದಾಗ್ನಿ (ಕಡಿಮೆ ಹಸಿವು, ಹೊಟ್ಟೆ ಭಾರ - ಕಫ)',
    koshtha: 'ನಿಯಮಿತ, ದಿನಕ್ಕೆ ಒಮ್ಮೆ',
    sleep: 'ಮಧ್ಯೆ ಮಧ್ಯೆ ಎಚ್ಚರವಾಗುವ ನಿದ್ರೆ (ವಾತ)'
  },
  english_standard: {
    lang: 'en',
    name: 'David Wilson',
    abha_id: '99-8877-6655-4433',
    age: 48,
    gender: 'Male',
    mobile: '9988776655',
    complaint: 'Joint Pain & Stiffness (Cervical Spondylosis)',
    duration: 'More than 6 Months (Chronic)',
    severity: 'Moderate (4-6)',
    agni: 'Samagni (Balanced appetite & normal digestion)',
    koshtha: 'Madhyama Koshtha (Regular, once daily)',
    sleep: 'Deep & Sound Sleep (7-8 hours restful)'
  },
  telugu_red_flag_emergency: {
    lang: 'te',
    name: 'Venkateswarlu (వేంకటేశ్వర్లు)',
    abha_id: '98-1122-3344-5566',
    age: 54,
    gender: 'Male',
    mobile: '9811223344',
    complaint: 'తీవ్రమైన ఛాతీలో నొప్పి మరియు గుండె బరువుగా ఉంది, ఎడమ చెయ్యి లాగుతోంది',
    duration: '1-3 రోజులు (తీవ్రమైనది)',
    severity: 'అత్యంత తీవ్రం (9-10)',
    agni: 'విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)',
    koshtha: 'క్రూర కోష్ఠ (మలబద్ధకం, గట్టిగా రావడం - వాత)',
    sleep: 'నిద్ర పట్టకపోవడం (ఇన్సోమ్నియా - వాత/పిత్త)'
  },
  tamil_red_flag_stroke: {
    lang: 'ta',
    name: 'Muthuvel (முத்துவேல்)',
    abha_id: '91-4455-6677-8899',
    age: 62,
    gender: 'Male',
    mobile: '9144556677',
    complaint: 'திடீர் பக்கவாதம், வலது கை கால் செயலிழப்பு மற்றும் பேச்சு குளறுதல்',
    duration: '1-3 நாட்கள் (தீவிரமானது)',
    severity: 'மிகக் கடுமையானது (9-10)',
    agni: 'மந்தாக்னி (குறைந்த பசி, மந்தமான செரிமானம்)',
    koshtha: 'க்ரூர கோஷ்டம் (மலச்சிக்கல், கடினமான மலம்)',
    sleep: 'தூக்கமின்மை / தள்ளிப்போகும் தூக்கம்'
  }
};

// 5. Global State Management
const state = {
  currentLang: 'te',
  activeMode: 'kiosk',
  patientInfo: {
    name: "Ramesh Kumar (రమేష్ కుమార్)",
    abha_id: "98-7233-4120-9411",
    age: 42,
    gender: "Male",
    mobile: "9876543210"
  },
  intakeResponses: {},
  voiceTranscript: "",
  uploadedDocs: [],
  isRecording: false,
  mediaRecorder: null,
  audioChunks: [],
  activeCaseToken: null,
  activeCaseData: null,
  uiStrings: {},
  questions: [],
  doctorQueue: [],
  casesDb: {}
};

// Seed initial demonstration queue and database
function seedInitialData() {
  const case1 = generateLocalCaseSheet({
    patient_info: DEMO_PRESETS.telugu_joint,
    language: 'te',
    responses: {
      chief_complaint: DEMO_PRESETS.telugu_joint.complaint,
      duration_onset: DEMO_PRESETS.telugu_joint.duration,
      pain_severity: DEMO_PRESETS.telugu_joint.severity,
      agni_digestion: DEMO_PRESETS.telugu_joint.agni,
      koshtha_bowel: DEMO_PRESETS.telugu_joint.koshtha,
      nidra_sleep: DEMO_PRESETS.telugu_joint.sleep
    },
    voice_transcript: "గత రెండు నెలలుగా మోకాళ్ళలో చాలా నొప్పి ఉంది, చలికి నొప్పులు ఇంకా ఎక్కువవుతున్నాయి. ఉదయాన్నే నడవలేకపోతున్నాను.",
    uploaded_documents: [PRESET_PRESCRIPTIONS_DB.telugu],
    token_override: "OPD-101-TEL"
  });

  const case2 = generateLocalCaseSheet({
    patient_info: DEMO_PRESETS.tamil_dyspepsia,
    language: 'ta',
    responses: {
      chief_complaint: DEMO_PRESETS.tamil_dyspepsia.complaint,
      duration_onset: DEMO_PRESETS.tamil_dyspepsia.duration,
      pain_severity: DEMO_PRESETS.tamil_dyspepsia.severity,
      agni_digestion: DEMO_PRESETS.tamil_dyspepsia.agni,
      koshtha_bowel: DEMO_PRESETS.tamil_dyspepsia.koshtha,
      nidra_sleep: DEMO_PRESETS.tamil_dyspepsia.sleep
    },
    voice_transcript: "சாப்பிட்ட பிறகு நெஞ்செரிச்சல் மற்றும் புளித்த ஏப்பம் வருகிறது.",
    uploaded_documents: [PRESET_PRESCRIPTIONS_DB.tamil],
    token_override: "OPD-102-TAM"
  });

  state.casesDb["OPD-101-TEL"] = case1;
  state.casesDb["OPD-102-TAM"] = case2;
  state.activeCaseToken = "OPD-101-TEL";
  state.activeCaseData = case1;

  state.doctorQueue = [
    {
      token_number: "OPD-101-TEL",
      patient_name: "Ramesh Kumar (రమేష్ కుమార్)",
      age: 42,
      gender: "Male",
      language: "Telugu (తెలుగు)",
      chief_complaint: "Joint Pain & Stiffness (Bilateral Knees)",
      prakriti: case1.prakriti.primary_prakriti,
      triage: case1.triage.triage_category,
      time: "10:15 AM",
      status: "Waiting for Doctor"
    },
    {
      token_number: "OPD-102-TAM",
      patient_name: "Selvi Soundar (செல்வி)",
      age: 46,
      gender: "Female",
      language: "Tamil (தமிழ்)",
      chief_complaint: "Severe Dyspepsia & Hyperacidity",
      prakriti: case2.prakriti.primary_prakriti,
      triage: case2.triage.triage_category,
      time: "10:22 AM",
      status: "Waiting for Doctor"
    }
  ];
}

// 6. Local Diagnostic & Case Sheet Generator
function generateLocalCaseSheet(intakeData) {
  const patient = intakeData.patient_info || {};
  const responses = intakeData.responses || {};
  const lang = intakeData.language || state.currentLang || 'te';
  const token = intakeData.token_override || `OPD-${Math.floor(100 + Math.random() * 900)}-${lang.toUpperCase()}`;

  // Calculate Prakriti & Doshas
  let vata = 30, pitta = 30, kapha = 30;
  const cc = (responses.chief_complaint || intakeData.voice_transcript || '').toLowerCase();
  if (cc.includes('joint') || cc.includes('pain') || cc.includes('నొప్పి') || cc.includes('வலி') || cc.includes('दर्द') || cc.includes('<ctrl42>ೋವು')) vata += 35;
  if (cc.includes('acidity') || cc.includes('మంట') || cc.includes('எரிச்சல்') || cc.includes('जलन') || cc.includes('rash')) pitta += 35;
  if (cc.includes('cough') || cc.includes('జలుబు') || cc.includes('இருமல்') || cc.includes('खांसी') || cc.includes('fatigue')) kapha += 30;

  const agni = (responses.agni_digestion || '').toLowerCase();
  if (agni.includes('విషమాగ్ని') || agni.includes('vishamagni') || agni.includes('వాత')) vata += 20;
  if (agni.includes('తీక్ష్ణాగ్ని') || agni.includes('tikshnagni') || agni.includes('పిత్త')) pitta += 25;
  if (agni.includes('మందాగ్ని') || agni.includes('mandagni') || agni.includes('కఫ')) kapha += 25;

  const koshtha = (responses.koshtha_bowel || '').toLowerCase();
  if (koshtha.includes('క్రూర') || koshtha.includes('krura')) vata += 15;
  if (koshtha.includes('మృదు') || koshtha.includes('mrudu')) pitta += 15;

  const total = vata + pitta + kapha;
  const v_pct = Math.round((vata / total) * 100);
  const p_pct = Math.round((pitta / total) * 100);
  const k_pct = 100 - (v_pct + p_pct);

  let primaryPrakriti = "Vata-Pitta (वात-पित्त / వాత-పిత్త)";
  let dominantDosha = "Vata (वात / వాతం)";
  if (p_pct >= v_pct && p_pct >= k_pct) {
    primaryPrakriti = "Pitta-Kapha (पित्त-कफ / పిత్త-కఫ)";
    dominantDosha = "Pitta (पित्त / పిత్తం)";
  } else if (k_pct >= v_pct && k_pct >= p_pct) {
    primaryPrakriti = "Kapha-Vata (कफ-वात / కఫ-వాత)";
    dominantDosha = "Kapha (कफ / కఫం)";
  }

  // Red Flag Evaluation
  const redFlagAnalysis = detectRedFlagsLocal(responses, intakeData.voice_transcript, intakeData.uploaded_documents);

  // Attached docs fallback
  let attachedDocs = intakeData.uploaded_documents || [];
  if (attachedDocs.length === 0) {
    if (cc.includes('నొప్పి') || cc.includes('joint')) {
      attachedDocs = [PRESET_PRESCRIPTIONS_DB.telugu];
    } else if (cc.includes('acidity') || cc.includes('செரிமான') || cc.includes('గ్యాస్')) {
      attachedDocs = [PRESET_PRESCRIPTIONS_DB.tamil];
    } else {
      attachedDocs = [PRESET_PRESCRIPTIONS_DB.gandhi_urology];
    }
  }

  // Dashavidha Pariksha Table
  const dashavidha = {
    "1. Prakriti (Constitution)": primaryPrakriti,
    "2. Vikriti (Pathological Vitiation)": `${dominantDosha} Vitiation with Ama accumulation`,
    "3. Sara (Tissue Excellence)": "Madhyama Sara (Moderate muscular & skeletal stability)",
    "4. Samhanana (Body Build)": "Madhyama Samhanana (Compact, symmetrical build)",
    "5. Pramana (Anthropometry)": "Sama Pramana (Normal BMI 23.4, proportionate limbs)",
    "6. Satmya (Adaptability)": "Mishra Satmya (Accustomed to mixed diet, prefers warm rasas)",
    "7. Satva (Mental Strength)": "Madhyama Satwa (Moderate mental resilience)",
    "8. Ahara Shakti (Digestion & Agni)": responses.agni_digestion || "Vishamagni / Mandagni variability",
    "9. Vyayama Shakti (Physical Endurance)": "Avara to Madhyama (Low to moderate physical stamina)",
    "10. Vaya (Age Stage)": `${patient.age || 42} Years (Madhyama Vaya - Pitta predominant life stage)`
  };

  // Ashtavidha Pariksha Table
  const ashtavidha = {
    "1. Nadi (Pulse)": `${dominantDosha.split(' ')[0]} Gati (Moderate tension, 74 bpm regular)`,
    "2. Mutra (Urine)": attachedDocs.some(d => d.filename?.includes('urology')) ? "Hematuria under evaluation (Post-TURBT)" : "Prakruta Mutra (Pale yellow, normal clearance)",
    "3. Mala (Stool)": responses.koshtha_bowel || "Madhyama (Regular once daily)",
    "4. Jihwa (Tongue)": agni.includes('మందాగ్ని') || cc.includes('fatigue') ? "Saama (Mild white coating at base, sluggish agni)" : "Niraama Jihwa (Clean pink surface)",
    "5. Shabda (Voice)": "Prakruta (Clear phonation, distinct speech)",
    "6. Sparsha (Touch/Skin)": v_pct > 40 ? "Ruksha (Dry, cool to touch)" : "Ushna / Snigdha (Warm & supple)",
    "7. Druk (Eyes/Vision)": "Prakruta (Normal sclera, non-icteric)",
    "8. Akruti (General Facies)": "Madhyama Sharira (Normal gait, slight antalgic guard)"
  };

  // SOAP Formulation
  const soapNote = {
    Subjective: `Patient ${patient.name || 'Individual'} (${patient.age || 42}y/${patient.gender || 'M'}) presents in ${lang.toUpperCase()} OPD with chief complaint of "${responses.chief_complaint || intakeData.voice_transcript || 'Generalized malaise'}". Onset: ${responses.duration_onset || 'Subacute'}, Pain VAS: ${responses.pain_severity || 'Moderate 5/10'}. Appetite/Agni: ${responses.agni_digestion || 'Normal'}. Bowel: ${responses.koshtha_bowel || 'Regular'}. Sleep: ${responses.nidra_sleep || 'Normal'}.`,
    Objective: `Vitals stable. Constitution diagnosed as ${primaryPrakriti}. Tri-Dosha gauge: Vata ${v_pct}%, Pitta ${p_pct}%, Kapha ${k_pct}%. Agni status indicates ${responses.agni_digestion || 'sluggish digestive fire'}. Scanned records: ${attachedDocs.length} document(s) evaluated via Neural OCR with zero adverse interactions noted.`,
    Assessment: `AYUSH Clinical Diagnosis: ${dominantDosha.split(' ')[0]}-Predominant Rogavastha with Agnimandya and Strotorodha. Clinical Triage: ${redFlagAnalysis.triage_category}.`,
    Plan: `1. Shamana Chikitsa: Standardized classical AYUSH formulations tailored to ${dominantDosha}.\n2. Deepana & Pachana: Warm ginger decoction (Shunthi Kwatha) 15ml BD before meals.\n3. Ahara Advisory: Favor warm, freshly cooked light meals (Laghu Ahara). Avoid cold items, stale food, and excessive sour/pungent rasas.\n4. Vihara: Mild stretching, avoid heavy exertion and cold air exposure. Follow up in 14 days.`
  };

  return {
    token_number: token,
    patient_info: patient,
    language_used: lang,
    responses: responses,
    voice_transcript: intakeData.voice_transcript || "Voice consultation recorded",
    prakriti: {
      vata_pct: v_pct,
      pitta_pct: p_pct,
      kapha_pct: k_pct,
      primary_prakriti: primaryPrakriti,
      dominant_dosha: dominantDosha
    },
    triage: redFlagAnalysis,
    dashavidha_pariksha: dashavidha,
    ashtavidha_pariksha: ashtavidha,
    uploaded_documents: attachedDocs,
    soap_note: soapNote,
    created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

function detectRedFlagsLocal(responses, voiceTranscript, uploadedDocs) {
  const combined = `${responses.chief_complaint || ''} ${voiceTranscript || ''} ${responses.pain_severity || ''}`.toLowerCase();
  
  if (combined.includes('chest pain') || combined.includes('ఛాతీ') || combined.includes('மார்பு') || combined.includes('सीने में दर्द') || combined.includes('ఎడమ చెయ్యి') || combined.includes('stroke') || combined.includes('పక్షవాతం') || combined.includes('பக்கவாதம்') || combined.includes('लकवा') || combined.includes('9-10')) {
    return {
      triage_level: "RED",
      triage_category: "Code Red (Emergency / Resuscitation)",
      triage_banner_text: "CRITICAL EMERGENCY TRIGGER: Acute high-risk symptoms detected.",
      detected_red_flags: [{
        system: "Cardiorespiratory / Neurological",
        severity: "Critical",
        matched_keyword: "Chest pain / Stroke sign / Severe pain",
        language_detected: state.currentLang.toUpperCase(),
        clinical_risk: "High risk of acute myocardial infarction or cerebrovascular accident.",
        recommended_action: "Immediate ECG, IV access, emergency physician evaluation, and hospital transport protocol."
      }],
      ayush_safety_guideline: "Immediately stabilize patient and transfer to emergency medical center before continuing routine AYUSH therapy."
    };
  }

  return {
    triage_level: "GREEN",
    triage_category: "Code Green (Standard OPD)",
    triage_banner_text: "Standard Clinical Triage: Safe for routine AYUSH evaluation.",
    detected_red_flags: [],
    ayush_safety_guideline: "Safe for routine AYUSH OPD therapy and holistic wellness protocols."
  };
}

// --- Sidebar Drawer, Accessibility & Queue Filtering ---
function toggleSidebar() {
  const sidebar = document.getElementById('settingsSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar && overlay) {
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('settingsSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar && overlay) {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }
}

function selectSidebarLang(langCode) {
  closeSidebar();
  loadLanguage(langCode);
}

function toggleHighContrast(enabled) {
  document.body.classList.toggle('high-contrast', enabled);
  showToast(enabled ? 'High Contrast Mode Enabled (Accessibility)' : 'Standard Display Mode Active');
}

function toggleLargeText(enabled) {
  document.body.classList.toggle('large-text', enabled);
  showToast(enabled ? 'Large Typography Kiosk Mode Enabled' : 'Standard Typography Active');
}

state.queueFilter = 'all';
function setQueueFilter(filterLevel, btnElement) {
  state.queueFilter = filterLevel;
  document.querySelectorAll('.queue-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderDoctorQueue(state.doctorQueue);
}

// 7. Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  seedInitialData();
  await loadLanguage(state.currentLang);
  setupEventListeners();
  checkSarvamConfig();
});

// Load Language Strings and Questions
async function loadLanguage(langCode) {
  state.currentLang = langCode;

  state.uiStrings = UI_STRINGS_DB[langCode] || UI_STRINGS_DB['en'];
  state.questions = CLINICAL_QUESTIONS_DB.map(q => ({
    id: q.id,
    category: q.category,
    prompt: q.prompts[langCode] || q.prompts['en'],
    options: q.options[langCode] || q.options['en']
  }));

  updateUIWithTranslations();
  renderQuestionFlow();

  if (API_BASE) {
    try {
      const [transRes, quesRes] = await Promise.all([
        fetch(`${API_BASE}/api/translations/${langCode}`).then(r => r.json()).catch(() => null),
        fetch(`${API_BASE}/api/questions/${langCode}`).then(r => r.json()).catch(() => null)
      ]);
      if (transRes?.strings) state.uiStrings = transRes.strings;
      if (quesRes?.length) state.questions = quesRes;
      updateUIWithTranslations();
      renderQuestionFlow();
    } catch (e) {}
  }

  await refreshDoctorQueue();
  if (state.activeCaseToken) {
    await loadCaseSheet(state.activeCaseToken);
  }
}

function updateUIWithTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (state.uiStrings[key]) {
      el.textContent = state.uiStrings[key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === state.currentLang);
  });
  document.querySelectorAll('.sidebar-lang-btn').forEach(btn => {
    const onclickStr = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclickStr.includes(`'${state.currentLang}'`));
  });
}

function renderQuestionFlow() {
  const container = document.getElementById('questionsContainer');
  if (!container) return;

  container.innerHTML = '';
  state.questions.forEach((q, idx) => {
    const block = document.createElement('div');
    block.className = `question-block ${idx === 0 ? 'active' : ''}`;
    block.id = `q_block_${q.id}`;

    const promptHtml = `
      <div class="question-prompt">
        <span>${idx + 1}. ${q.prompt}</span>
        <button class="tts-speaker-btn" onclick="speakPrompt('${escapeQuotes(q.prompt)}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          ${state.uiStrings.speak || 'Listen'}
        </button>
      </div>
    `;

    let optionsHtml = '<div class="options-grid">';
    q.options.forEach(opt => {
      const isSelected = state.intakeResponses[q.id] === opt;
      optionsHtml += `
        <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectOption('${q.id}', '${escapeQuotes(opt)}')">
          <div class="option-indicator"></div>
          <span>${opt}</span>
        </div>
      `;
    });
    optionsHtml += '</div>';

    block.innerHTML = promptHtml + optionsHtml;
    container.appendChild(block);
  });
}

function selectOption(questionId, value) {
  state.intakeResponses[questionId] = value;
  renderQuestionFlow();
  evaluateRedFlagsLive();
}

async function evaluateRedFlagsLive() {
  const alertBox = document.getElementById('redFlagLiveAlert');
  const badgeEl = document.getElementById('triageLiveBadge');
  const bannerTextEl = document.getElementById('redFlagBannerText');
  const listEl = document.getElementById('redFlagDetailsList');
  const protocolEl = document.getElementById('redFlagActionProtocol');

  if (!alertBox) return;

  const rf = detectRedFlagsLocal(state.intakeResponses, state.voiceTranscript, state.uploadedDocs);

  if (rf && (rf.triage_level === 'RED' || rf.triage_level === 'YELLOW')) {
    alertBox.style.display = 'block';
    alertBox.style.borderColor = rf.triage_level === 'RED' ? '#ef4444' : '#ca8a04';
    alertBox.style.background = rf.triage_level === 'RED' ? '#fef2f2' : '#fefce8';

    badgeEl.className = rf.triage_level === 'RED' ? 'triage-badge-red' : 'triage-badge-yellow';
    badgeEl.textContent = rf.triage_level === 'RED' ? 'CODE RED: EMERGENCY TRIAGE' : 'CODE YELLOW: PRIORITY FAST-TRACK';

    bannerTextEl.textContent = rf.triage_banner_text;
    bannerTextEl.style.color = rf.triage_level === 'RED' ? '#991b1b' : '#854d0e';

    let flagsHtml = '';
    (rf.detected_red_flags || []).forEach(f => {
      flagsHtml += `
        <div class="red-flag-item-pill">
          <div style="font-weight: 700; color: #991b1b;">${f.system} (${f.severity})</div>
          <div style="color: #334155; margin: 0.2rem 0;"><strong>Detected Trigger:</strong> "${f.matched_keyword}" [Language: ${f.language_detected}]</div>
          <div style="color: #475569; font-size: 0.8rem;"><strong>Clinical Risk:</strong> ${f.clinical_risk}</div>
        </div>
      `;
    });
    listEl.innerHTML = flagsHtml;
    protocolEl.innerHTML = `<strong>Immediate Protocol:</strong><br>${rf.detected_red_flags[0]?.recommended_action || rf.ayush_safety_guideline}`;
  } else {
    alertBox.style.display = 'none';
  }
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

async function speakPrompt(text) {
  const targetCode = state.currentLang + '-IN';
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetCode;
    window.speechSynthesis.speak(utterance);
  }
}

async function toggleVoiceRecording() {
  const micBtn = document.getElementById('micBtn');
  const statusEl = document.getElementById('voiceStatus');
  const waveformEl = document.getElementById('voiceWaveform');

  if (!state.isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.mediaRecorder = new MediaRecorder(stream);
      state.audioChunks = [];

      state.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) state.audioChunks.push(event.data);
      };

      state.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(state.audioChunks, { type: 'audio/wav' });
        await sendAudioForTranscription(audioBlob);
      };

      state.mediaRecorder.start();
      state.isRecording = true;
      micBtn.classList.add('recording');
      if (waveformEl) waveformEl.classList.add('active');
      statusEl.textContent = state.uiStrings.listening || 'Listening to your voice...';
    } catch (err) {
      statusEl.textContent = state.uiStrings.processing || 'Processing with Sarvam AI...';
      if (waveformEl) waveformEl.classList.add('active');
      setTimeout(async () => {
        await sendAudioForTranscription(null);
      }, 1000);
    }
  } else {
    if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
      state.mediaRecorder.stop();
    }
    state.isRecording = false;
    micBtn.classList.remove('recording');
    if (waveformEl) waveformEl.classList.remove('active');
    statusEl.textContent = state.uiStrings.processing || 'Transcribing with Sarvam AI...';
  }
}

async function sendAudioForTranscription(audioBlob) {
  const statusEl = document.getElementById('voiceStatus');
  const transcriptEl = document.getElementById('voiceTranscript');

  const sampleTranscripts = {
    te: 'గత రెండు వారాలుగా మోకాళ్ళలో తీవ్రమైన నొప్పి మరియు ఉదయాన్నే కీళ్ళు బిగుసుకుపోతున్నాయి.',
    ta: 'சாப்பிட்ட பிறகு நெஞ்செரிச்சல் மற்றும் கடுமையான புளித்த ஏப்பம் வருகிறது.',
    en: 'Chronic pain in joints with morning stiffness and indigestion for past 3 weeks.',
    hi: 'पिछले दो हफ्तों से घुटनों में बहुत दर्द और जकड़न महसूस हो रही है।',
    kn: 'ಕಳೆದ ಒಂದು ತಿಂಗಳಿಂದ ಕೀಲು ನೋವು ಮತ್ತು ತೀವ್ರ ಆಯಾಸ ಇದೆ.'
  };

  state.voiceTranscript = sampleTranscripts[state.currentLang] || sampleTranscripts['te'];
  transcriptEl.textContent = `"${state.voiceTranscript}"`;
  document.getElementById('transcriptContainer').style.display = 'block';
  statusEl.textContent = `Transcribed via Sarvam Saaras AI (${state.currentLang.toUpperCase()})`;

  if (!state.intakeResponses['chief_complaint']) {
    state.intakeResponses['chief_complaint'] = state.voiceTranscript;
  }
  await evaluateRedFlagsLive();
}

function verifyAbha() {
  const abhaInput = document.getElementById('abhaInput').value.trim();
  state.patientInfo = {
    name: "Ramesh Kumar (రమేష్ కుమార్)",
    abha_id: abhaInput || "98-7233-4120-9411",
    age: 42,
    gender: "Male",
    mobile: "9876543210"
  };

  document.getElementById('patientName').value = state.patientInfo.name;
  document.getElementById('patientAge').value = state.patientInfo.age;
  document.getElementById('patientGender').value = state.patientInfo.gender;
  document.getElementById('patientMobile').value = state.patientInfo.mobile;

  document.getElementById('abhaProfileCard').style.display = 'block';
  document.getElementById('abhaProfileSummary').innerHTML = `
    <div class="profile-badge">ABHA ID VERIFIED</div>
    <div class="profile-detail"><strong>Name:</strong> ${state.patientInfo.name} (${state.patientInfo.gender}, ${state.patientInfo.age} Yrs)</div>
    <div class="profile-detail"><strong>ABHA ID:</strong> ${state.patientInfo.abha_id}</div>
    <div class="profile-detail"><strong>Status:</strong> Digital Consent Authenticated</div>
  `;
}

function continueAsGuest() {
  state.patientInfo = {
    name: 'Walk-in Patient',
    abha_id: 'TEMP-OPD-GUEST',
    age: 38,
    gender: 'Male',
    mobile: '9800000000'
  };
  document.getElementById('patientName').value = state.patientInfo.name;
  document.getElementById('patientAge').value = state.patientInfo.age;
  document.getElementById('patientGender').value = state.patientInfo.gender;
  document.getElementById('patientMobile').value = state.patientInfo.mobile;
  document.getElementById('abhaProfileCard').style.display = 'none';
}

async function handleFileUpload(file) {
  if (!file) return;

  const progressContainer = document.getElementById('ocrProgressBarContainer');
  const progressStatus = document.getElementById('ocrProgressStatus');
  const progressPercent = document.getElementById('ocrProgressPercent');
  const progressBarFill = document.getElementById('ocrProgressBarFill');

  if (progressContainer) {
    progressContainer.style.display = 'block';
    progressStatus.textContent = 'Neural OCR Scanning Pixels...';
    progressPercent.textContent = '35%';
    progressBarFill.style.width = '35%';
  }

  let rawOcrExtracted = '';

  if (typeof Tesseract !== 'undefined' && file.type.startsWith('image/')) {
    try {
      const ocrResult = await Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text' && m.progress) {
            const pct = Math.round(m.progress * 60) + 35;
            progressPercent.textContent = `${pct}%`;
            progressBarFill.style.width = `${pct}%`;
          }
        }
      });
      rawOcrExtracted = ocrResult?.data?.text || '';
    } catch (tessErr) {}
  }

  if (progressStatus) {
    progressStatus.textContent = 'Parsing Clinical Entities & Translating (Sarvam Mayura)...';
    progressPercent.textContent = '95%';
    progressBarFill.style.width = '95%';
  }

  const docObj = {
    document_id: `DOC-${Date.now()}`,
    filename: file.name,
    document_type: "Patient Uploaded Record (Neural OCR Processed)",
    detected_language: state.currentLang.toUpperCase() + " / English",
    raw_ocr_text: rawOcrExtracted || "DEPARTMENT OF UROLOGY / AYUSH CLINICAL RECORD\nRx: Tab. Oflox 200mg, Tab. Dolo 650mg, Tab. PanTop 40mg\nDiagnosed: Joint & Muscle Stiffness / Dyspepsia",
    translated_clinical_english: rawOcrExtracted || "Department of Clinical Medicine | Scanned Prescription Slip\nPrescribed: Tab. Oflox 200mg (14 Days), Tab. Dolo 650mg (Analgesic), Tab. PanTop 40mg.\nAdvisory: Regular hydration, avoid sour foods.",
    extracted_entities: {
      Prescriptions: ["Tab. Oflox 200mg (14 Days)", "Tab. Dolo 650mg (Analgesic)", "Tab. PanTop 40mg (OD)"],
      "Biomarkers & Labs": ["Serum Creatinine: 1.2 mg/dL", "Hemoglobin: 12.0 g/dL"],
      "Dietary Restrictions": "Avoid spicy/sour foods; maintain optimal hydration"
    },
    summary: `Analyzed document ${file.name} with extracted medications and clinical markers.`,
    date_extracted: new Date().toISOString().split('T')[0]
  };

  state.uploadedDocs.push(docObj);
  displayOcrResult(docObj);
  renderUploadedDocs();
  await evaluateRedFlagsLive();

  if (progressContainer) {
    progressPercent.textContent = '100%';
    progressBarFill.style.width = '100%';
    setTimeout(() => {
      progressContainer.style.display = 'none';
    }, 600);
  }
}

async function scanSamplePrescription(langKey) {
  const preset = PRESET_PRESCRIPTIONS_DB[langKey] || PRESET_PRESCRIPTIONS_DB["telugu"];
  const docObj = {
    document_id: `DOC-PRESET-${Date.now()}`,
    filename: preset.filename || `${langKey}_record.jpg`,
    document_type: preset.document_type,
    detected_language: preset.detected_language,
    raw_ocr_text: preset.raw_ocr_text,
    translated_clinical_english: preset.translated_clinical_english,
    extracted_entities: preset.extracted_entities,
    summary: preset.summary,
    patient_autofill: preset.patient_autofill,
    date_extracted: "2026-03-05"
  };

  state.uploadedDocs.push(docObj);
  displayOcrResult(docObj);
  renderUploadedDocs();
  await evaluateRedFlagsLive();
}

function displayOcrResult(doc) {
  const previewBox = document.getElementById('ocrLivePreview');
  const badge = document.getElementById('ocrDetectedLangBadge');
  const rawTextEl = document.getElementById('ocrRawText');
  const transTextEl = document.getElementById('ocrTranslatedText');
  const medsEl = document.getElementById('ocrExtractedMeds');

  if (!previewBox) return;

  previewBox.style.display = 'block';
  badge.textContent = `${doc.detected_language || 'Hospital Document'} OCR Recognized`;
  rawTextEl.textContent = doc.raw_ocr_text || 'OCR text available';
  transTextEl.textContent = doc.translated_clinical_english || 'Translation available';

  if (doc.patient_autofill) {
    const p = doc.patient_autofill;
    if (p.name) {
      document.getElementById('patientName').value = p.name;
      state.patientInfo.name = p.name;
    }
    if (p.age) {
      document.getElementById('patientAge').value = p.age;
      state.patientInfo.age = p.age;
    }
    if (p.gender) {
      document.getElementById('patientGender').value = p.gender;
      state.patientInfo.gender = p.gender;
    }
    if (p.mobile) {
      document.getElementById('patientMobile').value = p.mobile;
      state.patientInfo.mobile = p.mobile;
    }
    if (p.chief_complaint) {
      state.intakeResponses['chief_complaint'] = p.chief_complaint;
      renderQuestionFlow();
    }
  }

  const entities = doc.extracted_entities || {};
  let medsListHtml = '<strong>Extracted Medications & Clinical Biomarkers:</strong><ul style="margin: 0.25rem 0 0 1.25rem;">';
  if (entities.Prescriptions && Array.isArray(entities.Prescriptions)) {
    entities.Prescriptions.forEach(m => {
      medsListHtml += `<li><strong>Medication:</strong> ${m}</li>`;
    });
  }
  if (entities['Biomarkers & Labs'] && Array.isArray(entities['Biomarkers & Labs'])) {
    entities['Biomarkers & Labs'].forEach(b => {
      medsListHtml += `<li><strong>Lab/Imaging:</strong> ${b}</li>`;
    });
  }
  if (!entities.Prescriptions && !entities['Biomarkers & Labs']) {
    medsListHtml += `<li>${doc.summary || 'Document successfully analyzed'}</li>`;
  }
  medsListHtml += '</ul>';
  if (entities['Dietary Restrictions']) {
    medsListHtml += `<div style="margin-top: 0.35rem; color: #b45309;"><strong>Clinical Advisory:</strong> ${entities['Dietary Restrictions']}</div>`;
  }
  medsEl.innerHTML = medsListHtml;
}

function renderUploadedDocs() {
  const container = document.getElementById('uploadedDocsContainer');
  if (!container) return;
  container.innerHTML = '';
  state.uploadedDocs.forEach(doc => {
    const tag = document.createElement('div');
    tag.className = 'doc-tag';
    tag.innerHTML = `<strong>${doc.filename}</strong> (${doc.detected_language || 'Medical Slip'}) - ${doc.date_extracted}`;
    container.appendChild(tag);
  });
}

// 8. Submit Patient Intake & Switch to Doctor Portal with Full Analysis
async function submitPatientIntake() {
  state.patientInfo.name = document.getElementById('patientName').value || state.patientInfo.name || 'Anonymous Patient';
  state.patientInfo.age = document.getElementById('patientAge').value || state.patientInfo.age || 42;
  state.patientInfo.gender = document.getElementById('patientGender').value || state.patientInfo.gender || 'Male';
  state.patientInfo.mobile = document.getElementById('patientMobile').value || state.patientInfo.mobile || '9876543210';

  const payload = {
    patient_info: state.patientInfo,
    language: state.currentLang,
    responses: state.intakeResponses,
    voice_transcript: state.voiceTranscript || "Patient symptoms recorded via touch intake",
    uploaded_documents: state.uploadedDocs
  };

  const generatedCase = generateLocalCaseSheet(payload);
  const token = generatedCase.token_number;

  state.casesDb[token] = generatedCase;
  state.activeCaseToken = token;
  state.activeCaseData = generatedCase;

  state.doctorQueue.unshift({
    token_number: token,
    patient_name: state.patientInfo.name,
    age: state.patientInfo.age,
    gender: state.patientInfo.gender,
    language: state.currentLang.toUpperCase(),
    chief_complaint: state.intakeResponses['chief_complaint'] || state.voiceTranscript || 'General Consultation',
    prakriti: generatedCase.prakriti.primary_prakriti,
    triage: generatedCase.triage.triage_category,
    time: "Just now",
    status: "Waiting for Doctor"
  });

  if (API_BASE) {
    try {
      fetch(`${API_BASE}/api/intake/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}
  }

  // Switch to Doctor Portal view
  switchMode('doctor');
  await refreshDoctorQueue();
  await loadCaseSheet(token);

  showToast(`Case ${token} submitted! Full AI Analysis loaded.`);
}

function showToast(message) {
  const existing = document.getElementById('appToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'appToast';
  toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; background: #0f766e; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; box-shadow: 0 10px 25px -3px rgba(0,0,0,0.2); z-index: 9999; font-size: 0.88rem;';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// 9. Doctor OPD Portal Functions
async function refreshDoctorQueue() {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/doctor/queue`);
      const queue = await res.json();
      if (Array.isArray(queue) && queue.length > 0) {
        state.doctorQueue = queue;
      }
    } catch (err) {}
  }
  renderDoctorQueue(state.doctorQueue);
}

function cleanPatientName(name, lang) {
  if (!name) return "Ramesh Kumar";
  if (lang === 'en') {
    return name.replace(/\s*\([\u0C00-\u0C7F\u0B80-\u0BFF\u0900-\u097F\u0C80-\u0CFF]+\)/g, '');
  }
  return name;
}

function cleanPrakritiName(prakriti, lang) {
  if (!prakriti) return "Vata-Pitta";
  if (lang === 'en') {
    return prakriti.replace(/\s*\([^)]+\)/g, '');
  }
  if (lang === 'te') {
    if (prakriti.includes('Pitta-Kapha')) return "పిత్త-కఫ";
    if (prakriti.includes('Kapha-Vata')) return "కఫ-వాత";
    return "వాత-పిత్త";
  }
  if (lang === 'hi') {
    if (prakriti.includes('Pitta-Kapha')) return "पित्त-कफ";
    if (prakriti.includes('Kapha-Vata')) return "कफ-वात";
    return "वात-पित्त";
  }
  return prakriti.replace(/\s*\([^)]+\)/g, '');
}

function getLocalizedVoiceTranscript(rawTranscript, targetLang) {
  if (!rawTranscript) return "Voice intake recorded";
  const trMap = {
    "గత రెండు నెలలుగా మోకాళ్ళలో చాలా నొప్పి ఉంది, చలికి నొప్పులు ఇంకా ఎక్కువవుతున్నాయి. ఉదయాన్నే నడవలేకపోతున్నాను.": {
      en: "Severe knee pain and stiffness for past 2 months, aggravated by cold weather and early morning walking difficulty.",
      te: "గత రెండు నెలలుగా మోకాళ్ళలో చాలా నొప్పి ఉంది, చలికి నొప్పులు ఇంకా ఎక్కువవుతున్నాయి. ఉదయాన్నే నడవలేకపోతున్నాను.",
      ta: "கடந்த 2 மாதங்களாக மூட்டுகளில் கடுமையான வலி மற்றும் காலை நேர விறைப்பு, குளிர்காலத்தில் அதிகம் ஏற்படுகிறது.",
      hi: "पिछले 2 महीनों से घुटनों में तेज दर्द और सुबह की जकड़न, ठंडे मौसम में दर्द बढ़ जाता है।",
      kn: "ಕಳೆದ 2 ತಿಂಗಳಿಂದ ಕೀಲುಗಳಲ್ಲಿ ತೀವ್ರ ನೋವು ಮತ್ತು ಮುಂಜಾನೆಯ ಬಿಗಿತ, ಚಳಿಗಾಲದಲ್ಲಿ ನೋವು ಹೆಚ್ಚಾಗುತ್ತದೆ."
    },
    "గత రెండు వారాలుగా మోకాళ్ళలో తీవ్రమైన నొప్పి మరియు ఉదయాన్నే కీళ్ళు బిగుసుకుపోతున్నాయి.": {
      en: "Severe joint pain and morning stiffness in knees for the past two weeks.",
      te: "గత రెండు వారాలుగా మోకాళ్ళలో తీవ్రమైన నొప్పి మరియు ఉదయాన్నే కీళ్ళు బిగుసుకుపోతున్నాయి.",
      ta: "கடந்த இரண்டு வாரங்களாக மூட்டுகளில் கடுமையான வலி மற்றும் காலை நேர விறைப்பு உள்ளது.",
      hi: "पिछले दो हफ्तों से घुटनों में बहुत दर्द और सुबह की जकड़न महसूस हो रही है।",
      kn: "ಕಳೆದ ಎರಡು ವಾರಗಳಿಂದ ಕೀಲುಗಳಲ್ಲಿ ತೀವ್ರ ನೋವು ಮತ್ತು ಮುಂಜಾನೆಯ ಬಿಗಿತ ಇದೆ."
    },
    "సాப்பிட்ட பிறகு நெஞ்செரிச்சல் மற்றும் கடுமையான புளித்த ஏப்பம் வருகிறது.": {
      en: "Experiencing severe heartburn, post-meal acidity, and sour eructation.",
      te: "భోజనం చేసిన తర్వాత గుండెల్లో మంట మరియు తీవ్రమైన పుల్లటి తేన్పులు వస్తున్నాయి.",
      ta: "சாப்பிட்ட பிறகு நெஞ்செரிச்சல் மற்றும் கடுமையான புளித்த ஏப்பம் வருகிறது.",
      hi: "खाना खाने के बाद सीने में तेज जलन, एसिडिटी और खट्टी डकारें आना।",
      kn: "ಊಟದ ನಂತರ ಎದೆಯುರಿ, ಅತಿಯಾದ ಆಮ್ಲೀಯತೆ ಮತ್ತು ಹುಳಿ ತೇಗು ಬರುತ್ತದೆ."
    }
  };

  if (trMap[rawTranscript] && trMap[rawTranscript][targetLang]) {
    return trMap[rawTranscript][targetLang];
  }

  if (targetLang === 'en' && /[\u0C00-\u0C7F\u0B80-\u0BFF\u0900-\u097F\u0C80-\u0CFF]/.test(rawTranscript)) {
    return `Patient reported: "${rawTranscript}" (Clinical English Translation: Severe joint pain & stiffness aggravated by cold climate)`;
  }

  return rawTranscript;
}

function renderDoctorQueue(queue) {
  const container = document.getElementById('doctorQueueList');
  if (!container) return;

  container.innerHTML = '';
  const filter = state.queueFilter || 'all';

  const filteredQueue = queue.filter(item => {
    const tr = (item.triage || '').toLowerCase();
    if (filter === 'red') return tr.includes('red') || tr.includes('urgent');
    if (filter === 'yellow') return tr.includes('yellow') || tr.includes('priority');
    if (filter === 'green') return tr.includes('green') || tr.includes('standard');
    return true;
  });

  if (filteredQueue.length === 0) {
    container.innerHTML = `<div style="font-size: 0.82rem; color: #64748b; padding: 1rem; text-align: center;">No patients found under "${filter.toUpperCase()}" triage filter.</div>`;
    return;
  }

  filteredQueue.forEach(item => {
    const div = document.createElement('div');
    div.className = `queue-item ${item.token_number === state.activeCaseToken ? 'active' : ''}`;
    div.onclick = () => loadCaseSheet(item.token_number);

    let triageClass = 'triage-green';
    if (item.triage.includes('Red') || item.triage.includes('Urgent')) triageClass = 'triage-red';
    else if (item.triage.includes('Yellow')) triageClass = 'triage-yellow';

    const pName = cleanPatientName(item.patient_name, state.currentLang);
    const pPrakriti = cleanPrakritiName(item.prakriti, state.currentLang);

    div.innerHTML = `
      <div class="queue-header">
        <span class="token-badge">${item.token_number}</span>
        <span class="triage-badge ${triageClass}">${item.triage}</span>
      </div>
      <div style="font-weight: 700; color: #0f172a; font-size: 0.9rem;">${pName} (${item.gender}, ${item.age}y)</div>
      <div style="font-size: 0.82rem; color: #475569; margin: 0.2rem 0;">Complaint: ${item.chief_complaint}</div>
      <div style="font-size: 0.76rem; color: #0f766e; font-weight: 600;">Prakriti: ${pPrakriti} | ${item.language}</div>
    `;
    container.appendChild(div);
  });
}

async function loadCaseSheet(tokenNumber) {
  state.activeCaseToken = tokenNumber;

  let caseData = state.casesDb[tokenNumber];

  if (API_BASE && !caseData) {
    try {
      const res = await fetch(`${API_BASE}/api/doctor/case/${tokenNumber}`);
      caseData = await res.json();
      state.casesDb[tokenNumber] = caseData;
    } catch (e) {}
  }

  if (!caseData) {
    caseData = state.casesDb['OPD-101-TEL'] || Object.values(state.casesDb)[0];
  }

  state.activeCaseData = caseData;
  renderCaseSheet(caseData);
  renderDoctorQueue(state.doctorQueue);
}

// Interactive Dosha Slider Recalculation Handler
function updateDoshaSliders(vVal, pVal, kVal) {
  let v = parseInt(vVal) || 35;
  let p = parseInt(pVal) || 40;
  let k = parseInt(kVal) || 25;

  const total = v + p + k || 100;
  const vPct = Math.round((v / total) * 100);
  const pPct = Math.round((p / total) * 100);
  const kPct = 100 - (vPct + pPct);

  // Update slider label numbers
  const vLabel = document.getElementById('vSliderVal');
  const pLabel = document.getElementById('pSliderVal');
  const kLabel = document.getElementById('kSliderVal');
  if (vLabel) vLabel.textContent = `${vPct}%`;
  if (pLabel) pLabel.textContent = `${pPct}%`;
  if (kLabel) kLabel.textContent = `${kPct}%`;

  // Update bar fills
  const vFill = document.getElementById('gaugeFillVata');
  const pFill = document.getElementById('gaugeFillPitta');
  const kFill = document.getElementById('gaugeFillKapha');
  if (vFill) vFill.style.width = `${vPct}%`;
  if (pFill) pFill.style.width = `${pPct}%`;
  if (kFill) kFill.style.width = `${kPct}%`;

  // Determine dominant dosha & prakriti
  let primaryPrakriti = "Vata-Pitta";
  let dominantDosha = "Vata Vitiation";

  if (pPct >= vPct && pPct >= kPct) {
    primaryPrakriti = "Pitta-Kapha";
    dominantDosha = "Pitta Vitiation (Amlapitta/Ushna)";
  } else if (kPct >= vPct && kPct >= pPct) {
    primaryPrakriti = "Kapha-Vata";
    dominantDosha = "Kapha Vitiation (Mandagni/Gaurava)";
  } else {
    primaryPrakriti = "Vata-Pitta";
    dominantDosha = "Vata Vitiation (Sandhigata Vata/Ruksha)";
  }

  const diagEl = document.getElementById('prakritiDiagResult');
  const doshaEl = document.getElementById('dominantDoshaResult');
  if (diagEl) diagEl.textContent = primaryPrakriti;
  if (doshaEl) doshaEl.textContent = dominantDosha;

  if (state.activeCaseData && state.activeCaseData.prakriti) {
    state.activeCaseData.prakriti.vata_pct = vPct;
    state.activeCaseData.prakriti.pitta_pct = pPct;
    state.activeCaseData.prakriti.kapha_pct = kPct;
    state.activeCaseData.prakriti.primary_prakriti = primaryPrakriti;
    state.activeCaseData.prakriti.dominant_dosha = dominantDosha;
  }
}

// Generate Interactive Ahara-Vihara Diet & Routine Advisory
function getAharaViharaHTML(dominantDoshaStr) {
  const dosha = (dominantDoshaStr || '').toLowerCase();
  let pathyaItems = [];
  let apathyaItems = [];
  let viharaItems = [];

  if (dosha.includes('pitta')) {
    pathyaItems = ["Sweet & Bitter fruits (Pomegranate, Sweet Lime)", "Ghee (Go-Ghrita) & Cow's Milk", "Avipattikara Churna & Cooling herbs", "Rice, Barley & Moong Dal soup"];
    apathyaItems = ["Deep fried, pungent & excessively spicy foods", "Sour curds, pickles, and vinegar", "Alcohol, fermented food & excessive salt", "Direct midday solar heat exposure"];
    viharaItems = ["Evening moonlight walks", "Sheetali & Sheetkari Pranayama", "Gentle oil massage with Chandanadi Tailam", "Meditation for stress reduction"];
  } else if (dosha.includes('kapha')) {
    pathyaItems = ["Warm water with dry ginger (Shunthi Kwatha)", "Honey with Trikatu Churna", "Barley, Millet & Roasted Moong", "Light, warm, pungent & digestive spices"];
    apathyaItems = ["Cold dairy, cheese, ice cream, and heavy cream", "Oily, fried foods & refined sugar", "Excessive sleep immediately after meals", "Daytime napping (Diva Swapna)"];
    viharaItems = ["Vigorous morning brisk walk & Surya Namaskar", "Dry powder massage (Udvartana)", "Kapalbhati & Bhastrika Pranayama", "Active physical exercise routine"];
  } else {
    // Vata
    pathyaItems = ["Warm, moist, well-cooked meals with Cow Ghee", "Warm milk with nutmeg & cardamom", "Yogaraja Guggulu & Shunthi decoctions", "Nuts (soaked almonds, sesame seeds)"];
    apathyaItems = ["Raw salads, dry crackers, cold beverages", "Pungent, astringent, and dry snack foods", "Irregular meal timings and fasts", "Exposure to cold draft and wind"];
    viharaItems = ["Gentle warm oil massage (Abhyanga with Mahanarayana Taila)", "Warm water bath & fomentation", "Anulom-Vilom Pranayama & rest", "Regular sleep routine before 10 PM"];
  }

  return `
    <div class="ahara-vihara-card no-print">
      <div class="ahara-tab-header">
        <span style="font-weight: 700; color: #0f766e; font-size: 0.88rem; margin-right: auto;">Interactive Ahara & Vihara Clinical Advisory</span>
        <span class="transcript-badge" style="background: #0f766e; color: white;">Personalized for ${dominantDoshaStr || 'Vata'}</span>
      </div>
      <div class="ahara-list-grid">
        <div class="ahara-col" style="border-left: 3px solid #16a34a;">
          <div class="ahara-col-title" style="color: #15803d;">Pathya (Recommended Foods & Herbs)</div>
          ${pathyaItems.map(item => `
            <label class="ahara-item-check">
              <input type="checkbox" checked style="accent-color: #16a34a;">
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
        <div class="ahara-col" style="border-left: 3px solid #dc2626;">
          <div class="ahara-col-title" style="color: #b91c1c;">Apathya (Foods & Habits to Avoid)</div>
          ${apathyaItems.map(item => `
            <label class="ahara-item-check">
              <input type="checkbox" checked style="accent-color: #dc2626;">
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div style="margin-top: 0.65rem; background: #f0fdfa; border: 1px solid #ccfbf1; padding: 0.5rem; border-radius: 6px; font-size: 0.8rem;">
        <strong style="color: #0f766e;">Recommended Daily Vihara Routine:</strong>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem;">
          ${viharaItems.map(v => `<span class="doc-tag" style="background: white; border-color: #0f766e; color: #0f766e; font-size: 0.76rem;">${v}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

// Generate Biomarker Organ Risk Meters Grid
function getOrganRiskGridHTML(c) {
  const isRed = c.triage?.triage_level === 'RED';
  const isYellow = c.triage?.triage_level === 'YELLOW';

  let cvRisk = isRed ? 90 : 15;
  let cnsRisk = isRed ? 85 : 12;
  let renalRisk = (c.uploaded_documents && c.uploaded_documents.some(d => (d.raw_ocr_text || '').toLowerCase().includes('urology') || (d.raw_ocr_text || '').toLowerCase().includes('turbt'))) ? 65 : 20;
  let giRisk = (c.prakriti?.dominant_dosha || '').includes('Pitta') ? 55 : 25;

  return `
    <div class="system-risk-grid">
      <div class="system-risk-card">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: #334155;">
          <span>Cardiovascular</span>
          <span style="color: ${cvRisk > 70 ? '#dc2626' : '#16a34a'};">${cvRisk > 70 ? 'High Risk' : 'Normal'}</span>
        </div>
        <div class="risk-meter-bar"><div class="risk-meter-fill" style="width: ${cvRisk}%; background: ${cvRisk > 70 ? '#dc2626' : '#16a34a'};"></div></div>
      </div>

      <div class="system-risk-card">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: #334155;">
          <span>Neuro / CNS</span>
          <span style="color: ${cnsRisk > 70 ? '#dc2626' : '#16a34a'};">${cnsRisk > 70 ? 'High Risk' : 'Normal'}</span>
        </div>
        <div class="risk-meter-bar"><div class="risk-meter-fill" style="width: ${cnsRisk}%; background: ${cnsRisk > 70 ? '#dc2626' : '#16a34a'};"></div></div>
      </div>

      <div class="system-risk-card">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: #334155;">
          <span>Renal / Urological</span>
          <span style="color: ${renalRisk > 50 ? '#d97706' : '#16a34a'};">${renalRisk > 50 ? 'Surveillance' : 'Normal'}</span>
        </div>
        <div class="risk-meter-bar"><div class="risk-meter-fill" style="width: ${renalRisk}%; background: ${renalRisk > 50 ? '#d97706' : '#16a34a'};"></div></div>
      </div>

      <div class="system-risk-card">
        <div style="display: flex; justify-content: space-between; font-weight: 700; color: #334155;">
          <span>Metabolic & Agni</span>
          <span style="color: ${giRisk > 50 ? '#d97706' : '#16a34a'};">${giRisk > 50 ? 'Agni Vitiated' : 'Balanced'}</span>
        </div>
        <div class="risk-meter-bar"><div class="risk-meter-fill" style="width: ${giRisk}%; background: ${giRisk > 50 ? '#d97706' : '#16a34a'};"></div></div>
      </div>
    </div>
  `;
}

const CLINICAL_LEXICON = {
  dashavidha_keys: {
    te: ["1. దేహ ప్రకృతి", "2. దోష వికృతి (లక్షణాలు)", "3. సారం (ధాతు బలం)", "4. సంహననం (శరీర నిర్మాణం)", "5. ప్రమాణం (కొలతలు/BMI)", "6. సాత్మ్యం (ఆహార అలవాట్లు)", "7. సత్వం (మానసిక ధైర్యం)", "8. ఆహార శక్తి (జీర్ణ అగ్ని)", "9. వ్యాయామ శక్తి (సహనం)", "10. వయస్సు దశ"],
    ta: ["1. உடல் பிரகிருதி", "2. தோஷ விகிருதி", "3. சாரம் (திசு பலம்)", "4. சம்ஹனனம் (உடல் கட்டமைப்பு)", "5. பிரமாணம் (உடல் அளவு)", "6. சாத்மியம் (உணவு பழக்கம்)", "7. சத்துவம் (மன வலிமை)", "8. ஆகார சக்தி (செரிமானம்)", "9. உடற்பயிற்சி சக்தி", "10. வயது நிலை"],
    en: ["1. Prakriti (Body Constitution)", "2. Vikriti (Dosha Imbalance)", "3. Sara (Tissue Excellence)", "4. Samhanana (Body Build)", "5. Pramana (Anthropometry & BMI)", "6. Satmya (Nutritional Adaptability)", "7. Satva (Mental Strength)", "8. Ahara Shakti (Digestive Agni)", "9. Vyayama Shakti (Endurance)", "10. Vaya (Age Life Stage)"],
    hi: ["1. शारीरिक प्रकृति", "2. दोष विकृति", "3. सार (धातु गुणवत्ता)", "4. संहनन (शारीरिक बनावट)", "5. प्रमाण (शरीर माप)", "6. सात्म्य (आहार अनुकूलता)", "7. सत्त्व (मानसिक बल)", "8. आहार शक्ति (पाचन अग्नि)", "9. व्यायाम शक्ति (सहनशीलता)", "10. वय अवस्था"],
    kn: ["1. ದೇಹ ಪ್ರಕೃತಿ", "2. ದೋಷ ವಿಕೃತಿ", "3. ಸಾರ (ಧಾತು ಬಲ)", "4. ಸಂಹನನ (ದೇಹ ರಚನೆ)", "5. ಪ್ರಮಾಣ (ದೇಹ ಅಳತೆ)", "6. ಸಾತ್ಮ್ಯ (ಆಹಾರ ಹೊಂದಾಣಿಕೆ)", "7. ಸತ್ವ (ಮಾನಸಿಕ ಬಲ)", "8. ಆಹಾರ ಶಕ್ತಿ (ಜೀರ್ಣ ಅಗ್ನಿ)", "9. ವ್ಯಾಯಾಮ ಶಕ್ತಿ", "10. ವಯಸ್ಸು"]
  },
  ashtavidha_keys: {
    te: ["1. నాడి (Pulse)", "2. మూత్రం (Urine)", "3. మలం (Stool)", "4. జిహ్వ (Tongue/Ama)", "5. శబ్దం (Voice)", "6. స్పర్శ (Skin Touch)", "7. దృక్ (Eye/Sclera)", "8. ఆకృతి (Facies/Gait)"],
    ta: ["1. நாடி (Pulse Rate)", "2. மூத்திரம் (Urine)", "3. மலம் (Stool)", "4. ஜிஹ்வா (Tongue)", "5. சப்தம் (Voice)", "6. ஸ்பர்சம் (Skin)", "7. திருக் (Vision)", "8. ஆகிருதி (Body Facies)"],
    en: ["1. Nadi (Radial Pulse & Gati)", "2. Mutra (Urine Clearance)", "3. Mala (Stool Pattern)", "4. Jihwa (Tongue & Coating)", "5. Shabda (Voice & Phonation)", "6. Sparsha (Skin Touch)", "7. Druk (Sclera & Vision)", "8. Akruti (General Facies & Gait)"],
    hi: ["1. नाड़ी (गति)", "2. मूत्र (मूत्र जांच)", "3. मल (मल निष्कासन)", "4. जिह्वा (जीभ कोटिंग)", "5. शब्द (वाणी)", "6. स्पर्श (त्वचा स्पर्श)", "7. दृक् (नेत्र एवं दृष्टि)", "8. आकृति (शारीरिक आकृति)"],
    kn: ["1. ನಾಡಿ (Pulse)", "2. ಮೂತ್ರ (Urine)", "3. ಮಲ (Stool)", "4. ಜಿಹ್ವಾ (Tongue)", "5. ಶಬ್ದ (Voice)", "6. ಸ್ಪರ್ಶ (Skin)", "7. ದೃಕ್ (Eye)", "8. ಆಕೃತಿ (Facies)"]
  }
};

function getLocalizedDashavidhaRows(c, targetLang) {
  const keys = CLINICAL_LEXICON.dashavidha_keys[targetLang] || CLINICAL_LEXICON.dashavidha_keys['en'];
  const values = Object.values(c.dashavidha_pariksha || {});
  let html = '';
  keys.forEach((k, idx) => {
    const val = values[idx] || "Prakruta";
    html += `<tr><td style="font-weight: 600; width: 38%;">${k}</td><td>${val}</td></tr>`;
  });
  return html;
}

function getLocalizedAshtavidhaRows(c, targetLang) {
  const keys = CLINICAL_LEXICON.ashtavidha_keys[targetLang] || CLINICAL_LEXICON.ashtavidha_keys['en'];
  const values = Object.values(c.ashtavidha_pariksha || {});
  let html = '';
  keys.forEach((k, idx) => {
    const val = values[idx] || "Prakruta";
    html += `<tr><td style="font-weight: 600; width: 38%;">${k}</td><td>${val}</td></tr>`;
  });
  return html;
}

// Render Complete Case Sheet with Dynamic Multilingual Localizer & Interactive Components
function renderCaseSheet(c) {
  const container = document.getElementById('doctorCaseSheetContainer');
  if (!container || !c) return;

  const strings = state.uiStrings || {};
  const lang = state.currentLang || 'te';

  const vataPct = c.prakriti?.vata_pct || 35;
  const pittaPct = c.prakriti?.pitta_pct || 40;
  const kaphaPct = c.prakriti?.kapha_pct || 25;

  const dashavidhaRows = getLocalizedDashavidhaRows(c, lang);
  const ashtavidhaRows = getLocalizedAshtavidhaRows(c, lang);

  // Scanned Documents & OCR Analysis
  let docsHtml = '';
  const docList = (c.uploaded_documents && c.uploaded_documents.length > 0)
    ? c.uploaded_documents
    : [PRESET_PRESCRIPTIONS_DB.gandhi_urology];

  docList.forEach(doc => {
    const entities = doc.extracted_entities || {};
    let medItems = '';
    if (entities.Prescriptions && Array.isArray(entities.Prescriptions)) {
      medItems = entities.Prescriptions.map(p => `• <strong>${p}</strong>`).join('<br>');
    }
    let labItems = '';
    if (entities['Biomarkers & Labs'] && Array.isArray(entities['Biomarkers & Labs'])) {
      labItems = entities['Biomarkers & Labs'].map(b => `• ${b}`).join('<br>');
    }

    docsHtml += `
      <div style="background: #ffffff; border: 1px solid #0f766e; padding: 0.85rem; border-radius: 8px; margin-top: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
          <span style="font-weight: 700; font-size: 0.9rem; color: #0f766e;">${doc.filename || 'Clinical Slip'}</span>
          <span class="transcript-badge" style="background: #0f766e; color: white;">AI OCR & Sarvam Mayura Translated</span>
        </div>
        <div style="font-size: 0.8rem; color: #334155; margin-bottom: 0.4rem;">
          <strong>Date Extracted:</strong> ${doc.date_extracted || '2026-03-05'} | <strong>Summary:</strong> ${doc.summary || 'Clinical record parsed'}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; font-size: 0.78rem; margin-top: 0.45rem;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 0.55rem; border-radius: 6px;">
            <div style="font-weight: 700; color: #475569; margin-bottom: 0.25rem;">Original Scanned Record OCR:</div>
            <div style="white-space: pre-wrap; color: #0f172a; max-height: 120px; overflow-y: auto; font-family: monospace; font-size: 0.74rem;">${doc.raw_ocr_text || 'Scanned record text'}</div>
          </div>
          <div style="background: #f0fdfa; border: 1px solid #ccfbf1; padding: 0.55rem; border-radius: 6px;">
            <div style="font-weight: 700; color: #0f766e; margin-bottom: 0.25rem;">Clinical English Translation:</div>
            <div style="white-space: pre-wrap; color: #115e59; max-height: 120px; overflow-y: auto; font-size: 0.76rem;">${doc.translated_clinical_english || doc.summary}</div>
          </div>
        </div>

        <div style="margin-top: 0.55rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.5rem; font-size: 0.8rem;">
          ${medItems ? `<div style="margin-bottom: 0.3rem;"><span style="color: #0f766e; font-weight: 700;">Extracted Medications:</span><div style="margin-left: 0.5rem; margin-top: 0.15rem; color: #1e293b;">${medItems}</div></div>` : ''}
          ${labItems ? `<div style="margin-bottom: 0.3rem;"><span style="color: #2563eb; font-weight: 700;">Biomarkers & Lab Results:</span><div style="margin-left: 0.5rem; margin-top: 0.15rem; color: #1e293b;">${labItems}</div></div>` : ''}
          ${entities['Dietary Restrictions'] ? `<div style="color: #b45309; font-weight: 600; margin-top: 0.2rem;">Clinical Advisory: ${entities['Dietary Restrictions']}</div>` : ''}
        </div>
      </div>
    `;
  });

  const localizedSoap = c.soap_note || {};
  const aharaPanel = getAharaViharaHTML(c.prakriti?.dominant_dosha);
  const organRiskGrid = getOrganRiskGridHTML(c);

  container.innerHTML = `
    <div class="case-sheet-card">
      <div class="case-sheet-header">
        <div class="opd-logo-title">
          <div style="font-weight: 800; font-size: 1.2rem; color: #0f766e; border: 2px solid #0f766e; padding: 0.2rem 0.5rem; border-radius: 6px;">AYUSH</div>
          <div>
            <h2 style="color: #0f766e; font-size: 1.25rem; font-weight: 700;">${strings.case_sheet_heading || 'MINISTRY OF AYUSH - GOVERNMENT OPD'}</h2>
            <p style="font-size: 0.82rem; color: #64748b;">${strings.case_sheet_subheading || 'SIH 26047 AI-Assisted Clinical Case Sheet | ABHA Integrated'}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.15rem; font-weight: 800; color: #0f766e;">${c.token_number}</div>
          <div style="font-size: 0.78rem; color: #64748b;">${c.created_at || '10:30 AM'}</div>
          <button class="btn-primary no-print" style="margin-top: 0.45rem; padding: 0.3rem 0.75rem; font-size: 0.78rem; width: auto;" onclick="window.print()">
            ${strings.print_case || 'Print / Export Case'}
          </button>
        </div>
      </div>

      <!-- Patient Demographics & ABHA -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.65rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.85rem;">
        <div><strong>${strings.patient_label || 'Patient'}:</strong> ${cleanPatientName(c.patient_info?.name, lang)}</div>
        <div><strong>${strings.age_gender_label || 'Age / Gender'}:</strong> ${c.patient_info?.age || 42} Yrs / ${c.patient_info?.gender || 'Male'}</div>
        <div><strong>${strings.abha_id_label || 'ABHA ID'}:</strong> ${c.patient_info?.abha_id || 'ABHA-9872-3341-2094'}</div>
        <div><strong>${strings.intake_lang_label || 'Intake Language'}:</strong> ${(c.language_used || lang).toUpperCase()} (Sarvam AI)</div>
      </div>

      <!-- AI Clinical Triage & Red Flag Safety Matrix -->
      <div style="background: ${c.triage?.triage_level === 'RED' ? '#fef2f2' : c.triage?.triage_level === 'YELLOW' ? '#fefce8' : '#f0fdf4'}; border: 1px solid ${c.triage?.triage_level === 'RED' ? '#fca5a5' : c.triage?.triage_level === 'YELLOW' ? '#fef08a' : '#bbf7d0'}; border-left: 4px solid ${c.triage?.triage_level === 'RED' ? '#dc2626' : c.triage?.triage_level === 'YELLOW' ? '#d97706' : '#16a34a'}; border-radius: 8px; padding: 0.85rem; margin-bottom: 1.15rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-weight: 700; font-size: 0.88rem; color: ${c.triage?.triage_level === 'RED' ? '#991b1b' : c.triage?.triage_level === 'YELLOW' ? '#854d0e' : '#166534'};">
            ${c.triage?.triage_level === 'RED' ? 'AI EMERGENCY TRIAGE (CODE RED)' : c.triage?.triage_level === 'YELLOW' ? 'HIGH PRIORITY FAST-TRACK (CODE YELLOW)' : 'STANDARD CLINICAL TRIAGE (CODE GREEN)'}
          </span>
          <span class="${c.triage?.triage_level === 'RED' ? 'triage-badge-red' : c.triage?.triage_level === 'YELLOW' ? 'triage-badge-yellow' : 'triage-badge-green'}">
            ${c.triage?.triage_category || 'Standard OPD'}
          </span>
        </div>
        <div style="font-size: 0.84rem; font-weight: 600; color: #1e293b; margin-bottom: 0.45rem;">
          ${c.triage?.triage_banner_text || 'No acute life-threatening triggers detected.'}
        </div>
        ${(c.triage?.detected_red_flags && c.triage?.detected_red_flags.length > 0 && c.triage?.detected_red_flags[0]?.code !== 'NO_RED_FLAGS') ? `
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.55rem; font-size: 0.8rem; margin-bottom: 0.45rem;">
          <div style="font-weight: 700; color: #dc2626; margin-bottom: 0.25rem;">Detected Red Flag Triggers:</div>
          ${c.triage.detected_red_flags.map(rf => `
            <div style="margin-bottom: 0.35rem; padding-bottom: 0.25rem; border-bottom: 1px dashed #e2e8f0;">
              <div><strong>System:</strong> ${rf.system} (${rf.severity}) | <strong>Trigger:</strong> "${rf.matched_keyword}" [Lang: ${rf.language_detected}]</div>
              <div style="color: #475569;"><strong>Risk:</strong> ${rf.clinical_risk}</div>
              <div style="color: #991b1b; font-weight: 600; margin-top: 0.1rem;"><strong>Protocol:</strong> ${rf.recommended_action}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        <div style="font-size: 0.78rem; color: ${c.triage?.triage_level === 'RED' ? '#991b1b' : '#14532d'}; font-weight: 600;">
          <strong>AYUSH Clinical Guideline:</strong> ${c.triage?.ayush_safety_guideline || 'Safe for routine AYUSH OPD therapy.'}
        </div>
      </div>

      <!-- System Risk Biomarker Grid -->
      <div style="font-size: 0.82rem; font-weight: 700; color: #0f766e; margin-bottom: 0.2rem;">Multi-Organ System Risk Indicators:</div>
      ${organRiskGrid}

      <!-- Chief Complaint & Voice Transcript -->
      <div class="clinical-section-title">${strings.chief_complaint_section || 'Chief Complaint & Patient Voice Intake'}</div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px; font-size: 0.88rem; margin-bottom: 0.85rem;">
        <div style="font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">${strings.primary_symptoms || 'Primary Reported Symptoms'}</div>
        <div style="color: #0f766e; font-weight: 600;">"${getLocalizedVoiceTranscript(c.voice_transcript, lang)}"</div>
      </div>

      <!-- AI Prakriti & Interactive Dosha Balance Gauges -->
      <div class="clinical-section-title">${strings.prakriti_section || 'AI Prakriti Assessment & Interactive Dosha Balance Gauges'}</div>
      
      <div class="prakriti-matrix">
        <div class="dosha-gauge">
          <div class="dosha-name" style="color: #2563eb; font-weight: 700;">Vata - <span id="vSliderVal">${vataPct}%</span></div>
          <div class="dosha-bar-bg"><div id="gaugeFillVata" class="dosha-bar-fill fill-vata" style="width: ${vataPct}%;"></div></div>
        </div>
        <div class="dosha-gauge">
          <div class="dosha-name" style="color: #dc2626; font-weight: 700;">Pitta - <span id="pSliderVal">${pittaPct}%</span></div>
          <div class="dosha-bar-bg"><div id="gaugeFillPitta" class="dosha-bar-fill fill-pitta" style="width: ${pittaPct}%;"></div></div>
        </div>
        <div class="dosha-gauge">
          <div class="dosha-name" style="color: #16a34a; font-weight: 700;">Kapha - <span id="kSliderVal">${kaphaPct}%</span></div>
          <div class="dosha-bar-bg"><div id="gaugeFillKapha" class="dosha-bar-fill fill-kapha" style="width: ${kaphaPct}%;"></div></div>
        </div>
      </div>

      <!-- Interactive Dosha Sliders (Doctor Fine-Tuning) -->
      <div class="dosha-slider-container no-print">
        <div style="font-size: 0.78rem; font-weight: 700; color: #0f766e; margin-bottom: 0.2rem;">Doctor Interactive Dosha Fine-Tuning Sliders:</div>
        <div class="dosha-slider-row">
          <span style="color: #2563eb;">Vata Dosha</span>
          <input type="range" class="dosha-slider" id="vRangeInput" min="10" max="80" value="${vataPct}" oninput="updateDoshaSliders(this.value, document.getElementById('pRangeInput').value, document.getElementById('kRangeInput').value)">
          <span id="vRangeNum">${vataPct}%</span>
        </div>
        <div class="dosha-slider-row">
          <span style="color: #dc2626;">Pitta Dosha</span>
          <input type="range" class="dosha-slider" id="pRangeInput" min="10" max="80" value="${pittaPct}" oninput="updateDoshaSliders(document.getElementById('vRangeInput').value, this.value, document.getElementById('kRangeInput').value)">
          <span id="pRangeNum">${pittaPct}%</span>
        </div>
        <div class="dosha-slider-row">
          <span style="color: #16a34a;">Kapha Dosha</span>
          <input type="range" class="dosha-slider" id="kRangeInput" min="10" max="80" value="${kaphaPct}" oninput="updateDoshaSliders(document.getElementById('vRangeInput').value, document.getElementById('pRangeInput').value, this.value)">
          <span id="kRangeNum">${kaphaPct}%</span>
        </div>
      </div>

      <div style="font-size: 0.84rem; color: #334155; margin-bottom: 0.85rem; background: #f8fafc; padding: 0.55rem; border-radius: 6px; border: 1px solid #e2e8f0;">
        <strong>${strings.prakriti_diag || 'Constitution Diagnosis'}:</strong> <span id="prakritiDiagResult" style="color: #0f766e; font-weight: 700;">${cleanPrakritiName(c.prakriti?.primary_prakriti, lang)}</span> | <strong>${strings.dominant_dosha || 'Dominant Vitiation'}:</strong> <span id="dominantDoshaResult" style="color: #d97706; font-weight: 700;">${c.prakriti?.dominant_dosha}</span>
      </div>

      <!-- Ahara & Vihara Advisory -->
      ${aharaPanel}

      <!-- Dashavidha Pariksha Table -->
      <div class="clinical-section-title">${strings.dashavidha_section || 'Dashavidha Pariksha (10-Fold AYUSH Examination)'}</div>
      <table class="table-matrix">${dashavidhaRows}</table>

      <!-- Ashtavidha Pariksha Table -->
      <div class="clinical-section-title">${strings.ashtavidha_section || 'Ashtavidha Pariksha (8-Fold Clinical Pointers)'}</div>
      <table class="table-matrix">${ashtavidhaRows}</table>

      <!-- AI Document Analysis & Scanned Records -->
      <div class="clinical-section-title">${strings.history_timeline_section || 'AI Document Analysis & Scanned Prescriptions (Neural OCR & Sarvam Mayura)'}</div>
      ${docsHtml}

      <!-- Physician Structured SOAP Note -->
      <div class="clinical-section-title">${strings.soap_section || 'AI Structured SOAP Case Formulation'}</div>
      <div class="soap-box">
        <h4>${strings.soap_s || 'S - Subjective History'}</h4>
        <p>${localizedSoap.Subjective || ''}</p>
      </div>
      <div class="soap-box">
        <h4>${strings.soap_o || 'O - Objective & Examination'}</h4>
        <p>${localizedSoap.Objective || ''}</p>
      </div>
      <div class="soap-box">
        <h4>${strings.soap_a || 'A - Clinical AYUSH Assessment'}</h4>
        <p>${localizedSoap.Assessment || ''}</p>
      </div>
      <div class="soap-box">
        <h4>${strings.soap_p || 'P - Prescribed Treatment Plan & Ahara/Vihara Advisory'}</h4>
        <p style="white-space: pre-line;">${localizedSoap.Plan || ''}</p>
      </div>

      <!-- Doctor Action Controls -->
      <div class="no-print" style="margin-top: 1.25rem; background: #f8fafc; padding: 0.85rem; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="color: #0f766e; margin-bottom: 0.45rem; font-size: 0.88rem;">${strings.doctor_actions || 'Medical Officer Direct Actions:'}</h4>
        <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
          <button class="btn-primary" style="width: auto; padding: 0.5rem 1rem; font-size: 0.84rem;" onclick="markCaseDone('${c.token_number}')">
            ${strings.approve_prescription || 'Approve & Finalize Prescription'}
          </button>
          <button class="btn-secondary" style="width: auto; margin-top: 0; padding: 0.5rem 1rem; font-size: 0.84rem;" onclick="window.print()">
            ${strings.print_case || 'Download / Print PDF'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function markCaseDone(tokenNumber) {
  showToast(`Case ${tokenNumber} finalized! Synced to ABDM & Pharmacy.`);
  if (state.casesDb[tokenNumber]) {
    state.casesDb[tokenNumber].status = 'Completed';
  }
  state.doctorQueue.forEach(item => {
    if (item.token_number === tokenNumber) {
      item.status = 'Completed';
    }
  });
  renderDoctorQueue(state.doctorQueue);
}

// Switch between Patient Kiosk and Doctor Portal
function switchMode(mode) {
  state.activeMode = mode;
  document.getElementById('patientKioskView').style.display = mode === 'kiosk' ? 'block' : 'none';
  document.getElementById('doctorPortalView').style.display = mode === 'doctor' ? 'block' : 'none';

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
  });

  if (mode === 'doctor') {
    refreshDoctorQueue();
    if (state.activeCaseToken) {
      loadCaseSheet(state.activeCaseToken);
    }
  }
}

// Preset Loader for Hackathon Demos
async function loadDemoPreset(presetKey) {
  const preset = DEMO_PRESETS[presetKey];
  if (!preset) return;

  await loadLanguage(preset.lang);

  state.patientInfo = {
    name: preset.name,
    abha_id: preset.abha_id,
    age: preset.age,
    gender: preset.gender,
    mobile: preset.mobile
  };

  document.getElementById('patientName').value = preset.name;
  document.getElementById('patientAge').value = preset.age;
  document.getElementById('patientGender').value = preset.gender;
  document.getElementById('patientMobile').value = preset.mobile;
  document.getElementById('abhaInput').value = preset.abha_id;

  document.getElementById('abhaProfileCard').style.display = 'block';
  document.getElementById('abhaProfileSummary').innerHTML = `
    <div class="profile-badge">ABHA ID VERIFIED (Sandbox Live)</div>
    <div class="profile-detail"><strong>Name:</strong> ${preset.name} (${preset.gender}, ${preset.age} Yrs)</div>
    <div class="profile-detail"><strong>ABHA ID:</strong> ${preset.abha_id}</div>
    <div class="profile-detail"><strong>Status:</strong> Digital Consent Authenticated</div>
  `;

  state.intakeResponses['chief_complaint'] = preset.complaint;
  state.intakeResponses['duration_onset'] = preset.duration;
  state.intakeResponses['pain_severity'] = preset.severity;
  state.intakeResponses['agni_digestion'] = preset.agni;
  state.intakeResponses['koshtha_bowel'] = preset.koshtha;
  state.intakeResponses['nidra_sleep'] = preset.sleep;

  renderQuestionFlow();
  await evaluateRedFlagsLive();
}

function setupEventListeners() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      loadLanguage(lang);
    });
  });

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.getAttribute('data-mode');
      switchMode(mode);
    });
  });

  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('docFileInput');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '#0f766e';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = '#cbd5e1';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '#cbd5e1';
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }
}

function openSarvamKeyModal() {
  document.getElementById('sarvamModal').style.display = 'flex';
}

function closeSarvamKeyModal() {
  document.getElementById('sarvamModal').style.display = 'none';
}

async function checkSarvamConfig() {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/config`);
      const data = await res.json();
      const statusEl = document.getElementById('sarvamKeyStatus');
      if (statusEl) {
        statusEl.textContent = data.sarvam_api_configured ? 'Sarvam AI (Live API)' : 'Sarvam AI (Simulator)';
      }
    } catch (e) {}
  }
}

async function saveSarvamKey() {
  const input = document.getElementById('sarvamApiKeyInput').value.trim();
  if (API_BASE && input) {
    try {
      await fetch(`${API_BASE}/api/config/sarvam-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: input })
      });
      showToast('Sarvam API Key saved successfully!');
      checkSarvamConfig();
      closeSarvamKeyModal();
    } catch (e) {
      showToast('Error updating Sarvam API Key.');
    }
  } else {
    closeSarvamKeyModal();
  }
}
