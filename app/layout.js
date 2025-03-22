import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";  // ✅ Import Vercel Analytics

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hijri Converter | Islamic Calendar & Date Conversion",
  description:
    "Convert dates between Hijri and Gregorian calendars using the most accurate Islamic calendar converter based on Makkah time.",
  openGraph: {
    title: "Hijri Converter | Islamic Calendar & Date Conversion",
    description:
      "Convert dates between Hijri and Gregorian calendars with accuracy. Powered by the Umm al-Qura calendar.",
    url: "https://hijriconverter.com",
    siteName: "Hijri Converter",
    type: "website",
    images: [
      {
        url: "https://hijriconverter.com/kaabah.png", // Change this to your real image URL
        width: 1200,
        height: 630,
        alt: "Hijri Converter - Convert Hijri and Gregorian Dates",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google verification tag here */}
        <meta name="google-site-verification" content="sTltP8i6mN_Tp2Yl46U_iub-cWD8cApOoakNho0ocyE" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />  {/* ✅ Add Vercel Analytics Here */}
      </body>
    </html>
  );
}
