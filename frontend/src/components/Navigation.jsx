import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  PlayCircle, 
  Code2, 
  GitPullRequest, 
  Ticket, 
  GitFork, 
  Settings, 
  Sparkles, 
  Bot, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export function Navigation({ activeScreen, setActiveScreen, isRunning, pipelineStage = 0 }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create AutoPR', icon: PlusCircle },
    { id: 'live_run', label: 'Single-Page Studio', icon: PlayCircle, badge: isRunning ? 'Running' : 'All-in-One' },
    { id: 'diff', label: 'Code Diff', icon: Code2 },
    { id: 'prs', label: 'Pull Requests', icon: GitPullRequest, count: 3 },
    { id: 'jira', label: 'Jira Tickets', icon: Ticket, count: 4 },
    { id: 'repos', label: 'Repositories', icon: GitFork, count: 3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0b1120] text-slate-300 flex flex-col justify-between h-screen border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setActiveScreen('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">AutoPR</h1>
              <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">v2.4</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Autonomous Software Agent</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}

                {item.count && !item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${
                    isActive ? 'bg-blue-700/80 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & AI Status Card */}
      <div className="p-4 space-y-3">


        {/* User Pill */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow">
              SH
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Sri Harshith</div>
              <div className="text-[11px] text-slate-400">Lead Engineer</div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
      </div>
    </aside>
  );
}
