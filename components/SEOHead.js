import Head from "next/head";
import Script from "next/script";  // ✅ Import Next.js Script

const SEOHead = ({ title, description, url, image }) => {
  return (
    <>
      <Head>

        {/* ✅ Primary Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Hijri Converter" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ✅ Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />

        {/* ✅ Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href={url} />

        {/* ✅ Favicon Links (Stored in `public/`) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* ✅ DataFast Analytics & Tracking (Corrected) */}
      <Script
        strategy="afterInteractive"  // ✅ Loads after page render
        data-website-id="67db34a4e998975001d0596a"
        data-domain="hijriconverter.com"
        src="https://datafa.st/js/script.js"
      />
    </>
  );
};

export default SEOHead;
