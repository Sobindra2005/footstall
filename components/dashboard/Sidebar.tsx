"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, CalendarDays, Store, LogOut, Settings, 
  Search, Mail, TrendingUp, Layers, LifeBuoy, ChevronDown 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(path);
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#09090b] border-r border-white/5 flex flex-col z-50">
      
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#ccff00] rounded flex items-center justify-center">
            <span className="text-black font-black text-xs">FS</span>
          </div>
          <div>
            <h1 className="text-sm font-black text-white group-hover:text-[#ccff00] transition-colors leading-tight">
              FootStall
            </h1>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Owner Portal</p>
          </div>
        </Link>
        <button className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="w-full bg-white/5 border border-white/10 rounded-lg flex items-center px-3 py-2 focus-within:border-[#ccff00]/50 transition-colors">
          <Search className="w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-xs text-white w-full placeholder:text-white/30 ml-2 font-medium"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 hide-scrollbar flex flex-col gap-6">
        
        {/* Main Menu */}
        <div>
          <div className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-2 px-3">Main Menu</div>
          <div className="space-y-1">
            <Link 
              href="/dashboard" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Dashboard</span>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/bookings" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/bookings") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarDays className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/bookings") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Bookings</span>
              </div>
              <span className="bg-[#ccff00]/10 text-[#ccff00] text-[10px] px-2 py-0.5 rounded-full font-black border border-[#ccff00]/20">12</span>
            </Link>
            
            <Link 
              href="/dashboard/profile" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/profile") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Store className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/profile") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Pitch Profile</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Tools */}
        <div>
          <div className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-2 px-3">Tools</div>
          <div className="space-y-1">
            <Link 
              href="/dashboard/messaging" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/messaging") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/messaging") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Messaging</span>
              </div>
              <span className="bg-white/10 text-white/50 text-[10px] px-2 py-0.5 rounded-full font-black">5</span>
            </Link>
            
            <Link 
              href="/dashboard/analytics" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/analytics") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/analytics") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Analytics</span>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/integrations" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/integrations") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/integrations") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Integrations</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-6">
           <div className="space-y-1 border-t border-white/5 pt-4">
            <Link 
              href="/dashboard/help" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/help") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <LifeBuoy className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/help") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Help Center</span>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/settings" 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition-colors group border ${
                isActive("/dashboard/settings") 
                  ? "bg-white/10 text-white border-white/10 shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive("/dashboard/settings") ? "text-[#ccff00]" : ""}`} />
                <span className="text-sm">Settings</span>
              </div>
            </Link>
           </div>
           
           {/* Upgrade Banner */}
           <div className="mt-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Upgrade Plan</div>
                  <div className="text-[10px] font-bold text-white/50">Unlock all features</div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-white/30 -rotate-90 group-hover:text-white/80 transition-colors" />
           </div>
        </div>

      </div>
    </aside>
  );
}
