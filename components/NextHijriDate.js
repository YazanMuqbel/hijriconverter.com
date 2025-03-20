"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// List of Islamic occasions with Hijri dates
const islamicOccasions = [
    { name_en: "Islamic New Year", name_ar: "رأس السنة الهجرية", hijri: "1-1" },
    { name_en: "Ashura", name_ar: "عاشوراء", hijri: "10-1" },
    { name_en: "Prophet's Birthday", name_ar: "المولد النبوي", hijri: "12-3" },
    { name_en: "Start of Ramadan", name_ar: "بداية رمضان", hijri: "1-9" },
    { name_en: "Eid al-Fitr", name_ar: "عيد الفطر", hijri: "1-10" },
    { name_en: "Day of Arafah", name_ar: "يوم عرفة", hijri: "9-12" },
    { name_en: "Eid al-Adha", name_ar: "عيد الأضحى", hijri: "10-12" },
];

const NextHijriDate = () => {
    const pathname = usePathname(); // Detect language mode
    const language = pathname === "/arabic" ? "ar" : "en"; // Determine language dynamically

    const [upcomingDates, setUpcomingDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHijriDate() {
            try {
                console.log("Fetching today's Hijri date...");

                // ✅ FIXED: Correctly format the date as DD-MM-YYYY
                const today = new Date();
                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                const todayResponse = await fetch(`https://api.aladhan.com/v1/gToH?date=${formattedDate}`);
                const todayData = await todayResponse.json();
                console.log("Today's Hijri Date API Response:", todayData);

                if (!todayData.data || !todayData.data.hijri) {
                    console.error("Hijri date not found in response!");
                    return;
                }

                const todayHijri = todayData.data.hijri.day;
                const todayHijriMonth = todayData.data.hijri.month.number;
                const todayHijriYear = todayData.data.hijri.year;

                console.log(`Current Hijri Date: ${todayHijri}-${todayHijriMonth}-${todayHijriYear}`);

                // ✅ FIXED: Ensure correct Hijri date formatting for API requests
                const upcoming = islamicOccasions
                    .map(event => {
                        const [day, month] = event.hijri.split("-").map(Number);
                        const hijriDate = `${day}-${month}-${todayHijriYear}`;
                        return { ...event, hijriDate, hijriDay: day, hijriMonth: month };
                    })
                    .filter(event => event.hijriMonth > todayHijriMonth || (event.hijriMonth === todayHijriMonth && event.hijriDay >= todayHijri))
                    .sort((a, b) => (a.hijriMonth - b.hijriMonth) || (a.hijriDay - b.hijriDay))
                    .slice(0, 2);

                console.log("Upcoming Islamic Occasions:", upcoming);

                // ✅ Fetch corresponding Gregorian dates using fixed formatting
                const gregorianDates = await Promise.all(
                    upcoming.map(async event => {
                        console.log(`Fetching Gregorian date for: ${event.hijriDate}`);
                        const response = await fetch(`https://api.aladhan.com/v1/hToG?date=${event.hijriDate}`);
                        const data = await response.json();
                        console.log(`API Response for ${event.hijriDate}:`, data);

                        if (data?.data?.gregorian) {
                            return {
                                ...event,
                                gregorian: `${data.data.gregorian.day} ${data.data.gregorian.month.en} ${data.data.gregorian.year}`,
                            };
                        }
                        return event;
                    })
                );

                console.log("Final Upcoming Dates with Gregorian Equivalents:", gregorianDates);
                setUpcomingDates(gregorianDates);
            } catch (error) {
                console.error("Error fetching Hijri dates:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchHijriDate();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-4 rounded-lg">
            <h2 className="text-lg font-bold text-black mb-3">
                {language === "en" ? "Upcoming Islamic Occasions" : "المناسبات الإسلامية القادمة"}
            </h2>

            {loading ? (
                <p className="text-gray-500">{language === "en" ? "Loading..." : "جار التحميل..."}</p>
            ) : (
                <div className="w-full">
                    {upcomingDates.length === 0 ? (
                        <p className="text-gray-500">{language === "en" ? "No data available." : "لا توجد بيانات متاحة."}</p>
                    ) : (
                        upcomingDates.map((event, index) => (
                            <div key={index} className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3 mb-2">
                                <h3 className="text-md font-semibold text-green-700">
                                    {language === "en" ? event.name_en : event.name_ar}
                                </h3>
                                <p className="text-gray-800">
                                    {language === "en"
                                        ? `Hijri: ${event.hijriDate} AH`
                                        : `هجري: ${event.hijriDate} هـ`}
                                </p>
                                <p className="text-gray-600">
                                    {language === "en"
                                        ? `Gregorian: ${event.gregorian || "Loading..." }`
                                        : `ميلادي: ${event.gregorian || "جاري التحميل..."}`}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NextHijriDate;
