'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { AgentTerminalSimulation } from './AgentTerminalSimulation';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ClawCloud v1.0 is Live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">OpenClaw</span> safely in seconds.
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
              The ultimate hosting platform for your AI agents. Visually edit SOUL profiles, manage perpetual memory, and install vetted skills from our sandboxed marketplace.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors flex justify-center items-center gap-2 shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]">
                Start Building <ArrowRight size={18} />
              </Link>
              <Link href="https://github.com/piyushverma0/ClawCloud" target="_blank" className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2 backdrop-blur-sm">
                <Terminal size={18} /> View Documentation
              </Link>
            </div>
          </motion.div>

          {/* Right: Terminal Mock */}
          <div className="relative">
             {/* Glow effect behind terminal */}
             <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl -z-10 rounded-full w-3/4 h-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             <AgentTerminalSimulation />
          </div>

        </div>
      </div>
    </section>
  );
}
