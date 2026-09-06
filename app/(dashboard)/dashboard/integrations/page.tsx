import { Calendar, CreditCard, MessageSquare, MapPin, Zap, ExternalLink } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Google Calendar",
      desc: "Sync your bookings directly with Google Calendar to prevent double booking.",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      connected: true,
      color: "blue"
    },
    {
      name: "Stripe",
      desc: "Accept online payments securely for advanced booking deposits.",
      icon: <CreditCard className="w-6 h-6 text-purple-500" />,
      connected: false,
      color: "purple"
    },
    {
      name: "WhatsApp Business",
      desc: "Send automated booking confirmations and reminders via WhatsApp.",
      icon: <MessageSquare className="w-6 h-6 text-green-500" />,
      connected: true,
      color: "green"
    },
    {
      name: "Google Maps",
      desc: "Embed interactive maps and directions on your pitch profile.",
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      connected: true,
      color: "red"
    },
    {
      name: "Zapier",
      desc: "Connect FootStall with over 3000+ apps to automate your workflow.",
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      connected: false,
      color: "orange"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Integrations</h2>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Connect your favorite tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.map((app, i) => (
          <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900 transition-colors group flex flex-col h-full relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${app.color}-500/5 rounded-full blur-3xl group-hover:bg-${app.color}-500/10 transition-colors pointer-events-none`} />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-${app.color}-500/10 flex items-center justify-center border border-${app.color}-500/20`}>
                {app.icon}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${app.connected ? "text-green-400 bg-green-500/10" : "text-white/30 bg-white/5"}`}>
                  {app.connected ? "Connected" : "Not Connected"}
                </span>
                
                {/* Toggle switch mock */}
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${app.connected ? "bg-[#ccff00]" : "bg-white/10"}`}>
                  <div className={`w-4 h-4 rounded-full bg-black absolute top-0.5 transition-transform ${app.connected ? "translate-x-5" : "translate-x-0.5"}`}></div>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">{app.name}</h3>
            <p className="text-sm text-white/50 mb-6 flex-1 relative z-10 leading-relaxed">{app.desc}</p>
            
            <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto relative z-10">
               <button className="text-xs font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1">
                 View Documentation <ExternalLink className="w-3 h-3" />
               </button>
               {!app.connected && (
                 <button className="text-xs font-bold text-[#ccff00] hover:text-white transition-colors">
                   Connect Now
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
