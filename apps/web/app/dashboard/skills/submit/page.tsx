'use client';

import React, { useState } from 'react';
import { Send, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function SubmitSkill() {
  const [form, setForm] = useState({ name: '', description: '', repoUrl: '', codeMock: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/marketplace/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Failed to submit skill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link href="/dashboard/skills" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 mb-8 text-sm font-medium">
        <ArrowLeft size={16} /> Back to Marketplace
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Submit a Skill</h1>
        <p className="mt-2 text-slate-400">
          Share your custom OpenClaw capabilities with the community. All submissions are automatically evaluated by our Safety Scorer before manual review.
        </p>
      </div>

      {result ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
             <ShieldCheck size={32} className="text-emerald-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">Submission Received</h3>
          <p className="text-slate-400 mb-6">Your skill has been queued for review.</p>
          
          <div className="bg-slate-950 rounded-lg p-6 text-left max-w-sm mx-auto mb-6 border border-slate-800">
             <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-medium text-slate-300">Safety Score</span>
               <span className={`text-lg font-bold ${result.safetyScore > 80 ? 'text-emerald-400' : result.safetyScore > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                 {result.safetyScore} / 100
               </span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm font-medium text-slate-300">Status</span>
               <span className="text-sm font-mono text-slate-400">{result.status}</span>
             </div>
          </div>

          <button onClick={() => setResult(null)} className="text-emerald-500 hover:text-emerald-400 font-medium">
            Submit another skill
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Skill Name</label>
            <input 
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="e.g. GitHub Notifier"
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Short Description</label>
            <input 
              required
              type="text"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              placeholder="Explain what this skill does in a sentence."
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Repository URL</label>
            <input 
              required
              type="url"
              value={form.repoUrl}
              onChange={(e) => setForm({...form, repoUrl: e.target.value})}
              placeholder="https://github.com/..."
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Mock Code Payload (For Safety Scorer Testing)</label>
            <textarea 
              required
              rows={6}
              value={form.codeMock}
              onChange={(e) => setForm({...form, codeMock: e.target.value})}
              placeholder="Paste in some sample code from the skill. Try adding 'fs.readFileSync' to trigger warnings."
              className="w-full bg-slate-950 border border-slate-700 text-slate-300 font-mono text-sm rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50"
            >
              {submitting ? 'Analyzing...' : <><Send size={18} /> Submit to Marketplace</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
