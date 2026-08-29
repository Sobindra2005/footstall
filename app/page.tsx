"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Activity, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for the hero background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="bg-zinc-950 text-white font-sans selection:bg-[#ccff00] selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ccff00] rounded-full flex items-center justify-center">
              <span className="text-black font-black text-sm">FS</span>
            </div>
            <span className="text-xl font-bold tracking-tight">FootStall</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-[#ccff00] transition-colors text-white/90">Features</Link>
            <Link href="#tactics" className="hover:text-[#ccff00] transition-colors text-white/90">Tactics</Link>
            <Link href="#about" className="hover:text-[#ccff00] transition-colors text-white/90">About</Link>
            <Link href="#contact" className="hover:text-[#ccff00] transition-colors text-white/90">Contact</Link>
          </div>

          <button className="bg-[#ccff00] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white transition-colors shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            Book a Pitch
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-32 pb-10 px-6">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-zinc-950/90 z-10" />
          {/* Top-down pitch background */}
          <div className="absolute inset-0 bg-[url('/pitch-bg.png')] bg-cover bg-center bg-no-repeat opacity-80" />
        </motion.div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-20 mt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            14 Pitches Available Now
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl"
          >
            Pass. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Score.</span> <br />
            <span className="text-[#ccff00]">Repeat.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mt-8"
          >
            Built for players who take the game seriously. Book top-tier turfs, find opponents, and track your stats all in one place.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex gap-4"
          >
            <button className="bg-[#ccff00] text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.5)]">
              Find a Pitch
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-white/20 transition-all">
              Host a Game
            </button>
          </motion.div>
        </div>
        
      
      </section>

        {/* Bottom Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="z-20 border-t border-white/10 pt-6 mt-auto max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ccff00]">12,500+</div>
            <div className="text-sm font-medium text-white/50 uppercase tracking-widest mt-1">Players</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ccff00]">150</div>
            <div className="text-sm font-medium text-white/50 uppercase tracking-widest mt-1">Turfs</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ccff00]">50+</div>
            <div className="text-sm font-medium text-white/50 uppercase tracking-widest mt-1">Leagues</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ccff00]">99%</div>
            <div className="text-sm font-medium text-white/50 uppercase tracking-widest mt-1">Satisfaction</div>
          </div>
        </motion.div>

      {/* Scrolling Tactics & Playful UI Section */}
      <section id="tactics" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Master The <span className="text-[#ccff00]">5v5</span></h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">It's not just about booking a pitch, it's about owning it. Learn the tactical setups before you step on the field.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Playful Tactics Board Animation */}
            <div className="relative aspect-square bg-[#105c38] rounded-3xl border-8 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center p-8">
              {/* Pitch Lines */}
              <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
              <div className="absolute top-4 bottom-4 left-1/2 w-0 border-l-2 border-white/30"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full"></div>
              
              {/* Tactic Animation: The Diamond Setup (1-2-1) */}
              <div className="relative w-full h-full">
                {/* Defender */}
                <motion.div 
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-10 h-10 bg-red-500 rounded-full border-2 border-white flex items-center justify-center font-bold shadow-lg"
                >
                  CB
                </motion.div>
                
                {/* Left Winger */}
                <motion.div 
                  animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[40%] left-[20%] w-10 h-10 bg-red-500 rounded-full border-2 border-white flex items-center justify-center font-bold shadow-lg"
                >
                  LW
                </motion.div>

                {/* Right Winger */}
                <motion.div 
                  animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[40%] right-[20%] w-10 h-10 bg-red-500 rounded-full border-2 border-white flex items-center justify-center font-bold shadow-lg"
                >
                  RW
                </motion.div>

                {/* Pivot (Striker) */}
                <motion.div 
                  animate={{ x: [-30, 30, -30] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[15%] left-1/2 -translate-x-1/2 w-10 h-10 bg-red-500 rounded-full border-2 border-white flex items-center justify-center font-bold shadow-lg"
                >
                  ST
                </motion.div>

                {/* Animated Football */}
                <motion.div 
                  animate={{ 
                    x: ["-50%", "-150%", "150%", "-50%"],
                    y: ["0%", "-150%", "-200%", "0%"]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-[28%] left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] z-20"
                />

                {/* Dashed Arrows representing passes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-10" style={{ strokeDasharray: "4 4" }}>
                  <motion.path 
                    d="M 50% 75% Q 30% 60% 25% 45%" 
                    stroke="white" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M 50% 75% Q 70% 60% 75% 45%" 
                    stroke="white" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />
                </svg>
              </div>
            </div>

            {/* Tactical Explanations */}
            <div className="space-y-12">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 flex items-center justify-center border border-[#ccff00]/30">
                    <Activity className="text-[#ccff00] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide">The Diamond (1-2-1)</h3>
                </div>
                <p className="text-white/60 leading-relaxed text-lg pl-16">
                  The most balanced formation in 5v5. Keep a solid anchor at the back while your wingers bomb forward. Book a 5v5 turf and test it tonight.
                </p>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                    <Users className="text-blue-500 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide">The Box (2-2)</h3>
                </div>
                <p className="text-white/60 leading-relaxed text-lg pl-16">
                  Defend deep and counter-attack. The classic setup against technically superior teams. Requires extreme discipline and stamina.
                </p>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/30">
                    <Star className="text-pink-500 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide">The Y (1-1-2)</h3>
                </div>
                <p className="text-white/60 leading-relaxed text-lg pl-16">
                  All out attack. Perfect for when you're 2 goals down with 5 minutes left on the clock. Leave the defense to the goalkeeper!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Search Box Section */}
      <section className="py-24 px-6 border-t border-white/10 bg-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-10">Stop Reading. Start Playing.</h2>
          
          <div className="bg-zinc-800 p-4 rounded-full border border-white/10 flex flex-col md:flex-row gap-2 shadow-2xl relative">
            <div className="flex-1 flex items-center gap-3 px-6 py-3 bg-zinc-900/50 rounded-full">
              <MapPin className="text-[#ccff00] w-5 h-5" />
              <input type="text" placeholder="Search by city or venue..." className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/40 font-medium" />
            </div>
            
            <div className="flex-1 flex items-center gap-3 px-6 py-3 bg-zinc-900/50 rounded-full">
              <Calendar className="text-[#ccff00] w-5 h-5" />
              <input type="text" placeholder="Date & Time" className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/40 font-medium" />
            </div>
            
            <button className="bg-[#ccff00] hover:bg-white text-black font-bold uppercase tracking-wide px-10 py-4 rounded-full transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <div className="text-3xl font-black tracking-tight mb-4 text-white">Foot<span className="text-[#ccff00]">Stall</span></div>
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">© {new Date().getFullYear()} Play hard. Book easy.</p>
      </footer>
    </div>
  );
}