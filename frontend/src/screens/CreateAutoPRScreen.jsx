import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Search, 
  GitBranch, 
  FileText, 
  Sparkles, 
  Key, 
  CheckCircle2, 
  Layers, 
  HelpCircle, 
  Bot, 
  ShieldCheck, 
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { MOCK_TICKETS, MOCK_REPOSITORIES } from '../mockData';
import axios from 'axios';

export function CreateAutoPRScreen({ onStartAgent, isRunning, defaultTicketId = 'AUTO-101', defaultRepo = 'harshith31206/Hackathon', defaultDesc = '' }) {
  const [ticketId, setTicketId] = useState(defaultTicketId);
  const [repoUrl, setRepoUrl] = useState(defaultRepo);
  const [baseBranch, setBaseBranch] = useState('master');
  const [enableSelfHealing, setEnableSelfHealing] = useState(true);
  const [requireHumanApproval, setRequireHumanApproval] = useState(true);
  const [sandboxEnv, setSandboxEnv] = useState('node:20-alpine');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchNotice, setFetchNotice] = useState(null);

  // Requirements Inbox Text
  const [requirementText, setRequirementText] = useState(
    defaultDesc || 'Enforce modern password complexity requirements (minimum 8 characters, at least 1 number, at least 1 special character). Display explicit real-time error messages if criteria are unmet and ensure valid registrations pass without regression.'
  );

  // Sync props if they change
  useEffect(() => {
    if (defaultTicketId) setTicketId(defaultTicketId);
    if (defaultRepo) setRepoUrl(defaultRepo);
    if (defaultDesc) setRequirementText(defaultDesc);
  }, [defaultTicketId, defaultRepo, defaultDesc]);

  // Sync with preset ticket if chosen
  const handleSelectPreset = (id) => {
    setTicketId(id);
    const found = MOCK_TICKETS.find(t => t.id === id);
    if (found) {
      setRequirementText(found.description);
      setRepoUrl(found.repo);
    }
  };

  const handleFetchDetails = async () => {
    setIsFetching(true);
    setFetchNotice(null);
    try {
      const res = await axios.post('http://localhost:8000/api/jira/fetch-ticket', {
        ticket_id: ticketId.trim()
      });
      if (res.data && res.data.ticket) {
        const t = res.data.ticket;
        const desc = t.description || t.title;
        setRequirementText(desc);
        setFetchNotice({
          live: !!t.live_connected,
          message: t.live_connected ? `Live Jira issue ${t.id} loaded!` : `Ticket template ${t.id} loaded!`
        });
      }
    } catch (e) {
      // Fallback to mock ticket details
      const found = MOCK_TICKETS.find(t => t.id === ticketId.trim().toUpperCase());
      if (found) {
        setRequirementText(found.description);
        setRepoUrl(found.repo);
        setFetchNotice({ live: false, message: `Loaded details for ${found.id} (${found.title})` });
      } else {
        setFetchNotice({ live: false, message: `Custom work item ${ticketId} initialized.` });
      }
    } finally {
      setIsFetching(false);
    }
  };

  const [customKnowledge, setCustomKnowledge] = useState('');
  const [documentName, setDocumentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartAgent(ticketId.trim().toUpperCase() || 'AUTO-101', repoUrl, requirementText, {
      enableSelfHealing,
      requireHumanApproval,
      sandboxEnv,
      baseBranch,
      customKnowledge,
      documentName
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm">
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Create New AutoPR Task
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Provide a Jira issue key or write requirements. AutoPR will analyze codebase context, write code, run tests, and raise a pull request.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            AI Pipeline Ready
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Preset Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Quick Pick Work Item Template:
            </label>
            <div className="flex flex-wrap gap-2">
              {MOCK_TICKETS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectPreset(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
                    ticketId === t.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-mono">{t.id}</span>
                  <span className="opacity-80 font-normal truncate max-w-[180px]">{t.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ticket ID & Fetch Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jira Ticket ID / Issue Key <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                  placeholder="AUTO-101"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <button
                type="button"
                onClick={handleFetchDetails}
                disabled={isFetching}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2"
              >
                {isFetching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Fetch from Jira</span>
              </button>
            </div>
          </div>

          {fetchNotice && (
            <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
              fetchNotice.live ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{fetchNotice.message}</span>
            </div>
          )}

          {/* Requirements Inbox */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Requirements Inbox & Engineering Instructions</span>
                <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Agent Synthesizes Code from This Inbox
              </span>
            </div>

            <textarea
              rows={5}
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              placeholder="Specify requirements, acceptance criteria, APIs, validation rules, or edge cases..."
              className="w-full p-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans shadow-inner resize-y"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Tip: The agent automatically indexes repository BRDs, coding rules, and AST patterns to implement these requirements.
            </p>
          </div>

          {/* Repository & Branch Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Git Repository <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <GitBranch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="harshith31206/Hackathon"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Base Branch to Target
              </label>
              <select
                value={baseBranch}
                onChange={(e) => setBaseBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="master">master (Production)</option>
                <option value="main">main</option>
                <option value="develop">develop</option>
              </select>
            </div>
          </div>

          {/* Advanced Pipeline Options */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Autonomous Pipeline Safeguards:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={enableSelfHealing}
                  onChange={(e) => setEnableSelfHealing(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 mt-0.5"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Self-Healing Loop (ReAct)</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    If tests fail, AI diagnoses logs and automatically self-patches code.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={requireHumanApproval}
                  onChange={(e) => setRequireHumanApproval(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 mt-0.5"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Human Review Checkpoint</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Pause before pushing GitHub branch to require developer approval.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Reviewer Dynamic Knowledge (BRD / Rules) */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Dynamic Knowledge & Guidelines (BRD / Coding Rules)</span>
              </label>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                Reviewer Feature
              </span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              Attach a new document or paste instructions here during review. AutoPR adapts to this knowledge on-the-fly without hardcoded assumptions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Document name (e.g. BRD-ENTERPRISE-02.md)"
                className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDocumentName('BRD-ENTERPRISE-02.md');
                    setCustomKnowledge('All validation must strictly require minimum 12 characters and an uppercase letter (A-Z).');
                  }}
                  className="px-2.5 py-1.5 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-[11px] font-semibold transition-all flex-1 text-center truncate"
                >
                  Preset: 12-Char BRD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDocumentName('CODING_RULES_SNAKE.md');
                    setCustomKnowledge('Function names must use snake_case: validate_password_strength.');
                  }}
                  className="px-2.5 py-1.5 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-[11px] font-semibold transition-all flex-1 text-center truncate"
                >
                  Preset: Snake_Case
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={customKnowledge}
              onChange={(e) => setCustomKnowledge(e.target.value)}
              placeholder="Paste custom BRD or coding guidelines document content..."
              className="w-full p-3 bg-white border border-indigo-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isRunning}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'AutoPR Agent Running...' : 'Launch AutoPR Agent'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
