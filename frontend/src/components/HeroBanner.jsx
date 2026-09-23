import React from 'react';
import { ArrowRight, Bot, GitPullRequest, Layers, Sparkles } from 'lucide-react';

export function HeroBanner({ provider = 'Gemini Flash' }) {
  return (
    <div className="app-card" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px',
      marginBottom: '24px',
      padding: '26px 32px'
    }}>
      {/* Left Text */}
      <div style={{ maxWidth: '620px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.5px',
            margin: 0,
            lineHeight: 1.1
          }}>
            AutoPR
          </h1>
          <span style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            color: '#1d4ed8',
            border: '1px solid #bfdbfe',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={11} /> Enterprise AI
          </span>
        </div>

        <div style={{
          fontSize: '1.02rem',
          fontWeight: 600,
          color: '#334155',
          marginBottom: '6px'
        }}>
          Let AI handle the coding. You review, we deliver.
        </div>
        <p style={{
          fontSize: '0.88rem',
          color: '#64748b',
          lineHeight: 1.55,
          margin: 0
        }}>
          Turn Jira tickets into tested code, verify inside isolated sandboxes, and create pull requests automatically — with your autonomous AI engineer.
        </p>
      </div>

      {/* Right Diagram (Exact 3-step workflow) */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '16px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
      }}>
        {/* Step 1: Jira Ticket */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.28)'
          }}>
            <Layers size={22} color="#ffffff" />
          </div>
          <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#334155' }}>
            Jira Ticket
          </span>
        </div>

        <ArrowRight size={16} color="#94a3b8" />

        {/* Step 2: AI Agent */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.28)'
          }}>
            <Bot size={22} color="#ffffff" />
          </div>
          <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#334155' }}>
            AI Agent
          </span>
        </div>

        <ArrowRight size={16} color="#94a3b8" />

        {/* Step 3: Pull Request */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.22)'
          }}>
            <GitPullRequest size={22} color="#ffffff" />
          </div>
          <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#334155' }}>
            Pull Request
          </span>
        </div>
      </div>
    </div>
  );
}
