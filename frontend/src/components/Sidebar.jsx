import React from 'react';
import { 
  Home, 
  Ticket, 
  GitFork, 
  GitPullRequest, 
  Settings, 
  Bot, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'jira', label: 'Jira Tickets', icon: Ticket },
    { id: 'repos', label: 'Repositories', icon: GitFork },
    { id: 'prs', label: 'Pull Requests', icon: GitPullRequest },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      style={{
        width: '240px',
        background: '#0b1329',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        padding: '24px 16px',
        flexShrink: 0
      }}
    >
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px', margin: 0, lineHeight: 1.2 }}>
              AutoPR
            </h1>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 500 }}>
              From Jira to Pull Request
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'home' && (!activeTab || activeTab === 'new-task'));
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#e2e8f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#94a3b8';
                  }
                }}
              >
                <Icon size={18} color={isActive ? '#ffffff' : '#94a3b8'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & AI Status Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* AI Agent Status Card */}
        <div style={{
          background: '#131d38',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Bot size={18} color="#60a5fa" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
              AI Agent
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.3, marginBottom: '8px' }}>
              Powered by Qwen3-Coder / Gemini
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px #10b981'
              }} />
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>
                Running
              </span>
            </div>
          </div>
        </div>

        {/* User Account Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}>
              S
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#f8fafc' }}>
                Sri Harshith
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Developer
              </div>
            </div>
          </div>
          <ChevronDown size={16} color="#94a3b8" />
        </div>
      </div>
    </aside>
  );
}
