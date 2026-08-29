"use client";

import { dummyPitches } from "@/data/pitches";
import { useParams } from "next/navigation";
import { MapPin, Star, Clock, CheckCircle2, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PitchDetailsPage() {
  const params = useParams();
  const pitch = dummyPitches.find((p) => p.id === params.id);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  if (!pitch) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-black mb-4">Pitch Not Found</h1>
        <Link href="/pitches" className="text-[#ccff00] hover:underline">
          Return to Pitches
        </Link>
      </div>
    );
  }

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
          <Link href="/pitches" className="bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white/20 transition-colors border border-white/10">
            Back to Directory
          </Link>
        </nav>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Header Row */}
        <div className="mb-2 mt-4 px-2">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
              {pitch.turfType}
            </span>
            <div className="flex items-center gap-1.5 bg-[#ccff00]/10 text-[#ccff00] px-3 py-1.5 rounded-full border border-[#ccff00]/20">
              <Star className="w-3.5 h-3.5 fill-[#ccff00]" />
              <span className="font-bold text-xs">{pitch.rating}</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
            {pitch.name}
          </h1>
          <div className="flex items-center gap-2 text-white/50 mt-4 text-sm font-bold uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-[#ccff00]" />
            {pitch.location.address}
          </div>
        </div>

        {/* Bento Dashboard Top Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[550px]">
          
          {/* 1. Image Gallery (Col Span 8) */}
          <div className="xl:col-span-8 bg-zinc-900 rounded-[2rem] border border-white/5 overflow-hidden relative flex flex-col group">
            <div className="absolute inset-0 bg-zinc-800">
              <img 
                src={pitch.images[activeImage]} 
                alt={pitch.name} 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Thumbnails overlaid at bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {pitch.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start shadow-xl backdrop-blur-md bg-black/50 ${activeImage === idx ? 'border-[#ccff00] opacity-100 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Booking Widget (Col Span 4) */}
          <div className="xl:col-span-4 bg-[#ccff00] rounded-[2rem] p-8 text-black flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(204,255,0,0.15)]">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/50 mb-2">Book This Pitch</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-black tracking-tighter">NPR {pitch.pricePerHour}</span>
                <span className="text-xs uppercase font-bold tracking-widest text-black/50">/ Hour</span>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-black/5 relative cursor-pointer hover:bg-white/60 transition-colors">
                  <Calendar className="w-5 h-5 shrink-0 text-black/70" />
                  <div className="flex flex-col flex-1 relative">
                    <span className="text-[10px] uppercase font-bold text-black/50 tracking-widest">Select Date & Time</span>
                    <div className="flex items-center justify-between w-full mt-0.5">
                      <span className={`font-black text-sm ${selectedDate ? 'text-black' : 'text-black/40'}`}>
                        {selectedDate ? new Date(selectedDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : "Choose Slot"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-black/40" />
                    </div>
                    <input 
                      type="datetime-local"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl border border-black/5">
                  <Clock className="w-5 h-5 shrink-0 text-black/70" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-black/50 tracking-widest">Open Hours</span>
                    <span className="font-black text-sm mt-0.5">{pitch.openHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <div className="border-t border-black/10 pt-4 mb-6">
                <div className="flex justify-between items-center mb-1 text-sm font-bold text-black/60">
                  <span>Service Fee</span>
                  <span>NPR 50</span>
                </div>
                <div className="flex justify-between items-center text-lg font-black mt-2">
                  <span>Total</span>
                  <span>NPR {pitch.pricePerHour + 50}</span>
                </div>
              </div>
              <button className="w-full bg-black text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-xl">
                Continue to Payment
              </button>
            </div>
            
            {/* Background Graphic */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>

        {/* Bento Dashboard Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 3. Pitch Description (Col Span 7) */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-[2rem] p-8 md:p-10 border border-white/5">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 mb-6">About The Pitch</h2>
            <p className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed tracking-tight">
              {pitch.description}
            </p>
          </div>

          {/* 4. Amenities (Col Span 5) */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-[2rem] p-8 md:p-10 border border-white/5">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 mb-6">Amenities Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pitch.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />
                  <span className="font-bold text-sm text-white/90">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <footer className="max-w-[1600px] mx-auto mt-12 mb-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 px-6">
        <div>© {new Date().getFullYear()} FootStall</div>
        <div className="mt-2 sm:mt-0">Play Hard. Book Easy.</div>
      </footer>

      {/* Hide scrollbar for thumbnails globally if needed, though Tailwind line-clamp/hide-scrollbar plugin is better, we inline style here to be safe */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
