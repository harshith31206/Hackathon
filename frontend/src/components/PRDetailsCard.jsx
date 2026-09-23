import React from 'react';
import { 
  GitPullRequest, 
  GitBranch, 
  ExternalLink, 
  Code2, 
  Clock, 
  GitCommit
} from 'lucide-react';

export function PRDetailsCard({ prResult, ticketId = 'PROJ-101', onViewDiffClick }) {
  const displayData = prResult ? {
    title: prResult.title || `feat: implement ${ticketId} requirements`,
    branch: prResult.branch || `feature/${ticketId}`,
    url: prResult.pr_url || 'https://github.com',
    status: prResult.status || 'Open',
    created: 'Just now',
    target: prResult.base || 'master'
  } : {
    title: 'feat: implement password strength validation',
    branch: `feature/${ticketId || 'PROJ-101'}`,
    url: 'https://github.com',
    status: 'Merged',
    created: '2 mins ago',
    target: 'main'
  };

  return (
    <div className="app-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
            Pull Request Details
          </h2>
          <span className={displayData.status === 'Merged' ? 'badge-merged' : 'badge-open'}>
            <GitPullRequest size={12} />
            {displayData.status}
          </span>
        </div>

        {/* PR Title */}
        <div style={{
          fontSize: '0.94rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '16px',
          lineHeight: 1.35
        }}>
          {displayData.title}
        </div>

        {/* PR Metadata Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <GitBranch size={14} />
              <span>Branch</span>
            </span>
            <span 
              title={displayData.branch}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: '#f1f5f9',
                padding: '3px 8px',
                borderRadius: '6px',
                color: '#1e293b',
                maxWidth: '210px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {displayData.branch}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              <span>Created</span>
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
              {displayData.created}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GitCommit size={14} />
              <span>Target</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              fontWeight: 600,
              background: '#f1f5f9',
              padding: '3px 8px',
              borderRadius: '6px',
              color: '#1e293b'
            }}>
              {displayData.target}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <a
          href={displayData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-blue"
          style={{
            flex: 1,
            textDecoration: 'none',
            fontSize: '0.84rem',
            padding: '9px 12px'
          }}
        >
          <span>View on GitHub</span>
          <ExternalLink size={14} />
        </a>

        <button
          type="button"
          onClick={onViewDiffClick}
          className="btn-outline"
          style={{
            fontSize: '0.84rem',
            padding: '9px 14px'
          }}
        >
          <Code2 size={15} color="#2563eb" />
          <span>View Diff</span>
        </button>
      </div>
    </div>
  );
}
