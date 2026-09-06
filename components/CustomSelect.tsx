"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  icon,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#ccff00] w-5 h-5 shrink-0 flex items-center justify-center">{icon}</span>}
          <span className={`font-semibold text-base transition-colors ${selectedOption ? "text-white" : "text-white/40"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/50 group-hover:text-white/80 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+16px)] left-0 w-full min-w-[200px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]"
          >
            <div className="max-h-[250px] overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    value === option.value
                      ? "bg-[#ccff00]/10 text-[#ccff00]"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium text-sm">{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-[#ccff00]" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
