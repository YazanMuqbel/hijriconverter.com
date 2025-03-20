"use client";

import React from "react";
import { usePathname } from "next/navigation";
import LanguageSelect from "@/components/languageSelect";
import DateTimeDisplay from "@/components/today";
import CalSelector from "@/components/cal-selector";
import NextHijriDate from "@/components/NextHijriDate";
import Footer from "@/components/footer";
import SEOHead from "@/components/SEOHead";

const translations = {
  en: {
    makkahTime: "Today's Date in Makkah",
    pageTitle: "Hijri-Gregorian Date Converter | My Website",
    pageDescription: "Convert dates between Hijri and Gregorian calendars accurately with our free online tool.",
    pageURL: "https://www.mywebsite.com",
    pageImage: "https://www.mywebsite.com/og-image.jpg",
  },
  ar: {
    makkahTime: "التاريخ حسب توقيت مكة المكرمة",
    pageTitle: "محول التاريخ الهجري والميلادي | موقعي",
    pageDescription: "حوّل التواريخ بين التقويمين الهجري والميلادي بدقة باستخدام أداتنا المجانية.",
    pageURL: "https://www.mywebsite.com/arabic",
    pageImage: "https://www.mywebsite.com/og-image.jpg",
  },
};

export default function Home() {
  const pathname = usePathname();
  
  // ✅ Detect if the URL is `/arabic`, set language accordingly
  const isArabic = pathname === "/arabic";
  const lang = isArabic ? "ar" : "en";  // ✅ English by default

  return (
    <>
      {/* ✅ Include SEOHead at the top with dynamic metadata */}
      <SEOHead
        title={translations[lang].pageTitle}
        description={translations[lang].pageDescription}
        url={translations[lang].pageURL}
        image={translations[lang].pageImage}
      />

      <main className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 py-4">
      
        {/* Single Column Layout */}
        <div className="flex flex-col gap-4 w-full max-w-md">

          {/* Time in Makkah */}
          <section className="bg-gray-300 flex flex-col items-center w-full rounded-box">
            {/* Language Selector */}
            <section className="bg-gray-300 flex flex-col items-center w-full py-2 rounded-box">
              <LanguageSelect />
            </section>
            <h1 className="font-extrabold text-2xl text-black">{translations[lang].makkahTime}</h1>
            <DateTimeDisplay lang={lang} />  
          </section>

          {/* Calendar Selector */}
          <section className="bg-gray-300 flex justify-center items-center w-full p-4 rounded-box">
            <CalSelector lang={lang} />
          </section>
          
          {/* Upcoming Islamic Occasions */}
          <section className="bg-gray-300 flex justify-center items-center w-full p-4 rounded-box">
            <NextHijriDate />
          </section>
          
        </div>

        {/* Footer - Sticks to bottom */}
        <section className="footer-center mt-auto w-full max-w-md">
          <Footer lang={lang} />
        </section>
      </main>
    </>
  );
}
