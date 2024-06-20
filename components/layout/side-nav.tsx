"use client";

import { usePathname } from "next/navigation";

import Logo from "@/components/logo";
import MenuItem from "@/components/menu-item";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuItem as WpMenuItem } from "@/gql/graphql";

interface Props {
  menus: Partial<WpMenuItem>[];
}

const SideNav: React.FC<Props> = ({ menus }) => {
  const path = usePathname();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <Logo />
      <nav className="grid gap-1 p-2">
        {menus.map((menu) => (
          // FIX: 현재는 부모-자식 관계 없이 1뎁스 메뉴만 isCurrent: true로 표시 가능
          <MenuItem key={menu.id} isCurrent={path === menu.uri} menu={menu} />
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <ModeToggle />
      </nav>
    </aside>
  );
};

export default SideNav;
