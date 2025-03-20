import React from "react";

const translations = {
  en: {
    title: "Islamic Hijri Converter",
    description: "This is the English version of the site.",
  },
  ar: {
    title: "التقويم الهجري!",
    description: "هذا هو الإصدار العربي من الموقع.",
  },
};

const Home = ({ lang }) => {
  return (
    <div className={`p-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold">{translations[lang].title}</h1>
      <p className="mt-2">{translations[lang].description}</p>
    </div>
  );
};

export default Home;
