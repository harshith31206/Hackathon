import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink, 
  GitPullRequest, 
  Code2, 
  Folder, 
  File,
  ChevronRight
} from 'lucide-react';
import { MOCK_DIFFS } from '../mockData';

export function CodeDiffScreen({ codeChanges, ticketId = 'AUTO-101' }) {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState('demo-app/src/utils/validation.js');
  const [viewMode, setViewMode] = useState('unified'); // 'unified' or 'split'

  // Use real diffs if available, or rich mock diffs
  const availableDiffs = (codeChanges && codeChanges.diffs && Object.keys(codeChanges.diffs).length > 0)
    ? codeChanges.diffs
    : MOCK_DIFFS;

  const fileList = Object.keys(availableDiffs);
  const activeDiff = availableDiffs[selectedFile] || availableDiffs[fileList[0]] || '';

  // Calculate additions & deletions
  let addCount = 0;
  let delCount = 0;
  const parsedLines = activeDiff.split('\n').map((line, idx) => {
    let type = 'context';
    if (line.startsWith('+') && !line.startsWith('+++')) {
      type = 'add';
      addCount++;
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      type = 'del';
      delCount++;
    } else if (line.startsWith('@@')) {
      type = 'meta';
    }
    return { line, type, lineNum: idx + 1 };
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDiff);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              {ticketId}
            </span>
            <span className="text-xs text-slate-500 font-medium">Modified Files & Synthesized Unified Diffs</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
            Interactive Code Changes Viewer
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('unified')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'unified' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Unified
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'split' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Split View
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Diff'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: File Explorer & Code Diff Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Cols: Changed Files List */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Changed Files ({fileList.length})
            </h3>
            <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +{addCount} -{delCount}
            </span>
          </div>

          <div className="space-y-1.5">
            {fileList.map((filePath) => {
              const isSelected = selectedFile === filePath;
              const fileName = filePath.split('/').pop();
              const dirName = filePath.split('/').slice(0, -1).join('/');

              return (
                <button
                  key={filePath}
                  onClick={() => setSelectedFile(filePath)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate font-mono">{fileName}</div>
                      {dirName && <div className="text-[10px] text-slate-400 truncate font-mono">{dirName}/</div>}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            All modifications synthesized following repository coding guidelines.
          </div>
        </div>

        {/* Right 8 Cols: Dark Theme Syntax Diff Box */}
        <div className="lg:col-span-8 bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Top Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono font-bold text-slate-200">{selectedFile}</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-400 font-bold">+{addCount}</span>
              <span className="text-red-400 font-bold">-{delCount}</span>
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto max-h-[540px] text-slate-300">
            {parsedLines.map((item, idx) => {
              let bg = 'bg-transparent';
              let text = 'text-slate-300';
              let prefix = ' ';

              if (item.type === 'add') {
                bg = 'bg-emerald-950/40 border-l-2 border-emerald-500';
                text = 'text-emerald-300 font-semibold';
              } else if (item.type === 'del') {
                bg = 'bg-red-950/40 border-l-2 border-red-500';
                text = 'text-red-300';
              } else if (item.type === 'meta') {
                bg = 'bg-blue-950/30';
                text = 'text-blue-400 font-bold';
              }

              return (
                <div key={idx} className={`flex items-center py-0.5 px-3 rounded-sm ${bg} hover:bg-slate-800/40`}>
                  <span className="w-10 select-none text-slate-600 text-right pr-4 shrink-0">
                    {item.lineNum}
                  </span>
                  <span className={`whitespace-pre ${text}`}>{item.line}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
