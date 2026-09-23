import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent.engine import AutoPREngine

app = FastAPI(title="AutoPR Engine API", version="1.0.0")

# Enable CORS for frontend dashboard access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engine targeting the demo-app directory
DEMO_APP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "demo-app"))
engine = AutoPREngine(demo_app_path=DEMO_APP_PATH)


class RunRequest(BaseModel):
    ticket_id: str = "AUTO-101"
    repo_url: Optional[str] = None
    custom_description: Optional[str] = None
    jira_url: Optional[str] = None
    jira_email: Optional[str] = None
    jira_token: Optional[str] = None
    custom_knowledge: Optional[str] = None
    document_name: Optional[str] = None
    auto_approve: bool = True


class JiraFetchRequest(BaseModel):
    ticket_id: str
    jira_url: Optional[str] = None
    jira_email: Optional[str] = None
    jira_token: Optional[str] = None


class ApprovalRequest(BaseModel):
    decision: str  # "approve" or "reject"


@app.get("/")
def read_root():
    return {"status": "AutoPR Engine API is running"}


@app.post("/api/jira/fetch-ticket")
def fetch_jira_ticket(req: JiraFetchRequest):
    """
    Directly query Atlassian Jira Cloud API using provided credentials,
    returning summary, description, and status.
    """
    try:
        ticket = engine.jira_service.get_ticket(
            ticket_id=req.ticket_id,
            custom_url=req.jira_url,
            custom_email=req.jira_email,
            custom_token=req.jira_token
        )
        return {"success": True, "ticket": ticket}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/run")
def run_pipeline(req: RunRequest):
    try:
        state = engine.start_pipeline(
            ticket_id=req.ticket_id,
            repo_url=req.repo_url,
            custom_description=req.custom_description,
            jira_url=req.jira_url,
            jira_email=req.jira_email,
            jira_token=req.jira_token,
            custom_knowledge=req.custom_knowledge,
            document_name=req.document_name,
            auto_approve=req.auto_approve
        )
        return {"success": True, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/status")
def get_status():
    return engine.state


@app.post("/api/approve")
def submit_approval(req: ApprovalRequest):
    try:
        state = engine.submit_human_approval(req.decision)
        return {"success": True, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/pause")
def pause_pipeline():
    try:
        state = engine.pause_pipeline()
        return {"success": True, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/resume")
def resume_pipeline():
    try:
        state = engine.resume_pipeline()
        return {"success": True, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ticket/{ticket_id}")
def get_ticket(ticket_id: str):
    ticket = engine.jira_service.get_ticket(ticket_id)
    return ticket


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
