import React from 'react';
import { 
  Layers, 
  BrainCircuit, 
  Code2, 
  TestTube2, 
  Sparkles, 
  GitPullRequest, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { PIPELINE_STAGES } from '../mockData';

export function WorkflowDiagram({ activeStage = 0, onStageClick }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'BrainCircuit': return BrainCircuit;
      case 'Code2': return Code2;
      case 'TestTube2': return TestTube2;
      case 'Sparkles': return Sparkles;
      case 'GitPullRequest': return GitPullRequest;
      case 'CheckCircle2': return CheckCircle2;
      default: return Layers;
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Autonomous 7-Stage Engineering Pipeline
            </h3>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
              Full Loop
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Deterministic orchestration from Jira issue ingestion to automated GitHub PR and Jira sync.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Passed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* Horizontal Flow */}
      <div className="grid grid-cols-7 gap-2 items-center relative">
        {PIPELINE_STAGES.map((stage, index) => {
          const Icon = getIcon(stage.icon);
          const isDone = activeStage > stage.id || activeStage === 7;
          const isActive = activeStage === stage.id;
          const isPending = activeStage < stage.id && activeStage !== 7;

          return (
            <div key={stage.id} className="flex items-center">
              <div
                onClick={() => onStageClick && onStageClick(stage.id)}
                className={`w-full flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 border-blue-400 shadow-md shadow-blue-500/10 scale-105 z-10'
                    : isDone
                    ? 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-400'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-sm transition-transform ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-blue-500/30'
                      : isDone
                      ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Step 0{stage.id}
                </div>

                <div className={`text-xs font-bold leading-snug line-clamp-1 ${
                  isActive ? 'text-blue-900' : isDone ? 'text-emerald-900' : 'text-slate-700'
                }`}>
                  {stage.shortName}
                </div>

                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 max-w-[110px]">
                  {stage.desc}
                </div>

                {/* Status Indicator */}
                <div className="mt-2">
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                      ✓ Done
                    </span>
                  ) : isActive ? (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded-full animate-pulse">
                      ● Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-full">
                      Ready
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting Chevron Arrow (except last item) */}
              {index < PIPELINE_STAGES.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-1 text-slate-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
