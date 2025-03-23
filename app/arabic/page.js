// app/arabic/page.js
import Home from "../page"; // Reuse the English component with Arabic content

export const metadata = {
  title: "محول التاريخ الهجري | تحويل بين الهجري والميلادي",
  description: "حوّل التاريخ بسهولة بين الهجري والميلادي باستخدام تقويم مكة المكرمة.",
  openGraph: {
    title: "محول التاريخ الهجري | تحويل بين الهجري والميلادي",
    description: "تحويل دقيق للتواريخ الهجرية والميلادية اعتمادًا على تقويم أم القرى.",
    url: "https://hijriconverter.com/arabic",
    siteName: "Hijri Converter",
    images: [
      {
        url: "https://hijriconverter.com/hijri-preview.jpg",
        width: 1200,
        height: 630,
        alt: "معاينة موقع محول التاريخ الهجري",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
};

// ✅ This must return something
export default function ArabicPage() {
  return <Home />;
}
