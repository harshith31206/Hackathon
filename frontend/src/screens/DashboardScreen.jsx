import React from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  Play, 
  Bot, 
  Code2, 
  Layers, 
  AlertCircle 
} from 'lucide-react';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { MOCK_METRICS, MOCK_PRS, MOCK_TICKETS } from '../mockData';

export function DashboardScreen({ onLaunchAutoPR, onViewDiff, onSelectTicket }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-7 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
        <div className="flex items-center justify-between relative z-10 flex-wrap gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>AutoPR Engineering Agent v2.4</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Autonomous Software Engineering from Jira to Pull Request
            </h1>
            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              AutoPR reads Jira tickets, understands repository architecture and BRDs, implements targeted code changes, runs tests inside Docker sandboxes, self-heals failures, and pushes GitHub PRs automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onLaunchAutoPR('AUTO-101')}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-blue-700" />
              <span>Launch AutoPR Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total PRs Created</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GitPullRequest className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{MOCK_METRICS.totalPRs}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
            <span>+12% this week</span>
            <span className="text-slate-400 font-normal">• 100% verified</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sandbox Success Rate</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{MOCK_METRICS.successRate}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
            <span>0 broken builds</span>
            <span className="text-slate-400 font-normal">• Docker isolated</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Self-Healed Bugs</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{MOCK_METRICS.healedErrors}</div>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-1">
            <span>Auto ReAct fixes</span>
            <span className="text-slate-400 font-normal">• No human intervention</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Duration</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{MOCK_METRICS.avgDuration}</div>
          <div className="flex items-center gap-1.5 text-xs text-purple-600 font-semibold mt-1">
            <span>Ticket to PR</span>
            <span className="text-slate-400 font-normal">• 10x faster than manual</span>
          </div>
        </div>
      </div>

      {/* 7-Stage Architectural Pipeline Diagram */}
      <WorkflowDiagram activeStage={7} />

      {/* 2-Column Split: Active Pipelines & Recent Pull Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Ready Jira Tickets to Trigger */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Jira Backlog Ready for AutoPR</h3>
              <p className="text-xs text-slate-500">Pick any work item to initiate autonomous software delivery</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
              4 Issues
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_TICKETS.map((ticket) => (
              <div 
                key={ticket.id} 
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {ticket.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.status === 'In Review' ? 'bg-amber-100 text-amber-800' :
                      ticket.status === 'Done' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {ticket.status}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Repo: {ticket.repo}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{ticket.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{ticket.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onLaunchAutoPR(ticket.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-lg shadow-sm transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run AutoPR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Recent Pull Requests Raised */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Recent Pull Requests</h3>
                <p className="text-xs text-slate-500">Raised automatically to GitHub</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                3 PRs
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_PRS.map((pr) => (
                <div key={pr.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitPullRequest className={`w-4 h-4 ${pr.status === 'Merged' ? 'text-purple-600' : 'text-emerald-600'}`} />
                      <span className="text-xs font-mono font-bold text-slate-800">PR #{pr.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pr.status === 'Merged' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {pr.status}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium">{pr.createdAgo}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{pr.title}</div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-mono text-emerald-600 font-semibold">+{pr.additions} -{pr.deletions}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewDiff && onViewDiff(pr.ticketId)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Diff
                      </button>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 font-semibold"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Powered by Qwen3-Coder & Gemini Flash 3.7</span>
            <span className="font-semibold text-emerald-600">● 100% Sandbox Pass</span>
          </div>
        </div>
      </div>
    </div>
  );
}
