// Realistic enterprise mock data for AutoPR hackathon platform

export const PIPELINE_STAGES = [
  {
    id: 1,
    key: 'jira_ticket',
    name: 'Jira Ticket Ingestion',
    shortName: 'Jira Ticket',
    desc: 'Parse issue key, description, acceptance criteria & priority',
    icon: 'Layers',
    color: '#2563eb'
  },
  {
    id: 2,
    key: 'ai_context',
    name: 'AI Context Analysis',
    shortName: 'Context Analysis',
    desc: 'Scan repository, index BRD docs & coding guidelines',
    icon: 'BrainCircuit',
    color: '#7c3aed'
  },
  {
    id: 3,
    key: 'code_changes',
    name: 'Code Changes Synthesis',
    shortName: 'Code Changes',
    desc: 'Generate targeted source code edits matching specifications',
    icon: 'Code2',
    color: '#0284c7'
  },
  {
    id: 4,
    key: 'tests',
    name: 'Sandbox Test Runner (Docker)',
    shortName: 'Docker Sandbox',
    desc: 'Execute unit and integration test assertions in isolated Docker container',
    icon: 'TestTube2',
    color: '#d97706'
  },
  {
    id: 5,
    key: 'react_validation',
    name: 'ReAct Loop & Self-Repair',
    shortName: 'ReAct Loop',
    desc: 'Thought ➔ Action ➔ Observation: validate real execution, diagnose failures & auto-repair',
    icon: 'Sparkles',
    color: '#ea580c'
  },
  {
    id: 6,
    key: 'github_pr',
    name: 'GitHub PR Creation',
    shortName: 'GitHub PR',
    desc: 'Push branch, stage unified diff & open GitHub Pull Request',
    icon: 'GitPullRequest',
    color: '#059669'
  },
  {
    id: 7,
    key: 'jira_update',
    name: 'Jira Cloud Sync',
    shortName: 'Jira Update',
    desc: 'Transition issue to "In Review", post PR link & verification log',
    icon: 'CheckCircle2',
    color: '#16a34a'
  }
];

export const MOCK_METRICS = {
  totalPRs: 38,
  successRate: '96.4%',
  avgDuration: '1m 42s',
  activeAgents: 2,
  healedErrors: 19,
  linesChanged: '+1,840 / -420'
};

export const MOCK_TICKETS = [
  {
    id: 'AUTO-101',
    title: 'Add password strength validation',
    status: 'In Review',
    priority: 'High',
    assignee: 'AutoPR Agent',
    repo: 'harshith31206/Hackathon',
    branch: 'feature/auto-101-update',
    prNumber: 11,
    prUrl: 'https://github.com/harshith31206/Hackathon/pull/11',
    created: '2026-09-19T00:26:00Z',
    description: 'Enforce modern cybersecurity standards (NIST SP 800-63B). Validate password minimum 8 characters, at least 1 number, and 1 special symbol with explicit error messaging.',
    acceptanceCriteria: [
      'Passwords < 8 chars return error: "Password must be at least 8 characters long"',
      'Missing numbers return: "Password must contain at least one number"',
      'Missing special characters return: "Password must contain at least one special character"',
      'Compliant passwords return isValid: true and allow signup to proceed'
    ],
    targetFiles: ['demo-app/src/utils/validation.js', 'demo-app/index.html']
  },
  {
    id: 'PROJ-101',
    title: 'Add employee search by department API',
    status: 'To Do',
    priority: 'Medium',
    assignee: 'Unassigned',
    repo: 'harshith31206/Hackathon',
    branch: 'feature/proj-101-employee-search',
    prNumber: null,
    prUrl: null,
    created: '2026-09-18T16:30:00Z',
    description: 'Provide GET /employees/search endpoint accepting department query parameter, returning matching employees list with unit tests.',
    acceptanceCriteria: [
      'GET /employees/search?department=engineering returns matching employee array',
      'Missing or invalid department returns HTTP 400 Bad Request',
      'Unit tests cover empty results, case insensitivity, and SQL injection safety'
    ],
    targetFiles: ['backend/routes/employees.py', 'tests/test_employees.py']
  },
  {
    id: 'AUTH-204',
    title: 'Implement JWT Token Refresh Rotation',
    status: 'Done',
    priority: 'Highest',
    assignee: 'AutoPR Agent',
    repo: 'harshith31206/Hackathon',
    branch: 'feature/auth-204-token-rotation',
    prNumber: 2,
    prUrl: 'https://github.com/harshith31206/Hackathon/pull/2',
    created: '2026-09-17T11:15:00Z',
    description: 'Implement secure refresh token rotation to prevent replay attacks. Invalidate previous refresh token when a new access token is requested.',
    acceptanceCriteria: [
      'POST /auth/refresh returns new access & refresh tokens',
      'Reusing revoked refresh token revokes all associated session tokens',
      'Integration tests verify 100% token lifecycle'
    ],
    targetFiles: ['backend/services/auth_service.py']
  },
  {
    id: 'PAY-305',
    title: 'Idempotency key enforcement on Stripe webhook',
    status: 'In Progress',
    priority: 'High',
    assignee: 'AutoPR Agent',
    repo: 'acme-corp/payment-service',
    branch: 'feature/pay-305-stripe-idempotency',
    prNumber: null,
    prUrl: null,
    created: '2026-09-18T22:10:00Z',
    description: 'Store incoming Stripe event ID in Redis with 24h TTL to prevent duplicate invoice execution and duplicate charges.',
    acceptanceCriteria: [
      'Webhook handler checks Redis for event ID before dispatching event',
      'Duplicate event returns 200 OK without re-triggering fulfillment',
      'Unit tests simulate duplicate webhook bursts'
    ],
    targetFiles: ['src/webhooks/stripe.ts', 'src/services/idempotency.ts']
  }
];

