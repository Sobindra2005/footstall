"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import NepaliDate from 'nepali-datetime';
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

export interface NepaliDatePickerProps {
  value: string;
  onChange: (bsDate: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "input" | "button";
}

export function NepaliDatePicker({ 
  value, 
  onChange, 
  placeholder = "Select Date", 
  className = "", 
  variant = "input" 
}: NepaliDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minDate, setMinDate] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically calculate today's Nepali Date for validation
    setMinDate(new NepaliDate().format('YYYY-MM-DD'));
    
    // Close dropdown on outside click
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      
      {variant === "input" ? (
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent hover:border-white/20 cursor-pointer transition-colors group"
        >
          <CalendarIcon className="w-4 h-4 text-white/50 shrink-0 group-hover:text-[#ccff00] transition-colors" />
          <span className={`ml-3 text-sm font-medium ${value ? 'text-white' : 'text-white/30'}`}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-bold text-white flex items-center gap-1 w-full justify-between"
        >
          {value || placeholder} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {isOpen && (
        <div className={`absolute top-full mt-2 overflow-hidden flex justify-center bg-zinc-800 rounded-xl p-2 border border-white/10 z-[100] shadow-2xl min-w-[280px] ${variant === 'button' ? 'right-0' : 'left-0'}`}>
          {/* @ts-ignore - type definitions are missing some props */}
          <Calendar 
            onChange={({ bsDate }) => {
              onChange(bsDate);
              setIsOpen(false);
            }} 
            theme="deepdark"
            language="en"
            minDate={minDate}
          />
        </div>
      )}
      
    </div>
  );
}
