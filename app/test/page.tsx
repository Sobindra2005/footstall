"use client";
import { NepaliDatePicker } from "@/components/NepaliDatePicker";
import { useState } from "react";

export default function TestPage() {
  const [date, setDate] = useState("");
  return (
    <div className="p-20 bg-black min-h-screen text-white">
      <h1 className="text-xl mb-4">Test Nepali Date Picker</h1>
      <div className="w-64">
        <NepaliDatePicker value={date} onChange={setDate} />
      </div>
      
      <div className="mt-40">
        <p>Selected: {date}</p>
      </div>
    </div>
  );
}
