"""Safety tests for the multilingual triage model.

These assertions encode the clinical contract the OPD depends on: a genuine
emergency must never be downgraded to a routine case, and a routine case must
never be escalated into a false Code Red.
"""

import pytest

from backend.services.red_flag_detector import red_flag_detector


def detect(**kwargs):
    return red_flag_detector.detect_red_flags(**kwargs)


class TestNoRedFlags:
    def test_routine_complaint_is_green(self):
        result = detect(chief_complaint="mild seasonal cough", pain_severity="3/10")

        assert result["triage_level"] == "GREEN"
        assert result["is_emergency"] is False
        assert result["total_red_flags_count"] == 0

    def test_green_case_still_returns_a_placeholder_finding(self):
        result = detect(chief_complaint="mild seasonal cough")

        assert result["detected_red_flags"][0]["code"] == "NO_RED_FLAGS"

    def test_empty_input_does_not_crash(self):
        result = detect()

        assert result["triage_level"] == "GREEN"


class TestCriticalEscalation:
    @pytest.mark.parametrize(
        "complaint,expected_code",
        [
            ("severe crushing chest pain", "CARDIO_RESPIRATORY"),
            ("sudden weakness on the right side", "NEUROLOGICAL_STROKE"),
            ("acute urinary retention since morning", "UROLOGICAL_HEMORRHAGE"),
            ("vomiting blood after dinner", "GASTROINTESTINAL_BLEED"),
            ("throat tightness and stridor after a new tablet", "ANAPHYLAXIS_SEVERE_ALLERGY"),
        ],
    )
    def test_english_emergencies_are_code_red(self, complaint, expected_code):
        result = detect(chief_complaint=complaint)

        assert result["triage_level"] == "RED"
        assert result["is_emergency"] is True
        assert expected_code in {flag["code"] for flag in result["detected_red_flags"]}

    @pytest.mark.parametrize(
        "transcript,language",
        [
            ("గుండె నొప్పి చాలా ఎక్కువగా ఉంది", "TE"),
            ("மார்பு வலி மற்றும் மூச்சுத் திணறல்", "TA"),
            ("ಎದೆ ನೋವು ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ", "KN"),
            ("सीने में दर्द और सांस फूलना", "HI"),
        ],
    )
    def test_vernacular_cardiac_transcripts_are_code_red(self, transcript, language):
        result = detect(voice_transcript=transcript)

        assert result["triage_level"] == "RED"
        cardiac = next(
            flag for flag in result["detected_red_flags"] if flag["code"] == "CARDIO_RESPIRATORY"
        )
        assert cardiac["language_detected"] == language

    def test_red_flag_defers_routine_ayush_therapy(self):
        result = detect(chief_complaint="crushing chest pressure")

        assert "deferred" in result["ayush_safety_guideline"].lower()


class TestPrioritySignals:
    def test_unbearable_pain_is_fast_tracked_not_emergency(self):
        result = detect(pain_severity="unbearable pain")

        assert result["triage_level"] == "YELLOW"
        assert result["is_emergency"] is False

    def test_critical_outranks_high_pain(self):
        result = detect(chief_complaint="chest pain", pain_severity="unbearable pain")

        assert result["triage_level"] == "RED"

    def test_hematuria_in_uploaded_records_raises_surveillance_flag(self):
        result = detect(
            chief_complaint="routine post-operative review",
            uploaded_documents=[{"summary": "Post-TURBT hematuria under evaluation"}],
        )

        assert result["triage_level"] == "YELLOW"
        assert "UROLOGICAL_HEMORRHAGE" in {flag["code"] for flag in result["detected_red_flags"]}


class TestFindingShape:
    def test_questionnaire_responses_are_searched(self):
        result = detect(responses={"associated_symptoms": "coughing blood since morning"})

        assert result["triage_level"] == "RED"

    def test_each_category_is_reported_once(self):
        result = detect(
            chief_complaint="chest pain and breathlessness",
            voice_transcript="angina with radiating pain to left arm",
        )

        codes = [flag["code"] for flag in result["detected_red_flags"]]
        assert len(codes) == len(set(codes))

    def test_every_finding_carries_an_actionable_recommendation(self):
        result = detect(chief_complaint="stroke symptoms with slurred speech")

        for flag in result["detected_red_flags"]:
            assert flag["recommended_action"].strip()
            assert flag["clinical_risk"].strip()
