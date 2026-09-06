"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import NepaliDate from "nepali-datetime";

export interface NepaliDatePickerProps {
  value: string; // ISO string YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "input" | "unstyled" | "button";
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function NepaliDatePicker({
  value,
  onChange,
  placeholder = "Select Date",
  className = "",
  variant = "input"
}: NepaliDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Date state for calendar navigation
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      try {
        const d = new NepaliDate(value);
        return new NepaliDate(d.getYear(), d.getMonth(), 1);
      } catch(e) {}
    }
    try {
      const today = new NepaliDate();
      return new NepaliDate(today.getYear(), today.getMonth(), 1);
    } catch(e) {
      return null;
    }
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    for (let i = 32; i >= 28; i--) {
      try {
        let d = new NepaliDate(year, month, i);
        if (d.getMonth() === month && d.getDate() === i) {
          return i;
        }
      } catch(e) {}
    }
    return 30; // fallback
  };

  const getFirstDayOfMonth = (date: any) => {
    return date.getDay(); // 0 (Sun) to 6 (Sat)
  };

  const generateDays = () => {
    if (!currentMonth) return [];
    const year = currentMonth.getYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new NepaliDate(year, month, i));
    }

    return days;
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentMonth) return;
    let year = currentMonth.getYear();
    let month = currentMonth.getMonth() - 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    setCurrentMonth(new NepaliDate(year, month, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentMonth) return;
    let year = currentMonth.getYear();
    let month = currentMonth.getMonth() + 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    setCurrentMonth(new NepaliDate(year, month, 1));
  };

  const handleSelectDate = (date: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const formatted = date.format('YYYY-MM-DD');
    onChange(formatted);
    setIsOpen(false);
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const getFormattedValue = () => {
    if (!value) return "";
    try {
      const d = new NepaliDate(value);
      return d.format('MMMM DD, YYYY');
    } catch(e) {
      return value;
    }
  };

  const isToday = (d: any) => {
    try {
      const today = new NepaliDate();
      return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getYear() === today.getYear();
    } catch(e) {
      return false;
    }
  };

  const isPast = (d: any) => {
    try {
      const today = new NepaliDate();
      if (d.getYear() < today.getYear()) return true;
      if (d.getYear() === today.getYear()) {
        if (d.getMonth() < today.getMonth()) return true;
        if (d.getMonth() === today.getMonth() && d.getDate() < today.getDate()) return true;
      }
      return false;
    } catch(e) {
      return false;
    }
  };

  const isPrevMonthDisabled = () => {
    if (!currentMonth) return false;
    try {
      const today = new NepaliDate();
      if (currentMonth.getYear() < today.getYear()) return true;
      if (currentMonth.getYear() === today.getYear() && currentMonth.getMonth() <= today.getMonth()) return true;
      return false;
    } catch(e) {
      return false;
    }
  };

  const isSelected = (d: any) => {
    if (!value) return false;
    try {
      const vDate = new NepaliDate(value);
      return d.getDate() === vDate.getDate() && d.getMonth() === vDate.getMonth() && d.getYear() === vDate.getYear();
    } catch(e) {
      return false;
    }
  };

  const formattedValue = getFormattedValue();

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      
      {variant === "input" ? (
        <div 
          onClick={toggleOpen}
          className="w-full h-full bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent hover:border-white/20 cursor-pointer transition-colors group relative z-10"
        >
          <CalendarIcon className="w-4 h-4 text-white/50 shrink-0 group-hover:text-[#ccff00] transition-colors pointer-events-none" />
          <span className={`ml-3 text-sm font-medium pointer-events-none ${value ? 'text-white' : 'text-white/40'}`}>
            {formattedValue || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 ml-auto transition-transform pointer-events-none ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : variant === "unstyled" ? (
        <div 
          onClick={toggleOpen}
          className="w-full flex items-center justify-between cursor-pointer group relative z-10"
        >
          <span className={`font-semibold text-base transition-colors pointer-events-none ${value ? 'text-white' : 'text-white/40'}`}>
            {formattedValue || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 group-hover:text-white/80 transition-transform pointer-events-none ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : (
        <button 
          onClick={toggleOpen}
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-bold text-white flex items-center gap-1 w-full justify-between relative z-10"
        >
          <span className="pointer-events-none">{formattedValue || placeholder}</span>
          <ChevronDown className={`w-3 h-3 transition-transform pointer-events-none ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && currentMonth && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(5px)" }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
            className={`absolute top-[calc(100%+12px)] bg-zinc-950/90 backdrop-blur-3xl rounded-[1.5rem] p-5 border border-white/10 z-[99999] shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-w-[320px] ring-1 ring-white/5 ${variant === 'button' ? 'right-0' : 'left-0'}`}
          >
            {/* Header / Month Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <button 
                onClick={handlePrevMonth} 
                disabled={isPrevMonthDisabled()}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all relative z-50 ${isPrevMonthDisabled() ? 'opacity-30 cursor-not-allowed text-white/50' : 'bg-white/5 hover:bg-white/10 hover:scale-110 active:scale-95 text-white/70 hover:text-white'}`}
              >
                <ChevronLeft className="w-4 h-4 pointer-events-none" />
              </button>
              <div className="font-black tracking-wide text-white uppercase text-sm select-none">
                {currentMonth.format("MMMM YYYY")}
              </div>
              <button 
                onClick={handleNextMonth} 
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 text-white/70 hover:text-white relative z-50"
              >
                <ChevronRight className="w-4 h-4 pointer-events-none" />
              </button>
            </div>
            
            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-[#ccff00]/60 select-none">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {generateDays().map((day, idx) => {
                const past = day ? isPast(day) : false;
                return (
                  <div key={idx} className="aspect-square flex items-center justify-center relative group">
                    {day ? (
                      <button
                        disabled={past}
                        onClick={(e) => handleSelectDate(day, e)}
                        className={`w-full h-full rounded-full flex items-center justify-center text-sm font-bold transition-all relative z-50 ${
                          past
                            ? "text-white/20 cursor-not-allowed bg-transparent"
                            : isSelected(day)
                              ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)] scale-110"
                              : isToday(day)
                                ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                : "text-white/80 hover:bg-white/10 hover:text-white hover:scale-110"
                        }`}
                      >
                        <span className="pointer-events-none">{day.getDate()}</span>
                      </button>
                    ) : (
                      <div className="w-full h-full pointer-events-none" />
                    )}
                    {/* Subtle hover backdrop for empty space around circle */}
                    {day && !isSelected(day) && !past && (
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full z-0 scale-125 transition-colors pointer-events-none" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
