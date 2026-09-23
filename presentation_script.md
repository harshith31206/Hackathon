# AutoPR Hackathon Presentation Script

## Step 1: The Introduction & Problem
*(Start on the **Dashboard** screen. Have it open before the judges walk up.)*

**What you do:** Point to the Dashboard.
**What you say:** 
"Hello! We built **AutoPR**, an autonomous engineering platform designed to eliminate the most tedious parts of software development. 
Right now, developers spend hours reading Jira tickets, trying to understand where code lives, writing boilerplate, and fighting failing tests before they even open a Pull Request. We built a platform that does all of that autonomously."

---

## Step 2: The Jira Integration (Custom Requirements)
*(Click on **Jira Tickets** in the left sidebar)*

**What you do:** Show the list of tickets. Click the **"Create Ticket"** button to open the modal.
**What you say:** 
"Instead of forcing developers to leave their tools, AutoPR integrates directly with Atlassian Jira. To demonstrate how dynamic this is, I'm going to create a brand new ticket right now."
*(Type a quick requirement into the modal like "Update the login button color to red" and hit save)*
"As you can see, the ticket is instantly synced. Now, instead of a human picking this up, we are going to assign our AI agent to fix it."

---

## Step 3: Triggering the Agent
*(Click the blue **"Run AutoPR"** button on the ticket you just created)*

**What you do:** The screen will transition to the Create AutoPR screen. Click the big blue **"Launch AutoPR Agent"** button.
**What you say:** 
"When we click launch, we hand the context over to our LLM pipeline. The AI reads the Jira requirements, scans the target Github repository, and begins our **7-Stage Autonomous Workflow**."

---

## Step 4: The 7-Stage Workflow & Self-Healing
*(You are now on the **Live Agent Run** screen. Watch the progress bars load and point to the terminal logs)*

**What you do:** Let the animation run. Point to the terminal logs as they scroll. 
**What you say:** 
"This is a live look at the agent's brain. 
First, it analyzes the codebase to find exactly which files to edit. 
Second, it synthesizes the new code.
But here is the most important part of our project: **Agentic Self-Healing**. Unlike basic code generators, AutoPR actually runs the project's unit tests locally against its own code. If a test fails, the agent reads the error logs, feeds them back into its context, and autonomously rewrites the code until the tests pass. It fixes its own mistakes before a human ever sees it."

---

## Step 5: Human-in-the-Loop Review
*(Wait for the pipeline to hit 100%. Then click on **Code Diff** in the left sidebar)*

**What you do:** Show the side-by-side code comparison.
**What you say:** 
"Even though it is autonomous, we built this with a 'Human-in-the-Loop' architecture. We don't want AI blindly pushing code to production. Before anything is merged, the Lead Engineer gets this clean Code Diff screen to review exactly what the AI changed. The AI acts as the typist; the human acts as the architectural reviewer."

---

## Step 6: The Final Result
*(Click on **Pull Requests** in the left sidebar)*

**What you do:** Show the list of generated PRs.
**What you say:** 
"Once approved, the system automatically pushes the code to GitHub, opens a Pull Request, and syncs the status back to the original Jira ticket. 

With AutoPR, we've successfully taken a plain-text Jira requirement and turned it into a fully tested, ready-to-merge Pull Request—completely autonomously. Thank you, we'd love to answer any questions!"

---

### 💡 Quick Tips for Delivery:
*   **Pacing:** Don't rush when the pipeline is running (Step 4). Use that visual loading time to explain the "Self-Healing" concept, because that is the most technically impressive part.
*   **Confidence:** Practice this script out loud 3 times while clicking through your app. You'll sound incredibly professional!
