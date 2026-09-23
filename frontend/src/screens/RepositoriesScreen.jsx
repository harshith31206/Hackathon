import React, { useState } from 'react';
import { 
  GitFork, 
  ExternalLink, 
  CheckCircle2, 
  GitBranch, 
  Code, 
  FileText, 
  Layers, 
  Plus, 
  RefreshCw 
} from 'lucide-react';
import { MOCK_REPOSITORIES } from '../mockData';

export function RepositoriesScreen() {
  const [repos, setRepos] = useState(MOCK_REPOSITORIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRepoUrl, setNewRepoUrl] = useState('');

  const handleAddRepo = (e) => {
    e.preventDefault();
    if (!newRepoUrl.trim()) return;
    const repoName = newRepoUrl.replace('https://github.com/', '').replace('.git', '');
    const newEntry = {
      id: `repo-${Date.now()}`,
      name: repoName,
      url: newRepoUrl.startsWith('http') ? newRepoUrl : `https://github.com/${newRepoUrl}`,
      defaultBranch: 'main',
      fork: null,
      language: 'TypeScript / Node.js',
      activePRs: 0,
      status: 'Connected',
      sandboxImage: 'node:20-alpine',
      rulesFile: 'CODING_STANDARDS.md',
      brdFile: 'docs/BRD.md',
      lastSync: 'Just now'
    };
    setRepos([newEntry, ...repos]);
    setNewRepoUrl('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Connected Git Repositories
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Repositories configured with automated Docker test sandboxes and fork PR integrations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Repository</span>
        </button>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repos.map((repo) => (
          <div key={repo.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <GitFork className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {repo.status}
                  </span>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 font-mono">{repo.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <GitBranch className="w-3 h-3 text-slate-400" />
                    <span>{repo.defaultBranch}</span>
                  </span>
                  <span>•</span>
                  <span>{repo.language}</span>
                </div>
              </div>

              {/* Specs & Sandbox Info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400 text-[11px]">Sandbox:</span>
                  <span className="font-bold text-blue-700">{repo.sandboxImage}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400 text-[11px]">Rules:</span>
                  <span className="text-slate-700 truncate max-w-[170px]">{repo.rulesFile}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400 text-[11px]">BRD Doc:</span>
                  <span className="text-slate-700 truncate max-w-[170px]">{repo.brdFile}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Last sync: {repo.lastSync}</span>
              <span className="font-bold text-blue-600">{repo.activePRs} Active PRs</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Repo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Connect New Repository</h3>
            <p className="text-xs text-slate-500">
              Provide GitHub repository URL. AutoPR will inspect branch topology and clone an isolated workspace.
            </p>

            <form onSubmit={handleAddRepo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  GitHub Repository (e.g. owner/repo)
                </label>
                <input
                  type="text"
                  value={newRepoUrl}
                  onChange={(e) => setNewRepoUrl(e.target.value)}
                  placeholder="github.com/my-org/my-service"
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow"
                >
                  Connect Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
