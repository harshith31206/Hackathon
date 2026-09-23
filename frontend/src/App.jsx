import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation } from './components/Navigation';
import { TopHeader } from './components/TopHeader';
import { DashboardScreen } from './screens/DashboardScreen';
import { CreateAutoPRScreen } from './screens/CreateAutoPRScreen';
import { LiveAgentRunScreen } from './screens/LiveAgentRunScreen';
import { CodeDiffScreen } from './screens/CodeDiffScreen';
import { PullRequestsScreen } from './screens/PullRequestsScreen';
import { JiraTicketsScreen } from './screens/JiraTicketsScreen';
import { RepositoriesScreen } from './screens/RepositoriesScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { MOCK_TICKETS } from './mockData';

const API_BASE = 'http://localhost:8000/api';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('live_run');
  const [ticketId, setTicketId] = useState('AUTO-101');
  const [repoUrl, setRepoUrl] = useState('harshith31206/Hackathon');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tickets, setTickets] = useState(MOCK_TICKETS);

  const [pipelineState, setPipelineState] = useState({
    ticket_id: 'AUTO-101',
    current_step: 0,
    status: 'IDLE',
    ticket: null,
    task_spec: null,
    plan: [],
    identified_files: [],
    code_changes: null,
    pr_result: null,
    jira_result: null,
    logs: []
  });

  // Fetch initial status on component mount
  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const res = await axios.get(`${API_BASE}/status`);
        if (res.data && res.data.status) {
          setPipelineState(res.data);
          if (res.data.ticket_id) {
            setTicketId(res.data.ticket_id);
          }
          if (res.data.repo_url) {
            setRepoUrl(res.data.repo_url);
          }
        }
      } catch (e) {
        console.error("Failed to load initial status:", e);
      }
    };
    fetchInitialStatus();
  }, []);

  // Poll status when running
  useEffect(() => {
    let interval = null;
    if (pipelineState.status === 'RUNNING') {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${API_BASE}/status`);
          setPipelineState(res.data);
        } catch (e) {
          console.error("Failed to fetch status:", e);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pipelineState.status]);

  // Handle agent start from Create or Dashboard
  const handleStartAgent = async (selectedTicketId, selectedRepoUrl, customDescription, options = {}) => {
    setIsSubmitting(true);
    setTicketId(selectedTicketId);
    setRepoUrl(selectedRepoUrl || 'harshith31206/Hackathon');
    setActiveScreen('live_run');

    try {
      const res = await axios.post(`${API_BASE}/run`, {
        ticket_id: selectedTicketId,
        repo_url: selectedRepoUrl || 'harshith31206/Hackathon',
        custom_description: customDescription,
        jira_url: options.jiraUrl,
        jira_email: options.jiraEmail?.trim() || undefined,
        jira_token: options.jiraToken?.trim() || undefined,
        custom_knowledge: options.customKnowledge?.trim() || undefined,
        document_name: options.documentName?.trim() || undefined,
        auto_approve: options.autoApprove !== undefined ? options.autoApprove : true
      });
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
        return res.data.state;
      }
    } catch (e) {
      console.warn("Backend not running or error starting agent, using visual interactive runner:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/approve`, { decision: 'approve' });
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      alert("Failed to submit approval to backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/approve`, { decision: 'reject' });
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      console.warn("Rejection recorded locally.");
      setPipelineState(prev => ({ ...prev, status: 'REJECTED' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePause = async () => {
    try {
      const res = await axios.post(`${API_BASE}/pause`);
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      console.warn("Pause called:", e);
      setPipelineState(prev => ({ ...prev, status: 'PAUSED' }));
    }
  };

  const handleResume = async () => {
    try {
      const res = await axios.post(`${API_BASE}/resume`);
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      console.warn("Resume called:", e);
      setPipelineState(prev => ({ ...prev, status: 'RUNNING' }));
    }
  };

  const [customDesc, setCustomDesc] = useState('');

  const handleLaunchAutoPR = (id, repo, desc) => {
    if (id) setTicketId(id);
    if (repo) setRepoUrl(repo);
    if (desc) setCustomDesc(desc);
    setActiveScreen('create');
  };

  const handleViewDiff = (id) => {
    if (id) setTicketId(id);
    setActiveScreen('diff');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc]">
      {/* Left Dark Navy Navigation Sidebar */}
      <Navigation
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        isRunning={pipelineState.status === 'RUNNING'}
        pipelineStage={pipelineState.current_step + 1}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <TopHeader
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          isRunning={pipelineState.status === 'RUNNING'}
          pipelineStatus={pipelineState.status}
        />

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {activeScreen === 'dashboard' && (
            <DashboardScreen
              onLaunchAutoPR={handleLaunchAutoPR}
              onViewDiff={handleViewDiff}
              onSelectTicket={handleLaunchAutoPR}
            />
          )}

          {activeScreen === 'create' && (
            <CreateAutoPRScreen
              onStartAgent={handleStartAgent}
              isRunning={pipelineState.status === 'RUNNING' || isSubmitting}
              defaultTicketId={ticketId}
              defaultRepo={repoUrl}
              defaultDesc={customDesc}
            />
          )}

          {activeScreen === 'live_run' && (
            <LiveAgentRunScreen
              pipelineState={pipelineState}
              onApprove={handleApprove}
              onReject={handleReject}
              onPause={handlePause}
              onResume={handleResume}
              isSubmitting={isSubmitting}
              onViewDiff={handleViewDiff}
              ticketId={ticketId}
              repoUrl={repoUrl}
              tickets={tickets}
              setTickets={setTickets}
              onStartAgent={handleStartAgent}
            />
          )}

          {activeScreen === 'diff' && (
            <CodeDiffScreen
              codeChanges={pipelineState.code_changes}
              ticketId={ticketId}
            />
          )}

          {activeScreen === 'prs' && (
            <PullRequestsScreen
              onViewDiff={handleViewDiff}
            />
          )}

          {activeScreen === 'jira' && (
            <JiraTicketsScreen
              onLaunchTicket={handleLaunchAutoPR}
              tickets={tickets}
              setTickets={setTickets}
            />
          )}

          {activeScreen === 'repos' && (
            <RepositoriesScreen />
          )}

          {activeScreen === 'settings' && (
            <SettingsScreen />
          )}
        </main>
      </div>
    </div>
  );
}
