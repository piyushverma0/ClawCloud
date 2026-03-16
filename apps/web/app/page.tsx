import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
          Claw<span className="text-claw-500">Cloud</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Managed OpenClaw hosting. Solves setup hell, secures your endpoints, and stops token bleeding in one click.
        </p>
        
        <div className="pt-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-claw-600 hover:bg-claw-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors text-lg">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="space-y-4 flex flex-col items-center">
              <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />
              <Link href="/dashboard" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors text-lg inline-block">
                Go to Dashboard
              </Link>
            </div>
          </SignedIn>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900 mb-2">Secure by Default</h3>
            <p className="text-slate-600">Auto-TLS, API Key rotation, and isolated Docker containers for every agent.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900 mb-2">Token Guard</h3>
            <p className="text-slate-600">Monitor usage and stop silent cost bleeding with our proactive alerts and auto-pruning.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900 mb-2">1-Click Deploy</h3>
            <p className="text-slate-600">Skip the 3-day setup hell. Go from zero to a running AI agent in 3 minutes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
