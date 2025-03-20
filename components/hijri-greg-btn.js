"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const HijriGregBtn = () => {
    const pathname = usePathname(); // Detect current route
    const language = pathname === "/arabic" ? "ar" : "en"; // Determine language dynamically

    const [selectedHijriYear, setSelectedHijriYear] = useState(1445);
    const [selectedHijriMonth, setSelectedHijriMonth] = useState(9);
    const [selectedHijriDay, setSelectedHijriDay] = useState(1);
    const [apiConvertedDate, setApiConvertedDate] = useState("");
    const [loading, setLoading] = useState(false);
    
    // ✅ Translations for English & Arabic
    const translations = {
        en: {
            convertButton: "Convert to Gregorian",
            loading: "Converting...",
            error: "Error converting date.",
            hijriMonths: [
                "1-Muharram", "2-Safar", "3-Rabi' al-Awwal", "4-Rabi' al-Thani",
                "5-Jumada al-Awwal", "6-Jumada al-Thani", "7-Rajab", "8-Sha'ban",
                "9-Ramadan", "10-Shawwal", "11-Dhul-Qi'dah", "12-Dhul-Hijjah"
            ],
            gregorianMonths: [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ],
            direction: "ltr",
            textAlign: "text-left",
        },
        ar: {
            convertButton: "تحويل إلى الميلادي",
            loading: "جاري التحويل...",
            error: "خطأ في تحويل التاريخ.",
            hijriMonths: [
                "١- محرم", "٢- صفر", "٣- ربيع الأول", "٤- ربيع الآخر",
                "٥- جمادى الأولى", "٦- جمادى الآخرة", "٧- رجب", "٨- شعبان",
                "٩- رمضان", "١٠- شوال", "١١- ذو القعدة", "١٢- ذو الحجة"
            ],
            gregorianMonths: [
                "يناير", "فبراير", "مارس", "أبريل",
                "مايو", "يونيو", "يوليو", "أغسطس",
                "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
            ],
            direction: "rtl",
            textAlign: "text-right",
        },
    };

    useEffect(() => {
        const today = new Date();
        const hijriFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).formatToParts(today);

        setSelectedHijriDay(Number(hijriFormatter.find(part => part.type === 'day').value));
        setSelectedHijriMonth(Number(hijriFormatter.find(part => part.type === 'month').value));
        setSelectedHijriYear(Number(hijriFormatter.find(part => part.type === 'year').value));
    }, []);

    const convertToGregorian = async () => {
        setLoading(true);
        setApiConvertedDate("");

        try {
            const response = await fetch(
                `https://api.aladhan.com/v1/hToG?date=${selectedHijriDay}-${selectedHijriMonth}-${selectedHijriYear}`
            );
            const data = await response.json();

            if (data?.data?.gregorian) {
                const gregorianDay = data.data.gregorian.day;
                const gregorianYear = data.data.gregorian.year;
                const gregorianMonthIndex = data.data.gregorian.month.number - 1; // Get correct Gregorian month
                const monthName = translations[language].gregorianMonths[gregorianMonthIndex]; // ✅ Now using correct Gregorian months

                // ✅ Ensure correct translation of Gregorian date
                const formattedDate = language === "en"
                    ? `${monthName} ${gregorianDay}, ${gregorianYear} AD`
                    : `${gregorianDay} ${monthName} ${gregorianYear} ميلادي`;

                setApiConvertedDate(formattedDate);
            }
        } catch (error) {
            setApiConvertedDate(translations[language].error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-4 rounded-lg"
            dir={translations[language].direction}>

            {/* ✅ Hijri Date Dropdowns (Now with month number + name in correct language) */}
            <div className="grid grid-cols-3 w-full gap-2 mb-4 text-center">
                <select className={`select select-bordered w-full text-center md:text-lg ${translations[language].textAlign}`} 
                    value={selectedHijriYear} 
                    onChange={(e) => setSelectedHijriYear(Number(e.target.value))}>
                    {[...Array(111)].map((_, i) => (
                        <option key={1380 + i} value={1380 + i}>{1380 + i} AH</option>
                    ))}
                </select>

                <select className={`select select-bordered w-full text-center md:text-lg ${translations[language].textAlign}`} 
                    value={selectedHijriMonth} 
                    onChange={(e) => setSelectedHijriMonth(Number(e.target.value))}>
                    {translations[language].hijriMonths.map((month, index) => (
                        <option key={index + 1} value={index + 1}>{month}</option>
                    ))}
                </select>

                <select className={`select select-bordered w-full text-center md:text-lg ${translations[language].textAlign}`} 
                    value={selectedHijriDay} 
                    onChange={(e) => setSelectedHijriDay(Number(e.target.value))}>
                    {[...Array(30)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            {/* ✅ Convert Button */}
            <div className="w-full flex justify-center">
                <button className="w-full max-w-[250px] bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-center"
                    onClick={convertToGregorian}
                    disabled={loading}
                >
                    {loading ? translations[language].loading : translations[language].convertButton}
                </button>
            </div>

            {/* ✅ Display Results (Properly Centered & Translated) */}
            <div className={`mt-4 text-lg font-semibold text-black ${translations[language].textAlign}`}>
                {apiConvertedDate && <p>{apiConvertedDate}</p>}
            </div>
        </div>
    );
};

export default HijriGregBtn;
