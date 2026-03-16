'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Plus } from 'lucide-react';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

export default function CronManager() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  const [newJob, setNewJob] = useState({ name: '', schedule: '0 8 * * *', action: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch(`/api/instances/${MOCK_INSTANCE_ID}/cron`);
    if(res.ok) setJobs(await res.json());
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/cron/${id}/toggle`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchJobs();
  };

  const handleCreate = async () => {
    await fetch(`/api/instances/${MOCK_INSTANCE_ID}/cron`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    });
    setShowModal(false);
    fetchJobs();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Cron Jobs</h1>
          <p className="mt-2 text-slate-400">Schedule recurring automated messages or tasks for your agent.</p>
        </div>
        <button 
          onClick={() => setShowModal({} as any)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md transition-colors text-sm"
        >
          <Plus size={16} /> New Job
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-500 text-sm">
              <th className="py-3 px-6 font-medium">Job Name</th>
              <th className="py-3 px-6 font-medium">Schedule (Cron)</th>
              <th className="py-3 px-6 font-medium">Action Payload</th>
              <th className="py-3 px-6 font-medium">Last Run</th>
              <th className="py-3 px-6 font-medium rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {jobs.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">No active cron jobs.</td></tr>
            ) : jobs.map(job => (
              <tr key={job.id} className="hover:bg-slate-800/30">
                <td className="py-4 px-6 text-white text-sm font-medium">{job.name}</td>
                <td className="py-4 px-6 text-slate-400 font-mono text-sm">{job.schedule}</td>
                <td className="py-4 px-6 text-slate-400 text-sm truncate max-w-[200px]">{job.action}</td>
                <td className="py-4 px-6 text-slate-500 text-sm">
                  {job.lastRunAt ? new Date(job.lastRunAt).toLocaleString() : 'Never'}
                </td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => handleToggle(job.id, job.status)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                      job.status === 'ACTIVE' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {job.status === 'ACTIVE' ? <Square fill="currentColor" size={10} /> : <Play fill="currentColor" size={10} />}
                    {job.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
