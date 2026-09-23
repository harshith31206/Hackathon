import React from 'react';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export function Header({ status = 'IDLE', llmModel = 'qwen3-coder:30b / Gemini Flash' }) {
  const isRunning = status === 'RUNNING';

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '12px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Left Title / Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
          Dashboard
        </span>
        <span style={{ color: '#cbd5e1' }}>/</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
          Overview
        </span>
      </div>

      {/* Right LLM Status Pill (exact mockup style) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        padding: '6px 14px',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        color: '#334155'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isRunning ? '#3b82f6' : '#10b981',
          boxShadow: isRunning ? '0 0 6px #3b82f6' : '0 0 6px #10b981',
          display: 'inline-block'
        }} />
        <span>Local LLM Connected</span>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <span style={{ color: '#64748b' }}>Ollama</span>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: '#2563eb', fontWeight: 700 }}>
          {llmModel}
        </span>
      </div>
    </header>
  );
}
