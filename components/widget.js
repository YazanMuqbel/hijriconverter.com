"use client";

import React, { useEffect, useState } from "react";

export default function Widget() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
      <iframe
  src="https://datafa.st/widgets/67db34a4e998975001d0596a/recent?mainTextSize=16&primaryColor=%23e78468&theme=light"
  style={{
    background: "transparent",
    border: "none",
    width: "100%",
    height: "400px"
  }}
  allowTransparency="true"
  title="DataFast Widget"
  loading="lazy"
/>
  ) : null;
}
