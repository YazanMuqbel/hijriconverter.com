// utils/ummalqura.js - Hijri to Gregorian conversion based on Umm al-Qura
const ummAlQuraDates = [
    [1446, 1, 1, 2024, 7, 7],  // Example Mapping: 1 Muharram 1446 → 7 July 2024
    [1446, 2, 1, 2024, 8, 5],
    [1446, 3, 1, 2024, 9, 3],
    [1446, 4, 1, 2024, 10, 2],
    [1446, 5, 1, 2024, 11, 1],
    [1446, 6, 1, 2024, 11, 30],
    [1446, 7, 1, 2025, 1, 29],
    [1446, 8, 1, 2025, 2, 28],
    [1446, 9, 1, 2025, 3, 30],
    [1446, 10, 1, 2025, 4, 28],
    [1446, 11, 1, 2025, 5, 27],
    [1446, 12, 1, 2025, 6, 26]
];

export const hijriToGregorian = (hijriYear, hijriMonth, hijriDay) => {
    for (let i = 0; i < ummAlQuraDates.length; i++) {
        const [hYear, hMonth, hDay, gYear, gMonth, gDay] = ummAlQuraDates[i];

        if (hijriYear === hYear && hijriMonth === hMonth) {
            const gregorianDate = new Date(gYear, gMonth - 1, gDay + (hijriDay - 1));
            return new Intl.DateTimeFormat("en-TN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(gregorianDate);
        }
    }

    return "Conversion not found for this date.";
};
