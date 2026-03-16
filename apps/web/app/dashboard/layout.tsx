import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Server, Activity, ShieldAlert, CreditCard } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
             Claw<span className="text-claw-400">Cloud</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-white bg-slate-800 rounded-md">
            <Server className="w-5 h-5" />
            Instances
          </Link>
          <Link href="/dashboard/metrics" className="flex items-center gap-3 px-3 py-2 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
            <Activity className="w-5 h-5" />
            Metrics & Usage
          </Link>
          <Link href="/dashboard/security" className="flex items-center gap-3 px-3 py-2 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
            <ShieldAlert className="w-5 h-5" />
            Security Audit
          </Link>
          <Link href="/dashboard/billing" className="flex items-center gap-3 px-3 py-2 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
            <CreditCard className="w-5 h-5" />
            Billing
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800 flex items-center gap-3 text-sm">
          <UserButton showName />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 md:hidden">
          <Link href="/" className="font-bold text-xl">
             Claw<span className="text-claw-500">Cloud</span>
          </Link>
          <UserButton />
        </header>
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
