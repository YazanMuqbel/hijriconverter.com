import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";  // ✅ Import Vercel Analytics

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hijri Islamic Calendar",
  description: "Hijri to Gregorian Conversion Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />  {/* ✅ Add Vercel Analytics Here */}
      </body>
    </html>
  );
}
