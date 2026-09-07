"""
Ayushman Bharat Health Account (ABHA) Sandbox Integration & Consent Module
"""

import uuid
from datetime import datetime
from typing import Dict, Any

class ABHAService:
    def __init__(self):
        # Mock ABHA sandbox database for hackathon demonstration
        self.mock_profiles = {
            "987233412094": {
                "abha_id": "98-7233-4120-9411",
                "abha_address": "ramesh.kumar@abdm",
                "name": "Ramesh Kumar (రమేష్ కుమార్)",
                "gender": "Male",
                "dob": "1982-06-14",
                "age": 42,
                "mobile": "9876543210",
                "blood_group": "O+",
                "state": "Andhra Pradesh",
                "district": "Visakhapatnam",
                "pincode": "530003"
            },
            "912345678901": {
                "abha_id": "91-2345-6789-0122",
                "abha_address": "selvi.soundar@abdm",
                "name": "Selvi Soundararajan (செல்வி)",
                "gender": "Female",
                "dob": "1978-11-20",
                "age": 46,
                "mobile": "9123456789",
                "blood_group": "B+",
                "state": "Tamil Nadu",
                "district": "Madurai",
                "pincode": "625001"
            },
            "888877776666": {
                "abha_id": "88-8877-7766-6633",
                "abha_address": "kavitha.gowda@abdm",
                "name": "Kavitha Gowda (ಕವಿತಾ ಗೌಡ)",
                "gender": "Female",
                "dob": "1989-03-12",
                "age": 35,
                "mobile": "8888777766",
                "blood_group": "A+",
                "state": "Karnataka",
                "district": "Mysuru",
                "pincode": "570001"
            }
        }

    def verify_and_fetch_profile(self, identifier: str) -> Dict[str, Any]:
        """
        Verify ABHA ID / Mobile and retrieve ABDM profile
        """
        clean_id = identifier.replace("-", "").strip()
        profile = self.mock_profiles.get(clean_id)

        if profile:
            consent_token = f"ABDM-CONSENT-{str(uuid.uuid4())[:8].upper()}"
            return {
                "status": "success",
                "verified": True,
                "profile": profile,
                "consent_artifact": {
                    "consent_id": consent_token,
                    "granted_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "purpose": "AYUSH Out-Patient Clinical Case Taking & Diagnosis",
                    "data_custodian": "Ministry of Ayush National Health Facility",
                    "expiry": "24 Hours (OPD Session)"
                }
            }
        else:
            # Generate simulated verified profile for any custom 10/14-digit number
            name_seed = f"Patient {clean_id[-4:] if len(clean_id)>=4 else 'Citizen'}"
            generated_profile = {
                "abha_id": f"{clean_id[:2]}-{clean_id[2:6]}-{clean_id[6:10]}-{clean_id[10:]}" if len(clean_id)==14 else f"ABHA-{clean_id}",
                "abha_address": f"user_{clean_id[:6]}@abdm",
                "name": name_seed,
                "gender": "Other/Not Disclosed",
                "dob": "1985-01-01",
                "age": 39,
                "mobile": clean_id if len(clean_id) == 10 else "9800000000",
                "blood_group": "B+",
                "state": "India",
                "district": "District Ayush Hospital",
                "pincode": "500001"
            }
            return {
                "status": "success",
                "verified": True,
                "profile": generated_profile,
                "consent_artifact": {
                    "consent_id": f"ABDM-CONSENT-{str(uuid.uuid4())[:8].upper()}",
                    "granted_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "purpose": "AYUSH Out-Patient Clinical Case Taking",
                    "data_custodian": "Government Ayush OPD",
                    "expiry": "24 Hours"
                }
            }

abha_service = ABHAService()
