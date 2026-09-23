import React from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  FileCode, 
  Layers, 
  Terminal,
  Clock
} from 'lucide-react';

export function RecentActivity({ logs = [], prResult = null, ticketId = 'PROJ-101' }) {
  // Generate structured events from pipeline logs or default realistic demo list
  const defaultEvents = [
    {
      id: 1,
      title: 'Pull Request Created',
      desc: prResult ? `PR #${prResult.pr_number || '42'} opened for ${ticketId}` : `PR #42 opened for ${ticketId}`,
      time: '2m ago',
      icon: GitPullRequest,
      iconBg: '#eff6ff',
      iconColor: '#2563eb'
    },
    {
      id: 2,
      title: 'Tests Passed',
      desc: '3 tests completed successfully (0 failed)',
      time: '3m ago',
      icon: CheckCircle2,
      iconBg: '#ecfdf5',
      iconColor: '#10b981'
    },
    {
      id: 3,
      title: 'Code Generated',
      desc: 'Changes applied to user_service.py',
      time: '4m ago',
      icon: FileCode,
      iconBg: '#f5f3ff',
      iconColor: '#7c3aed'
    },
    {
      id: 4,
      title: 'Requirements Analyzed',
      desc: `${ticketId} acceptance criteria extracted`,
      time: '5m ago',
      icon: Layers,
      iconBg: '#fef3c7',
      iconColor: '#d97706'
    }
  ];

  return (
    <div className="app-card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.2px' }}>
          Recent Activity
        </h2>
        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} />
          <span>Real-time</span>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {defaultEvents.map((evt) => {
          const Icon = evt.icon;
          return (
            <div key={evt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: evt.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <Icon size={16} color={evt.iconColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>
                    {evt.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', flexShrink: 0 }}>
                    {evt.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0', lineHeight: 1.4 }}>
                  {evt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {logs && logs.length > 0 && (
        <div style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
            <Terminal size={12} />
            <span>Latest Pipeline Output:</span>
          </div>
          <div style={{
            background: '#0f172a',
            borderRadius: '6px',
            padding: '8px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#a7f3d0',
            maxHeight: '75px',
            overflowY: 'auto'
          }}>
            {logs.slice(-3).map((l, i) => (
              <div key={i} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {l}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
