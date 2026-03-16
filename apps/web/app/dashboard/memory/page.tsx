'use client';

import React, { useState, useEffect } from 'react';
import { Search, Trash2, Cpu } from 'lucide-react';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

export default function MemoryViewer() {
  const [memories, setMemories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [deduping, setDeduping] = useState(false);

  useEffect(() => {
    fetchMemories();
  }, [search]);

  const fetchMemories = async () => {
    const res = await fetch(`/api/instances/${MOCK_INSTANCE_ID}/memories?search=${search}`);
    if(res.ok) setMemories(await res.json());
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/memories/${id}`, { method: 'DELETE' });
    fetchMemories();
  };

  const handleDedupe = async () => {
    setDeduping(true);
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/memories/dedupe`, { method: 'POST' });
    setTimeout(() => {
      setDeduping(false);
      alert('Memory deduplication and summarization completed.');
      fetchMemories();
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Memory Bank</h1>
          <p className="mt-2 text-slate-400">View, search, and manage your agent's conversational context.</p>
        </div>
        <button 
          onClick={handleDedupe}
          disabled={deduping}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md transition-colors text-sm disabled:opacity-50"
        >
          <Cpu size={16} />
          {deduping ? 'Compressing...' : 'Run Deduplication'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-950">
          <Search size={18} className="text-slate-500 mr-2" />
          <input 
            type="text"
            placeholder="Search memories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none text-white focus:outline-none w-full text-sm placeholder:text-slate-600"
          />
        </div>
        
        <div className="divide-y divide-slate-800">
          {memories.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No memories found.</div>
          ) : (
            memories.map((mem) => (
              <div key={mem.id} className="p-4 hover:bg-slate-800/50 flex justify-between group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      mem.role === 'user' ? 'bg-blue-500/20 text-blue-400' 
                      : mem.role === 'system' ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {mem.role.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(mem.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{mem.content}</p>
                </div>
                <button 
                  onClick={() => handleDelete(mem.id)}
                  className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
