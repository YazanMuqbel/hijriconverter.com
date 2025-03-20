"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import HijriGregBtn from "@/components/hijri-greg-btn";
import GregHijriBtn from "./greg-hijri-btn";

// Dynamically import Hijri Calendar
const hijriCalSelector = dynamic(() => import("@/components/hijri-cal"), { ssr: false });

const CalSelector = () => {
  const pathname = usePathname(); // Detects the current route
  const [selected, setSelected] = useState("gregorianToHijri");

  // ✅ Determine language dynamically based on the URL
  const language = pathname === "/arabic" ? "ar" : "en";

  // ✅ Translation object
  const translations = {
    en: {
      hijriToGregorian: "From Hijri to Gregorian",
      gregorianToHijri: "From Gregorian to Hijri",
    },
    ar: {
      hijriToGregorian: "من الهجري إلى الميلادي",
      gregorianToHijri: "من الميلادي إلى الهجري",
    },
  };

  return (
    <div className="w-full max-w-md">
      {/* ✅ Centered Button Group - Adjust Height for Large Screens */}
      <div className="flex justify-center gap-2 w-full">
        <button
          onClick={() => setSelected("hijriToGregorian")}
          className={`px-4 py-2 rounded-lg w-1/2 transition-all
            ${selected === "hijriToGregorian" ? "bg-green-500 text-white" : "bg-gray-500 text-white opacity-70 hover:opacity-100"}
            sm:h-[48px] lg:h-[60px] 2xl:h-[70px]`}
        >
          {translations[language].hijriToGregorian}
        </button>

        <button
          onClick={() => setSelected("gregorianToHijri")}
          className={`px-4 py-2 rounded-lg w-1/2 transition-all
            ${selected === "gregorianToHijri" ? "bg-green-500 text-white" : "bg-gray-500 text-white opacity-70 hover:opacity-100"}
            sm:h-[48px] lg:h-[60px] 2xl:h-[70px]`}
        >
          {translations[language].gregorianToHijri}
        </button>
      </div>

      {/* ✅ Render Selected Component */}
      <div className="mt-4">
        {selected === "hijriToGregorian" && <HijriGregBtn />}
        {selected === "gregorianToHijri" && <GregHijriBtn />}
      </div>
    </div>
  );
};

export default CalSelector;
