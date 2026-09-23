import React from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Check, 
  Loader2, 
  Layers, 
  Search, 
  FileText, 
  Code, 
  TestTube2, 
  GitPullRequest 
} from 'lucide-react';

export function AgentProgress({ currentStep = 0, status = 'IDLE', prResult = null, ticketId = 'PROJ-101' }) {
  const stepsConfig = [
    {
      id: 1,
      title: 'Analyze Jira Ticket',
      defaultDesc: 'Requirements parsed',
      icon: Layers
    },
    {
      id: 2,
      title: 'Search Repository',
      defaultDesc: 'Found relevant source files',
      icon: Search
    },
    {
      id: 3,
      title: 'Read & Analyze Code',
      defaultDesc: 'Identified changes needed',
      icon: FileText
    },
    {
      id: 4,
      title: 'Implement Changes',
      defaultDesc: 'Validation logic added',
      icon: Code
    },
    {
      id: 5,
      title: 'Run Tests',
      defaultDesc: 'Sandbox tests verified cleanly',
      icon: TestTube2
    },
    {
      id: 6,
      title: 'Create Pull Request',
      defaultDesc: prResult ? `PR #${prResult.pr_id || prResult.pr_number || '4'} opened` : 'PR published to GitHub',
      icon: GitPullRequest
    }
  ];

  const isCompleted = status === 'COMPLETED' || !!prResult;
  const isRunning = status === 'RUNNING';

  return (
    <div className="app-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
            Agent Progress
          </h2>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: '6px',
            background: isCompleted ? '#ecfdf5' : isRunning ? '#eff6ff' : '#f1f5f9',
            color: isCompleted ? '#065f46' : isRunning ? '#1d4ed8' : '#64748b'
          }}>
            {isCompleted ? '6 / 6 Steps Done' : isRunning ? `Step ${Math.min(currentStep, 6)} of 6` : 'Ready'}
          </span>
        </div>

        {/* Vertical Step Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stepsConfig.map((step, idx) => {
            const stepNum = step.id;
            const isStepDone = isCompleted || currentStep > stepNum || (currentStep === 6 && status === 'COMPLETED');
            const isStepActive = isRunning && currentStep === stepNum;

            return (
              <div 
                key={step.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  background: isStepActive ? '#eff6ff' : 'transparent',
                  border: isStepActive ? '1px solid #bfdbfe' : '1px solid transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Step Circle Icon + Labels */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  {isStepDone ? (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.25)'
                    }}>
                      <Check size={14} color="#ffffff" strokeWidth={3} />
                    </div>
                  ) : isStepActive ? (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                    }}>
                      <Loader2 size={13} color="#ffffff" className="spin-animation" />
                    </div>
                  ) : (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1.5px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      background: '#ffffff'
                    }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8' }}>
                        {stepNum}
                      </span>
                    </div>
                  )}

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: isStepDone ? '#0f172a' : isStepActive ? '#1d4ed8' : '#64748b',
                      lineHeight: 1.2
                    }}>
                      {step.title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: isStepDone ? '#10b981' : isStepActive ? '#3b82f6' : '#94a3b8',
                      fontWeight: 500,
                      marginTop: '1px'
                    }}>
                      {isStepActive ? 'Processing...' : step.defaultDesc}
                    </div>
                  </div>
                </div>

                {/* Right Step Timestamp */}
                <div style={{
                  fontSize: '0.72rem',
                  color: isStepDone ? '#64748b' : '#94a3b8',
                  fontWeight: 500,
                  fontFamily: 'var(--font-mono)',
                  flexShrink: 0
                }}>
                  {isStepDone ? `10:14:0${idx * 2 + 1}` : '--:--:--'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AutoPR Completed Banner (Mockup Visual) */}
      {isCompleted && (
        <div style={{
          marginTop: '18px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '12px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)'
            }}>
              <CheckCircle2 size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#065f46', lineHeight: 1.2 }}>
                AutoPR Completed!
              </div>
              <div style={{ fontSize: '0.73rem', color: '#047857' }}>
                Branch feature/{ticketId || 'AUTO-101'} pushed & PR created
              </div>
            </div>
          </div>

          <a
            href={prResult?.pr_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-blue"
            style={{
              padding: '7px 12px',
              fontSize: '0.8rem',
              textDecoration: 'none',
              borderRadius: '8px'
            }}
          >
            <span>View PR</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}
    </div>
  );
}
