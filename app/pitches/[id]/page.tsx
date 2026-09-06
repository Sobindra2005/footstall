"use client";

import { pitchesService } from "@/services/pitches.service";
import { Pitch } from "@/types/pitch";
import { useParams } from "next/navigation";
import { MapPin, Star, Clock, CheckCircle2, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { NepaliDatePicker } from "@/components/NepaliDatePicker";
import { useEffect, useState } from "react";

// Mock function to get available time slots (normally derived from openHours and backend)
const timeSlots = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
];

// Mock deterministic booking checker
const checkIsBooked = (date: string, slot: string) => {
  if (!date) return false;
  const hash = date.charCodeAt(date.length - 1) + slot.charCodeAt(0);
  return hash % 3 === 0;
};

export default function PitchDetailsPage() {
  const params = useParams();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedBsDate, setSelectedBsDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    const fetchPitch = async () => {
      try {
        const data = await pitchesService.getById(params.id as string);
        setPitch(data);
      } catch (error) {
        console.error("Failed to fetch pitch details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      fetchPitch();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Header variant="bento" sticky={true} />
        <main className="max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-8 pt-2 flex flex-col gap-5 flex-1">
          {/* Header Skeleton */}
          <div className="mb-4 mt-2 px-2 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-pulse">
            <div>
              <div className="h-12 w-64 bg-zinc-900 rounded-lg mb-3" />
              <div className="h-4 w-48 bg-zinc-900 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-24 bg-zinc-900 rounded-full" />
              <div className="h-8 w-16 bg-zinc-900 rounded-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 animate-pulse">
            <div className="xl:col-span-8 bg-zinc-900 rounded-[1.5rem] border border-white/5 min-h-[400px]" />
            <div className="xl:col-span-4 bg-zinc-900 rounded-[1.5rem] border border-white/5 min-h-[400px]" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-pulse">
            <div className="lg:col-span-7 bg-zinc-900 rounded-[1.5rem] h-48 border border-white/5" />
            <div className="lg:col-span-5 bg-zinc-900 rounded-[1.5rem] h-48 border border-white/5" />
          </div>
        </main>
      </div>
    );
  }

  if (!pitch) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Header variant="bento" sticky={true} />
        <div className="flex flex-col flex-1 items-center justify-center p-6 text-center">
          <div className="bg-zinc-900/50 p-12 rounded-[2rem] border border-white/5 max-w-lg w-full flex flex-col items-center shadow-xl">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight mb-3">Pitch Not Found</h1>
            <p className="text-white/50 mb-8">The pitch you're looking for doesn't exist or has been removed.</p>
            <Link href="/pitches" className="bg-[#ccff00] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all w-full text-center">
              Browse Pitches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Navigation (Bento Navbar) */}
      <Header 
        variant="bento" 
        sticky={true} 
      />

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 pt-2 flex flex-col gap-5">
        
        {/* Compact Header Row */}
        <div className="mb-4 mt-2 px-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
              {pitch.name}
            </h1>
            <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
              {pitch.location.address}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
              {pitch.turfType}
            </span>
            <div className="flex items-center gap-1.5 bg-[#ccff00]/10 text-[#ccff00] px-3 py-1.5 rounded-full border border-[#ccff00]/20">
              <Star className="w-3.5 h-3.5 fill-[#ccff00]" />
              <span className="font-bold text-[10px]">{pitch.rating}</span>
            </div>
          </div>
        </div>

        {/* Bento Dashboard Top Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          
          {/* 1. Image Gallery (Col Span 8) */}
          <div className="xl:col-span-8 bg-zinc-900 rounded-[1.5rem] border border-white/5 overflow-hidden relative flex flex-col group min-h-[400px]">
            <div className="absolute inset-0 bg-zinc-800">
              <img 
                src={pitch.images[activeImage]} 
                alt={pitch.name} 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Thumbnails overlaid at bottom */}
            <div className="absolute bottom-5 left-5 right-5 flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {pitch.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-16 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start shadow-xl backdrop-blur-md bg-black/50 ${activeImage === idx ? 'border-[#ccff00] opacity-100 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Booking Widget (Col Span 4) */}
          <div className="xl:col-span-4 bg-zinc-900 border border-[#ccff00]/20 rounded-[1.5rem] p-5 md:p-6 text-white flex flex-col justify-between relative shadow-[0_20px_50px_rgba(204,255,0,0.05)]">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 mb-2">Book This Pitch</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-[#ccff00]">NPR {pitch.pricePerHour}</span>
                <span className="text-xs uppercase font-bold tracking-widest text-white/50">/ Hour</span>
              </div>

              <div className="space-y-4 relative z-50">
                <div className="flex flex-col bg-white/5 p-4 rounded-2xl border border-white/10 relative z-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 shrink-0 text-[#ccff00]" />
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Select Date (BS)</span>
                    </div>
                    <NepaliDatePicker 
                      value={selectedBsDate}
                      onChange={(bsDate) => {
                        setSelectedBsDate(bsDate);
                        setSelectedTimeSlot(""); // reset time slot on date change
                      }}
                      placeholder="Choose Date"
                      variant="button"
                    />
                  </div>
                </div>

                {selectedBsDate && (
                  <div className="flex flex-col bg-white/5 p-4 rounded-2xl border border-white/10 relative z-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 shrink-0 text-[#ccff00]" />
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Select Time Slot</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-h-[140px] overflow-y-auto pr-1 hide-scrollbar">
                      {timeSlots.map(slot => {
                        const isBooked = checkIsBooked(selectedBsDate, slot);
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={isBooked}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                              isBooked 
                                ? 'bg-black/20 text-white/30 border-white/5 cursor-not-allowed line-through' 
                                : isSelected 
                                  ? 'bg-[#ccff00] text-black border-[#ccff00] scale-105' 
                                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {!selectedTimeSlot && (
                      <div className="mt-3 text-center text-[10px] uppercase font-bold text-white/50">
                        Please select an available slot
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Open Hours</span>
                    <span className="font-black text-sm mt-0.5 text-white">{pitch.openHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center mb-1 text-sm font-bold text-white/60">
                  <span>Service Fee</span>
                  <span>NPR 50</span>
                </div>
                <div className="flex justify-between items-center text-lg font-black mt-2 text-white">
                  <span>Total</span>
                  <span className="text-[#ccff00]">NPR {pitch.pricePerHour + 50}</span>
                </div>
              </div>
              <button 
                disabled={!selectedBsDate || !selectedTimeSlot}
                className="w-full bg-[#ccff00] text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
            
            {/* Background Graphic */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>

        {/* Bento Dashboard Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* 3. Pitch Description (Col Span 7) */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-[1.5rem] p-5 md:p-6 border border-white/5">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 mb-4">About The Pitch</h2>
            <p className="text-lg md:text-xl font-medium text-white/80 leading-relaxed tracking-tight">
              {pitch.description}
            </p>
          </div>

          {/* 4. Amenities (Col Span 5) */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-[1.5rem] p-5 md:p-6 border border-white/5">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 mb-4">Amenities Included</h2>
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
