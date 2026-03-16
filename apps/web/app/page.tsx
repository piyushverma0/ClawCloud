import React from 'react';
import { InteractiveGridDots } from '@/components/landing/InteractiveGridDots';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { Footer } from '@/components/landing/Footer';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#050505] selection:bg-emerald-500/30">
      
      {/* Background Animation */}
      <InteractiveGridDots />
      
      {/* Navbar overlay (optional, keeping minimal for landing) */}
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-white">
          Claw<span className="text-emerald-500">Cloud</span>
        </div>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
               <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                 Sign In
               </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Dashboard
              </Link>
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-md" } }} />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Main Content Sections */}
      <HeroSection />
      
      <div className="relative z-10 w-full bg-gradient-to-b from-transparent via-[#050505] to-[#0a0a0a]">
         <FeaturesGrid />
      </div>

      <div className="relative z-10">
         <Footer />
      </div>

    </main>
  );
}
