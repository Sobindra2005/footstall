"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Activity, Users, Star, ArrowRight, Shield, Swords, Target } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const tacticsData = [
  {
    id: "diamond",
    name: "The 3-1 Pivot",
    desc: "The classic futsal setup. The Goalkeeper pushes up to orchestrate, while the Fixo (Defender) makes an overlapping run to overload the defense.",
    icon: Target,
    color: "text-[#ccff00]",
    bg: "bg-[#ccff00]/10",
    border: "border-[#ccff00]/30",
    duration: 6,
    us: [
      { label: "GK", top: [80,75,75,75,75,80], left: [50,40,40,40,40,50], movePath: "M 50 80 L 40 75" },
      { label: "CB", top: [65,65,45,30,30,65], left: [50,50,70,60,60,50], movePath: "M 50 65 Q 75 55 60 30" },
      { label: "LW", top: [50,50,45,45,45,50], left: [20,20,35,35,35,20], movePath: "M 20 50 L 35 45" },
      { label: "RW", top: [50,50,60,60,60,50], left: [80,80,50,50,50,80], movePath: "M 80 50 L 50 60" },
      { label: "ST", top: [25,25,25,25,25,25], left: [50,50,50,50,50,50] }
    ],
    them: [
      { label: "GK", top: [5,5,5,5,5,5], left: [50,50,50,50,60,50] },
      { label: "DF", top: [25,25,25,35,35,25], left: [70,70,60,70,70,70] },
      { label: "DF", top: [25,35,35,25,25,25], left: [30,25,35,40,40,30] },
      { label: "FW", top: [50,60,60,60,60,50], left: [65,60,60,60,60,65] },
      { label: "FW", top: [50,60,60,60,60,50], left: [35,40,40,40,40,35] }
    ],
    ballAnim: {
      left: ["50%", "20%", "70%", "50%", "55%", "50%"],
      top:  ["80%", "50%", "45%", "25%", "5%",  "80%"],
      opacity:[1,    1,     1,     1,     0,     0]
    }
  },
  {
    id: "box",
    name: "Power Play (Fly GK)",
    desc: "Trailing by a goal? Pull the Goalkeeper into the opponent's half to create a 5v4 overload. Move the ball quickly to drag defenders out of position before exploiting the gap.",
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    duration: 10,
    us: [
      { label: "GK", top: [45, 48, 48, 45, 48, 45, 48, 45, 45, 45], left: [50, 45, 45, 50, 55, 50, 45, 50, 50, 50] },
      { label: "LCB", top: [40, 40, 40, 40, 40, 40, 40, 25, 25, 40], left: [20, 20, 20, 20, 20, 20, 20, 30, 30, 20], movePath: "M 20 40 L 30 25" },
      { label: "RCB", top: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40], left: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80] },
      { label: "LF", top: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], left: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30] },
      { label: "RF", top: [15, 15, 15, 15, 15, 15, 15, 15, 10, 15], left: [70, 70, 70, 70, 70, 70, 70, 70, 60, 70], movePath: "M 70 15 L 60 10" }
    ],
    them: [
      { label: "GK", top: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5], left: [50, 45, 40, 50, 55, 50, 45, 45, 60, 50] },
      { label: "DF", top: [15, 15, 15, 15, 15, 15, 15, 20, 20, 15], left: [40, 35, 30, 40, 45, 40, 35, 30, 30, 40] },
      { label: "DF", top: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], left: [60, 55, 55, 60, 65, 60, 55, 55, 55, 60] },
      { label: "FW", top: [30, 35, 30, 30, 30, 40, 45, 45, 45, 30], left: [40, 30, 35, 40, 45, 45, 30, 30, 30, 40] },
      { label: "FW", top: [30, 30, 30, 30, 35, 40, 30, 30, 30, 30], left: [60, 55, 55, 60, 70, 55, 60, 60, 60, 60] }
    ],
    ballAnim: {
      left: ["50%", "20%", "30%", "50%", "80%", "50%", "20%", "30%", "60%", "50%"],
      top:  ["45%", "40%", "15%", "45%", "40%", "45%", "40%", "25%", "10%", "45%"],
      opacity:[1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    }
  },
  {
    id: "y-shape",
    name: "The 4-0 Rotation",
    desc: "A fluid attacking system with no recognized striker. Players continuously rotate to drag defenders out of position and create space for penetrating runs.",
    icon: Swords,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    duration: 6,
    us: [
      { label: "GK", top: [85,85,85,85,85,85], left: [50,50,50,50,50,50] },
      { label: "P1", top: [55,55,55,55,55,55], left: [20,20,20,20,20,20] },
      { label: "P2", top: [55,55,20,20,20,55], left: [40,40,40,40,40,40], movePath: "M 40 55 L 40 20" },
      { label: "P3", top: [55,55,55,55,55,55], left: [60,60,40,40,40,60], movePath: "M 60 55 L 40 55" },
      { label: "P4", top: [55,55,55,55,55,55], left: [80,80,80,60,60,80], movePath: "M 80 55 L 60 55" }
    ],
    them: [
      { label: "GK", top: [5,5,5,5,5,5], left: [50,50,50,50,40,50] },
      { label: "DF", top: [45,45,25,25,25,45], left: [40,40,40,40,40,40] },
      { label: "DF", top: [45,45,45,45,45,45], left: [60,60,60,60,60,60] },
      { label: "FW", top: [45,45,45,45,45,45], left: [20,20,20,20,20,20] },
      { label: "FW", top: [45,45,45,45,45,45], left: [80,80,80,80,80,80] }
    ],
    ballAnim: {
      left: ["40%", "60%", "80%", "40%", "45%", "40%"],
      top:  ["55%", "55%", "55%", "20%", "5%",  "55%"],
      opacity:[1,    1,     1,     1,     0,     0]
    }
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTacticId, setActiveTacticId] = useState("diamond");
  const activeTactic = tacticsData.find(t => t.id === activeTacticId) || tacticsData[0];
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
            <div className="relative aspect-square bg-[#105c38] rounded-3xl border-8 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center p-8 transition-colors duration-500">
              {/* Pitch Lines */}
              <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
              <div className="absolute top-4 bottom-4 left-1/2 w-0 border-l-2 border-white/30"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full"></div>
              {/* Penalty boxes */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-t-0 border-white/30"></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-b-0 border-white/30"></div>
              
              <div className="relative w-full h-full">
                {/* Movement Direction Arrows */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <defs>
                    <marker id="arrowhead" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5" orient="auto" markerUnits="userSpaceOnUse">
                      <path d="M 0 0 L 3 1.5 L 0 3 z" fill="rgba(255,255,255,0.4)" />
                    </marker>
                  </defs>
                  
                  {activeTactic.us.map((player) => (
                    player.movePath && (
                      <path 
                        key={`path-${activeTactic.id}-${player.label}`}
                        d={player.movePath}
                        stroke="rgba(255,255,255,0.4)" 
                        strokeWidth="0.4" 
                        fill="none" 
                        strokeDasharray="1 1"
                        markerEnd="url(#arrowhead)"
                      />
                    )
                  ))}
                </svg>

                {/* Our Team (Red) */}
                {activeTactic.us.map((player, idx) => (
                  <motion.div 
                    key={`${activeTactic.id}-us-${player.label}`}
                    animate={{ 
                      top: player.top.map(t => `${t}%`), 
                      left: player.left.map(l => `${l}%`) 
                    }}
                    transition={{ duration: activeTactic.duration, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white flex items-center justify-center font-bold shadow-lg text-xs z-20 ${
                      player.label === 'GK' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                    }`}
                  >
                    {player.label}
                  </motion.div>
                ))}

                {/* Opponent Team (Blue) */}
                {activeTactic.them.map((player, idx) => (
                  <motion.div 
                    key={`${activeTactic.id}-them-${player.label}-${idx}`}
                    animate={{ 
                      top: player.top.map(t => `${t}%`), 
                      left: player.left.map(l => `${l}%`) 
                    }}
                    transition={{ duration: activeTactic.duration, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50 flex items-center justify-center font-bold shadow-lg text-xs z-10 ${
                      player.label === 'GK' ? 'bg-zinc-700 text-white' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {player.label}
                  </motion.div>
                ))}

                {/* Animated Football */}
                <motion.div 
                  key={activeTactic.id + "-ball"}
                  animate={activeTactic.ballAnim}
                  transition={{ duration: activeTactic.duration, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-[0_0_15px_white] z-30"
                />
              </div>
            </div>

            {/* Tactical Explanations (Interactive) */}
            <div className="space-y-6">
              {tacticsData.map((tactic, idx) => {
                const Icon = tactic.icon;
                const isActive = activeTacticId === tactic.id;
                
                return (
                  <motion.div 
                    key={tactic.id}
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    onClick={() => setActiveTacticId(tactic.id)}
                    className={`cursor-pointer p-6 rounded-2xl transition-all border ${
                      isActive ? 'bg-white/10 border-white/20 shadow-lg scale-[1.02]' : 'border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${isActive ? tactic.bg + ' ' + tactic.border : 'bg-white/5 border-white/10'}`}>
                        <Icon className={`w-6 h-6 ${isActive ? tactic.color : 'text-white/50'}`} />
                      </div>
                      <h3 className={`text-2xl font-bold uppercase tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                        {tactic.name}
                      </h3>
                    </div>
                    <p className={`leading-relaxed text-lg pl-16 transition-colors ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                      {tactic.desc}
                    </p>
                  </motion.div>
                );
              })}
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