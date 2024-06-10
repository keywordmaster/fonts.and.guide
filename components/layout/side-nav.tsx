"use client";

import { usePathname } from "next/navigation";

import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import MenuItem from "@/components/menu-item";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        {/* 
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="mt-auto rounded-lg"
							aria-label="Help"
						>
							<Icon.LifeBuoy className="size-6" />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={5}>
						Help
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="mt-auto rounded-lg"
							aria-label="Account"
						>
							<Icon.SquareUser className="size-6" />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={5}>
						Account
					</TooltipContent>
				</Tooltip> */}
      </nav>
    </aside>
  );
};

export default SideNav;
