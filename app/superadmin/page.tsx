import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { ShieldAlert, Key, User, Mail, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SuperAdminPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?next=/superadmin");
  }

  // Check if user is super_admin
  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError || !roleData || roleData.role !== "super_admin") {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Header variant="bento" sticky={true} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-red-500/10 p-8 rounded-3xl border border-red-500/20 max-w-lg w-full flex flex-col items-center">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Access Denied</h1>
            
            {/* DEBUG INFO */}
            <div className="text-left w-full bg-black/50 p-4 mb-4 rounded-xl border border-red-500/30 font-mono text-xs overflow-auto">
              <p className="text-red-400 font-bold mb-2">DEBUG INFO:</p>
              <p>User ID: {user.id}</p>
              <p>Role Error: {JSON.stringify(roleError)}</p>
              <p>Role Data: {JSON.stringify(roleData)}</p>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed">
              You do not have the <strong className="text-white">super_admin</strong> role required to view this page.
            </p>
            <div className="text-left bg-zinc-900 w-full p-4 rounded-xl border border-white/10">
              <h3 className="text-xs uppercase font-bold text-[#ccff00] mb-2 tracking-widest">How to get access:</h3>
              <p className="text-sm text-white/50 mb-3">Run this SQL in your Supabase Dashboard to make yourself a super admin:</p>
              <code className="text-xs text-white bg-black p-3 rounded-lg block break-all font-mono">
                INSERT INTO public.user_roles (user_id, role) <br/>
                VALUES ('{user.id}', 'super_admin') <br/>
                ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
              </code>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Fetch all credentials
  const { data: credentials, error: credError } = await supabase
    .from("owner_credentials")
    .select(`
      id,
      email,
      password,
      pitches ( name )
    `)
    .order("email");

  if (credError) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-red-500">Error fetching credentials: {credError.message}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#ccff00] selection:text-black flex flex-col">
      <Header variant="bento" sticky={true} />
      
      <main className="max-w-[1200px] w-full mx-auto p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#ccff00]/10 rounded-xl flex items-center justify-center border border-[#ccff00]/20">
            <ShieldCheck className="w-6 h-6 text-[#ccff00]" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Super Admin</h1>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Owner Credentials Vault</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 border-b border-white/5">
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-white/40">Futsal Pitch</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-white/40">Login Email</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-white/40">Generated Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {credentials && credentials.length > 0 ? (
                  credentials.map((cred: any) => (
                    <tr key={cred.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-white group-hover:text-[#ccff00] transition-colors">
                          {cred.pitches?.name || "Unknown Pitch"}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-white/70">
                          <Mail className="w-4 h-4 text-white/30" />
                          <span className="font-mono text-sm">{cred.email}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-white/70">
                          <Key className="w-4 h-4 text-white/30" />
                          <span className="font-mono text-sm tracking-widest">{cred.password}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-white/30 text-sm font-bold uppercase tracking-widest">
                      No owner credentials found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
