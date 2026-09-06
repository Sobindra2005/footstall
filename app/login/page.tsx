"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { loginSchema } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Client-side validation
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      setFieldErrors(validation.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.error?.details) {
          setFieldErrors(data.error.details);
        } else {
          setError(data.error?.message || "Failed to log in.");
        }
        setIsLoading(false);
        return;
      }

      // Success - Redirect based on role
      const userRole = data.data?.role;
      if (userRole === "owner") {
        router.push("/dashboard");
      } else if (userRole === "super_admin") {
        router.push("/superadmin");
      } else {
        router.push("/pitches");
      }
      
      router.refresh();
    } catch (err) {
      setError("An unexpected network error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden text-white font-sans selection:bg-[#ccff00] selection:text-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/10 blur-[100px] rounded-full pointer-events-none" />

      <Header variant="bento" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Pinterest-style Clean Card */}
          <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">

            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                <span className="text-black font-black text-xl">FS</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to FootStall</h1>
              <p className="text-white/50 text-sm font-medium">Find new ideas to play</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-3 rounded-2xl mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2 ml-1">
                  Email
                </label>
                <div className={`w-full bg-white/5 rounded-xl flex items-center px-4 py-3 border transition-colors relative group ${fieldErrors.email ? "border-red-500" : "border-transparent focus-within:border-white/20"}`}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30 font-medium"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs mt-2 ml-1 font-medium">{fieldErrors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2 ml-1">
                  Password
                </label>
                <div className={`w-full bg-white/5 rounded-xl flex items-center px-4 py-3 border transition-colors relative group ${fieldErrors.password ? "border-red-500" : "border-transparent focus-within:border-white/20"}`}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30 font-medium pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-red-400 text-xs mt-2 ml-1 font-medium">{fieldErrors.password[0]}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ccff00] text-black font-bold text-base py-4 rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log in"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-zinc-400">
              Not on FootStall yet?{" "}
              <Link href="/signup" className="text-white hover:underline font-bold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
