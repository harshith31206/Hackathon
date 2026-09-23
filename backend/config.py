import os
import subprocess
from dotenv import load_dotenv

load_dotenv()

def _resolve_github_token() -> str:
    token = os.getenv("GITHUB_TOKEN", "").strip()
    if token:
        return token
    # Fallback to local gh CLI token if present
    try:
        res = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, timeout=2)
        if res.returncode == 0 and res.stdout.strip():
            return res.stdout.strip()
    except Exception:
        pass
    return ""

class Settings:
    JIRA_URL: str = os.getenv("JIRA_URL", "https://your-domain.atlassian.net")
    JIRA_EMAIL: str = os.getenv("JIRA_EMAIL", "developer@example.com")
    JIRA_API_TOKEN: str = os.getenv("JIRA_API_TOKEN", "")
    GITHUB_TOKEN: str = _resolve_github_token()
    GITHUB_REPO: str = os.getenv("GITHUB_REPO", "harshith31206/Hackathon")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    USE_MOCK_SERVICES: bool = os.getenv("USE_MOCK_SERVICES", "false").lower() == "true"
    USE_MOCK_SERVICED: bool = USE_MOCK_SERVICES

settings = Settings()