export const MOCK_PRS = [
  {
    id: 11,
    ticketId: 'AUTO-101',
    title: 'AUTO-101: Add password strength validation',
    repo: 'harshith31206/Hackathon',
    branch: 'feature/auto-101-update',
    base: 'master',
    status: 'Open',
    url: 'https://github.com/harshith31206/Hackathon/pull/11',
    additions: 24,
    deletions: 4,
    changedFilesCount: 2,
    author: 'AutoPR AI Bot',
    createdAgo: '12 minutes ago',
    testsPassed: true,
    healed: false,
    summary: 'Enforces minimum length of 8 characters and inclusion of numeric digits with explicit feedback in registration form.'
  },
  {
    id: 10,
    ticketId: 'AUTO-108',
    title: 'AUTO-108: Factorial recursive algorithm',
    repo: 'harshith31206/Hackathon',
    branch: 'feature/auto-108-update',
    base: 'master',
    status: 'Merged',
    url: 'https://github.com/harshith31206/Hackathon/pull/10',
    additions: 17,
    deletions: 0,
    changedFilesCount: 1,
    author: 'AutoPR AI Bot',
    createdAgo: '1 hour ago',
    testsPassed: true,
    healed: true,
    summary: 'Implemented recursive factorial calculation adhering to coding standards.'
  },
  {
    id: 9,
    ticketId: 'AUTH-204',
    title: 'AUTH-204: Secure JWT refresh token rotation',
    repo: 'harshith31206/Hackathon',
    branch: 'feature/auth-204-token-rotation',
    base: 'master',
    status: 'Merged',
    url: 'https://github.com/harshith31206/Hackathon/pull/9',
    additions: 68,
    deletions: 19,
    changedFilesCount: 3,
    author: 'AutoPR AI Bot',
    createdAgo: '1 day ago',
    testsPassed: true,
    healed: true,
    summary: 'Prevents token replay by issuing single-use refresh tokens with Redis tracking.'
  }
];

export const MOCK_REPOSITORIES = [
  {
    id: 'repo-1',
    name: 'harshith31206/Hackathon',
    url: 'https://github.com/harshith31206/Hackathon',
    defaultBranch: 'master',
    fork: 'harshith31206/Hackathon',
    language: 'JavaScript / HTML / Python',
    activePRs: 11,
    status: 'Connected',
    sandboxImage: 'node:20-alpine',
    rulesFile: 'demo-app/rules/CODING_STANDARDS.md',
    brdFile: 'demo-app/docs/BRD.md',
    lastSync: '2 minutes ago'
  },
  {
    id: 'repo-2',
    name: 'harshith31206/Hackathon',
    url: 'https://github.com/harshith31206/Hackathon',
    defaultBranch: 'master',
    fork: null,
    language: 'Python / FastAPI / React',
    activePRs: 2,
    status: 'Connected',
    sandboxImage: 'python:3.11-slim',
    rulesFile: 'docs/CODING_STANDARDS.md',
    brdFile: 'docs/BRD.md',
    lastSync: '5 minutes ago'
  },
  {
    id: 'repo-3',
    name: 'acme-corp/payment-service',
    url: 'https://github.com/acme-corp/payment-service',
    defaultBranch: 'main',
    fork: 'harshith31206/payment-service',
    language: 'TypeScript / Node.js',
    activePRs: 0,
    status: 'Connected',
    sandboxImage: 'node:20-alpine',
    rulesFile: 'guidelines/standards.md',
    brdFile: 'docs/SPEC.md',
    lastSync: '1 hour ago'
  }
];

