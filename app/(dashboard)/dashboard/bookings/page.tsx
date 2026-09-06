import { createClient } from "@/utils/supabase/server";
import { BookingsManager } from "@/components/admin/BookingsManager";

export default async function BookingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: pitch } = await supabase
    .from("pitches")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!pitch) return null;

  // Fetch all bookings for this pitch
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("pitch_id", pitch.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Manage Bookings</h2>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Approve, reject, or view history</p>
        </div>
      </div>

      <BookingsManager initialBookings={bookings || []} />
    </div>
  );
}
