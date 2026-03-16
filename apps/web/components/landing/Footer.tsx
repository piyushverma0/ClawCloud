import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-[#050505] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
             <span className="text-2xl font-black tracking-tighter text-white">
               Claw<span className="text-emerald-500">Cloud</span>
             </span>
             <p className="text-slate-500 text-sm mt-2 max-w-xs">
               Enterprise-grade managed hosting for autonomous OpenClaw agents.
             </p>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <Link href="https://github.com/piyushverma0/ClawCloud" target="_blank" className="hover:text-emerald-400 transition-colors">
              GitHub
            </Link>
            <Link href="https://github.com/piyushverma0/OpenClaw" target="_blank" className="hover:text-emerald-400 transition-colors">
              OpenClaw Agent
            </Link>
            <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
              Dashboard Login
            </Link>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} ClawCloud. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