export const MOCK_DIFFS = {
  'demo-app/src/utils/validation.js': `--- a/demo-app/src/utils/validation.js
+++ b/demo-app/src/utils/validation.js
@@ -0,0 +1,24 @@
+/**
+ * Password strength validation conforming to NIST SP 800-63B & BRD-AUTH-001.
+ * @param {string} password - User submitted credential.
+ * @returns {{ isValid: boolean, message: string }}
+ */
+export function validatePassword(password) {
+  if (!password || typeof password !== 'string') {
+    return { isValid: false, message: 'Password is required' };
+  }
+  if (password.length < 8) {
+    return { isValid: false, message: 'Password must be at least 8 characters long' };
+  }
+  if (!/\\d/.test(password)) {
+    return { isValid: false, message: 'Password must contain at least one number' };
+  }
+  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
+    return { isValid: false, message: 'Password must contain at least one special character' };
+  }
+  return { isValid: true, message: 'Password meets all security criteria' };
+}
`,
  'demo-app/index.html': `--- a/demo-app/index.html
+++ b/demo-app/index.html
@@ -42,6 +42,12 @@
         <input type="password" id="password" class="form-input" placeholder="Enter password" />
+        <div id="password-feedback" class="feedback-text text-xs mt-1 text-slate-500">
+          Must be at least 8 characters with numbers and symbols
+        </div>
       </div>
+      <div id="validation-alert" class="hidden p-2 rounded text-xs"></div>
       <button type="submit" id="submit-btn" class="btn-primary w-full">Sign Up</button>
`
};

export const MOCK_AGENT_LOGS = [
  { time: '00:01', level: 'info', text: '[Jira Ingestion] Received Work Item request for Ticket: AUTO-101' },
  { time: '00:03', level: 'info', text: '[Workspace] Configuring target repository "harshith31206/Hackathon"' },
  { time: '00:05', level: 'info', text: '[Context Analyzer] Ingesting BRD specification: demo-app/docs/BRD.md (BRD-AUTH-001)' },
  { time: '00:06', level: 'info', text: '[Context Analyzer] Ingesting Coding Standards: demo-app/rules/CODING_STANDARDS.md' },
  { time: '00:09', level: 'ai',   text: '[AI Model] Synthesizing requirements: Minimum 8 chars, 1 digit, 1 symbol, real-time feedback' },
  { time: '00:11', level: 'ai',   text: '[Code Synthesis] Identified target files: demo-app/src/utils/validation.js, demo-app/index.html' },
  { time: '00:14', level: 'ai',   text: '[Code Synthesis] Applied modern ES module validation helper to demo-app/src/utils/validation.js' },
  { time: '00:16', level: 'test', text: '[Sandbox Runner] Spawning Docker container (node:20-alpine)...' },
  { time: '00:18', level: 'warn', text: '[Sandbox Runner] Test run detected 1 assertion warning: Missing special character regex boundary' },
  { time: '00:20', level: 'heal', text: '[Self-Healing Loop 1/3] Diagnosing failure: Regex missing bracket escapes. Applying automatic patch...' },
  { time: '00:22', level: 'heal', text: '[Self-Healing] Re-executing test runner in sandbox: 4/4 assertions PASSED cleanly (Exit Code 0)' },
  { time: '00:24', level: 'checkpoint', text: '[Approval Checkpoint] Verified in sandbox. Auto-approving & pushing to GitHub' },
  { time: '00:28', level: 'git',  text: '[GitHub Service] Created feature branch "feature/auto-101-update"' },
  { time: '00:30', level: 'git',  text: '[GitHub Service] Pushed branch to "harshith31206/Hackathon"' },
  { time: '00:32', level: 'pr',   text: '[GitHub Service] GitHub Pull Request opened: https://github.com/harshith31206/Hackathon/pull/11' },
  { time: '00:34', level: 'jira', text: '[Jira Cloud] Updated ticket AUTO-101 status to "In Review" and posted PR summary link' }
];
