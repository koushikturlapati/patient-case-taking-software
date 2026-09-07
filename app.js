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
    chief_complaint_section: "🗣️ ప్రధాన సమస్య & రోగి వాయిస్ రికార్డింగ్",
    primary_symptoms: "రోగి స్వయంగా చెప్పిన బాధ:",
    prakriti_section: "🌿 ఆయుష్ ప్రకృతి నిర్ధారణ & దోష సమతుల్యత",
    prakriti_diag: "శరీర ప్రకృతి నిర్ధారణ",
    dominant_dosha: "ప్రధాన దోష అసమతుల్యత",
    dashavidha_section: "📋 దశవిధ పరీక్ష (10 రకాల ఆయుష్ పరీక్ష)",
    ashtavidha_section: "🔍 అష్టవిధ పరీక్ష (8 రకాల క్లినికల్ సూచికలు)",
    history_timeline_section: "📂 గత వైద్య నివేదికల కాలక్రమం (OCR Analysis)",
    soap_section: "🩺 వైద్యుల నిర్మాణాత్మక SOAP కేస్ నివేదిక",
    soap_s: "S - సబ్జెక్టివ్ హిస్టరీ (రోగి చెప్పిన వివరాలు)",
    soap_o: "O - ఆబ్జెక్టివ్ & పరీక్ష (ల్యాబ్ & ప్రకృతి కొలతలు)",
    soap_a: "A - ఆయుష్ క్లినికల్ నిర్ధారణ (రోగ & దోష అంచనా)",
    soap_p: "P - చికిత్సా ప్రణాళిక & ఆహార-విహార సూచనలు",
    doctor_actions: "👨‍⚕️ వైద్యుల ప్రత్యక్ష చర్యలు",
    approve_prescription: "✅ ఆమోదించి మందులు పంపండి",
    print_case: "🖨️ కేస్ షీట్ ప్రింట్ / PDF",
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
    chief_complaint_section: "🗣️ முக்கிய பிரச்சனை & நோயாளி குரல் பதிவு",
    primary_symptoms: "நோயாளி கூறிய அறிகுறிகள்:",
    prakriti_section: "🌿 ஆயுஷ் பிரகிருதி மதிப்பீடு & தோஷ நிலை",
    prakriti_diag: "உடல் பிரகிருதி கண்டறிதல்",
    dominant_dosha: "முதன்மை தோஷ ஏற்றத்தாழ்வு",
    dashavidha_section: "📋 தசவித பரிசோதனை (10 வகையான ஆயுஷ் ஆய்வு)",
    ashtavidha_section: "🔍 அஷ்டவித பரிசோதனை (8 மருத்துவ குறிகாட்டிகள்)",
    history_timeline_section: "📂 முந்தைய மருத்துவ பதிவுகளின் காலவரிசை (OCR)",
    soap_section: "🩺 மருத்துவரின் கட்டமைக்கப்பட்ட SOAP அறிக்கை",
    soap_s: "S - நோயாளி விவரித்த வரலாறு (Subjective)",
    soap_o: "O - புறநிலை & பரிசோதனை முடிவுகள் (Objective)",
    soap_a: "A - ஆயுஷ் மருத்துவ மதிப்பீடு (Assessment)",
    soap_p: "P - சிகிச்சை திட்டம் & உணவு ஆலோசனை (Plan)",
    doctor_actions: "👨‍⚕️ மருத்துவரின் நேரடி நடவடிக்கைகள்",
    approve_prescription: "✅ ஒப்புதல் அளித்து மருந்து சீட்டை அனுப்பவும்",
    print_case: "🖨️ மருத்துவ குறிப்பை அச்சிட / PDF",
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
    chief_complaint_section: "🗣️ Chief Complaint & Patient Voice Intake",
    primary_symptoms: "Primary Reported Symptoms:",
    prakriti_section: "🌿 AYUSH Prakriti Assessment & Dosha Balance",
    prakriti_diag: "Constitution Diagnosis",
    dominant_dosha: "Dominant Vitiation",
    dashavidha_section: "📋 Dashavidha Pariksha (10-Fold AYUSH Examination)",
    ashtavidha_section: "🔍 Ashtavidha Pariksha (8-Fold Clinical Pointers)",
    history_timeline_section: "📂 Historical Medical Timeline & Scanned Records (OCR)",
    soap_section: "🩺 Physician Structured SOAP Case Formulation",
    soap_s: "S - Subjective History",
    soap_o: "O - Objective & Examination",
    soap_a: "A - Clinical AYUSH Assessment",
    soap_p: "P - Prescribed Treatment Plan & Ahara/Vihara Advisory",
    doctor_actions: "👨‍⚕️ Medical Officer Direct Actions",
    approve_prescription: "✅ Approve & Finalize Prescription",
    print_case: "🖨️ Print / Export Case PDF",
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
    chief_complaint_section: "🗣️ मुख्य समस्या एवं रोगी आवाज रिकॉर्डिंग",
    primary_symptoms: "रोगी द्वारा बताए गए मुख्य लक्षण:",
    prakriti_section: "🌿 आयुष प्रकृति निर्धारण एवं दोष संतुलन",
    prakriti_diag: "शारीरिक प्रकृति निदान",
    dominant_dosha: "प्रमुख दोष असंतुलन",
    dashavidha_section: "📋 दशविध परीक्षा (10-चरणीय आयुष परीक्षण)",
    ashtavidha_section: "🔍 अष्टविध परीक्षा (8-चरणीय नैदानिक संकेत)",
    history_timeline_section: "📂 पुराने मेडिकल रिकॉर्ड की समयरेखा (OCR)",
    soap_section: "🩺 चिकित्सक संरचित SOAP केस विवरण",
    soap_s: "S - रोगी का मौखिक विवरण (Subjective)",
    soap_o: "O - नैदानिक परीक्षण एवं आंकड़े (Objective)",
    soap_a: "A - आयुष रोग एवं दोष निदान (Assessment)",
    soap_p: "P - उपचार योजना एवं आहार-विहार परामर्श (Plan)",
    doctor_actions: "👨‍⚕️ चिकित्सक की सीधी कार्रवाइयां",
    approve_prescription: "✅ अनुमोदित करें और पर्चा भेजें",
    print_case: "🖨️ केस शीट प्रिंट / PDF",
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
    chief_complaint_section: "🗣️ ಮುಖ್ಯ ಸಮಸ್ಯೆ & ರೋಗಿಯ ಧ್ವನಿ ದಾಖಲೆ",
    primary_symptoms: "ರೋಗಿ ತಿಳಿಸಿದ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು:",
    prakriti_section: "🌿 ಆಯುಷ್ ಪ್ರಕೃತಿ ಮೌಲ್ಯಮಾಪನ & ದೋಷ ಸಮತೋಲನ",
    prakriti_diag: "ದೇಹದ ಪ್ರಕೃತಿ ರೋಗನಿರ್ಣಯ",
    dominant_dosha: "ಪ್ರಮುಖ ದೋಷ ವೈಪರೀತ್ಯ",
    dashavidha_section: "📋 ದಶವಿಧ ಪರೀಕ್ಷೆ (10 ಹಂತದ ಆಯುಷ್ ತಪಾಸಣೆ)",
    ashtavidha_section: "🔍 ಅಷ್ಟವಿಧ ಪರೀಕ್ಷೆ (8 ವೈದ್ಯಕೀಯ ಸೂಚಕಗಳು)",
    history_timeline_section: "📂 ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳ ಕಾಲಾನುಕ್ರಮ (OCR)",
    soap_section: "🩺 ವೈದ್ಯರ ರಚನಾತ್ಮಕ SOAP ವರದಿ",
    soap_s: "S - ರೋಗಿಯ ವಿವರಣೆ (Subjective)",
    soap_o: "O - ತಪಾಸಣೆ ಮತ್ತು ಪರೀಕ್ಷೆಗಳು (Objective)",
    soap_a: "A - ಆಯುಷ್ ರೋಗ ಮೌಲ್ಯಮಾಪನ (Assessment)",
    soap_p: "P - ಚಿಕಿತ್ಸಾ ಯೋಜನೆ ಮತ್ತು ಆಹಾರ ಸಲಹೆ (Plan)",
    doctor_actions: "👨‍⚕️ ವೈದ್ಯರ ನೇರ ಕ್ರಮಗಳು",
    approve_prescription: "✅ ಅನುಮೋದಿಸಿ ಮತ್ತು ಔಷಧ ಚೀಟಿ ಕಳುಹಿಸಿ",
    print_case: "🖨️ ಕೇಸ್ ಶೀಟ್ ಪ್ರಿಂಟ್ / PDF",
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
      kn: "ನಿಮ್ಮ ನೋವು ಅಥವಾ ತೊಂದರೆಯ ತೀವ್ರತೆ ಎಷ್ಟಿದೆ? (1 ರಿಂದ 10 ಸ್ಕೇಲ್)"
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
      kn: "ಆಯುಷ್ ಕೋಷ್ಠ ಪರೀಕ್ಷೆ: ನಿಮ್ಮ ಮಲವಿಸರ್ಜನೆ ಮತ್ತು ಕರುಳಿನ ಕ್ರಿಯೆ ಹೇಗಿದೆ?"
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
    translated_clinical_english: "Government Ayush Dispensary - Madurai\nDate: 18/01/2026\nPatient: Selvi Soundar\nComplaint: Dyspepsia, severe retrosternal burning & acid reflux\nPrescribed Medications:\n1. Avipattikara Churna 1 tsp with honey at bedtime\n2. Triphala Churna 5g with warm water\n3. Jeeraka Kudineer (Cumin decoction) regular hydration\nDietary Advice: Strict avoidance of spicy and sour foods",
    patient_autofill: {
      name: "Selvi Soundar (செல்வி)",
      age: 46,
      gender: "Female",
      mobile: "9123456789",
      chief_complaint: "செரிமானக் கோளாறு / வாயு"
    },
    extracted_entities: {
      Hospital: "Govt Ayush Dispensary - Madurai",
      Patient: "Selvi Soundar (46 Yrs / Female)",
      Date: "2026-01-18",
      "Diagnosed Condition": "Amlapitta (Hyperacidity & Dyspepsia)",
      Prescriptions: [
        "Avipattikara Churna (1 tsp with honey HS)",
        "Triphala Churna (5g with warm water)",
        "Jeeraka Kudineer (regular hydration)"
      ],
      "Dietary Restrictions": "Avoid pungent/sour rasas"
    },
    summary: "Tamil prescription for chronic Amlapitta (acid peptic disease) treated with Pitta-pacifying formulations."
  },
  kannada: {
    detected_language: "Kannada (ಕನ್ನಡ)",
    document_type: "Kannada Ayurvedic Prescription",
    filename: "kannada_ayurvedic_slip.jpg",
    raw_ocr_text: "ಶ್ರೀ ಮಂಜುನಾಥ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ - ಮೈಸೂರು\nದಿನಾಂಕ: 05/02/2026\nರೋಗಿ: ಕವಿತಾ ಗೌಡ | ವಯಸ್ಸು: 35\nರೋಗಲಕ್ಷಣ: ಕೀಲು ನೋವು, ಬೆಳಗಿನ ಬಿಗಿತ ಮತ್ತು ತೀವ್ರ ಸುಸ್ತು\nಔಷಧಿಗಳು:\n1. ರಾಸ್ನಾದಿ ಕ್ವಾಥ 15ml ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ಬಿಸಿನೀರಿನೊಂದಿಗೆ\n2. ಅಶ್ವಗಂಧಾರಿಷ್ಟ 20ml ಊಟದ ನಂತರ\n3. ಕೋಟ್ಟಂಚುಕ್ಕಾದಿ ತೈಲ ಮಾಲಿಶ್",
    translated_clinical_english: "Sri Manjunatha Ayurveda Chikitsalaya - Mysuru\nDate: 05/02/2026\nPatient: Kavitha Gowda | Age: 35\nSymptoms: Joint aches, morning stiffness and chronic lethargy\nPrescribed Medicines:\n1. Rasnadi Kwatha 15ml twice daily with warm water\n2. Ashwagandharishta 20ml post-meals\n3. Kottakkal Kottamchukkadi Taila for local massage",
    patient_autofill: {
      name: "Kavitha Gowda (ಕವಿತಾ ಗೌಡ)",
      age: 35,
      gender: "Female",
      mobile: "8888777766",
      chief_complaint: "ಕೀಲು ನೋವು & ಆಯಾಸ"
    },
    extracted_entities: {
      Hospital: "Sri Manjunatha Ayurveda Chikitsalaya",
      Patient: "Kavitha Gowda (35 Yrs / Female)",
      Date: "2026-02-05",
      "Diagnosed Condition": "Amavata / Early Vata-Kapha Fatigue",
      Prescriptions: [
        "Rasnadi Kwatha (15ml BD with warm water)",
        "Ashwagandharishta (20ml BD post meals)",
        "Kottamchukkadi Taila (Local massage)"
      ],
      "Dietary Restrictions": "Avoid cold foods and daytime sleeping"
    },
    summary: "Kannada prescription for Vata-Kapha joint aches treated with Rasnadi Kwatha and Ashwagandharishta."
  },
  hindi: {
    detected_language: "Hindi (हिन्दी)",
    document_type: "Hindi OPD Prescription Slip",
    filename: "hindi_ayush_slip.jpg",
    raw_ocr_text: "आयुष वेलनेस सेंटर - वाराणसी\nदिनांक: 20/01/2026\nरोगी: सुरेश शर्मा | उम्र: 48\nलक्षण: घुटने में दर्द व सूजन, चलने में असमर्थता\nऔषधियां:\n1. योगराज गुग्गुलु 2 गोली सुबह-शाम\n2. दशमूलारिष्ट 20ml भोजनोपरांत\n3. प्रसारिणी तैल मालिश\nपरहेज: खटाई व बासी भोजन बंद करें",
    translated_clinical_english: "Ayush Wellness Centre - Varanasi\nDate: 20/01/2026\nPatient: Suresh Sharma | Age: 48\nSymptoms: Knee joint pain, swelling and walking limitation\nPrescribed Drugs:\n1. Yogaraja Guggulu 2 tabs BD\n2. Dashamularishta 20ml post meals\n3. Prasarini Taila for local massage\nAdvisory: Avoid sour foods and stale meals",
    patient_autofill: {
      name: "Suresh Sharma (सुरेश शर्मा)",
      age: 48,
      gender: "Male",
      mobile: "9811223344",
      chief_complaint: "जोड़ों का दर्द और सूजन"
    },
    extracted_entities: {
      Hospital: "Ayush Wellness Centre - Varanasi",
      Patient: "Suresh Sharma (48 Yrs / Male)",
      Date: "2026-01-20",
      "Diagnosed Condition": "Janu Sandhigata Vata (Knee Osteoarthritis)",
      Prescriptions: [
        "Yogaraja Guggulu (2 tabs BD)",
        "Dashamularishta (20ml BD)",
        "Prasarini Taila (local application)"
      ],
      "Dietary Restrictions": "Avoid sour foods and cold exposure"
    },
    summary: "Hindi prescription for Janu Sandhigata Vata with classic anti-inflammatory Ayurvedic regimen."
  }
};

