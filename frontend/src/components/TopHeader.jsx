import React from 'react';
import { Sparkles, Play, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export function TopHeader({ activeScreen, setActiveScreen, isRunning, pipelineStatus = 'IDLE' }) {
  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'dashboard': return 'Platform Overview';
      case 'create': return 'Create AutoPR Work Item';
      case 'live_run': return 'Autonomous Agent Pipeline';
      case 'diff': return 'Interactive Code Diff Viewer';
      case 'prs': return 'GitHub Pull Requests';
      case 'jira': return 'Jira Work Items & Backlog';
      case 'repos': return 'Connected Git Repositories';
      case 'settings': return 'Platform Integrations & Settings';
      default: return 'AutoPR Platform';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AutoPR</span>
        <span className="text-slate-300">/</span>
        <h2 className="text-base font-bold text-slate-900">{getScreenTitle()}</h2>
      </div>

      {/* Right Controls & Status */}
      <div className="flex items-center gap-4">


        {/* Action Button */}
        {activeScreen !== 'create' && (
          <button
            onClick={() => setActiveScreen('create')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch AutoPR</span>
          </button>
        )}
      </div>
    </header>
  );
}
