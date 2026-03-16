'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default function ReviewQueue() {
  const [queue, setQueue] = useState<any[]>([]);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    const res = await fetch('/api/marketplace/queue');
    if(res.ok) setQueue(await res.json());
  };

  const handleApprove = async (id: string) => {
    setProcessing(id);
    await fetch(`/api/marketplace/queue/${id}/approve`, { method: 'POST' });
    fetchQueue();
    setProcessing(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
           <ShieldCheck className="text-emerald-500" /> Maintainer Review Queue
        </h1>
        <p className="mt-2 text-slate-400">Review community submissions and Safety Scorer flags.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {queue.length === 0 ? (
           <div className="text-center py-12 text-slate-500">No pending submissions in queue.</div>
        ) : queue.map(review => (
          <div key={review.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col lg:flex-row">
            
            {/* Left Col: Info */}
            <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">{review.skillName}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${review.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : review.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {review.status}
                </span>
              </div>
              <p className="text-slate-400 mb-4">{review.description}</p>
              
              <div className="text-sm font-mono text-slate-500">
                <a href={review.repoUrl} target="_blank" rel="noreferrer" className="text-emerald-500 hover:underline">
                  {review.repoUrl}
                </a>
              </div>
            </div>

            {/* Middle Col: Safety Score */}
            <div className="w-full lg:w-72 p-6 bg-slate-900 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="text-sm font-medium text-slate-400 mb-2">Safety Score</div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-4xl font-black ${review.safetyScore > 80 ? 'text-emerald-400' : review.safetyScore > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {review.safetyScore}
                </span>
                <span className="text-slate-500">/ 100</span>
              </div>
              
              {/* Warnings List */}
              <div className="space-y-2 mt-auto">
                {review.reportJson?.criticals?.map((c: string, i: number) => (
                  <div key={i} className="flex gap-2 text-xs text-rose-400"><XCircle size={14} className="shrink-0" /> {c}</div>
                ))}
                {review.reportJson?.warnings?.map((w: string, i: number) => (
                  <div key={i} className="flex gap-2 text-xs text-amber-400"><ShieldAlert size={14} className="shrink-0" /> {w}</div>
                ))}
                {(!review.reportJson?.criticals?.length && !review.reportJson?.warnings?.length) && (
                   <div className="flex gap-2 text-xs text-emerald-400"><CheckCircle size={14} className="shrink-0" /> No warnings detected.</div>
                )}
              </div>
            </div>

            {/* Right Col: Actions */}
            <div className="w-full lg:w-48 p-6 bg-slate-950 flex flex-col justify-center gap-3">
               {review.status === 'PENDING' && (
                 <>
                  <button 
                    onClick={() => handleApprove(review.id)}
                    disabled={processing === review.id}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {processing === review.id ? 'Loading...' : 'Approve'}
                  </button>
                  <button 
                    className="w-full bg-slate-800 hover:bg-slate-700 text-rose-400 font-medium py-2 px-4 rounded-md transition-colors border border-slate-700"
                  >
                    Reject
                  </button>
                 </>
               )}
               {review.status !== 'PENDING' && (
                  <div className="text-center text-slate-500 text-sm">Action Complete</div>
               )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