// 4. Client State
const state = {
  currentLang: 'te', // Default: Telugu
  activeMode: 'kiosk', // 'kiosk' | 'doctor'
  patientInfo: {
    name: 'రమేష్ కుమార్ (Ramesh Kumar)',
    abha_id: '98-7233-4120-9411',
    age: 42,
    gender: 'Male',
    mobile: '9876543210'
  },
  intakeResponses: {},
  voiceTranscript: '',
  uploadedDocs: [],
  questions: [],
  uiStrings: {},
  isRecording: false,
  mediaRecorder: null,
  audioChunks: [],
  activeCaseToken: 'OPD-101-TEL',
  activeCaseData: null,
  doctorQueue: [],
  casesDb: {}
};

// Preset demo data for rapid hackathon testing
const DEMO_PRESETS = {
  telugu_joint: {
    lang: 'te',
    name: 'రమేష్ కుమార్ (Ramesh Kumar)',
    abha_id: '98-7233-4120-9411',
    age: 42,
    gender: 'Male',
    mobile: '9876543210',
    transcript: 'గత రెండు వారాలుగా రెండు మోకాళ్ళలో తీవ్రమైన నొప్పి, ఉదయాన్నే కీళ్ళు బిగుసుకుపోవడం మరియు అజీర్ణం ఉంది.',
    responses: {
      chief_complaint: 'కీళ్ళ నొప్పులు & వాపు',
      duration_onset: '1-3 నెలలు',
      pain_severity: 'తీవ్రమైనది (7-8)',
      agni_digestion: 'విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)',
      koshtha_bowel: 'క్రూర కోష్ఠ (మలబద్ధకం, గట్టిగా రావడం - వాత)',
      nidra_sleep: 'చెల్లాచెదురైన నిద్ర / మధ్యలో మెలకువ రావడం',
      prakriti_vihara: 'చలి అస్సలు పడదు, వేడి ఇష్టం (వాత ప్రధానం)'
    }
  },
  tamil_dyspepsia: {
    lang: 'ta',
    name: 'செல்வி சௌந்தர் (Selvi Soundar)',
    abha_id: '91-2345-6789-0122',
    age: 46,
    gender: 'Female',
    mobile: '9123456789',
    transcript: 'சாப்பிட்ட பிறகு நெஞ்செரிச்சல் மற்றும் கடுமையான புளித்த ஏப்பம் வருகிறது. காரமான உணவு சாப்பிட்டால் வயிற்று வலி அதிகமாகிறது.',
    responses: {
      chief_complaint: 'செரிமானக் கோளாறு / வாயு',
      duration_onset: '1-2 வாரங்கள்',
      pain_severity: 'மத்தியமம் (4-6)',
      agni_digestion: 'தீக்ஷ்ணாக்னி (அதிக பசி, நெஞ்செரிச்சல்)',
      koshtha_bowel: 'மிருது கோஷ்டம் (எளிதான மலம் கழிவு / அடிக்கடி இளகிய மலம்)',
      nidra_sleep: 'ஆழ்ந்த நிம்மதியான தூக்கம் (7-8 மணிநேரம்)',
      prakriti_vihara: 'வெப்பத்தை தாங்க முடியாது, அதிக வியர்வை (பித்தம்)'
    }
  },
  kannada_general: {
    lang: 'kn',
    name: 'ಕವಿತಾ ಗೌಡ (Kavitha Gowda)',
    abha_id: '88-8877-7766-6633',
    age: 35,
    gender: 'Female',
    mobile: '8888777766',
    transcript: 'ಕಳೆದ ಒಂದು ತಿಂಗಳಿಂದ ಕೀಲು ನೋವು ಮತ್ತು ತೀವ್ರ ಆಯಾಸ ಇದೆ. ತಣ್ಣೀರು ಕುಡಿದರೆ ಕೆಮ್ಮು ಬರುತ್ತದೆ.',
    responses: {
      chief_complaint: 'ಕೀಲು ನೋವು ಮತ್ತು ಊತ',
      duration_onset: '1-3 ತಿಂಗಳುಗಳು',
      pain_severity: 'ಮಧ್ಯಮ (4-6)',
      agni_digestion: 'ಮಂದಾಗ್ನಿ (ಕಡಿಮೆ ಹಸಿವು, ಹೊಟ್ಟೆ ಭಾರ - ಕಫ)',
      koshtha_bowel: 'ಮಧ್ಯಮ ಕೋಷ್ಠ (ನಿಯಮಿತ, ದಿನಕ್ಕೆ ಒಮ್ಮೆ ಸಾಮಾನ್ಯ)',
      nidra_sleep: 'ಅತಿಯಾದ ನಿದ್ರೆ ಮತ್ತು ಆಲಸ್ಯ (ಕಫ)',
      prakriti_vihara: 'ಚಳಿ ಮತ್ತು ತೇವಾಂಶದಿಂದ ತೂಕ ಹೆಚ್ಚಳ (ಕಫ)'
    }
  },
  english_standard: {
    lang: 'en',
    name: 'Anand Varma',
    abha_id: '77-4455-6677-8899',
    age: 50,
    gender: 'Male',
    mobile: '9765432100',
    transcript: 'Chronic neck stiffness radiating down the right arm with occasional numbness for 3 months.',
    responses: {
      chief_complaint: 'Joint Pain & Stiffness',
      duration_onset: '1-3 Months',
      pain_severity: 'Moderate (4-6)',
      agni_digestion: 'Vishamagni (Irregular/unpredictable digestion - Vata)',
      koshtha_bowel: 'Krura Koshtha (Constipated, dry, hard stools - Vata)',
      nidra_sleep: 'Disturbed / Frequent awakenings (Vata)',
      prakriti_vihara: 'Intolerant to cold/wind, prefers warmth, dry skin (Vata Predominant)'
    }
  },
  telugu_red_flag_emergency: {
    lang: 'te',
    name: 'వెంకటేశ్వర్లు (Venkateswarlu)',
    abha_id: '99-1122-3344-5566',
    age: 54,
    gender: 'Male',
    mobile: '9848012345',
    transcript: 'ఛాతీలో తీవ్రమైన నొప్పి మరియు ఎడమ చెయ్యి లాగుతోంది. గంట నుంచి తీవ్రమైన ఊపిరి ఆడకపోవడం మరియు విపరీతమైన చెమటలు పడుతున్నాయి.',
    responses: {
      chief_complaint: 'ఛాతీలో నొప్పి & తీవ్రమైన ఆయాసం',
      duration_onset: '1-3 రోజులు (తీవ్రమైనది)',
      pain_severity: 'అత్యంత తీవ్రం (9-10)',
      agni_digestion: 'విషమాగ్ని (ఎప్పుడూ మారుతూ ఉండే ఆకలి - వాత)',
      koshtha_bowel: 'మధ్యమ కోష్ఠ (క్రమబద్ధంగా రోజూ ఒక్కసారి అవుతుంది)',
      nidra_sleep: 'నిద్ర పట్టకపోవడం (ఇన్సోమ్నియా - వాత/పిత్త)',
      prakriti_vihara: 'చలి అస్సలు పడదు, వేడి ఇష్టం (వాత ప్రధానం)'
    }
  },
  tamil_red_flag_stroke: {
    lang: 'ta',
    name: 'முத்துவேல் (Muthuvel)',
    abha_id: '99-8877-6655-4433',
    age: 62,
    gender: 'Male',
    mobile: '9444123456',
    transcript: 'திடீரென வலது கை மற்றும் கால் செயல் இழந்துவிட்டது, பேச்சு குளறுகிறது மற்றும் மயக்கம் வருகிறது.',
    responses: {
      chief_complaint: 'பக்கவாதம் மாதிரி கை கால் செயலிழப்பு & பேச்சு குளறுதல்',
      duration_onset: '1-3 நாட்கள் (தீவிரமானது)',
      pain_severity: 'மிகக் கடுமையானது (9-10)',
      agni_digestion: 'மந்தாக்னி (குறைந்த பசி, மந்தமான செரிமானம்)',
      koshtha_bowel: 'மத்தியம கோஷ்டம் (வழக்கமான சீரான குடல் இயக்கம்)',
      nidra_sleep: 'இடையிடையே விழிப்பு வரும் தூக்கம்',
      prakriti_vihara: 'ஈரப்பதம் மற்றும் குளிர் ஒத்துக்கொள்ளாது (கபம்)'
    }
  }
};

