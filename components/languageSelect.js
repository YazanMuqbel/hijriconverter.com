"use client";  

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Initially null to prevent hydration mismatch
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    // Set the correct language when component mounts
    setSelectedLanguage(pathname === "/arabic" ? "ar" : "en");
  }, [pathname]);

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang); // Ensure state updates immediately
    router.push(lang === "en" ? "/" : "/arabic");
  };

  // Prevent rendering until state is set to avoid incorrect default styling
  if (selectedLanguage === null) return null;

  return (
    <div className="flex justify-center mt-2 p-2 rounded-box">
      <div className="flex w-full max-w-xs gap-x-4 gap-y-2">
        {/* Arabic Button */}
        <button
          onClick={() => switchLanguage("ar")}
          className={`w-[100px] h-[48px] rounded-lg transition-all 
            ${selectedLanguage === "ar" 
              ? "bg-white text-black font-bold scale-105 border-2 border-black" 
              : "bg-gray-500 text-white opacity-70 hover:opacity-100 border-2 border-transparent"
            }`}
        >
          العربية
        </button>

        {/* English Button */}
        <button
          onClick={() => switchLanguage("en")}
          className={`w-[100px] h-[48px] rounded-lg transition-all 
            ${selectedLanguage === "en" 
              ? "bg-white text-black font-bold scale-105 border-2 border-black"
              : "bg-gray-500 text-white opacity-70 hover:opacity-100 border-2 border-transparent"
            }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSelect;
