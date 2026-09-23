import requests
from requests.auth import HTTPBasicAuth
from typing import Optional, Dict, Any
from config import settings

MOCK_TICKETS = {
    "AUTO-101": {
        "id": "AUTO-101",
        "title": "Add password strength validation",
        "description": "Add password validation to the registration form in the demo web application (minimum 8 characters, at least one number, at least one special character per BRD-AUTH-001).",
        "requirements": [
            "Password must contain at least 8 characters.",
            "Password must contain at least one number.",
            "Password must contain at least one special character.",
            "Display a clear validation message in registration form.",
            "Existing valid passwords must continue to work."
        ],
        "acceptance_criteria": [
            "Weak passwords are rejected with a clear error message.",
            "Strong passwords containing length >= 8, a number, and a special char are accepted.",
            "Validation messages update dynamically upon form submission.",
            "Unit tests in test/validation.test.js pass cleanly."
        ],
        "target_files": ["demo-app/src/utils/validation.js", "demo-app/index.html"],
        "priority": "High",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-1": {
        "id": "SCRUM-1",
        "title": "Password Complexity & Security Policy",
        "description": "Enforce NIST SP 800-63B password validation constraints: minimum 8 characters, at least one numeric digit, at least one special character.",
        "requirements": [
            "Minimum 8 characters length constraint.",
            "At least one numeric digit required.",
            "At least one special character required.",
            "Descriptive error messaging on validation failures."
        ],
        "acceptance_criteria": [
            "Short passwords (<8) rejected with actionable message.",
            "Missing digit rejected.",
            "Missing special character rejected.",
            "Valid passwords return null or isValid: true."
        ],
        "target_files": ["demo-app/src/utils/validation.js"],
        "priority": "High",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-2": {
        "id": "SCRUM-2",
        "title": "Add employee search by department",
        "description": "Implement searchEmployeesByDepartment in demo-app/src/utils/employeeService.js. Must accept department parameter, validate input, filter employees, and support comprehensive unit testing.",
        "requirements": [
            "Implement searchEmployeesByDepartment(department, employees) pure function.",
            "Require non-empty department string, throw Error('Department parameter is required.') otherwise.",
            "Perform case-insensitive matching against employee departments.",
            "Add automated test assertions in demo-app/test/employeeService.test.js."
        ],
        "acceptance_criteria": [
            "Searching 'Engineering' returns all engineering staff.",
            "Empty or null department throws descriptive validation error.",
            "Case-insensitive matching works (e.g. 'engineering' matches 'Engineering').",
            "Test suite passes in isolated sandbox."
        ],
        "target_files": ["demo-app/src/utils/employeeService.js", "demo-app/test/employeeService.test.js"],
        "priority": "Medium",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "PROJ-101": {
        "id": "PROJ-101",
        "title": "Add employee search by department API",
        "description": "Implement searchEmployeesByDepartment in demo-app/src/utils/employeeService.js. Must accept department parameter, validate input, filter employees, and support comprehensive unit testing.",
        "requirements": [
            "Implement searchEmployeesByDepartment(department, employees) pure function.",
            "Require non-empty department string, throw Error('Department parameter is required.') otherwise.",
            "Perform case-insensitive matching against employee departments.",
            "Add automated test assertions in demo-app/test/employeeService.test.js."
        ],
        "acceptance_criteria": [
            "Searching 'Engineering' returns all engineering staff.",
            "Empty or null department throws descriptive validation error.",
            "Unit tests pass 100% cleanly."
        ],
        "target_files": ["demo-app/src/utils/employeeService.js", "demo-app/test/employeeService.test.js"],
        "priority": "Medium",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-3": {
        "id": "SCRUM-3",
        "title": "Modern Responsive Login & Signup Web Page",
        "description": "Design and build a responsive HTML5 login interface in demo-app/index.html with modern styling, accessible form inputs, and real-time validation badges.",
        "requirements": [
            "Clean HTML5 semantic structure with form, labels, inputs, and submit button.",
            "Responsive layout with card centering, CSS variables, and modern aesthetics.",
            "Input fields for email and secure password.",
            "Password validation visual feedback indicators."
        ],
        "acceptance_criteria": [
            "Page renders cleanly without broken tags or style artifacts.",
            "Form contains functional client-side input validation.",
            "Responsive design accommodates desktop and mobile viewports."
        ],
        "target_files": ["demo-app/index.html"],
        "priority": "High",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "UI-102": {
        "id": "UI-102",
        "title": "Modern Responsive Login & Signup Web Page",
        "description": "Design and build a responsive HTML5 login interface in demo-app/index.html with modern styling, accessible form inputs, and real-time validation badges.",
        "requirements": [
            "Clean HTML5 semantic structure with form, labels, inputs, and submit button.",
            "Responsive layout with card centering, CSS variables, and modern aesthetics.",
            "Input fields for email and secure password.",
            "Password validation visual feedback indicators."
        ],
        "acceptance_criteria": [
            "Page renders cleanly without broken tags or style artifacts.",
            "Form contains functional client-side input validation.",
            "Responsive design accommodates desktop and mobile viewports."
        ],
        "target_files": ["demo-app/index.html"],
        "priority": "High",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-4": {
        "id": "SCRUM-4",
        "title": "Corporate Email Domain Validation",
        "description": "Implement validateCorporateEmail function in demo-app/src/utils/validation.js restricting registration to approved corporate domains (@company.com, @partner.org).",
        "requirements": [
            "Create validateCorporateEmail(email) utility function.",
            "Enforce permitted domains: @company.com and @partner.org.",
            "Return descriptive error string if domain is not allowed, null if valid.",
            "Add automated test assertions in demo-app/test/validation.test.js."
        ],
        "acceptance_criteria": [
            "Corporate email 'user@company.com' is accepted.",
            "Public domain 'user@gmail.com' is rejected with error.",
            "Empty email returns 'Email is required.'",
            "Tests pass with 100% assertions."
        ],
        "target_files": ["demo-app/src/utils/validation.js", "demo-app/test/validation.test.js"],
        "priority": "Medium",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-5": {
        "id": "SCRUM-5",
        "title": "User Profile & Contact Information Service",
        "description": "Implement updateUserProfile in demo-app/src/utils/userProfile.js allowing updates to user display name, phone number, and preferences with strict validation rules.",
        "requirements": [
            "Implement updateUserProfile(currentProfile, updates) function.",
            "Validate display name length (at least 2 characters).",
            "Validate phone number format (must contain 10 digits).",
            "Return updated profile object or throw descriptive validation error.",
            "Add unit tests in demo-app/test/userProfile.test.js."
        ],
        "acceptance_criteria": [
            "Valid profile updates merge seamlessly into profile object.",
            "Invalid phone numbers are rejected with validation error.",
            "Immutable update pattern preserving unaltered fields.",
            "Automated unit tests pass cleanly."
        ],
        "target_files": ["demo-app/src/utils/userProfile.js", "demo-app/test/userProfile.test.js"],
        "priority": "Medium",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-6": {
        "id": "SCRUM-6",
        "title": "Math & Factorial Calculation Service",
        "description": "Implement calculateFactorial and math calculation utilities in demo-app/src/utils/mathUtils.js supporting edge cases (0! = 1, negative numbers throw error, big integer support).",
        "requirements": [
            "Implement calculateFactorial(n) function.",
            "Handle 0 and 1 returning 1.",
            "Throw Error('Factorial of negative numbers is undefined.') for n < 0.",
            "Verify with automated tests in demo-app/test/mathUtils.test.js."
        ],
        "acceptance_criteria": [
            "calculateFactorial(5) returns 120.",
            "calculateFactorial(0) returns 1.",
            "Negative input throws Error.",
            "All unit test assertions execute cleanly."
        ],
        "target_files": ["demo-app/src/utils/mathUtils.js", "demo-app/test/mathUtils.test.js"],
        "priority": "Medium",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    },
    "SCRUM-7": {
        "id": "SCRUM-7",
        "title": "Order Discount & Cart Calculation Engine",
        "description": "Implement calculateOrderDiscount in demo-app/src/utils/cartService.js applying tiered discount rates based on order subtotal and coupon codes.",
        "requirements": [
            "Implement calculateOrderDiscount(subtotal, couponCode).",
            "Apply 10% discount for orders >= $100, 20% for orders >= $250.",
            "Support valid promo code 'SAVE15' for 15% discount.",
            "Return { originalSubtotal, discountAmount, finalTotal }.",
            "Add unit tests in demo-app/test/cartService.test.js."
        ],
        "acceptance_criteria": [
            "Tiered discounts calculate accurately.",
            "Invalid coupon codes do not apply discount.",
            "Total cannot be negative.",
            "Unit tests verify edge cases."
        ],
        "target_files": ["demo-app/src/utils/cartService.js", "demo-app/test/cartService.test.js"],
        "priority": "High",
        "status": "To Do",
        "source": "Scrum Sprint Backlog"
    }
}


def _extract_adf_text(node: Any) -> str:
    """
    Recursively extracts plain text from Atlassian Document Format (ADF) JSON.
    """
    if isinstance(node, str):
        return node
    if isinstance(node, list):
        return " ".join(_extract_adf_text(item) for item in node).strip()
    if isinstance(node, dict):
        text_parts = []
        if "text" in node:
            text_parts.append(node["text"])
        if "content" in node:
            text_parts.append(_extract_adf_text(node["content"]))
        return " ".join(filter(None, text_parts)).strip()
    return ""


class JiraService:
    def __init__(self):
        self.default_url = settings.JIRA_URL.rstrip("/") if settings.JIRA_URL else ""
        self.default_email = settings.JIRA_EMAIL
        self.default_token = settings.JIRA_API_TOKEN

    def _get_auth(self, email: Optional[str] = None, token: Optional[str] = None):
        e = (email or self.default_email or "").strip()
        t = (token or self.default_token or "").strip()
        if e and t:
            return HTTPBasicAuth(e, t)
        return None

    def _resolve_url(self, url: Optional[str] = None) -> str:
        u = (url or self.default_url or "").strip().rstrip("/")
        if u and not u.startswith("http://") and not u.startswith("https://"):
            u = f"https://{u}"
        return u

    def get_ticket(
        self,
        ticket_id: str,
        custom_url: Optional[str] = None,
        custom_email: Optional[str] = None,
        custom_token: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Fetches ticket details from Jira Cloud REST API v3 using provided or configured credentials.
        Falls back to local knowledge base or mock if no token or unreachable.
        """
        ticket_id = ticket_id.strip().upper()
        jira_url = self._resolve_url(custom_url)
        auth = self._get_auth(custom_email, custom_token)

        # If live credentials are provided and not forced mock, query Atlassian API
        if auth and jira_url and "your-domain" not in jira_url:
            endpoint = f"{jira_url}/rest/api/3/issue/{ticket_id}"
            headers = {"Accept": "application/json"}
            print(f"[JiraService] Querying Atlassian Jira API: {endpoint}")
            try:
                res = requests.get(endpoint, headers=headers, auth=auth, timeout=8)
                if res.status_code == 200:
                    data = res.json()
                    fields = data.get("fields", {})
                    
                    # Parse ADF description into human readable text
                    raw_desc = fields.get("description")
                    parsed_desc = _extract_adf_text(raw_desc) if raw_desc else ""
                    
                    summary = fields.get("summary", f"Work Item {ticket_id}")
                    priority = fields.get("priority", {}).get("name", "Medium") if fields.get("priority") else "Medium"
                    status_name = fields.get("status", {}).get("name", "To Do") if fields.get("status") else "To Do"
                    
                    print(f"[JiraService] Successfully fetched live Jira issue {ticket_id}: '{summary}'")
                    return {
                        "id": ticket_id,
                        "title": summary,
                        "description": parsed_desc or summary,
                        "requirements": [parsed_desc] if parsed_desc else [summary],
                        "acceptance_criteria": [f"Satisfies specifications of {ticket_id}"],
                        "priority": priority,
                        "status": status_name,
                        "source": "Atlassian Jira Cloud API",
                        "live_connected": True
                    }
                elif res.status_code == 401:
                    print(f"[JiraService] Authentication failed (401). Check Jira Email and API Token.")
                elif res.status_code == 404:
                    print(f"[JiraService] Issue {ticket_id} not found on {jira_url} (404).")
                else:
                    print(f"[JiraService] Jira API returned status code {res.status_code}: {res.text[:200]}")
            except Exception as e:
                print(f"[JiraService] Network error connecting to Jira: {e}")

        # Fallback to local ticket definitions
        if ticket_id in MOCK_TICKETS:
            return MOCK_TICKETS[ticket_id]

        return {
            "id": ticket_id,
            "title": f"Task {ticket_id}: Autonomous Implementation",
            "description": f"Implement required changes and acceptance criteria for {ticket_id}.",
            "requirements": ["Implement requested functionality", "Pass all automated tests"],
            "acceptance_criteria": ["All tests pass in Docker sandbox", "Pull request opened"],
            "priority": "Medium",
            "status": "To Do",
            "source": "Local Template",
            "live_connected": False
        }

    def update_ticket_status(
        self,
        ticket_id: str,
        new_status: str,
        pr_url: str,
        custom_url: Optional[str] = None,
        custom_email: Optional[str] = None,
        custom_token: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Updates Jira ticket status to 'In Review' or 'In Progress' and posts a PR link comment.
        """
        ticket_id = ticket_id.strip().upper()
        jira_url = self._resolve_url(custom_url)
        auth = self._get_auth(custom_email, custom_token)

        # Update local ticket cache
        if ticket_id in MOCK_TICKETS:
            MOCK_TICKETS[ticket_id]["status"] = new_status
            MOCK_TICKETS[ticket_id]["pr_url"] = pr_url

        live_updated = False
        if auth and jira_url and "your-domain" not in jira_url:
            headers = {"Accept": "application/json", "Content-Type": "application/json"}
            
            # 1. Post comment with Pull Request URL
            comment_endpoint = f"{jira_url}/rest/api/3/issue/{ticket_id}/comment"
            comment_payload = {
                "body": {
                    "type": "doc",
                    "version": 1,
                    "content": [{
                        "type": "paragraph",
                        "content": [
                            {"type": "text", "text": "🚀 "},
                            {"type": "text", "text": "AutoPR: ", "marks": [{"type": "strong"}]},
                            {"type": "text", "text": "Implementation complete and validated via Docker sandbox.\n"},
                            {"type": "text", "text": "Pull Request opened: "},
                            {
                                "type": "text",
                                "text": pr_url,
                                "marks": [{"type": "link", "attrs": {"href": pr_url}}]
                            }
                        ]
                    }]
                }
            }
            try:
                c_res = requests.post(comment_endpoint, json=comment_payload, headers=headers, auth=auth, timeout=8)
                if c_res.status_code in [200, 201]:
                    print(f"[JiraService] Successfully posted PR comment to Jira issue {ticket_id}.")
                    live_updated = True
                else:
                    print(f"[JiraService] Failed to post comment ({c_res.status_code}): {c_res.text[:150]}")
            except Exception as e:
                print(f"[JiraService] Comment error: {e}")

            # 2. Attempt transition to "In Review" or "In Progress"
            try:
                trans_endpoint = f"{jira_url}/rest/api/3/issue/{ticket_id}/transitions"
                t_res = requests.get(trans_endpoint, headers=headers, auth=auth, timeout=8)
                if t_res.status_code == 200:
                    transitions = t_res.json().get("transitions", [])
                    matched_id = None
                    for t in transitions:
                        name = t.get("name", "").lower()
                        if "review" in name or "progress" in name or "done" in name:
                            matched_id = t.get("id")
                            break
                    if matched_id:
                        requests.post(trans_endpoint, json={"transition": {"id": matched_id}}, headers=headers, auth=auth, timeout=5)
                        print(f"[JiraService] Transitioned Jira issue {ticket_id} to '{new_status}' (Transition ID {matched_id})")
            except Exception as e:
                print(f"[JiraService] Transition error: {e}")

        return {
            "ticket_id": ticket_id,
            "status": new_status,
            "pr_url": pr_url,
            "live_updated": live_updated,
            "success": True
        }