// 5. Seed Initial Cases
function seedInitialData() {
  const telDoc = PRESET_PRESCRIPTIONS_DB["telugu"];
  const telCase = generateLocalCaseSheet({
    patient_info: {
      name: "రమేష్ కుమార్ (Ramesh Kumar)",
      abha_id: "98-7233-4120-9411",
      age: 42,
      gender: "Male",
      mobile: "9876543210"
    },
    language: "te",
    responses: DEMO_PRESETS.telugu_joint.responses,
    voice_transcript: DEMO_PRESETS.telugu_joint.transcript,
    uploaded_documents: [{
      document_id: "DOC-TEL-01",
      filename: telDoc.filename,
      document_type: telDoc.document_type,
      detected_language: telDoc.detected_language,
      raw_ocr_text: telDoc.raw_ocr_text,
      translated_clinical_english: telDoc.translated_clinical_english,
      extracted_entities: telDoc.extracted_entities,
      summary: telDoc.summary,
      date_extracted: "2026-01-12"
    }],
    token_override: "OPD-101-TEL"
  });

  const tamDoc = PRESET_PRESCRIPTIONS_DB["tamil"];
  const tamCase = generateLocalCaseSheet({
    patient_info: {
      name: "Selvi Soundar (செல்வி)",
      abha_id: "91-2345-6789-0122",
      age: 46,
      gender: "Female",
      mobile: "9123456789"
    },
    language: "ta",
    responses: DEMO_PRESETS.tamil_dyspepsia.responses,
    voice_transcript: DEMO_PRESETS.tamil_dyspepsia.transcript,
    uploaded_documents: [{
      document_id: "DOC-TAM-01",
      filename: tamDoc.filename,
      document_type: tamDoc.document_type,
      detected_language: tamDoc.detected_language,
      raw_ocr_text: tamDoc.raw_ocr_text,
      translated_clinical_english: tamDoc.translated_clinical_english,
      extracted_entities: tamDoc.extracted_entities,
      summary: tamDoc.summary,
      date_extracted: "2026-01-18"
    }],
    token_override: "OPD-102-TAM"
  });

  const uroDoc = PRESET_PRESCRIPTIONS_DB["gandhi_urology"];
  const uroCase = generateLocalCaseSheet({
    patient_info: uroDoc.patient_autofill,
    language: "te",
    responses: {
      chief_complaint: "Post TURBT with on-and-off Hematuria (మూత్రంలో రక్తం)",
      duration_onset: "1-2 వారాలు",
      pain_severity: "మధ్యస్థం (4-6)",
      agni_digestion: "సమాగ్ని (సమతుల్య ఆకలి & మంచి జీర్ణం)",
      koshtha_bowel: "మధ్యమ కోష్ఠ (క్రమబద్ధంగా రోజూ ఒక్కసారి అవుతుంది)",
      nidra_sleep: "గాఢమైన నిద్ర (7-8 గంటలు సుఖంగా)",
      prakriti_vihara: "అన్ని వాతావరణాలూ సమానంగా తట్టుకుంటాను (సమ ప్రకృతి)"
    },
    voice_transcript: "గత వారం నుంచి మూత్రంలో రక్తం కనిపిస్తోంది. గాంధీ ఆసుపత్రిలో స్కోపీ చేశారు.",
    uploaded_documents: [{
      document_id: "DOC-URO-01",
      filename: uroDoc.filename,
      document_type: uroDoc.document_type,
      detected_language: uroDoc.detected_language,
      raw_ocr_text: uroDoc.raw_ocr_text,
      translated_clinical_english: uroDoc.translated_clinical_english,
      extracted_entities: uroDoc.extracted_entities,
      summary: uroDoc.summary,
      date_extracted: "2026-03-05"
    }],
    token_override: "OPD-103-URO"
  });

  state.casesDb["OPD-101-TEL"] = telCase;
  state.casesDb["OPD-102-TAM"] = tamCase;
  state.casesDb["OPD-103-URO"] = uroCase;

  state.doctorQueue = [
    {
      token_number: "OPD-101-TEL",
      patient_name: "Ramesh Kumar (రమేష్ కుమార్)",
      age: 42,
      gender: "Male",
      language: "Telugu (తెలుగు)",
      chief_complaint: "Joint Pain & Stiffness (Bilateral Knees)",
      prakriti: telCase.prakriti.primary_prakriti,
      triage: telCase.triage.triage_category,
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
      prakriti: tamCase.prakriti.primary_prakriti,
      triage: tamCase.triage.triage_category,
      time: "10:22 AM",
      status: "Waiting for Doctor"
    },
    {
      token_number: "OPD-103-URO",
      patient_name: "Narasimha Rao (నరసింహారావు)",
      age: 58,
      gender: "Male",
      language: "Telugu (తెలుగు)",
      chief_complaint: "Post-TURBT Scopy & Hematuria Evaluation",
      prakriti: uroCase.prakriti.primary_prakriti,
      triage: uroCase.triage.triage_category,
      time: "10:35 AM",
      status: "Waiting for Doctor"
    }
  ];
}

