import { dummyPitches } from "@/data/pitches";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PitchesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Navigation (Bento Navbar) */}
      <div className="p-4 md:p-6 lg:p-8 pb-0">
        <nav className="max-w-[1600px] mx-auto bg-zinc-900 border border-white/5 rounded-full px-6 py-4 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ccff00] rounded-full flex items-center justify-center">
              <span className="text-black font-black text-sm">FS</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">FootStall</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-white/70">
            <Link href="/#tactics" className="hover:text-white transition-colors">Tactics</Link>
            <Link href="/pitches" className="text-white transition-colors">Pitches</Link>
            <Link href="#" className="hover:text-white transition-colors">About</Link>
          </div>
          <button className="bg-white text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Log In
          </button>
        </nav>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 py-12 md:py-20 flex flex-col gap-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <div className="text-[10px] md:text-xs uppercase font-bold tracking-[0.3em] text-[#ccff00] mb-4">
              Select A Venue
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              Available<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-green-400">Pitches</span>
            </h1>
          </div>
          <p className="text-white/50 text-sm md:text-base font-medium max-w-sm">
            Browse our curated selection of premium futsal and football pitches. Find the perfect surface for your next match.
          </p>
        </header>

        {/* Refined Minimalist Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyPitches.map((pitch) => (
            <Link href={`/pitches/${pitch.id}`} key={pitch.id} className="group block">
              <div className="bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full">
                
                {/* Image Section (Sleek Aspect Ratio) */}
                <div className="relative aspect-[4/3] w-full bg-zinc-800 overflow-hidden">
                  <img
                    src={pitch.images[0]}
                    alt={pitch.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Rating */}
                  <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-xl">
                    <Star className="w-3 h-3 text-[#ccff00] fill-[#ccff00]" />
                    <span className="font-bold text-xs">{pitch.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 relative">
                  
                  {/* Floating Turf Type */}
                  <div className="absolute -top-4 left-6 bg-[#ccff00] text-black px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg">
                    {pitch.turfType}
                  </div>

                  <div className="mt-2 flex-1">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-[#ccff00] transition-colors leading-none">
                      {pitch.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-white/50 text-xs font-bold uppercase tracking-widest mb-6">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-white/30" />
                      <span className="truncate">{pitch.location.city}</span>
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="flex items-end justify-between border-t border-white/5 pt-4 mt-auto">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 mb-0.5">Price</div>
                      <div className="font-black text-white text-lg">NPR {pitch.pricePerHour} <span className="text-white/40 text-xs uppercase tracking-widest font-bold">/ hr</span></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ccff00] transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="max-w-[1600px] mx-auto mt-12 mb-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 px-6">
        <div>© {new Date().getFullYear()} FootStall</div>
        <div className="mt-2 sm:mt-0">Play Hard. Book Easy.</div>
      </footer>
    </div>
  );
}
