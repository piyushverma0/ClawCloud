'use client';

import React, { useState, useEffect } from 'react';
import { Download, Check, ExternalLink, Search, Plus } from 'lucide-react';
import Link from 'next/link';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

export default function SkillInstaller() {
  const [registrySkills, setRegistrySkills] = useState<any[]>([]);
  const [installedSkills, setInstalledSkills] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchInstalled();
    fetchRegistry();
  }, []);

  const fetchRegistry = async () => {
    const res = await fetch('/api/marketplace/skills');
    if(res.ok) setRegistrySkills(await res.json());
  };

  const fetchInstalled = async () => {
    const res = await fetch(`/api/instances/${MOCK_INSTANCE_ID}/skills`);
    if(res.ok) setInstalledSkills(await res.json());
  };

  const handleInstall = async (skill: any) => {
    setProcessing(skill.id);
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: skill.name, description: skill.description, registryId: skill.id })
    });
    setTimeout(() => {
      fetchInstalled();
      setProcessing(null);
    }, 800);
  };

  const handleUninstall = async (skillName: string) => {
    const installed = installedSkills.find(s => s.name === skillName);
    if (!installed) return;
    
    setProcessing(skillName);
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/skills/${installed.id}`, { method: 'DELETE' });
    setTimeout(() => {
      fetchInstalled();
      setProcessing(null);
    }, 800);
  };

  const filteredRegistry = registrySkills.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Skill Marketplace</h1>
          <p className="mt-2 text-slate-400">Give your agent new capabilities from our vetted community registry.</p>
        </div>
        <Link 
          href="/dashboard/skills/submit"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-md transition-colors text-sm"
        >
          <Plus size={16} /> Submit Skill
        </Link>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text"
          placeholder="Search for skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRegistry.map(skill => {
          const isInstalled = installedSkills.some(s => s.name === skill.name);
          const isProcessing = processing === skill.id || processing === skill.name;

          return (
            <div key={skill.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-950 px-2 py-1 rounded-md">
                   {skill.installs} ↓
                </span>
              </div>
              
              <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">
                {skill.description}
              </p>
              
              <div className="mt-auto flex justify-between items-center">
                <a href={skill.repoUrl} target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-400 text-sm font-medium flex items-center gap-1">
                  View Source <ExternalLink size={14} />
                </a>
                
                {isInstalled ? (
                  <button 
                    onClick={() => handleUninstall(skill.name)}
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {isProcessing ? <span className="animate-pulse">Removing...</span> : <><Check size={16} className="text-emerald-400" /> Installed</>}
                  </button>
                ) : (
                  <button 
                    onClick={() => handleInstall(skill)}
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 py-2 px-4 rounded-md transition-colors text-sm font-bold disabled:opacity-50 shadow-sm"
                  >
                    <Download size={16} /> 
                    {isProcessing ? 'Installing...' : 'Install'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
