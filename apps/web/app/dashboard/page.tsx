import React from 'react';
import { Play, Square, Settings, ExternalLink } from "lucide-react";

export default function DashboardPage() {
  // Mock data for Phase 1 visual demonstration
  const instances = [
    {
      id: "inst_12345",
      name: "Main Assistant",
      status: "RUNNING",
      uptime: "3d 4h",
      version: "v1.2.4",
      tokens: "45,230",
    },
    {
      id: "inst_67890",
      name: "Discord Bot (Testing)",
      status: "STOPPED",
      uptime: "-",
      version: "v1.2.4",
      tokens: "12,050",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Instances</h1>
          <p className="text-slate-500">Manage your deployed OpenClaw agents</p>
        </div>
        <button className="bg-claw-600 hover:bg-claw-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
          Deploy New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {instances.map((instance) => (
          <div key={instance.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={\`w-3 h-3 rounded-full mt-2 \${instance.status === 'RUNNING' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-300'}\`}></div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900">{instance.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-slate-500">
                  <span>ID: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{instance.id}</code></span>
                  <span>Version: {instance.version}</span>
                  <span>Uptime: {instance.uptime}</span>
                  <span>Usage: {instance.tokens} tokens</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {instance.status === 'RUNNING' ? (
                <>
                  <button title="Stop Instance" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200">
                    <Square className="w-5 h-5 fill-current" />
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Open UI
                  </button>
                </>
              ) : (
                <>
                  <button title="Start Instance" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                </>
              )}
              <button title="Settings" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
