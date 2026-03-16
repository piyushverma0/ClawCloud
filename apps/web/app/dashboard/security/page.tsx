import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Key, Network, Lock, Wrench } from "lucide-react";

export default function SecurityAuditPage() {
  // Mock audit data
  const auditItems = [
    {
      id: 1,
      name: "0.0.0.0 Binding Vulnerability",
      description: "Checks if instances are exposed to the public internet.",
      status: "PASS",
      icon: <Network className="w-5 h-5 text-emerald-500" />,
      action: null
    },
    {
      id: 2,
      name: "Auto-TLS Configuration",
      description: "Verifies that communication is encrypted using Let's Encrypt Caddy.",
      status: "PASS",
      icon: <Lock className="w-5 h-5 text-emerald-500" />,
      action: null
    },
    {
      id: 3,
      name: "API Key Age (Rotation Required)",
      description: "Detects API keys older than 30 days.",
      status: "FAIL",
      icon: <Key className="w-5 h-5 text-rose-500" />,
      action: "Rotate Keys Now"
    },
    {
      id: 4,
      name: "Malicious Skill Sandboxing",
      description: "Monitors installed skills for known CVEs or unexpected outbound connections.",
      status: "WARNING",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      action: "Review Sandbox Rules"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Security Audit</h1>
        <p className="text-slate-500">Continuous monitoring of your OpenClaw infrastructure</p>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-800 rounded-full">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Infrastructure Security Score: 85/100</h2>
            <p className="text-slate-400 text-sm">2 items require your attention to reach optimal security posture.</p>
          </div>
        </div>
        <button className="bg-white text-slate-900 hover:bg-slate-100 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
          Run Full Scan
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-900">Audit Results</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {auditItems.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-medium text-slate-900 flex items-center gap-2">
                    {item.name}
                    {item.status === 'PASS' && <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">Secured</span>}
                    {item.status === 'FAIL' && <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-medium">Critical Risk</span>}
                    {item.status === 'WARNING' && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">Warning</span>}
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                </div>
              </div>
              {item.action && (
                <button className={\`whitespace-nowrap font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm \${
                  item.status === 'FAIL' ? 'bg-rose-100 hover:bg-rose-200 text-rose-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }\`}>
                  <Wrench className="w-4 h-4" />
                  {item.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
