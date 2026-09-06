"use client";

import { useState } from "react";
import { Check, X, RefreshCw } from "lucide-react";

export function BookingsManager({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [processing, setProcessing] = useState<string | null>(null);
  
  const updateStatus = async (id: string, newStatus: string) => {
    setProcessing(id);
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json();
      
      if (result.success) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
      } else {
        alert(result.error?.message || "Failed to update booking status.");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-[2rem] border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 border-b border-white/5">
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-white/40">Customer</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-white/40">Date & Time</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-white/40">Price</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.length > 0 ? (
              bookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-sm text-white">{booking.customer_name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="font-mono text-sm text-white">{booking.booking_date}</div>
                    <div className="font-mono text-xs text-[#ccff00] mt-1">{booking.time_slot}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border inline-flex items-center gap-1.5 ${
                      booking.status === "confirmed" ? "bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/20" :
                      booking.status === "pending" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                      booking.status === "cancelled" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {processing === booking.id && <RefreshCw className="w-3 h-3 animate-spin" />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="font-black text-sm text-white">Rs. {booking.total_price}</div>
                  </td>
                  <td className="p-5">
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(booking.id, "confirmed")}
                          disabled={processing === booking.id}
                          className="w-8 h-8 rounded-lg bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-colors disabled:opacity-50"
                          title="Confirm Booking"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "cancelled")}
                          disabled={processing === booking.id}
                          className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                          title="Reject Booking"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {booking.status === "confirmed" && (
                       <button
                       onClick={() => updateStatus(booking.id, "cancelled")}
                       disabled={processing === booking.id}
                       className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300"
                     >
                       Cancel
                     </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30 text-xs font-bold uppercase tracking-widest">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
