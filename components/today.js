"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const translations = {
  en: { date: "", tagline: "Convert Islamic Calendar to Gregorian Easily!" },
  ar: { date: "", tagline: "تحويل التاريخ من الهجري للميلادي وبالعكس حسب تقويم مكة المكرمة" },
};

function DateTimeDisplay({ lang = "en" }) {
  const [dates, setDates] = useState({ gregorian: "", hijri: "" });

  useEffect(() => {
    function updateDates() {
      const now = new Date();

      // ✅ Format Gregorian Date Based on Language (But Always in Gregorian Calendar)
      const gregorian = now.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        calendar: "gregory", // ✅ Force Gregorian calendar
      });

      // ✅ Format Hijri Date Based on Selected Language
      const hijri = new Intl.DateTimeFormat(
        lang === "ar" ? "ar-SA-u-ca-islamic" : "en-US-u-ca-islamic", // ✅ English when "en"
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ).format(now);

      setDates({ gregorian, hijri });
    }

    updateDates();
    const intervalId = setInterval(updateDates, 1000);
    return () => clearInterval(intervalId);
  }, [lang]); // ✅ Re-run when language changes

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg">
      {/* Title (Translated) */}
      <h2 className="text-lg font-bold text-black">{translations[lang].date}</h2>

      {/* Dates */}
      <div className="text-lg text-black">
        <p className="font-bold">{dates.gregorian}</p> {/* ✅ Gregorian in English/Arabic */}
        <p className="font-bold">{dates.hijri}</p> {/* ✅ Hijri in English when "en", Arabic when "ar" */}
      </div>

      {/* Kaabah Image */}
      <div className="mt-4">
        <Image 
          src="/kaabah.png" // ✅ Ensure this is placed inside `public/kaabah.png`
          alt="Islamic Calendar Converter"
          width={100} 
          height={100}
          className="object-contain sm:w-[80px] sm:h-[80px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]" 
        />
      </div>

      {/* ✅ Dynamic Tagline (English or Arabic) */}
      <h4 className="text-sm text-black">{translations[lang].tagline}</h4>
    </div>
  );
}

export default DateTimeDisplay;
