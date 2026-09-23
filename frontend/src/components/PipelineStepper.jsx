import React from 'react';
import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Receive Work Item' },
  { id: 2, label: 'Ingest BRDs & Rules' },
  { id: 3, label: 'Requirement Spec' },
  { id: 4, label: 'Codebase Analysis' },
  { id: 5, label: 'Create Plan' },
  { id: 6, label: 'Implement Code' },
  { id: 7, label: 'Docker Sandbox & ReAct' },
  { id: 8, label: 'Human Approval' },
  { id: 9, label: 'GitHub PR' },
  { id: 10, label: 'Jira Update' }
];

export function PipelineStepper({ currentStep, status }) {
  const getStepStatus = (stepId) => {
    if (currentStep > stepId) return 'completed';
    if (currentStep === stepId) {
      if (status === 'AWAITING_APPROVAL') return 'awaiting';
      if (status === 'FAILED' || status === 'REJECTED') return 'failed';
      if (status === 'COMPLETED') return 'completed';
      return 'running';
    }
    if (status === 'COMPLETED') return 'completed';
    return 'pending';
  };

  return (
    <div className="glass-card" style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Live Execution Pipeline
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
        {STEPS.map((step) => {
          const stepStatus = getStepStatus(step.id);
          let icon = <Clock size={16} color="var(--text-muted)" />;
          let borderColor = 'rgba(255, 255, 255, 0.08)';
          let bgColor = 'rgba(0, 0, 0, 0.2)';
          let textColor = 'var(--text-muted)';

          if (stepStatus === 'completed') {
            icon = <CheckCircle2 size={16} color="var(--success)" />;
            borderColor = 'rgba(16, 185, 129, 0.4)';
            bgColor = 'rgba(16, 185, 129, 0.1)';
            textColor = '#34d399';
          } else if (stepStatus === 'running') {
            icon = <Loader2 size={16} color="var(--accent-cyan)" className="spin" />;
            borderColor = 'rgba(6, 182, 212, 0.5)';
            bgColor = 'rgba(6, 182, 212, 0.12)';
            textColor = '#22d3ee';
          } else if (stepStatus === 'awaiting') {
            icon = <AlertCircle size={16} color="var(--warning)" />;
            borderColor = 'rgba(245, 158, 11, 0.5)';
            bgColor = 'rgba(245, 158, 11, 0.15)';
            textColor = '#fbbf24';
          } else if (stepStatus === 'failed') {
            icon = <AlertCircle size={16} color="var(--danger)" />;
            borderColor = 'rgba(239, 68, 68, 0.5)';
            bgColor = 'rgba(239, 68, 68, 0.15)';
            textColor = '#fca5a5';
          }

          return (
            <div
              key={step.id}
              style={{
                border: `1px solid ${borderColor}`,
                background: bgColor,
                borderRadius: '8px',
                padding: '10px 8px',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                {icon}
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: textColor }}>Step {step.id}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: textColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
