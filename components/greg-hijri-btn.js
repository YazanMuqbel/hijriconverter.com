"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import locales
import { registerLocale } from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import arSA from "date-fns/locale/ar-SA";

// Register Arabic locale
registerLocale("ar", arSA);
registerLocale("en", enUS);

const GregHijriBtn = () => {
    const pathname = usePathname(); // Detect the current route
    const language = pathname === "/arabic" ? "ar" : "en"; // Determine language dynamically

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hijriDate, setHijriDate] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Translations for English & Arabic
    const translations = {
        en: {
            convertButton: "Convert to Hijri",
            loading: "Converting...",
            error: "Error converting date.",
            months: [
                "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
                "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
                "Ramadan", "Shawwal", "Dhul-Qi'dah", "Dhul-Hijjah"
            ],
            dateFormat: "MMMM dd, yyyy",
            direction: "ltr",
        },
        ar: {
            convertButton: "تحويل إلى الهجري",
            loading: "جاري التحويل...",
            error: "خطأ في تحويل التاريخ.",
            months: [
                "محرم", "صفر", "ربيع الأول", "ربيع الآخر",
                "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
                "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
            ],
            dateFormat: "dd MMMM yyyy",
            direction: "rtl",
        },
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // ✅ Convert Gregorian to Hijri using Aladhan API
    const convertToHijri = async () => {
        setLoading(true);
        setHijriDate("");

        try {
            // Format the selected date as DD-MM-YYYY
            const gregorianDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;

            const response = await fetch(
                `https://api.aladhan.com/v1/gToH?date=${gregorianDate}`
            );
            const data = await response.json();

            if (data?.data?.hijri) {
                const hijriDay = data.data.hijri.day;
                const hijriYear = data.data.hijri.year;
                const hijriMonthIndex = data.data.hijri.month.number - 1; // Get correct Hijri month
                const monthName = translations[language].months[hijriMonthIndex];

                // ✅ Ensure correct translation of Hijri date
                const formattedDate = language === "en"
                    ? `${monthName}(${data.data.hijri.month.number})-${hijriDay}-${hijriYear} Hijri`
                    : `${monthName}(${data.data.hijri.month.number})-${hijriDay}-${hijriYear} هجري`;

                setHijriDate(formattedDate);
            }
        } catch (error) {
            setHijriDate(translations[language].error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-4 rounded-lg" dir={translations[language].direction}>
            
            {/* ✅ Date Picker with Centered Pop-up */}
            <div className="w-full flex justify-center mb-4 relative">
                <DatePicker 
                    selected={selectedDate} 
                    onChange={handleDateChange} 
                    dateFormat={translations[language].dateFormat} // Switches format dynamically
                    locale={language} // Switches language dynamically
                    withPortal // ✅ Opens the picker as a centered modal
                    className="w-full max-w-[250px] p-2 border border-gray-300 rounded-lg text-lg text-center"
                />
            </div>

            {/* ✅ Convert Button */}
            <div className="w-full flex justify-center">
                <button 
                    onClick={convertToHijri} 
                    className="w-full max-w-[250px] bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-center"
                    disabled={loading}
                >
                    {loading ? translations[language].loading : translations[language].convertButton}
                </button>
            </div>

            {/* ✅ Hijri Date Output */}
            <div className="mt-4 text-center text-lg font-semibold text-black">
                {hijriDate && <p>{hijriDate}</p>}
            </div>
        </div>
    );
};

export default GregHijriBtn;
