'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function BudgetSettings() {
  const [budget, setBudget] = useState(5.00);
  const [handle, setHandle] = useState('@my_telegram_handle');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // In a real app we'd call an API endpoint to save to User profile
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    alert('Settings saved!');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Budget Alerts</h3>
        <p className="text-slate-400 text-sm mb-6">
          Set a daily threshold to receive instant Telegram notifications when crossed.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Daily Budget (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input 
                type="number"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 pl-8 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Telegram Handle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
              <input 
                type="text"
                value={handle.replace('@', '')}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-md py-2 pl-8 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
