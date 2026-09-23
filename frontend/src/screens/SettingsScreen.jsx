import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Save 
} from 'lucide-react';

export function SettingsScreen() {
  const [modelPool, setModelPool] = useState('multi');
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState('qwen3-coder:30b');
  const [githubUser, setGithubUser] = useState('harshith31206');
  const [jiraDomain, setJiraDomain] = useState('my-company.atlassian.net');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Platform Integrations & Agent Settings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure local/cloud LLM routing, GitHub authentication tokens, and Atlassian Jira credentials.
          </p>
        </div>

        {savedNotice && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* LLM Engine Setting */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">LLM Engine & Model Pool</h3>
              <p className="text-xs text-slate-500">Autonomous reasoning, context understanding & code synthesis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Model Orchestration Mode
              </label>
              <select
                value={modelPool}
                onChange={(e) => setModelPool(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="multi">Hybrid Multi-Model Pool (Gemini 3.7 + Ollama Qwen3)</option>
                <option value="ollama_only">Local Ollama Only (100% Offline / Private)</option>
                <option value="gemini_only">Cloud Google Gemini Only (Flash / Pro)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ollama Local Model Tag
              </label>
              <input
                type="text"
                value={ollamaModel}
                onChange={(e) => setOllamaModel(e.target.value)}
                placeholder="qwen3-coder:30b"
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-700">Active Fallback Chain:</div>
            <div className="font-mono text-[11px] text-blue-700">
              gemini-flash-latest → gemini-3.5-flash-lite → gemini-3.7-flash → Ollama ({ollamaModel})
            </div>
          </div>
        </div>

        {/* GitHub & Jira Cloud Integrations */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">GitHub & Jira Authentication</h3>
              <p className="text-xs text-slate-500">Credentials for automated branch creation, PRs, and Jira status sync</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                GitHub Authenticated User
              </label>
              <input
                type="text"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                ● GitHub CLI (gh) authenticated & fork push enabled
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Atlassian Jira Cloud Domain
              </label>
              <input
                type="text"
                value={jiraDomain}
                onChange={(e) => setJiraDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Transitions issues to "In Review" and comments PR link
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
