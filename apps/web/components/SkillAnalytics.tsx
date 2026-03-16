'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x";

export function SkillAnalytics() {
  const [usages, setUsages] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/instances/${MOCK_INSTANCE_ID}/skills/usage`)
      .then(res => res.json())
      .then(data => setUsages(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6 col-span-1 lg:col-span-2">
      <div className="flex items-center gap-2 mb-6">
        <Layers className="text-emerald-500" />
        <h2 className="text-xl font-bold text-white tracking-tight">Skill Analytics</h2>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        Track token cost and invocation counts per authorized skill running on your instance.
      </p>

      {usages.length === 0 ? (
        <div className="text-center text-slate-500 text-sm py-8 border border-slate-800 border-dashed rounded-lg">
          No skills are actively consuming tokens yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Skill</th>
                <th className="py-3 px-4 font-medium">Invocations</th>
                <th className="py-3 px-4 font-medium">Tokens Used</th>
                <th className="py-3 px-4 font-medium">Est. Cost</th>
                <th className="py-3 px-4 font-medium">Avg Tokens/Call</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {usages.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-white text-sm font-medium">
                    {u.registry?.name || 'Unknown Skill'}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-sm">{u.invocations.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-400 text-sm font-mono">{u.tokensUsed.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400 text-sm">
                    ${u.costUsd.toFixed(4)}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-sm">
                    {u.invocations > 0 ? Math.round(u.tokensUsed / u.invocations).toLocaleString() : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
