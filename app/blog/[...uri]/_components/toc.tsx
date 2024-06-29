"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function ToC() {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headings = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TOCItem[] = Array.from(headings).map((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      return {
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      };
    });

    setToc(tocItems);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.clientHeight : 0;
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const scrollIndicatorHeight = scrollIndicator
        ? scrollIndicator.clientHeight
        : 0;
      const offset = headerHeight + scrollIndicatorHeight + 20; //
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="toc">
      <h2>목차</h2>
      <ul>
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 20}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ToC;
