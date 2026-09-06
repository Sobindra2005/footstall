"use client";

import { pitchesService } from "@/services/pitches.service";
import { Pitch } from "@/types/pitch";
import { PaginationMeta } from "@/types/api";
import { MapPin, Star, ArrowRight, Search, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { NepaliDatePicker } from "@/components/NepaliDatePicker";
import { CustomSelect } from "@/components/CustomSelect";
import { useState, useEffect } from "react";

const SKELETON_COUNT = 12;

export default function PitchesPage() {
  const [selectedBsDate, setSelectedBsDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchPitches = async (currentPage: number, location: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await pitchesService.getAll({
        city: location,
        page: currentPage,
        pageSize: 12,
      });
      setPitches(data.items);
      setPagination(data.pagination);
    } catch (err: any) {
      console.error("Failed to fetch pitches:", err);
      setError(err.message || "Failed to load pitches. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset page to 1 when location changes
  useEffect(() => {
    setPage(1);
    fetchPitches(1, selectedLocation);
  }, [selectedLocation]);

  // Fetch when page changes (but not on initial render since location effect handles it)
  useEffect(() => {
    if (page !== 1 || (pagination && pagination.page !== page)) {
      fetchPitches(page, selectedLocation);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const handleRetry = () => {
    fetchPitches(page, selectedLocation);
  };

  const handleClearFilters = () => {
    setSelectedLocation("");
    setSelectedBsDate("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#ccff00] selection:text-black flex flex-col">
      <Header variant="bento" sticky={true} />

      <main className="max-w-[1600px] w-full mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 flex-1">
        <header className="flex flex-col gap-8 border-b border-white/10 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
              Available <span className="text-[#ccff00]">Pitches</span>
            </h1>
            <p className="text-white/50 text-sm font-medium max-w-md">
              Find the perfect surface for your next match. Browse our curated selection of premium futsal and football pitches.
            </p>
          </div>
          
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 shadow-xl">
            <div className="flex-1 bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-white/20 transition-colors relative group">
              <Search className="w-4 h-4 text-white/50 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by pitch name..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30 font-medium ml-3"
              />
            </div>
            
            <div className="flex-1 bg-white/5 rounded-xl flex items-center border border-transparent focus-within:border-white/20 transition-colors relative z-50">
              <NepaliDatePicker 
                value={selectedBsDate}
                onChange={setSelectedBsDate}
                placeholder="Filter by Date"
                variant="input"
                className="w-full h-full"
              />
            </div>

            <div className="flex-1 bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent focus-within:border-white/20 transition-colors relative group">
              <CustomSelect 
                options={[
                  { value: "any", label: "Nearby Me (Any)" },
                  { value: "kathmandu", label: "Kathmandu" },
                  { value: "lalitpur", label: "Lalitpur" },
                  { value: "bhaktapur", label: "Bhaktapur" },
                ]}
                value={selectedLocation}
                onChange={setSelectedLocation}
                placeholder="Nearby Me (Any)"
                icon={<MapPin className="w-4 h-4 text-white/50 shrink-0" />}
                className="w-full"
              />
            </div>
          </div>
        </header>

        {/* Content Section */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-[2rem] border border-red-500/20 text-center px-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Something went wrong</h3>
            <p className="text-white/50 font-medium mb-8 max-w-md">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden flex flex-col h-[420px] animate-pulse">
                <div className="aspect-[4/3] w-full bg-zinc-800" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="h-4 w-1/3 bg-zinc-800 rounded-full mb-4" />
                  <div className="h-6 w-3/4 bg-zinc-800 rounded-lg mb-2" />
                  <div className="h-4 w-1/2 bg-zinc-800 rounded-full mb-auto" />
                  <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                      <div className="h-3 w-12 bg-zinc-800 rounded-full" />
                      <div className="h-5 w-24 bg-zinc-800 rounded-lg" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : pitches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-[2rem] border border-white/5 text-center px-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">No pitches found</h3>
            <p className="text-white/50 font-medium mb-8 max-w-md">We couldn't find any pitches matching your current filters.</p>
            <button 
              onClick={handleClearFilters}
              className="bg-[#ccff00] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pitches.map((pitch) => (
                <Link href={`/pitches/${pitch.slug}`} key={pitch.id} className="group block h-full">
                  <div className="bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full">
                    <div className="relative aspect-[4/3] w-full bg-zinc-800 overflow-hidden">
                      <img
                        src={pitch.images?.[0] || "/coverImage.png"}
                        alt={pitch.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-xl">
                        <Star className="w-3 h-3 text-[#ccff00] fill-[#ccff00]" />
                        <span className="font-bold text-xs">{pitch.rating}</span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 relative">
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

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-white/5">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all text-sm"
                >
                  &laquo; Prev
                </button>
                <span className="text-white/50 font-bold text-sm tracking-widest uppercase">
                  Page <span className="text-white">{page}</span> of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all text-sm"
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="max-w-[1600px] w-full mx-auto mt-12 mb-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 px-6">
        <div>© {new Date().getFullYear()} FootStall</div>
        <div className="mt-2 sm:mt-0">Play Hard. Book Easy.</div>
      </footer>
    </div>
  );
}
