'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, RefreshCw, AlertTriangle, Info, XCircle } from 'lucide-react';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

export default function SessionHealth() {
  const [logs, setLogs] = useState<any[]>([]);
  const [restarting, setRestarting] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of logs
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const fetchLogs = async () => {
    const res = await fetch(`/api/instances/${MOCK_INSTANCE_ID}/logs`);
    if(res.ok) {
      const data = await res.json();
      setLogs(data.reverse()); // Oldest first for terminal view
    }
  };

  const handleRestart = async () => {
    if(!confirm('Are you sure you want to hard restart the agent? This will clear active memory context.')) return;
    
    setRestarting(true);
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/restart`, { method: 'POST'});
    setTimeout(() => {
      setRestarting(false);
      fetchLogs();
    }, 2000);
  };

  const LogIcon = ({ level }: { level: string }) => {
    if(level === 'ERROR') return <XCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />;
    if(level === 'WARN') return <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />;
    return <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 h-screen flex flex-col pb-24">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Activity className="text-emerald-500" /> Session Health
          </h1>
          <p className="mt-2 text-slate-400">Real-time terminal logs and system status.</p>
        </div>
        
        <button 
          onClick={handleRestart}
          disabled={restarting}
          className="flex items-center gap-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-600/30 py-2 px-4 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={16} className={restarting ? "animate-spin" : ""} />
          {restarting ? 'Rebooting...' : 'Hard Restart'}
        </button>
      </div>

      <div className="flex-1 bg-black border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-sm relative shadow-2xl">
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="ml-4 text-slate-500 text-xs tracking-wider">openclaw-agent-process</span>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-2">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic">Waiting for connection...</div>
          ) : logs.map((log) => (
            <div key={log.id} className="flex gap-3 hover:bg-slate-900/50 p-1 rounded">
              <span className="text-slate-600 shrink-0">
                [{new Date(log.createdAt).toLocaleTimeString([], { hour12: false })}]
              </span>
              <LogIcon level={log.level} />
              <span className={`break-words ${
                log.level === 'ERROR' ? 'text-rose-400' 
                : log.level === 'WARN' ? 'text-amber-400' 
                : 'text-slate-300'
              }`}>
                {log.message}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
