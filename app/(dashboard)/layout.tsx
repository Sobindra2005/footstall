import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LogOut, Bell, LayoutDashboard } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Check Auth
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login?next=/dashboard");
  }

  // 2. Check Role
  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError || !roleData || roleData.role !== "owner") {
    if (roleData?.role === "super_admin") {
      redirect("/superadmin");
    }
    redirect("/");
  }

  // 3. Get Futsal Info
  const { data: pitch, error: pitchError } = await supabase
    .from("pitches")
    .select("name, slug")
    .eq("owner_id", user.id)
    .single();

  if (pitchError || !pitch) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-black uppercase text-red-500 mb-2">No Pitch Assigned</h1>
          <p className="text-white/50">Your owner account is not linked to any futsal pitch.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden selection:bg-[#ccff00] selection:text-black font-sans">
      
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative bg-[#09090b]">
        <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            {pitch.name}
          </h2>
          <div className="flex items-center gap-4">
             <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors relative">
               <Bell className="w-4 h-4" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#09090b]"></span>
             </button>
             
             <div className="flex -space-x-2 mr-2">
               <div className="w-8 h-8 rounded-full border-2 border-[#09090b] bg-blue-500/20 flex items-center justify-center text-xs font-bold">JD</div>
               <div className="w-8 h-8 rounded-full border-2 border-[#09090b] bg-purple-500/20 flex items-center justify-center text-xs font-bold">AL</div>
               <div className="w-8 h-8 rounded-full border-2 border-[#09090b] bg-white/10 flex items-center justify-center text-[10px] font-bold">+3</div>
             </div>

             <button className="text-xs font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
               <LayoutDashboard className="w-3.5 h-3.5" />
               Customize Widget
             </button>

             <form action="/api/auth/logout" method="POST" className="ml-2 pl-4 border-l border-white/10">
               <button type="submit" className="text-white/40 hover:text-red-400 transition-colors">
                 <LogOut className="w-4 h-4" />
               </button>
             </form>
          </div>
        </header>
        
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
