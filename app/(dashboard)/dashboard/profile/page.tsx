import { createClient } from "@/utils/supabase/server";

export default async function PitchProfilePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: pitch } = await supabase
    .from("pitches")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!pitch) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Pitch Profile</h2>
        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Manage your futsal information</p>
      </div>

      <div className="bg-zinc-900 rounded-[2rem] border border-white/5 p-8">
        <div className="space-y-6">
          
          <div>
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">
              Futsal Name
            </label>
            <input
              type="text"
              defaultValue={pitch.name}
              disabled
              className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors cursor-not-allowed opacity-70"
            />
            <p className="text-xs text-white/30 mt-2">Contact support to change your facility name.</p>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">
              Price Per Hour (NPR)
            </label>
            <input
              type="number"
              defaultValue={pitch.pricePerHour}
              className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">
              Open Hours
            </label>
            <input
              type="text"
              defaultValue={pitch.openHours}
              className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2 block">
              Description
            </label>
            <textarea
              defaultValue={pitch.description}
              rows={4}
              className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-white/5">
            <button className="bg-[#ccff00] text-black font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-transform">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
