'use client';

import React from 'react';

// This would typically come from our token interceptor -> metadata
const dummyFileData = [
  { file: 'src/lib/auth.ts', tokens: 45000, percentage: 45 },
  { file: 'src/components/ui/button.tsx', tokens: 20000, percentage: 20 },
  { file: 'src/app/page.tsx', tokens: 15000, percentage: 15 },
  { file: 'src/lib/utils.ts', tokens: 10000, percentage: 10 },
  { file: 'Other', tokens: 10000, percentage: 10 },
];

export function WorkspaceAnalyzer() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
      <h3 className="text-xl font-semibold text-white mb-6">Workspace File Analyzer</h3>
      <p className="text-slate-400 text-sm mb-6">
        Breakdown of which files are consuming your token budget based on context inclusion.
      </p>
      
      <div className="space-y-4">
        {dummyFileData.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-slate-300 font-mono truncate mr-4">{item.file}</span>
              <span className="text-slate-400 whitespace-nowrap">{item.percentage}% ({item.tokens.toLocaleString()})</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
