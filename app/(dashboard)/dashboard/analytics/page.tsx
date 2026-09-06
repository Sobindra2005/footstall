import { TrendingUp, Users, CalendarCheck, Clock, BarChart3, Activity } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Analytics Overview</h2>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Detailed breakdown of your pitch performance</p>
        </div>
        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white font-bold outline-none focus:border-[#ccff00]/50 transition-colors">
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Last Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-zinc-900/50 rounded-3xl border border-white/5 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-white">Revenue Trend</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-white/50 font-bold uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div> Current
              </span>
              <span className="flex items-center gap-1 text-[10px] text-white/50 font-bold uppercase tracking-widest ml-3">
                <div className="w-2 h-2 rounded-full bg-white/20"></div> Previous
              </span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-2 h-64 mt-4 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] text-white/30 font-bold w-8">
              <span>50k</span>
              <span>40k</span>
              <span>30k</span>
              <span>20k</span>
              <span>10k</span>
              <span>0</span>
            </div>
            
            <div className="flex-1 flex items-end justify-between ml-10 h-full border-b border-white/10 pb-1">
              {[40, 60, 45, 80, 50, 90, 75, 100, 65, 85, 70, 95].map((val, i) => (
                <div key={i} className="w-full mx-1 group relative flex justify-center">
                   <div 
                     className="w-full bg-[#ccff00] rounded-t-sm group-hover:opacity-80 transition-opacity" 
                     style={{ height: `${val}%` }}
                   ></div>
                   {/* Tooltip */}
                   <div className="absolute -top-8 bg-black border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                     Rs {val * 500}
                   </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between ml-10 mt-2 text-[9px] text-white/30 font-bold uppercase tracking-widest">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-6">
            <h3 className="font-bold text-white mb-4">Conversion Rate</h3>
            <div className="flex items-center justify-between">
              <div className="relative w-24 h-24 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                   <path
                     className="text-white/10"
                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                     fill="none" stroke="currentColor" strokeWidth="3"
                   />
                   <path
                     className="text-[#ccff00]"
                     strokeDasharray="65, 100"
                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                     fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                   />
                 </svg>
                 <div className="absolute text-xl font-black text-white">65%</div>
              </div>
              <div className="space-y-3">
                 <div>
                   <div className="text-[10px] text-white/50 font-bold uppercase">Views</div>
                   <div className="text-sm font-bold text-white">1,245</div>
                 </div>
                 <div>
                   <div className="text-[10px] text-white/50 font-bold uppercase">Booked</div>
                   <div className="text-sm font-bold text-white">810</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-6">
            <h3 className="font-bold text-white mb-4">Peak Hours</h3>
            <div className="space-y-4">
               <div>
                 <div className="flex items-center justify-between text-xs font-bold mb-1">
                   <span className="text-white/70">18:00 - 20:00</span>
                   <span className="text-white">45%</span>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                 </div>
               </div>
               <div>
                 <div className="flex items-center justify-between text-xs font-bold mb-1">
                   <span className="text-white/70">16:00 - 18:00</span>
                   <span className="text-white">30%</span>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500 rounded-full" style={{ width: '30%' }}></div>
                 </div>
               </div>
               <div>
                 <div className="flex items-center justify-between text-xs font-bold mb-1">
                   <span className="text-white/70">06:00 - 08:00</span>
                   <span className="text-white">15%</span>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-500 rounded-full" style={{ width: '15%' }}></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
