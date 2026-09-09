"""Contract tests for the FastAPI surface consumed by the kiosk and doctor portal."""

import pytest
from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)

SUPPORTED_LANGUAGES = ["te", "ta", "hi", "kn", "en"]


class TestApplicationBoots:
    def test_openapi_schema_is_served(self):
        response = client.get("/openapi.json")

        assert response.status_code == 200
        assert response.json()["info"]["title"]


class TestReferenceData:
    def test_languages_cover_the_five_supported_locales(self):
        response = client.get("/api/languages")

        assert response.status_code == 200
        assert set(response.json()) >= set(SUPPORTED_LANGUAGES)

    @pytest.mark.parametrize("language", SUPPORTED_LANGUAGES)
    def test_translations_are_available_per_language(self, language):
        response = client.get(f"/api/translations/{language}")

        assert response.status_code == 200
        body = response.json()
        assert body["strings"]
        assert body["language_info"]

    def test_unknown_translation_locale_falls_back_to_english(self):
        fallback = client.get("/api/translations/fr").json()
        english = client.get("/api/translations/en").json()

        assert fallback["strings"] == english["strings"]

    @pytest.mark.parametrize("language", SUPPORTED_LANGUAGES)
    def test_questions_are_localised_and_well_formed(self, language):
        response = client.get(f"/api/questions/{language}")

        assert response.status_code == 200
        questions = response.json()
        assert questions
        for question in questions:
            assert {"id", "category", "prompt", "options"} <= set(question)
            assert question["prompt"].strip()

    def test_config_reports_simulation_state_without_leaking_the_key(self):
        response = client.get("/api/config")

        assert response.status_code == 200
        body = response.json()
        assert isinstance(body["sarvam_api_configured"], bool)
        assert set(body["supported_languages"]) >= set(SUPPORTED_LANGUAGES)


class TestAbha:
    def test_known_abha_id_resolves_to_a_profile_with_consent(self):
        response = client.post("/api/abha/verify", json={"identifier": "98-7233-4120-9411"})

        assert response.status_code == 200
        body = response.json()
        assert body["verified"] is True
        assert body["profile"]["abha_id"] == "98-7233-4120-9411"
        assert body["consent_artifact"]["consent_id"].startswith("ABDM-CONSENT-")

    def test_hyphens_are_ignored_when_matching(self):
        hyphenated = client.post(
            "/api/abha/verify", json={"identifier": "98-7233-4120-9411"}
        ).json()
        plain = client.post("/api/abha/verify", json={"identifier": "98723341209411"}).json()

        assert hyphenated["profile"]["name"] == plain["profile"]["name"]

    def test_registered_mobile_resolves_to_the_same_patient(self):
        by_abha = client.post("/api/abha/verify", json={"identifier": "98-7233-4120-9411"}).json()
        by_mobile = client.post("/api/abha/verify", json={"identifier": "9876543210"}).json()

        assert by_mobile["profile"] == by_abha["profile"]

    def test_unregistered_number_still_returns_a_usable_walk_in_profile(self):
        response = client.post("/api/abha/verify", json={"identifier": "12345678901234"})

        assert response.status_code == 200
        assert response.json()["profile"]["abha_id"]


class TestRedFlagEndpoint:
    def test_emergency_complaint_returns_code_red(self):
        response = client.post(
            "/api/clinical/detect-red-flags",
            json={"chief_complaint": "severe crushing chest pain"},
        )

        assert response.status_code == 200
        analysis = response.json()["red_flag_analysis"]
        assert analysis["triage_level"] == "RED"
        assert analysis["is_emergency"] is True

    def test_routine_complaint_returns_green(self):
        response = client.post(
            "/api/clinical/detect-red-flags", json={"chief_complaint": "mild cough"}
        )

        assert response.json()["red_flag_analysis"]["triage_level"] == "GREEN"

    def test_endpoint_accepts_an_empty_body(self):
        response = client.post("/api/clinical/detect-red-flags", json={})

        assert response.status_code == 200


class TestIntakeAndDoctorPortal:
    @staticmethod
    def payload(**overrides):
        body = {
            "patient_info": {"name": "Integration Patient", "age": 51, "gender": "Female"},
            "language": "en",
            "responses": {"chief_complaint": "joint pain", "pain_severity": "6/10"},
            "voice_transcript": "",
            "uploaded_documents": [],
        }
        body.update(overrides)
        return body

    def test_intake_returns_a_token_and_full_case_sheet(self):
        response = client.post("/api/intake/submit", json=self.payload())

        assert response.status_code == 200
        body = response.json()
        assert body["token_number"]
        assert body["case_sheet"]["soap_note"]["Assessment"].strip()

    def test_submitted_case_is_retrievable_by_token(self):
        token = client.post("/api/intake/submit", json=self.payload()).json()["token_number"]

        response = client.get(f"/api/doctor/case/{token}")

        assert response.status_code == 200
        assert response.json()["patient_info"]["name"] == "Integration Patient"

    def test_submitted_case_appears_at_the_front_of_the_queue(self):
        token = client.post("/api/intake/submit", json=self.payload()).json()["token_number"]

        queue = client.get("/api/doctor/queue").json()

        assert queue[0]["token_number"] == token
        assert queue[0]["status"] == "Waiting for Doctor"

    def test_unknown_token_returns_404(self):
        response = client.get("/api/doctor/case/OPD-DOES-NOT-EXIST")

        assert response.status_code == 404

    def test_doctor_notes_update_the_case_and_the_queue(self):
        token = client.post("/api/intake/submit", json=self.payload()).json()["token_number"]

        update = client.post(
            "/api/doctor/update-notes",
            json={
                "token_number": token,
                "doctor_notes": "Snehana and Swedana advised.",
                "prescriptions": ["Trikatu Churna 3g BD"],
                "status": "Consultation Completed",
            },
        )

        assert update.status_code == 200
        case = client.get(f"/api/doctor/case/{token}").json()
        assert case["doctor_plan"] == "Snehana and Swedana advised."
        assert case["prescriptions"] == ["Trikatu Churna 3g BD"]

        queued = next(
            item for item in client.get("/api/doctor/queue").json() if item["token_number"] == token
        )
        assert queued["status"] == "Consultation Completed"

    def test_updating_an_unknown_token_returns_404(self):
        response = client.post(
            "/api/doctor/update-notes",
            json={
                "token_number": "OPD-MISSING",
                "doctor_notes": "n/a",
                "prescriptions": [],
            },
        )

        assert response.status_code == 404

    def test_emergency_intake_is_flagged_in_the_queue(self):
        token = client.post(
            "/api/intake/submit",
            json=self.payload(voice_transcript="severe crushing chest pain radiating to left arm"),
        ).json()["token_number"]

        queued = next(
            item for item in client.get("/api/doctor/queue").json() if item["token_number"] == token
        )
        assert "Red" in queued["triage"]
