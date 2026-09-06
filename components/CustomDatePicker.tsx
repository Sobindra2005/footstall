"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export interface CustomDatePickerProps {
  value: string; // ISO string YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "input" | "unstyled" | "button";
}

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select Date",
  className = "",
  variant = "input"
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Date state for calendar navigation
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const d = new Date(value);
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    // Format to YYYY-MM-DD
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const formattedValue = value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  };

  const isSelected = (d: Date) => {
    if (!value) return false;
    const vDate = new Date(value);
    return d.getDate() === vDate.getDate() && d.getMonth() === vDate.getMonth() && d.getFullYear() === vDate.getFullYear();
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      
      {variant === "input" ? (
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent hover:border-white/20 cursor-pointer transition-colors group"
        >
          <CalendarIcon className="w-4 h-4 text-white/50 shrink-0 group-hover:text-[#ccff00] transition-colors" />
          <span className={`ml-3 text-sm font-medium ${value ? 'text-white' : 'text-white/40'}`}>
            {formattedValue || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : variant === "unstyled" ? (
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between cursor-pointer group"
        >
          <span className={`font-semibold text-base transition-colors ${value ? 'text-white' : 'text-white/40'}`}>
            {formattedValue || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 group-hover:text-white/80 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-bold text-white flex items-center gap-1 w-full justify-between"
        >
          {formattedValue || placeholder} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(5px)" }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
            className={`absolute top-[calc(100%+12px)] bg-zinc-950/80 backdrop-blur-2xl rounded-[1.5rem] p-5 border border-white/10 z-[9999] shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[320px] ring-1 ring-white/5 ${variant === 'button' ? 'right-0' : 'left-0'}`}
          >
            {/* Header / Month Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <button 
                onClick={handlePrevMonth} 
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="font-black tracking-wide text-white uppercase text-sm">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <button 
                onClick={handleNextMonth} 
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 text-white/70 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-[#ccff00]/60">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {generateDays().map((day, idx) => (
                <div key={idx} className="aspect-square flex items-center justify-center relative group">
                  {day ? (
                    <button
                      onClick={() => handleSelectDate(day)}
                      className={`w-full h-full rounded-full flex items-center justify-center text-sm font-bold transition-all relative z-10 ${
                        isSelected(day)
                          ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)] scale-110"
                          : isToday(day)
                            ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                            : "text-white/80 hover:bg-white/10 hover:text-white hover:scale-110"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                  {/* Subtle hover backdrop for empty space around circle */}
                  {day && !isSelected(day) && (
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full -z-10 scale-125 transition-colors pointer-events-none" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