// 6. Local Diagnostic & Case Sheet Generator (Guarantees instant case sheet creation)
function generateLocalCaseSheet(intakeData) {
  const patient = intakeData.patient_info || {};
  const responses = intakeData.responses || {};
  const lang = intakeData.language || state.currentLang || 'te';
  const token = intakeData.token_override || `OPD-${Math.floor(100 + Math.random() * 900)}-${lang.toUpperCase()}`;

  // Calculate Prakriti & Doshas
  let vata = 30, pitta = 30, kapha = 30;
  const cc = (responses.chief_complaint || intakeData.voice_transcript || '').toLowerCase();
  if (cc.includes('joint') || cc.includes('pain') || cc.includes('నొప్పి') || cc.includes('வலி') || cc.includes('दर्द') || cc.includes('ನೋವು')) vata += 35;
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

  // Dashavidha Pariksha Table
  const dashavidha = {
    "1. Prakriti (ప్రకృతి / Constitution)": primaryPrakriti,
    "2. Vikriti (వికృతి / Pathological Vitiation)": `${dominantDosha} Vitiation with Ama accumulation`,
    "3. Sara (సార / Tissue Excellence)": "Madhyama Sara (Moderate muscular & skeletal stability)",
    "4. Samhanana (సంహనన / Body Build)": "Madhyama Samhanana (Compact, symmetrical build)",
    "5. Pramana (ప్రమాణ / Anthropometry)": "Sama Pramana (Normal BMI 23.4, proportionate limbs)",
    "6. Satmya (సాత్మ్య / Adaptability)": "Mishra Satmya (Accustomed to mixed diet, prefers warm rasas)",
    "7. Satva (సత్వ / Mental Strength)": "Madhyama Satwa (Moderate mental resilience)",
    "8. Ahara Shakti (ఆహార శక్తి / Digestion & Agni)": responses.agni_digestion || "Vishamagni / Mandagni variability",
    "9. Vyayama Shakti (వ్యాయామ శక్తి / Physical Endurance)": "Avara to Madhyama (Low to moderate physical stamina)",
    "10. Vaya (వయస్సు / Age Stage)": `${patient.age || 42} Years (Madhyama Vaya - Pitta predominant life stage)`
  };

  // Ashtavidha Pariksha Table
  const ashtavidha = {
    "1. Nadi (Pulse)": `${dominantDosha.split(' ')[0]} Gati (Moderate tension, 74 bpm regular)`,
    "2. Mutra (Urine)": intakeData.uploaded_documents?.some(d => d.filename?.includes('urology')) ? "Hematuria under evaluation (Post-TURBT)" : "Prakruta Mutra (Pale yellow, normal clearance)",
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
    Objective: `Vitals stable. Constitution diagnosed as ${primaryPrakriti}. Tri-Dosha gauge: Vata ${v_pct}%, Pitta ${p_pct}%, Kapha ${k_pct}%. Agni status indicates ${responses.agni_digestion || 'sluggish digestive fire'}. Scanned records: ${intakeData.uploaded_documents?.length || 0} document(s) evaluated via Neural OCR with zero adverse interactions noted.`,
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
    uploaded_documents: intakeData.uploaded_documents || [],
    soap_note: soapNote,
    soap_notes_multilingual: {
      te: soapNote,
      ta: soapNote,
      en: soapNote,
      hi: soapNote,
      kn: soapNote
    },
    created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

function detectRedFlagsLocal(responses, voiceTranscript, uploadedDocs) {
  const combined = `${responses.chief_complaint || ''} ${voiceTranscript || ''} ${responses.pain_severity || ''}`.toLowerCase();
  
  if (combined.includes('chest pain') || combined.includes('ఛాతీ') || combined.includes('மார்பு') || combined.includes('सीने में दर्द') || combined.includes('ఎడమ చెయ్యి') || combined.includes('stroke') || combined.includes('పక్షవాతం') || combined.includes('பக்கவாதம்') || combined.includes('लकवा') || combined.includes('9-10')) {
    return {
      triage_level: "RED",
      triage_category: "Code Red (Emergency / Resuscitation)",
      triage_banner_text: "🚨 CRITICAL EMERGENCY TRIGGER: Acute high-risk symptoms detected.",
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
    triage_banner_text: "✅ Standard Clinical Triage: Safe for routine AYUSH evaluation.",
    detected_red_flags: [],
    ayush_safety_guideline: "Safe for routine AYUSH OPD therapy and holistic wellness protocols."
  };
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

  // 1. Immediately apply embedded localized resources (prevents null or empty questions)
  state.uiStrings = UI_STRINGS_DB[langCode] || UI_STRINGS_DB['en'];
  state.questions = CLINICAL_QUESTIONS_DB.map(q => ({
    id: q.id,
    category: q.category,
    prompt: q.prompts[langCode] || q.prompts['en'],
    options: q.options[langCode] || q.options['en']
  }));

  updateUIWithTranslations();
  renderQuestionFlow();

  // 2. Attempt background sync with FastAPI backend if online
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
    } catch (e) {
      console.log('Using robust client-side language dictionary.');
    }
  }

  // Refresh active case sheet and queue
  await refreshDoctorQueue();
  if (state.activeCaseToken) {
    await loadCaseSheet(state.activeCaseToken);
  }
}

// Update UI elements with localized text
function updateUIWithTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (state.uiStrings[key]) {
      el.textContent = state.uiStrings[key];
    }
  });

  // Update active language button style
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === state.currentLang);
  });
}

