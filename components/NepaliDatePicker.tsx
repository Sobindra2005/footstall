"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import NepaliDate from 'nepali-datetime';
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NepaliDatePickerProps {
  value: string;
  onChange: (bsDate: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "input" | "button" | "unstyled";
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
  const [isClient, setIsClient] = useState(false);
  const openTime = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically calculate today's Nepali Date for validation
    try {
      setMinDate(new NepaliDate().format('YYYY-MM-DD'));
    } catch (e) {
      console.error(e);
    }
    setIsClient(true);
    
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
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) openTime.current = Date.now();
          }}
          className="w-full h-full bg-white/5 rounded-xl flex items-center px-4 py-3 border border-transparent hover:border-white/20 cursor-pointer transition-colors group"
        >
          <CalendarIcon className="w-4 h-4 text-white/50 shrink-0 group-hover:text-[#ccff00] transition-colors" />
          <span className={`ml-3 text-sm font-medium ${value ? 'text-white' : 'text-white/30'}`}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : variant === "unstyled" ? (
        <div 
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) openTime.current = Date.now();
          }}
          className="w-full flex items-center justify-between cursor-pointer group"
        >
          <span className={`font-semibold text-base transition-colors ${value ? 'text-white' : 'text-white/40'}`}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/50 group-hover:text-white/80 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      ) : (
        <button 
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) openTime.current = Date.now();
          }}
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-bold text-white flex items-center gap-1 w-full justify-between"
        >
          {value || placeholder} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      <AnimatePresence>
        {isClient && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-[calc(100%+8px)] flex justify-center bg-zinc-900 rounded-2xl p-3 border border-white/10 z-[9999] shadow-2xl min-w-[280px] ${variant === 'button' ? 'right-0' : 'left-0'}`}
          >
            {/* @ts-ignore - type definitions are missing some props */}
            <Calendar 
              onChange={({ bsDate }) => {
                onChange(bsDate);
                // Prevent auto-closing if Calendar fires onChange immediately on mount
                if (Date.now() - openTime.current > 150) {
                  setIsOpen(false);
                }
              }} 
              theme="deepdark"
              language="en"
              {...(minDate ? { minDate } : {})}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
