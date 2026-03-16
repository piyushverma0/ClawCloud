'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, DatabaseZap, ShieldCheck, ActivitySquare } from 'lucide-react';

const FEATURES = [
  {
    icon: <BrainCircuit size={24} className="text-emerald-400" />,
    title: "Visual SOUL Profiles",
    description: "Shape your agent's personality, core directives, and behavioral constraints through an intuitive UI without editing raw JSON files."
  },
  {
    icon: <DatabaseZap size={24} className="text-sky-400" />,
    title: "Infinite Memory Control",
    description: "Browse, search, and surgically remove specific agent memories. Background jobs handle vector deduplication and context summarization."
  },
  {
    icon: <ShieldCheck size={24} className="text-indigo-400" />,
    title: "Vetted Skill Marketplace",
    description: "Install community capabilities with one click. Every skill passes our rigorous automated Safety Scorer for zero-day prompt injections."
  },
  {
    icon: <ActivitySquare size={24} className="text-rose-400" />,
    title: "Cost & Budget Analytics",
    description: "Monitor real-time token expenditure down to individual skills. Set hard limits to prevent runaway LLM inference hits."
  }
];

export function FeaturesGrid() {
  return (
    <section className="relative z-10 py-24 bg-[#0a0a0a]/50 border-y border-slate-900 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Designed for Production.</h2>
          <p className="text-slate-400 text-lg">
            Stop wrangling terminals. ClawCloud provides the enterprise visibility and safety required to run autonomous OpenClaw agents 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={feat.title}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 transition-colors group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