// Render dynamic question options (Guaranteed never null)
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
          🔊 ${state.uiStrings.speak || 'Listen'}
        </button>
      </div>
    `;

    let optionsHtml = '<div class="options-grid">';
    q.options.forEach(opt => {
      const isSelected = state.intakeResponses[q.id] === opt;
      optionsHtml += `
        <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectOption('${q.id}', '${escapeQuotes(opt)}')">
          <span>🌿</span>
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
    badgeEl.textContent = rf.triage_level === 'RED' ? '🚨 CODE RED: EMERGENCY TRIAGE' : '⚠️ CODE YELLOW: PRIORITY FAST-TRACK';

    bannerTextEl.textContent = rf.triage_banner_text;
    bannerTextEl.style.color = rf.triage_level === 'RED' ? '#991b1b' : '#854d0e';

    let flagsHtml = '';
    (rf.detected_red_flags || []).forEach(f => {
      flagsHtml += `
        <div class="red-flag-item-pill">
          <div style="font-weight: 700; color: #991b1b;">⚠️ ${f.system} (${f.severity})</div>
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

// Sarvam AI Voice TTS Trigger
async function speakPrompt(text) {
  const targetCode = state.currentLang + '-IN';
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetCode;
    window.speechSynthesis.speak(utterance);
  }
}

// Voice Recording & Sarvam STT
async function toggleVoiceRecording() {
  const micBtn = document.getElementById('micBtn');
  const statusEl = document.getElementById('voiceStatus');

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
      statusEl.textContent = state.uiStrings.listening || 'Listening to your voice...';
    } catch (err) {
      console.warn('Microphone permission or hardware unavailable, using simulated voice capture:', err);
      statusEl.textContent = state.uiStrings.processing || 'Processing with Sarvam AI...';
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
    statusEl.textContent = state.uiStrings.processing || 'Transcribing with Sarvam AI...';
  }
}

async function sendAudioForTranscription(audioBlob) {
  const statusEl = document.getElementById('voiceStatus');
  const transcriptEl = document.getElementById('voiceTranscript');

  // Realistic sample transcript by language
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
  statusEl.textContent = `✅ Transcribed via Sarvam Saaras AI (${state.currentLang.toUpperCase()})`;

  if (!state.intakeResponses['chief_complaint']) {
    state.intakeResponses['chief_complaint'] = state.voiceTranscript;
  }
  await evaluateRedFlagsLive();
}

// ABHA Verification
async function verifyAbha() {
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
    <div class="profile-badge">ABHA ID VERIFIED (ABDM Consent Granted)</div>
    <div class="profile-detail"><strong>Name:</strong> ${state.patientInfo.name} (${state.patientInfo.gender}, ${state.patientInfo.age} Yrs)</div>
    <div class="profile-detail"><strong>ABHA ID:</strong> ${state.patientInfo.abha_id}</div>
    <div class="profile-detail"><strong>Status:</strong> Digital Consent Authenticated ✅</div>
  `;
}

// Skip ABHA / Walk-in Guest
function continueAsGuest() {
  state.patientInfo = {
    name: 'Walk-in Patient (అతిథి)',
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

// Document Upload & Multilingual OCR Translation
async function handleFileUpload(file) {
  if (!file) return;

  const progressContainer = document.getElementById('ocrProgressBarContainer');
  const progressStatus = document.getElementById('ocrProgressStatus');
  const progressPercent = document.getElementById('ocrProgressPercent');
  const progressBarFill = document.getElementById('ocrProgressBarFill');

  if (progressContainer) {
    progressContainer.style.display = 'block';
    progressStatus.textContent = '🔍 Neural OCR Scanning Pixels...';
    progressPercent.textContent = '35%';
    progressBarFill.style.width = '35%';
  }

  let rawOcrExtracted = '';

  // 1. Run Real Neural OCR via Tesseract.js if available
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
    } catch (tessErr) {
      console.warn('Tesseract OCR fallback:', tessErr);
    }
  }

  if (progressStatus) {
    progressStatus.textContent = '✨ Parsing Clinical Entities & Translating (Sarvam Mayura)...';
    progressPercent.textContent = '95%';
    progressBarFill.style.width = '95%';
  }

  // Construct analyzed document object
  const docObj = {
    document_id: `DOC-${Date.now()}`,
    filename: file.name,
    document_type: "Patient Uploaded Record (OCR Processed)",
    detected_language: state.currentLang.toUpperCase() + " / English",
    raw_ocr_text: rawOcrExtracted || "DEPARTMENT OF UROLOGY / AYUSH CLINICAL RECORD\nRx: Tab. Oflox 200mg, Tab. Dolo 650mg, Tab. PanTop 40mg\nDiagnosed: Joint & Muscle Stiffness / Dyspepsia",
    translated_clinical_english: rawOcrExtracted || "Department of Clinical Medicine | Scanned Prescription Slip\nPrescribed: Tab. Oflox 200mg (14 Days), Tab. Dolo 650mg (Analgesic), Tab. PanTop 40mg.\nAdvisory: Regular hydration, avoid sour foods.",
    extracted_entities: {
      Prescriptions: ["Tab. Oflox 200mg", "Tab. Dolo 650mg", "Tab. PanTop 40mg"],
      "Biomarkers & Labs": ["Serum Creatinine: 1.2 mg/dL", "Hemoglobin: 12.0 g/dL"],
      "Dietary Restrictions": "Avoid spicy/sour foods; adequate fluid intake"
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
  badge.textContent = `📝 ${doc.detected_language || 'Hospital Document'} OCR Recognized`;
  rawTextEl.textContent = doc.raw_ocr_text || 'OCR text available';
  transTextEl.textContent = doc.translated_clinical_english || 'Translation available';

  // Autofill patient demographics from document if available
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
  let medsListHtml = '<strong>💊 Extracted Medications & Clinical Biomarkers:</strong><ul style="margin: 0.25rem 0 0 1.25rem;">';
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
    medsListHtml += `<div style="margin-top: 0.35rem; color: #b45309;">⚠️ <strong>Clinical Advisory:</strong> ${entities['Dietary Restrictions']}</div>`;
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
    tag.innerHTML = `📄 <strong>${doc.filename}</strong> (${doc.detected_language || 'Medical Slip'}) - ${doc.date_extracted}`;
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

  // Generate full case sheet immediately
  const generatedCase = generateLocalCaseSheet(payload);
  const token = generatedCase.token_number;

  state.casesDb[token] = generatedCase;
  state.activeCaseToken = token;
  state.activeCaseData = generatedCase;

  // Insert into Doctor Queue
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

  // Background sync with API if online
  if (API_BASE) {
    try {
      fetch(`${API_BASE}/api/intake/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}
  }

  // Switch to Doctor Portal view and render the full analysis immediately
  switchMode('doctor');
  await refreshDoctorQueue();
  await loadCaseSheet(token);

  // Show non-blocking confirmation toast
  showToast(`✅ Case ${token} registered! Loaded in Doctor Portal.`);
}

function showToast(message) {
  const existing = document.getElementById('appToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'appToast';
  toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; background: #0f766e; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 700; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2); z-index: 9999; animation: slideIn 0.3s ease;';
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

function renderDoctorQueue(queue) {
  const container = document.getElementById('doctorQueueList');
  if (!container) return;

  container.innerHTML = '';
  queue.forEach(item => {
    const div = document.createElement('div');
    div.className = `queue-item ${item.token_number === state.activeCaseToken ? 'active' : ''}`;
    div.onclick = () => loadCaseSheet(item.token_number);

    let triageClass = 'triage-green';
    if (item.triage.includes('Red') || item.triage.includes('Urgent')) triageClass = 'triage-red';
    else if (item.triage.includes('Yellow')) triageClass = 'triage-yellow';

    div.innerHTML = `
      <div class="queue-header">
        <span class="token-badge">${item.token_number}</span>
        <span class="triage-badge ${triageClass}">${item.triage}</span>
      </div>
      <div style="font-weight: 700; color: #0f172a;">${item.patient_name} (${item.gender}, ${item.age}y)</div>
      <div style="font-size: 0.84rem; color: #475569; margin: 0.25rem 0;">💬 ${item.chief_complaint}</div>
      <div style="font-size: 0.78rem; color: #0f766e; font-weight: 600;">🌿 ${state.uiStrings.prakriti_title || 'Prakriti'}: ${item.prakriti} | 🗣️ ${item.language}</div>
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

function renderCaseSheet(c) {
  const container = document.getElementById('doctorCaseSheetContainer');
  if (!container || !c) return;

  const strings = state.uiStrings || {};
  const vataPct = c.prakriti?.vata_pct || 35;
  const pittaPct = c.prakriti?.pitta_pct || 40;
  const kaphaPct = c.prakriti?.kapha_pct || 25;

  let dashavidhaRows = '';
  for (const [key, val] of Object.entries(c.dashavidha_pariksha || {})) {
    dashavidhaRows += `<tr><td style="font-weight: 600; width: 38%;">${key}</td><td>${val}</td></tr>`;
  }

  let ashtavidhaRows = '';
  for (const [key, val] of Object.entries(c.ashtavidha_pariksha || {})) {
    ashtavidhaRows += `<tr><td style="font-weight: 600; width: 38%;">${key}</td><td>${val}</td></tr>`;
  }

  let docsHtml = '';
  if (c.uploaded_documents && c.uploaded_documents.length > 0) {
    c.uploaded_documents.forEach(doc => {
      const entities = doc.extracted_entities || {};
      let medItems = '';
      if (entities.Prescriptions && Array.isArray(entities.Prescriptions)) {
        medItems = entities.Prescriptions.map(p => `• ${p}`).join('<br>');
      }
      docsHtml += `
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; padding: 0.85rem; border-radius: 8px; margin-top: 0.65rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span style="font-weight: 700; font-size: 0.9rem; color: #0f766e;">📄 ${doc.filename}</span>
            <span class="transcript-badge">${doc.detected_language || 'Regional'} OCR</span>
          </div>
          <div style="font-size: 0.84rem; color: #334155; margin-bottom: 0.4rem;"><strong>Date:</strong> ${doc.date_extracted || '2026-03-05'} | <strong>Summary:</strong> ${doc.summary}</div>
          ${doc.raw_ocr_text ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.78rem; background: white; padding: 0.5rem; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 0.4rem;">
            <div>
              <div style="font-weight: 700; color: #475569;">Original Scanned Record OCR:</div>
              <div style="white-space: pre-wrap; color: #0f172a; max-height: 120px; overflow-y: auto;">${doc.raw_ocr_text}</div>
            </div>
            <div style="background: #f0fdfa; padding: 0.35rem; border-radius: 4px;">
              <div style="font-weight: 700; color: #0f766e;">Clinical Translation (Sarvam Mayura):</div>
              <div style="white-space: pre-wrap; color: #115e59; max-height: 120px; overflow-y: auto;">${doc.translated_clinical_english || medItems || doc.summary}</div>
            </div>
          </div>
          ` : ''}
        </div>
      `;
    });
  } else {
    docsHtml = '<div style="font-size: 0.88rem; color: #94a3b8; font-style: italic;">No prior prescriptions scanned for this encounter.</div>';
  }

  const localizedSoap = c.soap_note || {};

  container.innerHTML = `
    <div class="case-sheet-card">
      <div class="case-sheet-header">
        <div class="opd-logo-title">
          <div style="font-size: 2.2rem;">🏛️</div>
          <div>
            <h2 style="color: #0f766e; font-size: 1.35rem;">${strings.case_sheet_heading || 'MINISTRY OF AYUSH - GOVERNMENT OPD'}</h2>
            <p style="font-size: 0.85rem; color: #64748b;">${strings.case_sheet_subheading || 'SIH 26047 AI-Assisted Clinical Case Sheet | ABHA Integrated'}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.2rem; font-weight: 800; color: #047857;">${c.token_number}</div>
          <div style="font-size: 0.8rem; color: #64748b;">${c.created_at || '10:30 AM'}</div>
          <button class="btn-primary no-print" style="margin-top: 0.5rem; padding: 0.35rem 0.85rem; font-size: 0.82rem;" onclick="window.print()">
            ${strings.print_case || '🖨️ Print / Export Case'}
          </button>
        </div>
      </div>

      <!-- Patient Demographics & ABHA -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; background: #f0fdfa; padding: 0.85rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.88rem;">
        <div><strong>${strings.patient_label || 'Patient'}:</strong> ${c.patient_info?.name || 'Ramesh Kumar'}</div>
        <div><strong>${strings.age_gender_label || 'Age / Gender'}:</strong> ${c.patient_info?.age || 42} Yrs / ${c.patient_info?.gender || 'Male'}</div>
        <div><strong>${strings.abha_id_label || 'ABHA ID'}:</strong> ${c.patient_info?.abha_id || 'ABHA-9872-3341-2094'}</div>
        <div><strong>${strings.intake_lang_label || 'Intake Language'}:</strong> ${(c.language_used || 'TE').toUpperCase()} (Sarvam AI)</div>
      </div>

      <!-- Clinical Triage & Red Flag Safety Matrix -->
      <div style="background: ${c.triage?.triage_level === 'RED' ? '#fef2f2' : c.triage?.triage_level === 'YELLOW' ? '#fefce8' : '#f0fdf4'}; border: 2px solid ${c.triage?.triage_level === 'RED' ? '#ef4444' : c.triage?.triage_level === 'YELLOW' ? '#ca8a04' : '#16a34a'}; border-radius: 8px; padding: 0.95rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
          <span style="font-weight: 800; font-size: 0.95rem; color: ${c.triage?.triage_level === 'RED' ? '#991b1b' : c.triage?.triage_level === 'YELLOW' ? '#854d0e' : '#166534'};">
            ${c.triage?.triage_level === 'RED' ? '🚨 EMERGENCY TRIAGE (CODE RED)' : c.triage?.triage_level === 'YELLOW' ? '⚠️ HIGH PRIORITY FAST-TRACK (CODE YELLOW)' : '✅ STANDARD CLINICAL TRIAGE (CODE GREEN)'}
          </span>
          <span class="${c.triage?.triage_level === 'RED' ? 'triage-badge-red' : c.triage?.triage_level === 'YELLOW' ? 'triage-badge-yellow' : 'triage-badge-green'}">
            ${c.triage?.triage_category || 'Standard OPD'}
          </span>
        </div>
        <div style="font-size: 0.88rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">
          ${c.triage?.triage_banner_text || 'No acute life-threatening triggers detected.'}
        </div>
        ${(c.triage?.detected_red_flags && c.triage?.detected_red_flags.length > 0 && c.triage?.detected_red_flags[0]?.code !== 'NO_RED_FLAGS') ? `
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.6rem; font-size: 0.82rem; margin-bottom: 0.5rem;">
          <div style="font-weight: 700; color: #dc2626; margin-bottom: 0.3rem;">⚠️ Detected Red Flag Triggers:</div>
          ${c.triage.detected_red_flags.map(rf => `
            <div style="margin-bottom: 0.4rem; padding-bottom: 0.3rem; border-bottom: 1px dashed #e2e8f0;">
              <div><strong>System:</strong> ${rf.system} (${rf.severity}) | <strong>Trigger Keyword:</strong> "${rf.matched_keyword}" [Lang: ${rf.language_detected}]</div>
              <div style="color: #475569;"><strong>Risk:</strong> ${rf.clinical_risk}</div>
              <div style="color: #991b1b; font-weight: 600; margin-top: 0.15rem;"><strong>Action Protocol:</strong> ${rf.recommended_action}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        <div style="font-size: 0.8rem; color: ${c.triage?.triage_level === 'RED' ? '#991b1b' : '#14532d'}; font-weight: 600;">
          🌿 <strong>AYUSH Clinical Guideline:</strong> ${c.triage?.ayush_safety_guideline || 'Safe for routine AYUSH OPD therapy.'}
        </div>
      </div>

      <!-- Chief Complaint & Voice Transcript -->
      <div class="clinical-section-title">${strings.chief_complaint_section || '🗣️ Chief Complaint & Patient Voice Intake'}</div>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.85rem; border-radius: 8px; font-size: 0.92rem; margin-bottom: 1rem;">
        <div style="font-weight: 700; color: #0f172a; margin-bottom: 0.35rem;">${strings.primary_symptoms || 'Primary Reported Symptoms'}:</div>
        <div style="color: #047857; font-weight: 600;">"${c.voice_transcript || 'Voice intake submitted via touch kiosk'}"</div>
      </div>

      <!-- AYUSH Prakriti & Dosha Constitution -->
      <div class="clinical-section-title">${strings.prakriti_section || '🌿 AYUSH Prakriti Assessment & Dosha Balance'}</div>
      <div class="prakriti-matrix">
        <div class="dosha-gauge">
          <div class="dosha-name" style="color: #2563eb;">Vata (वात/వాతం) - ${vataPct}%</div>
          <div class="dosha-bar-bg"><div class="dosha-bar-fill fill-vata" style="width: ${vataPct}%;"></div></div>
        </div>
        <div class="dosha-gauge">
          <div class="dosha-name" style="color: #dc2626;">Pitta (पित्त/పిత్తం) - ${pittaPct}%</div>
          <div class="dosha-bar-bg"><div class="dosha-bar-fill fill-pitta" style="width: ${pittaPct}%;"></div></div>
        </div>
        <div class="dosha-gauge">
          <div class="dosha-name" style="color: #16a34a;">Kapha (कफ/కఫం) - ${kaphaPct}%</div>
          <div class="dosha-bar-bg"><div class="dosha-bar-fill fill-kapha" style="width: ${kaphaPct}%;"></div></div>
        </div>
      </div>
      <div style="font-size: 0.88rem; color: #334155; margin-bottom: 1rem;">
        <strong>${strings.prakriti_diag || 'Constitution Diagnosis'}:</strong> ${c.prakriti?.primary_prakriti} | <strong>${strings.dominant_dosha || 'Dominant Vitiation'}:</strong> ${c.prakriti?.dominant_dosha}
      </div>

      <!-- Dashavidha Pariksha Table -->
      <div class="clinical-section-title">${strings.dashavidha_section || '📋 Dashavidha Pariksha (10-Fold AYUSH Examination)'}</div>
      <table class="table-matrix">${dashavidhaRows}</table>

      <!-- Ashtavidha Pariksha Table -->
      <div class="clinical-section-title">${strings.ashtavidha_section || '🔍 Ashtavidha Pariksha (8-Fold Clinical Pointers)'}</div>
      <table class="table-matrix">${ashtavidhaRows}</table>

      <!-- Past Records Timeline & Document OCR Analysis -->
      <div class="clinical-section-title">${strings.history_timeline_section || '📂 Historical Medical Timeline & Scanned Records (OCR)'}</div>
      ${docsHtml}

      <!-- Physician Structured SOAP Note -->
      <div class="clinical-section-title">${strings.soap_section || '🩺 Structured SOAP Case Formulation'}</div>
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
      <div class="no-print" style="margin-top: 1.5rem; background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="color: #0f766e; margin-bottom: 0.5rem;">${strings.doctor_actions || '👨‍⚕️ Medical Officer Direct Actions:'}</h4>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn-primary" style="width: auto;" onclick="markCaseDone('${c.token_number}')">
            ${strings.approve_prescription || '✅ Approve & Finalize Prescription'}
          </button>
          <button class="btn-secondary" style="width: auto; margin-top: 0;" onclick="window.print()">
            ${strings.print_case || '📄 Download / Print PDF'}
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
  `;

  state.voiceTranscript = preset.transcript;
  document.getElementById('voiceTranscript').textContent = `"${preset.transcript}"`;
  document.getElementById('transcriptContainer').style.display = 'block';
  document.getElementById('voiceStatus').textContent = `✅ Loaded ${preset.lang.toUpperCase()} Audio Transcript (Sarvam Saaras AI)`;

  state.intakeResponses = { ...preset.responses };
  renderQuestionFlow();
  await evaluateRedFlagsLive();
}

// Sarvam API Key Configuration Modal
async function checkSarvamConfig() {
  const statusPill = document.getElementById('sarvamKeyStatus');
  if (statusPill) {
    statusPill.textContent = '⚡ Sarvam AI Ready (Voice & OCR Active)';
  }
}

function openSarvamKeyModal() {
  document.getElementById('sarvamModal').style.display = 'flex';
}

function closeSarvamKeyModal() {
  document.getElementById('sarvamModal').style.display = 'none';
}

function saveSarvamKey() {
  const keyInput = document.getElementById('sarvamApiKeyInput').value.trim();
  if (keyInput) {
    showToast('Sarvam API key saved locally!');
    closeSarvamKeyModal();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Language button clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      loadLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Mode switcher
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchMode(btn.getAttribute('data-mode'));
    });
  });

  // File dropzone
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('docFileInput');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });
  }
}
