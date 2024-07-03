"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const path = usePathname()
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 justify-between">
      <div className="flex flex-col">
        {path === "/" &&
          <h1 className="text-xl font-semibold" dangerouslySetInnerHTML={{ __html: title }}></h1>
        }
        {path !== "/" &&
          <Link
            href="/"
            prefetch
            className="text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Link>
        }
      </div>
    </header>
  );
};

export default Header;
