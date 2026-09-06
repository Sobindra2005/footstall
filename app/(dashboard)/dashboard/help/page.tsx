import { Search, MessageCircle, FileText, Video, ChevronDown } from "lucide-react";

export default function HelpCenterPage() {
  const faqs = [
    { q: "How do I add a new pitch?", a: "You can add a new pitch by navigating to your Pitch Profile and clicking the 'Add New Pitch' button." },
    { q: "When are payouts processed?", a: "Payouts are automatically processed on the 1st and 15th of every month directly to your registered bank account." },
    { q: "Can I block out specific times?", a: "Yes, you can manage your availability from the Bookings tab by selecting timeslots and marking them as 'Unavailable'." },
    { q: "How do I handle refund requests?", a: "Refunds can be initiated directly from the specific booking details page. Depending on your cancellation policy, full or partial refunds will be calculated." }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-3xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ccff00]/5 via-transparent to-transparent pointer-events-none"></div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white relative z-10 mb-4">How can we help you?</h2>
        
        <div className="w-full max-w-xl relative z-10">
          <Search className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search for articles, guides, or FAQs..." 
            className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#ccff00]/50 text-white placeholder:text-white/40 shadow-xl backdrop-blur-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="font-bold text-white mb-2">Documentation</h3>
          <p className="text-sm text-white/50 leading-relaxed">Detailed guides on managing your pitch, bookings, and finances.</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="font-bold text-white mb-2">Video Tutorials</h3>
          <p className="text-sm text-white/50 leading-relaxed">Step-by-step video walk-throughs of the FootStall platform.</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 flex items-center justify-center border border-[#ccff00]/20 mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 text-[#ccff00]" />
          </div>
          <h3 className="font-bold text-white mb-2">Live Support</h3>
          <p className="text-sm text-white/50 leading-relaxed">Chat with our partner success team in real-time for immediate help.</p>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 mt-8">
        <h3 className="font-bold text-xl text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden group">
              <div className="p-5 flex items-center justify-between cursor-pointer">
                <h4 className="font-bold text-sm text-white/80 group-hover:text-white transition-colors">{faq.q}</h4>
                <ChevronDown className="w-4 h-4 text-white/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
