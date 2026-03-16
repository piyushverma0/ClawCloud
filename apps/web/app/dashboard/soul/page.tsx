'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

export default function SoulProfileEditor() {
  const [profile, setProfile] = useState({
    name: 'OpenClaw Agent',
    personality: 'Helpful, concise, technical.',
    goals: '1. Answer user queries.\n2. Manage infrastructure efficiently.',
    constraints: 'Never share the API keys.'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/instances/${MOCK_INSTANCE_ID}/soul`)
      .then(res => res.json())
      .then(data => {
         if (data && data.name) setProfile(data);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/instances/${MOCK_INSTANCE_ID}/soul`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      alert('SOUL Profile saved successfully!');
    } catch (e) {
      alert('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Visual SOUL Editor</h1>
        <p className="mt-2 text-slate-400">
          Define your agent's core identity. This configuration replaces the raw \`SOUL.md\` file.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Agent Name</label>
          <input 
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Personality</label>
          <textarea 
            rows={3}
            value={profile.personality}
            onChange={(e) => setProfile({...profile, personality: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Goals (One per line)</label>
          <textarea 
            rows={5}
            value={profile.goals}
            onChange={(e) => setProfile({...profile, goals: e.target.value})}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 pl-8 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="1. My first goal&#10;2. My second goal"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-300 mb-1">Constraints & Rules</label>
           <textarea 
             rows={4}
             value={profile.constraints}
             onChange={(e) => setProfile({...profile, constraints: e.target.value})}
             className="w-full bg-slate-950 border border-slate-700 text-rose-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
           />
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
