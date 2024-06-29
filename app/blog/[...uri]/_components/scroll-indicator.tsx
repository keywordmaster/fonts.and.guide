"use client";

import { useEffect, useState } from "react";

function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [asideWidth, setAsideWidth] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    const aside = document.querySelector("aside");

    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
    if (aside) {
      setAsideWidth(aside.offsetWidth);
    }

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    const updateDimensions = () => {
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
      if (aside) {
        setAsideWidth(aside.offsetWidth);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: `${headerHeight}px`,
        left: `${asideWidth}px`,
        width: `calc(${scrollProgress * 100}% - ${asideWidth}px)`,
        height: "4px",
        backgroundColor: "#41ce98",
        zIndex: 1000,
      }}
    />
  );
}

export default ScrollIndicator;
