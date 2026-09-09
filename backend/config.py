"""Central configuration.

Importing this module loads `.env`, so it must be imported before any module
that reads credentials at import time. Alphabetical ordering places
`backend.config` ahead of `backend.data` and `backend.services`, which keeps the
import block both correctly ordered and correctly sequenced.
"""

import os
from typing import List

from dotenv import load_dotenv

load_dotenv()

# Browsers reject `Access-Control-Allow-Origin: *` alongside credentials, so the
# allow-list is explicit and overridable per deployment.
DEFAULT_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


def get_allowed_origins() -> List[str]:
    """Parse the comma-separated ALLOWED_ORIGINS setting."""
    configured = os.getenv("ALLOWED_ORIGINS", ",".join(DEFAULT_ALLOWED_ORIGINS))
    return [origin.strip() for origin in configured.split(",") if origin.strip()]


def get_sarvam_api_key() -> str:
    """Sarvam AI subscription key; empty string means simulation mode."""
    return os.getenv("SARVAM_API_KEY", "")
