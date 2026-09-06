import { Save, Bell, Shield, CreditCard, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Settings</h2>
        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-2 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-bold text-sm transition-colors border border-white/5 shadow-sm">
              <User className="w-4 h-4 text-[#ccff00]" />
              Account Details
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white font-bold text-sm transition-colors">
              <Bell className="w-4 h-4" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white font-bold text-sm transition-colors">
              <Shield className="w-4 h-4" />
              Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white font-bold text-sm transition-colors">
              <CreditCard className="w-4 h-4" />
              Billing
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-8">
            <h3 className="font-bold text-lg text-white mb-6">Personal Information</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">Email Address</label>
                <input type="email" defaultValue="owner@footstall.com" disabled className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/50 cursor-not-allowed" />
                <p className="text-[10px] text-white/30 mt-2">Email changes must be verified for security purposes.</p>
              </div>
              
              <div>
                <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">Phone Number</label>
                <input type="tel" defaultValue="+977 9800000000" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-8">
            <h3 className="font-bold text-lg text-white mb-6">Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">Email Notifications</div>
                  <div className="text-xs text-white/50 mt-1">Receive daily summary emails and booking alerts.</div>
                </div>
                <div className="w-10 h-5 rounded-full bg-[#ccff00] relative cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-black absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="w-full h-px bg-white/5"></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">SMS Alerts</div>
                  <div className="text-xs text-white/50 mt-1">Get instant text messages for new bookings.</div>
                </div>
                <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-black absolute top-0.5 left-0.5"></div>
                </div>
              </div>
              
              <div className="w-full h-px bg-white/5"></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">Dark Mode</div>
                  <div className="text-xs text-white/50 mt-1">Switch between light and dark theme.</div>
                </div>
                <div className="w-10 h-5 rounded-full bg-[#ccff00] relative cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-black absolute top-0.5 right-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="flex items-center gap-2 bg-[#ccff00] text-black font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
