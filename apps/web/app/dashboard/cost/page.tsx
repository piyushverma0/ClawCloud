import React from 'react';
import { CostChart } from '@/components/CostChart';
import { WorkspaceAnalyzer } from '@/components/WorkspaceAnalyzer';
import { BudgetSettings } from '@/components/BudgetSettings';
import { SkillAnalytics } from '@/components/SkillAnalytics';

// Assuming we have an active instance
const MOCK_INSTANCE_ID = "cm6uokn480001y1q908m51p3x"; 

export default function CostDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Token Cost Monitor</h1>
        <p className="mt-2 text-slate-400">
          Real-time visibility into your OpenClaw token expenditure and active budget alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-400 mb-1">Spend Today</p>
          <p className="text-3xl font-bold text-white">$1.80</p>
          <p className="text-xs text-emerald-400 mt-2 font-medium">On track (Budget $5.00)</p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-400 mb-1">Spend This Month</p>
          <p className="text-3xl font-bold text-white">$42.15</p>
          <p className="text-xs text-slate-400 mt-2">+12% vs last month</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-400 mb-1">Projected EOS</p>
          <p className="text-3xl font-bold text-white">$120.00</p>
          <p className="text-xs text-slate-400 mt-2">Based on current trajectory</p>
        </div>
      </div>

      <CostChart instanceId={MOCK_INSTANCE_ID} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkspaceAnalyzer />
        <BudgetSettings />
        <SkillAnalytics />
      </div>
    </div>
  );
}
