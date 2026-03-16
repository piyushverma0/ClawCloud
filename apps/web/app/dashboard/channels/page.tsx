'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Webhook, Bot, MessageSquare } from 'lucide-react';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

const platforms = [
  { id: 'telegram', name: 'Telegram Bot', icon: Bot, color: 'text-sky-400' },
  { id: 'discord', name: 'Discord', icon: MessageSquare, color: 'text-indigo-400' },
  { id: 'slack', name: 'Slack', icon: Webhook, color: 'text-emerald-400' },
];

export default function ChannelManager() {
  const [channels, setChannels] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newPlatform, setNewPlatform] = useState('telegram');
  const [newToken, setNewToken] = useState('');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    const res = await fetch(`/api/instances/${MOCK_INSTANCE_ID}/channels`);
    if(res.ok) setChannels(await res.json());
  };

  const handleAdd = async () => {
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/channels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: newPlatform, token: newToken, isActive: true })
    });
    setNewToken('');
    setShowAdd(false);
    fetchChannels();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Channel Manager</h1>
          <p className="mt-2 text-slate-400">Connect your agent to external messaging platforms.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-md transition-colors text-sm"
        >
          <Plus size={16} /> Add Connection
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-medium text-white mb-4">New Connection</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-1">Platform</label>
              <select 
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="flex-[2]">
              <label className="block text-sm font-medium text-slate-400 mb-1">Bot Token / Webhook</label>
              <input 
                type="password"
                value={newToken}
                onChange={(e) => setNewToken(e.target.value)}
                placeholder="Paste token here..."
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button 
              onClick={handleAdd}
              disabled={!newToken}
              className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-6 rounded-md disabled:opacity-50"
            >
              Connect
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map(channel => {
          const platMeta = platforms.find(p => p.id === channel.platform) || platforms[0];
          const Icon = platMeta.icon;

          return (
            <div key={channel.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative group flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-4 ${platMeta.color}`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-medium text-white capitalize">{channel.platform}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${channel.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${channel.isActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                </span>
                <span className="text-sm text-slate-400">{channel.isActive ? 'Connected & Listening' : 'Disconnected'}</span>
              </div>
              
              <button className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
