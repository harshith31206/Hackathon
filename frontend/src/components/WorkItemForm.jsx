import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Play, 
  Search, 
  GitBranch, 
  ChevronDown, 
  Layers, 
  Key, 
  Globe, 
  Mail, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Sparkles,
  FileText
} from 'lucide-react';

export function WorkItemForm({ onStartAgent, isRunning, ticketId, setTicketId }) {
  const [repoUrl, setRepoUrl] = useState('harshith31206/Hackathon');
  const [jiraUrl, setJiraUrl] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [showJiraConfig, setShowJiraConfig] = useState(false);

  // Requirements inbox text
  const [requirementText, setRequirementText] = useState(
    'Add password strength validation enforcing minimum length of 8 characters, at least 1 number, and 1 special symbol with clear feedback.'
  );

  const [ticketDetails, setTicketDetails] = useState({
    id: ticketId || 'AUTO-101',
    status: 'To Do',
    title: 'AUTO-101: Add password strength validation'
  });

  // Keep ticketDetails and requirementText synced when ticketId changes
  useEffect(() => {
    if (ticketId === 'AUTO-101') {
      setTicketDetails({
        id: 'AUTO-101',
        status: 'To Do',
        title: 'Add password strength validation'
      });
      setRequirementText(
        'Add password strength validation enforcing minimum length of 8 characters, at least 1 number, and 1 special symbol with clear feedback.'
      );
    } else if (ticketId === 'PROJ-101') {
      setTicketDetails({
        id: 'PROJ-101',
        status: 'To Do',
        title: 'Add employee search by department'
      });
      setRequirementText(
        'Add employee search by department (GET /employees/search, department parameter required, return matching employees, add tests)'
      );
    }
  }, [ticketId]);

  const [isFetching, setIsFetching] = useState(false);
  const [fetchNotice, setFetchNotice] = useState(null);

  const handleFetchDetails = async () => {
    const currentId = ticketId?.trim() || 'AUTO-101';
    setIsFetching(true);
    setFetchNotice(null);
    try {
      const res = await axios.post('http://localhost:8000/api/jira/fetch-ticket', {
        ticket_id: currentId,
        jira_url: jiraUrl.trim() || undefined,
        jira_email: jiraEmail.trim() || undefined,
        jira_token: jiraToken.trim() || undefined
      });

      if (res.data && res.data.ticket) {
        const t = res.data.ticket;
        const descText = t.description || t.title || 'Implement required feature';
        
        setTicketDetails({
          id: t.id,
          status: t.status || 'To Do',
          title: t.title || `Work Item ${t.id}`
        });

        // Set fetched text into the requirements inbox
        setRequirementText(descText);

        const isLive = !!t.live_connected;
        setFetchNotice({
          live: isLive,
          message: isLive ? `Live Atlassian Jira issue ${t.id} loaded!` : `Loaded ticket ${t.id}`
        });
      }
    } catch (err) {
      setFetchNotice({
        live: false,
        message: 'Could not connect to live Jira. Using current requirements template.'
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartAgent(
      ticketId || ticketDetails.id || 'AUTO-101',
      repoUrl,
      requirementText,
      {
        jiraUrl: jiraUrl.trim() || undefined,
        jiraEmail: jiraEmail.trim() || undefined,
        jiraToken: jiraToken.trim() || undefined
      }
    );
  };

  return (
    <div className="app-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h2 style={{
          fontSize: '1.05rem',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '16px',
          letterSpacing: '-0.3px'
        }}>
          Create New AutoPR
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Field 1: Jira Ticket ID */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Jira Ticket ID
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => {
                    setTicketId(e.target.value.toUpperCase());
                    setTicketDetails(prev => ({ ...prev, id: e.target.value.toUpperCase() }));
                  }}
                  placeholder="AUTO-101"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleFetchDetails}
                disabled={isFetching}
                className="btn-primary-blue"
                style={{ padding: '8px 16px', fontSize: '0.84rem' }}
              >
                {isFetching ? 'Fetching...' : 'Fetch Details'}
              </button>
            </div>
          </div>

          {/* Field 2: Requirements Inbox & Ticket Summary (matching mockup + editable inbox) */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
                Ticket Summary & Requirements
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#2563eb',
                background: '#eff6ff',
                padding: '2px 7px',
                borderRadius: '4px'
              }}>
                Editable Requirements Inbox
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Layers size={11} color="#ffffff" />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                {ticketDetails.id}
              </span>
              <span className="badge-todo">
                {ticketDetails.status}
              </span>
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              {ticketDetails.title}
            </div>

            {/* Editable Requirements Inbox */}
            <div style={{ marginBottom: '4px' }}>
              <label style={{
                fontSize: '0.8rem',
                color: '#334155',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FileText size={13} color="#2563eb" />
                  <span>Requirements Inbox:</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                  (Agent writes code based on this)
                </span>
              </label>

              <textarea
                rows={4}
                value={requirementText}
                onChange={(e) => setRequirementText(e.target.value)}
                placeholder="Enter or modify requirements (e.g. Add password strength validation, department search API, test assertions...)"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.82rem',
                  color: '#0f172a',
                  lineHeight: '1.5',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>

          {/* Field 3: Repository Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Repository
            </label>
            <div style={{ position: 'relative' }}>
              <GitBranch size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="harshith31206/Hackathon"
                style={{
                  width: '100%',
                  padding: '9px 36px 9px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
              <ChevronDown size={16} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Optional Collapsible Jira Cloud Credentials */}
          <div style={{ marginBottom: '18px' }}>
            <button
              type="button"
              onClick={() => setShowJiraConfig(!showJiraConfig)}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Key size={13} />
              <span>{showJiraConfig ? '▲ Hide Atlassian Credentials' : '▼ Connect Live Atlassian Jira (Optional)'}</span>
            </button>

            {showJiraConfig && (
              <div style={{
                marginTop: '10px',
                padding: '12px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  <input
                    type="text"
                    value={jiraUrl}
                    onChange={(e) => setJiraUrl(e.target.value)}
                    placeholder="https://company.atlassian.net"
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="email"
                    value={jiraEmail}
                    onChange={(e) => setJiraEmail(e.target.value)}
                    placeholder="developer@company.com"
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showToken ? 'text' : 'password'}
                      value={jiraToken}
                      onChange={(e) => setJiraToken(e.target.value)}
                      placeholder="Atlassian Jira API Token"
                      style={{
                        width: '100%',
                        padding: '8px 30px 8px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {showToken ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {fetchNotice && (
              <div style={{
                marginTop: '8px',
                padding: '6px 10px',
                borderRadius: '6px',
                background: fetchNotice.live ? '#ecfdf5' : '#eff6ff',
                color: fetchNotice.live ? '#065f46' : '#1d4ed8',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={13} />
                <span>{fetchNotice.message}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="btn-primary-blue"
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '0.95rem',
              borderRadius: '9px',
              gap: '8px'
            }}
          >
            <Play size={16} fill="#ffffff" />
            <span>{isRunning ? 'AutoPR Running...' : 'Start AutoPR'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
