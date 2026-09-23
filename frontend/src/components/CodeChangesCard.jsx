import React, { useState } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';

export function CodeChangesCard({ codeChanges }) {
  const [copied, setCopied] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  // Default sample diff matching the reference mockup
  const defaultFile = 'user_service.py';
  const defaultDiffLines = [
    { type: 'context', lineNum: 101, text: 'class UserService:' },
    { type: 'context', lineNum: 102, text: '    def __init__(self, db_client):' },
    { type: 'context', lineNum: 103, text: '        self.db = db_client' },
    { type: 'context', lineNum: 104, text: '' },
    { type: 'del',     lineNum: 105, text: '-   def validate_password(self, pwd):' },
    { type: 'del',     lineNum: 106, text: '-       return True  # TODO: implement' },
    { type: 'add',     lineNum: 105, text: '+   def validate_password(self, pwd: str) -> bool:' },
    { type: 'add',     lineNum: 106, text: '+       """Validate password complexity requirements."""' },
    { type: 'add',     lineNum: 107, text: '+       if len(pwd) < 8:' },
    { type: 'add',     lineNum: 108, text: '+           return False' },
    { type: 'add',     lineNum: 109, text: '+       if not any(c.isupper() for c in pwd):' },
    { type: 'add',     lineNum: 110, text: '+           return False' },
    { type: 'add',     lineNum: 111, text: '+       if not any(c.isdigit() for c in pwd):' },
    { type: 'add',     lineNum: 112, text: '+           return False' },
    { type: 'add',     lineNum: 113, text: '+       return True' },
    { type: 'context', lineNum: 114, text: '' },
    { type: 'context', lineNum: 115, text: '    def register_user(self, username, password):' }
  ];

  let hasRealDiff = false;
  let fileList = [defaultFile];
  let activeFileName = defaultFile;
  let linesToDisplay = defaultDiffLines;
  let addCount = 48;
  let delCount = 12;

  if (codeChanges && codeChanges.diffs && Object.keys(codeChanges.diffs).length > 0) {
    hasRealDiff = true;
    const fileEntries = Object.entries(codeChanges.diffs);
    fileList = fileEntries.map(e => e[0]);
    const validIndex = Math.min(selectedFileIndex, fileEntries.length - 1);
    activeFileName = fileEntries[validIndex][0];
    const rawDiff = fileEntries[validIndex][1];
    
    let currentLineNum = 1;
    let localAdd = 0;
    let localDel = 0;

    linesToDisplay = rawDiff.split('\n').map((line) => {
      let type = 'context';
      if (line.startsWith('+') && !line.startsWith('+++')) {
        type = 'add';
        localAdd++;
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        type = 'del';
        localDel++;
      } else if (line.startsWith('@@')) {
        type = 'meta';
      }
      return {
        type,
        lineNum: currentLineNum++,
        text: line
      };
    });

    if (localAdd > 0 || localDel > 0) {
      addCount = localAdd;
      delCount = localDel;
    }
  }

  const handleCopy = () => {
    const textToCopy = linesToDisplay.map(l => l.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Title Header with + / - stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
          Code Changes
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '0.76rem',
            fontWeight: 700,
            color: '#10b981',
            background: '#ecfdf5',
            padding: '2px 8px',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)'
          }}>
            +{addCount}
          </span>
          <span style={{
            fontSize: '0.76rem',
            fontWeight: 700,
            color: '#ef4444',
            background: '#fef2f2',
            padding: '2px 8px',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)'
          }}>
            -{delCount}
          </span>
        </div>
      </div>

      {/* Embedded Dark Code Diff Box */}
      <div style={{
        background: '#0b1329',
        borderRadius: '10px',
        border: '1px solid #1e293b',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Diff Top Bar with File Name and Copy Button */}
        <div style={{
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode size={14} color="#60a5fa" />
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#f8fafc',
              fontFamily: 'var(--font-mono)'
            }}>
              {activeFileName}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy diff"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-sans)',
              transition: 'color 0.15s ease'
            }}
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Code Lines */}
        <div style={{
          padding: '10px 0',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          lineHeight: '1.6',
          overflowY: 'auto',
          maxHeight: '260px',
          color: '#e2e8f0'
        }}>
          {linesToDisplay.map((item, idx) => {
            let rowBg = 'transparent';
            let textColor = '#cbd5e1';

            if (item.type === 'add') {
              rowBg = 'rgba(16, 185, 129, 0.15)';
              textColor = '#34d399';
            } else if (item.type === 'del') {
              rowBg = 'rgba(239, 68, 68, 0.15)';
              textColor = '#f87171';
            } else if (item.type === 'meta') {
              rowBg = 'rgba(59, 130, 246, 0.12)';
              textColor = '#60a5fa';
            }

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: rowBg,
                  padding: '1px 12px',
                  whiteSpace: 'pre',
                  width: '100%'
                }}
              >
                <span style={{
                  width: '32px',
                  color: '#64748b',
                  fontSize: '0.7rem',
                  userSelect: 'none',
                  textAlign: 'right',
                  marginRight: '12px',
                  flexShrink: 0
                }}>
                  {item.lineNum}
                </span>
                <span style={{ color: textColor, flex: 1, overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
