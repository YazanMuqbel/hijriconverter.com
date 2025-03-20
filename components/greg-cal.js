"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-datepicker/dist/react-datepicker.css';
import GregHijriBtn from "@/components/greg-hijri-btn";


const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false });

function CalendarSelector() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-bold">Select a Gregorian Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        className="border border-gray-300 rounded p-2"
      />
      <div> <GregHijriBtn/></div>
    </div>
  );
}

export default CalendarSelector;
