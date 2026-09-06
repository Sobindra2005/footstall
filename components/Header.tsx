"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

export interface HeaderProps {
  /** 
   * 'full' is the transparent/glassmorphic full-width header used on the home page.
   * 'bento' is the floating pill-shaped header used on internal pages.
   */
  variant?: "full" | "bento";

  /** Whether the header should stick to the top of the screen */
  sticky?: boolean;

  /** Custom links to display in the center */
  links?: { label: string; href: string }[];

  /** A custom React node (like a button or link) to display on the far right */
  actionButton?: React.ReactNode;
}

export function Header({ variant = "bento", sticky = false, links, actionButton }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();
          
        setUser({ ...session.user, role: roleData?.role || 'user' });
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultLinks = [
    { label: "Tactics", href: "/#tactics" },
    { label: "Pitches", href: "/pitches" },
    { label: "About", href: "#" },
  ];

  const activeLinks = links || defaultLinks;

  if (variant === "full") {
    return (
      <nav className={`fixed top-0 w-full z-50 px-6 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-white/10 py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ccff00] rounded-full flex items-center justify-center">
              <span className="text-black font-black text-sm">FS</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">FootStall</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {activeLinks.map(link => (
              <Link key={link.label} href={link.href} className="hover:text-[#ccff00] transition-colors text-white/90">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {loadingAuth ? (
              <div className="w-10 h-10 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-4">
                {user.role === 'owner' && (
                  <Link href="/dashboard" className="hidden md:block bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                    Dashboard
                  </Link>
                )}
                {user.role === 'super_admin' && (
                  <Link href="/superadmin" className="hidden md:block bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                    Superadmin
                  </Link>
                )}
                <Link href="/profile" className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#ccff00] flex items-center justify-center text-[#ccff00] font-bold hover:bg-zinc-700 transition-colors shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </Link>
                <button
                  onClick={async () => {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                  className="hidden md:block text-xs font-semibold text-white/50 hover:text-white transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden md:block text-sm font-semibold text-white/90 hover:text-white transition-colors">
                  Log in
                </Link>
                {actionButton || (
                  <Link href="/signup" className="bg-[#ccff00] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white transition-colors shadow-[0_0_15px_rgba(204,255,0,0.4)] inline-block">
                    Sign up
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  // Bento Variant
  return (
    <div className={`${sticky ? 'sticky top-0 z-50' : ''} pt-4 md:pt-6 px-4 md:px-6 lg:px-8 pb-2 transition-colors duration-300 bg-transparent`}>
      <nav className={`max-w-[1600px] mx-auto border rounded-full px-6 py-4 flex items-center justify-between shadow-2xl transition-colors duration-300 ${sticky && isScrolled ? 'bg-zinc-900/40 backdrop-blur-sm border-white/10' : 'bg-zinc-900 border-white/5'}`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ccff00] rounded-full flex items-center justify-center">
            <span className="text-black font-black text-sm">FS</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">FootStall</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-white/70">
          {activeLinks.map(link => (
            <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {loadingAuth ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-4">
              {user.role === 'owner' && (
                <Link href="/dashboard" className="hidden md:block bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                  Dashboard
                </Link>
              )}
              {user.role === 'super_admin' && (
                <Link href="/superadmin" className="hidden md:block bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                  Superadmin
                </Link>
              )}
              <Link href="/profile" className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#ccff00] flex items-center justify-center text-[#ccff00] font-bold hover:bg-zinc-700 transition-colors shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </Link>
              <button
                onClick={async () => {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  window.location.href = "/";
                }}
                className="hidden md:block text-xs font-semibold text-white/50 hover:text-white transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-sm font-semibold text-white/70 hover:text-white transition-colors">
                Log in
              </Link>
              {actionButton || (
                <Link href="/pitches" className="bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white/20 transition-colors border border-white/10 inline-block">
                  Back to Directory
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
