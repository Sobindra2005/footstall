import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";

export default function MessagingPage() {
  return (
    <div className="h-[calc(100vh-140px)] flex border border-white/5 rounded-2xl overflow-hidden bg-zinc-950/50">
      
      {/* Sidebar (List of chats) */}
      <div className="w-1/3 border-r border-white/5 bg-zinc-900/30 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="font-black uppercase tracking-widest text-lg">Messages</h2>
          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#ccff00]/50 text-white placeholder:text-white/30"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {[
            { name: "John Doe", msg: "Is the pitch available at 5 PM?", time: "2m ago", unread: 2, online: true },
            { name: "Sarah Smith", msg: "Thanks, we had a great time!", time: "1h ago", unread: 0, online: false },
            { name: "Mike Johnson", msg: "Can I cancel my booking for tomorrow?", time: "Yesterday", unread: 0, online: true },
            { name: "FC United", msg: "We'd like to book every Sunday.", time: "Mon", unread: 0, online: false },
            { name: "David Chen", msg: "How much for a 2-hour session?", time: "Mon", unread: 0, online: false },
          ].map((chat, i) => (
            <div key={i} className={`p-4 cursor-pointer transition-colors ${i === 0 ? "bg-white/5 border-l-2 border-[#ccff00]" : "hover:bg-white/5"}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold uppercase">
                      {chat.name.charAt(0)}
                    </div>
                    {chat.online && <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#ccff00] border-2 border-zinc-900"></div>}
                  </div>
                  <span className={`text-sm font-bold ${i === 0 ? "text-white" : "text-white/80"}`}>{chat.name}</span>
                </div>
                <span className="text-[10px] text-white/30 font-bold uppercase">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between mt-1 pl-10">
                <p className={`text-xs truncate max-w-[200px] ${chat.unread > 0 ? "text-white font-medium" : "text-white/40"}`}>{chat.msg}</p>
                {chat.unread > 0 && (
                  <span className="bg-[#ccff00] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#09090b]">
        {/* Chat Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-900/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#ccff00]/30 flex items-center justify-center text-sm font-bold uppercase text-[#ccff00]">
                J
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ccff00] border-2 border-zinc-900"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">John Doe</h3>
              <p className="text-[10px] text-[#ccff00] font-bold uppercase tracking-widest">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/40 hover:text-white transition-colors"><Phone className="w-4 h-4" /></button>
            <button className="text-white/40 hover:text-white transition-colors"><Video className="w-5 h-5" /></button>
            <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col items-center mb-8">
            <div className="text-[10px] bg-white/5 text-white/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
              Today
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold uppercase flex-shrink-0">
              J
            </div>
            <div>
              <div className="bg-zinc-800 border border-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-white/80 max-w-md">
                Hi there, I'm looking to book the pitch for this evening. Is it available around 5 PM?
              </div>
              <div className="text-[10px] text-white/30 font-bold uppercase mt-1 ml-1">10:42 AM</div>
            </div>
          </div>

          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-[#ccff00]/20 border border-[#ccff00]/30 flex items-center justify-center text-xs font-bold uppercase text-[#ccff00] flex-shrink-0">
              FS
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-[#ccff00] text-black rounded-2xl rounded-tr-sm p-4 text-sm font-medium max-w-md">
                Hello John! Yes, the pitch is currently available from 5:00 PM to 6:00 PM. Would you like me to reserve it for you?
              </div>
              <div className="text-[10px] text-white/30 font-bold uppercase mt-1 mr-1">10:45 AM</div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold uppercase flex-shrink-0">
              J
            </div>
            <div>
              <div className="bg-zinc-800 border border-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-white/80 max-w-md">
                Yes please! How do I proceed with the payment?
              </div>
              <div className="text-[10px] text-white/30 font-bold uppercase mt-1 ml-1">10:47 AM</div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-zinc-900/20">
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-2 focus-within:border-[#ccff00]/50 transition-colors">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none outline-none text-sm text-white py-2 placeholder:text-white/30"
            />
            <button className="w-10 h-10 rounded-lg bg-[#ccff00] text-black flex items-center justify-center hover:bg-white transition-colors">
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
