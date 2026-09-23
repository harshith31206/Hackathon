import React from 'react';
import { CheckCircle, Circle, PlayCircle, Loader2 } from 'lucide-react';

export function LivePipelineFooter({ currentStep, status }) {
  // Steps mapping matching the exact pipeline request:
  // 1: Requirement
  // 2-4: Context
  // 5-6: Code
  // 7-8: PR
  // 9: UI Test
  // 10: Fix / Complete

  const pipelineSteps = [
    { label: 'BRD Context', minStep: 3 },
    { label: 'Code Gen', minStep: 6 },
    { label: 'Docker Sandbox', minStep: 8 },
    { label: 'Human Review', minStep: 9 },
    { label: 'GitHub PR', minStep: 10 },
    { label: 'Jira Update', minStep: 11 }
  ];

  return (
    <div
      className="glass-card"
      style={{
        marginTop: '24px',
        padding: '16px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}
    >
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
        LIVE PIPELINE
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        {pipelineSteps.map((step, idx) => {
          const isDone = currentStep >= step.minStep || status === 'COMPLETED';
          const isCurrent = currentStep === step.minStep - 1 || (currentStep < step.minStep && (idx === 0 || currentStep >= pipelineSteps[idx - 1].minStep));
          
          return (
            <React.Fragment key={step.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isDone ? (
                  <CheckCircle size={18} color="#10b981" />
                ) : isCurrent && status === 'RUNNING' ? (
                  <Loader2 size={18} color="#3b82f6" className="spin" />
                ) : isCurrent && status === 'AWAITING_APPROVAL' ? (
                  <PlayCircle size={18} color="#f59e0b" />
                ) : (
                  <Circle size={18} color="#475569" />
                )}
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isDone || isCurrent ? 600 : 400,
                    color: isDone ? '#34d399' : isCurrent ? '#60a5fa' : '#64748b'
                  }}
                >
                  {step.label}
                </span>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <span style={{ color: '#475569', fontWeight: 600 }}>→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
