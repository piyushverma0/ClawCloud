'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MOCK_OUTPUTS = [
  "Initializing OpenClaw core...",
  "Loading localized memory banks [OK]",
  "Establishing secure sandboxed runtime...",
  "Applying User SOUL Profile definitions...",
  "> Session started. Agent is online.",
  "User: Review recent system metrics and summarize anomalies.",
  "Agent: Analyzing local logs... Memory allocation spiked by 18% at 04:22 UTC.",
  "Agent: No critical anomalies detected. Executing background optimization routine."
];

export function AgentTerminalSimulation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < MOCK_OUTPUTS.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, MOCK_OUTPUTS[currentIndex]]);
        setCurrentIndex(c => c + 1);
      }, Math.random() * 800 + 400); // random typing delay 400-1200ms
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-slate-800 bg-[#0a0a0a] shadow-2xl shadow-emerald-900/10"
    >
      {/* Mac OS Window Controls */}
      <div className="flex items-center px-4 py-3 border-b border-slate-800/60 bg-slate-900/40">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="mx-auto text-xs font-medium text-slate-500 flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           clawcloud-instance-1 
        </div>
      </div>

      <div className="p-6 font-mono text-sm h-64 overflow-y-auto">
        {lines.map((line, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className={`mb-2 ${line.startsWith('User:') ? 'text-sky-400' : line.startsWith('Agent:') ? 'text-emerald-400' : 'text-slate-400'}`}
          >
            {line.startsWith('>') ? <span className="text-emerald-500 font-bold">{line}</span> : line}
          </motion.div>
        ))}
        {currentIndex < MOCK_OUTPUTS.length && (
          <div className="w-2 h-4 bg-slate-500 animate-pulse mt-2"></div>
        )}
      </div>
    </motion.div>
  );
}
