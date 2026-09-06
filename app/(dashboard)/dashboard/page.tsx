import { createClient } from "@/utils/supabase/server";
import { Users, TrendingUp, CalendarCheck, Clock, List, Filter, ArrowUpDown, Download, Plus, MoreHorizontal } from "lucide-react";
import NepaliDate from "nepali-datetime";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get pitch assigned to this owner
  const { data: pitch } = await supabase
    .from("pitches")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!pitch) return null;

  const pitchId = pitch.id;

  // Get today's BS date for querying
  const todayBs = new NepaliDate().format('YYYY-MM-DD');

  // Fetch metrics concurrently
  const [
    { count: totalBookings },
    { count: pendingBookings },
    { data: todaysBookings },
    { data: recentBookings }
  ] = await Promise.all([
    // Total bookings
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("pitch_id", pitchId),
    
    // Pending approvals
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("pitch_id", pitchId).eq("status", "pending"),
    
    // Today's bookings
    supabase.from("bookings").select("total_price, status").eq("pitch_id", pitchId).eq("booking_date", todayBs),
    
    // Recent 5 bookings
    supabase.from("bookings").select("*").eq("pitch_id", pitchId).order("created_at", { ascending: false }).limit(5)
  ]);

  // Calculate today's stats
  const todaysConfirmed = todaysBookings?.filter(b => b.status === "confirmed") || [];
  const todayRevenue = todaysConfirmed.reduce((sum, booking) => sum + booking.total_price, 0);

  return (
    <div className="space-y-8">
      {/* Filter / Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap">
            <List className="w-4 h-4" />
            Table View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 text-xs font-bold hover:bg-white/10 transition-colors whitespace-nowrap">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/10 bg-white/5 whitespace-nowrap ml-2">
            <span className="text-xs font-bold text-white/80">Show Statistics</span>
            <div className="w-8 h-4 bg-[#ccff00] rounded-full relative cursor-pointer flex items-center">
              <div className="w-3 h-3 bg-black rounded-full absolute right-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 text-xs font-bold hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ccff00] text-black text-xs font-black hover:bg-white transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            <Plus className="w-4 h-4" />
            Add New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        {/* Metric Cards */}
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 hover:bg-zinc-900/80 transition-colors group relative overflow-hidden">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                Total Bookings <span className="text-white/20">ⓘ</span>
              </div>
              <div className="text-3xl font-black text-white mt-1">{totalBookings || 0}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[10px] font-bold text-white/40 mt-4 flex items-center gap-2">
            vs last month <span className="text-[#ccff00] bg-[#ccff00]/10 px-1.5 py-0.5 rounded text-[9px]">+3 bookings</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 hover:bg-zinc-900/80 transition-colors group relative overflow-hidden">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                Pending Actions <span className="text-white/20">ⓘ</span>
              </div>
              <div className="text-3xl font-black text-white mt-1">{pendingBookings || 0}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[10px] font-bold text-white/40 mt-4 flex items-center gap-2">
            vs last month <span className="text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded text-[9px]">-2 pending</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 hover:bg-zinc-900/80 transition-colors group relative overflow-hidden">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                Bookings Today <span className="text-white/20">ⓘ</span>
              </div>
              <div className="text-3xl font-black text-white mt-1">{todaysBookings?.length || 0}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[10px] font-bold text-white/40 mt-4 flex items-center gap-2">
            vs yesterday <span className="text-[#ccff00] bg-[#ccff00]/10 px-1.5 py-0.5 rounded text-[9px]">+2</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-[#ccff00]/30 rounded-2xl p-5 hover:bg-zinc-900/80 transition-colors group relative overflow-hidden shadow-[0_0_20px_rgba(204,255,0,0.05)]">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#ccff00]/10 rounded-full blur-2xl group-hover:bg-[#ccff00]/20 transition-colors" />
          <div className="flex items-start justify-between mb-2 relative z-10">
            <div>
              <div className="text-[10px] font-bold text-[#ccff00]/60 uppercase tracking-widest flex items-center gap-1">
                Expected Revenue <span className="text-[#ccff00]/30">ⓘ</span>
              </div>
              <div className="text-3xl font-black text-[#ccff00] mt-1 tracking-tight">Rs {todayRevenue}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[10px] font-bold text-[#ccff00]/50 mt-4 flex items-center gap-2 relative z-10">
            vs yesterday <span className="text-[#ccff00] bg-[#ccff00]/20 px-1.5 py-0.5 rounded text-[9px]">+14%</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 w-12 text-center"><input type="checkbox" className="accent-[#ccff00] w-4 h-4 rounded border-white/10 bg-black" /></th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Customer</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Date</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Time Slot</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Price</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-center">
                       <input type="checkbox" className="accent-[#ccff00] w-4 h-4 rounded border-white/10 bg-black opacity-50 group-hover:opacity-100 transition-opacity" />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-xs text-white">{booking.customer_name}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-xs text-white/60">{booking.booking_date}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-xs text-white/60">{booking.time_slot}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-xs text-white">Rs {booking.total_price}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md flex items-center justify-center w-max ${
                        booking.status === "confirmed" ? "bg-[#ccff00]/10 text-[#ccff00]" :
                        booking.status === "pending" ? "bg-orange-500/10 text-orange-400" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-white/30 hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-white/30 text-xs font-bold uppercase tracking-widest">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Showing per page</span>
              <select className="bg-white/5 border border-white/10 text-xs text-white font-bold rounded-lg px-2 py-1 outline-none focus:border-[#ccff00]/50">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
               <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 text-xs font-bold">{'<'}</button>
               <button className="w-8 h-8 rounded-lg bg-[#ccff00] text-black flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(204,255,0,0.2)]">1</button>
               <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 text-xs font-bold">2</button>
               <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 text-xs font-bold">3</button>
               <span className="text-white/40 px-1">...</span>
               <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 text-xs font-bold">{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
