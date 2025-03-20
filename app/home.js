import React from "react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    title: "Hijri Date Converter",
    description: "Convert from Hijri to Gregorian",
  },
  ar: {
    title: "مرحبا!",
    description: "التحويل من هجري إلى ميلادي",
  },
};

const Home = () => {
  const router = useRouter();
  const isArabic = router.pathname === "/arabic";
  const lang = isArabic ? "ar" : "en";

  return (
    <div className={`p-6 ${isArabic ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold">{translations[lang].title}</h1>
      <p className="mt-2">{translations[lang].description}</p>
    </div>
  );
};

export default Home;
