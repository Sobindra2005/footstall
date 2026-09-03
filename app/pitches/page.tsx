import { dummyPitches } from "@/data/pitches";
import { MapPin, Star, ArrowRight, Search, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function PitchesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Navigation (Bento Navbar) */}
      <Header 
        variant="bento" 
        sticky={true} 
        actionButton={
          <button className="bg-white text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
            Log In
          </button>
        }
      />

      <main className="max-w-[1600px] mx-auto px-6 py-12 md:py-20 flex flex-col gap-12">
        <header className="flex flex-col gap-8 border-b border-white/10 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
              Available <span className="text-[#ccff00]">Pitches</span>
            </h1>
            <p className="text-white/50 text-sm font-medium max-w-md">
              Find the perfect surface for your next match. Browse our curated selection of premium futsal and football pitches.
            </p>
          </div>
          
          {/* Search & Filter Bar */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 shadow-xl">
            {/* Search by Name */}
            <div className="flex-1 bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-white/20 transition-colors relative group">
              <Search className="w-4 h-4 text-white/50 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by pitch name..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30 font-medium ml-3"
              />
            </div>
            
            {/* Filter by Date */}
            <div className="flex-1 bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-white/20 transition-colors relative group">
              <CalendarIcon className="w-4 h-4 text-white/50 shrink-0" />
              <input 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30 font-medium ml-3 [color-scheme:dark]"
              />
            </div>

            {/* Filter by Location */}
            <div className="flex-1 bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-white/20 transition-colors relative group">
              <MapPin className="w-4 h-4 text-white/50 shrink-0" />
              <select className="bg-transparent border-none outline-none text-sm text-white w-full font-medium appearance-none ml-3">
                <option value="" className="bg-zinc-900">Nearby Me (Any)</option>
                <option value="kathmandu" className="bg-zinc-900">Kathmandu</option>
                <option value="lalitpur" className="bg-zinc-900">Lalitpur</option>
                <option value="bhaktapur" className="bg-zinc-900">Bhaktapur</option>
              </select>
            </div>
          </div>
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
