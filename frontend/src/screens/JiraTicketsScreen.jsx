import React, { useState } from 'react';
import { 
  Ticket, Play, Search, Layers, Filter, CheckCircle2, 
  Clock, AlertCircle, ExternalLink, Plus, X 
} from 'lucide-react';

export function JiraTicketsScreen({ onLaunchTicket, tickets, setTickets }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRepo, setNewRepo] = useState('harshith31206/Hackathon');
  const [newCriteria, setNewCriteria] = useState('');

  const filteredTickets = tickets.filter(t => {
    if (filter !== 'ALL' && t.status.toUpperCase().replace(/\s+/g, '_') !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `AUTO-${100 + tickets.length + 1}`,
      title: newTitle,
      status: 'To Do',
      priority: 'High',
      description: newDesc,
      repo: newRepo,
      acceptanceCriteria: newCriteria.split('\n').filter(c => c.trim() !== '')
    };
    
    setTickets([newTicket, ...tickets]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewCriteria('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Jira Work Items & Backlog
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Atlassian Jira Cloud
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Issues synchronized with Jira Cloud. Select any ticket to initiate automated AI software engineering.
          </p>
        </div>

        {/* Actions & Filters */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-slate-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Ticket
          </button>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {['ALL', 'TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search issues..."
              className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48"
            />
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTickets.map((t) => (
          <div 
            key={t.id} 
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {t.id}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    t.status === 'In Review' ? 'bg-amber-100 text-amber-800' :
                    t.status === 'Done' ? 'bg-emerald-100 text-emerald-800' :
                    t.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <span className={`text-xs font-bold ${
                  t.priority === 'Highest' || t.priority === 'High' ? 'text-red-600' : 'text-slate-600'
                }`}>
                  {t.priority} Priority
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{t.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.description}</p>
              </div>

              {/* Acceptance Criteria */}
              {t.acceptanceCriteria && t.acceptanceCriteria.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Acceptance Criteria:
                  </span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {t.acceptanceCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Repo: {t.repo}
              </span>

              <button
                onClick={() => onLaunchTicket(t.id, t.repo, t.description)}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-sm shadow-blue-500/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run AutoPR</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Create New Jira Ticket</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ticket Title</label>
                <input 
                  type="text" required
                  value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Create a new login component"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Repository</label>
                <input 
                  type="text" required
                  value={newRepo} onChange={e => setNewRepo(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="owner/repo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description & Requirements</label>
                <textarea 
                  required rows={4}
                  value={newDesc} onChange={e => setNewDesc(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Describe what the agent should build..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Acceptance Criteria (One per line)</label>
                <textarea 
                  rows={3}
                  value={newCriteria} onChange={e => setNewCriteria(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="- Must include validation
- Needs to match design system"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Create & Save Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
