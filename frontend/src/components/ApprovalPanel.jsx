import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export function ApprovalPanel({ onApprove, onReject, isSubmitting }) {
  return (
    <div
      className="app-card"
      style={{
        marginBottom: '24px',
        border: '1px solid #fde68a',
        background: '#fffdf5',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)'
      }}
    >
      {/* Left Notice */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '700px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: '#fef3c7',
          border: '1px solid #fde68a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ShieldCheck size={24} color="#d97706" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#92400e', margin: 0 }}>
              Human Approval Checkpoint
            </h3>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#b45309',
              background: '#fef3c7',
              padding: '1px 7px',
              borderRadius: '999px'
            }}>
              Action Required
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#b45309', margin: 0, lineHeight: 1.4 }}>
            AutoPR synthesized code modifications and verified test integrity in the sandbox. Review the diffs below and approve to push to GitHub.
          </p>
        </div>
      </div>

      {/* Right Decision Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          type="button"
          onClick={onReject}
          disabled={isSubmitting}
          style={{
            background: '#ffffff',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
        >
          <XCircle size={15} />
          <span>Reject Changes</span>
        </button>

        <button
          type="button"
          onClick={onApprove}
          disabled={isSubmitting}
          style={{
            background: '#10b981',
            border: 'none',
            color: '#ffffff',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#059669';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#10b981';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <CheckCircle2 size={16} />
          <span>{isSubmitting ? 'Pushing PR...' : 'Approve & Push PR'}</span>
        </button>
      </div>
    </div>
  );
}
