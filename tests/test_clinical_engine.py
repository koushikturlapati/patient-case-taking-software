"""Tests for Prakriti scoring, Pariksha localisation and case-sheet synthesis."""

import pytest

from backend.services.clinical_engine import clinical_engine

LANGUAGES = ["te", "ta", "hi", "kn", "en"]


class TestPrakritiCalculation:
    def test_dosha_percentages_total_one_hundred(self):
        result = clinical_engine.calculate_prakriti_and_doshas(
            {"chief_complaint": "joint pain", "agni_digestion": "vishamagni"}
        )

        assert result["vata_pct"] + result["pitta_pct"] + result["kapha_pct"] == 100

    def test_neutral_intake_stays_balanced(self):
        result = clinical_engine.calculate_prakriti_and_doshas({})

        # 100 is not divisible by three, so the closest possible split is 34/33/33.
        percentages = [result["vata_pct"], result["pitta_pct"], result["kapha_pct"]]
        assert max(percentages) - min(percentages) <= 1

    def test_rounding_residue_does_not_invent_a_kapha_dominance(self):
        """A symptom-free intake used to read as Kapha purely from rounding."""
        result = clinical_engine.calculate_prakriti_and_doshas({})

        assert result["kapha_pct"] <= result["vata_pct"]
        assert result["dominant_dosha"].startswith("Vata")

    def test_gauge_percentages_agree_with_the_reported_dominant_dosha(self):
        for responses in (
            {},
            {"chief_complaint": "joint pain", "agni_digestion": "vishamagni"},
            {"chief_complaint": "acidity", "agni_digestion": "tikshnagni"},
            {"chief_complaint": "fatigue", "agni_digestion": "mandagni"},
        ):
            result = clinical_engine.calculate_prakriti_and_doshas(responses)
            percentages = {
                "Vata": result["vata_pct"],
                "Pitta": result["pitta_pct"],
                "Kapha": result["kapha_pct"],
            }
            leader = max(percentages, key=percentages.get)

            assert result["dominant_dosha"].startswith(leader), responses

    def test_joint_pain_with_vishamagni_is_vata_dominant(self):
        result = clinical_engine.calculate_prakriti_and_doshas(
            {
                "chief_complaint": "joint pain and stiffness",
                "agni_digestion": "vishamagni",
                "koshtha_bowel": "krura koshtha",
            }
        )

        assert result["vata_pct"] > result["pitta_pct"]
        assert result["vata_pct"] > result["kapha_pct"]
        assert result["dominant_dosha"].startswith("Vata")

    def test_acidity_with_tikshnagni_is_pitta_dominant(self):
        result = clinical_engine.calculate_prakriti_and_doshas(
            {"chief_complaint": "acidity and heartburn", "agni_digestion": "tikshnagni"}
        )

        assert result["pitta_pct"] > result["vata_pct"]
        assert result["dominant_dosha"].startswith("Pitta")

    def test_fatigue_with_mandagni_is_kapha_dominant(self):
        result = clinical_engine.calculate_prakriti_and_doshas(
            {"chief_complaint": "fatigue and cough", "agni_digestion": "mandagni"}
        )

        assert result["kapha_pct"] > result["pitta_pct"]
        assert result["dominant_dosha"].startswith("Kapha")

    @pytest.mark.parametrize(
        "complaint",
        ["కీళ్ళ నొప్పులు", "மூட்டு வலி", "जोड़ों का दर्द", "ಕೀಲು ನೋವು"],
    )
    def test_vernacular_joint_pain_raises_vata(self, complaint):
        vernacular = clinical_engine.calculate_prakriti_and_doshas({"chief_complaint": complaint})
        baseline = clinical_engine.calculate_prakriti_and_doshas({})

        assert vernacular["vata_pct"] > baseline["vata_pct"]


class TestParikshaLocalisation:
    @pytest.mark.parametrize("language", LANGUAGES)
    def test_dashavidha_returns_ten_factors(self, language):
        prakriti = clinical_engine.calculate_prakriti_and_doshas({})
        result = clinical_engine.get_localized_dashavidha(language, prakriti, {"age": 42}, {})

        assert len(result) == 10
        assert all(str(value).strip() for value in result.values())

    @pytest.mark.parametrize("language", LANGUAGES)
    def test_ashtavidha_returns_eight_factors(self, language):
        prakriti = clinical_engine.calculate_prakriti_and_doshas({})
        result = clinical_engine.get_localized_ashtavidha(language, prakriti, {})

        assert len(result) == 8

    def test_unknown_language_falls_back_to_english(self):
        prakriti = clinical_engine.calculate_prakriti_and_doshas({})
        unknown = clinical_engine.get_localized_ashtavidha("fr", prakriti, {})
        english = clinical_engine.get_localized_ashtavidha("en", prakriti, {})

        assert unknown == english

    def test_patient_age_is_reflected_in_vaya(self):
        prakriti = clinical_engine.calculate_prakriti_and_doshas({})
        result = clinical_engine.get_localized_dashavidha("en", prakriti, {"age": 67}, {})

        assert any("67" in str(value) for value in result.values())


class TestCaseSheetGeneration:
    @staticmethod
    def intake(**overrides):
        payload = {
            "patient_info": {"name": "Test Patient", "age": 42, "gender": "Male"},
            "language": "en",
            "responses": {
                "chief_complaint": "joint pain",
                "duration_onset": "2 weeks",
                "pain_severity": "6/10",
            },
            "voice_transcript": "",
            "uploaded_documents": [],
        }
        payload.update(overrides)
        return payload

    def test_case_sheet_exposes_every_section_the_portal_renders(self):
        sheet = clinical_engine.generate_case_sheet(self.intake())

        for key in (
            "token_number",
            "created_at",
            "patient_info",
            "prakriti",
            "triage",
            "dashavidha_pariksha",
            "ashtavidha_pariksha",
            "soap_note",
            "status",
        ):
            assert key in sheet

    def test_soap_note_has_all_four_sections(self):
        sheet = clinical_engine.generate_case_sheet(self.intake())

        assert set(sheet["soap_note"]) == {
            "Subjective",
            "Objective",
            "Assessment",
            "Plan",
        }

    def test_token_numbers_are_unique(self):
        tokens = {
            clinical_engine.generate_case_sheet(self.intake())["token_number"] for _ in range(25)
        }

        assert len(tokens) == 25

    def test_emergency_transcript_propagates_into_the_case_sheet(self):
        sheet = clinical_engine.generate_case_sheet(
            self.intake(voice_transcript="severe crushing chest pain and breathlessness")
        )

        assert sheet["triage"]["is_emergency"] is True
        assert sheet["triage"]["triage_level"] == "RED"

    @pytest.mark.parametrize("language", LANGUAGES)
    def test_case_sheet_is_generated_for_every_supported_language(self, language):
        sheet = clinical_engine.generate_case_sheet(self.intake(language=language))

        assert sheet["language_used"] == language
        assert sheet["soap_note"]["Subjective"].strip()

    def test_all_language_variants_are_bundled_for_the_doctor_toggle(self):
        sheet = clinical_engine.generate_case_sheet(self.intake())

        assert set(sheet["soap_notes_multilingual"]) == set(LANGUAGES)

    def test_missing_optional_fields_do_not_break_synthesis(self):
        sheet = clinical_engine.generate_case_sheet({"responses": {}})

        assert sheet["token_number"]
        assert sheet["soap_note"]["Plan"].strip()
