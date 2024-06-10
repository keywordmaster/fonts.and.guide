import Link from "next/link";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MenuItem as WpMenuItem } from "@/gql/graphql";
import { cn } from "@/lib/utils";

interface Props {
  menu: Partial<WpMenuItem>;
  isCurrent?: boolean;
}

const MenuItem: React.FC<Props> = ({ menu, isCurrent }) => {
  const iconName = menu.title?.charAt(0).toUpperCase() + menu.title?.slice(1);
  const MenuIcon = Icon[iconName] || Icon.MessageCircleDashedIcon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={menu.uri || "/"} prefetch>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-lg hover:bg-primary hover:text-primary-foreground",
              isCurrent && "bg-primary text-primary-foreground",
            )}
            aria-label={menu.label || "레이블"}
          >
            <MenuIcon className="size-6" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {menu.label || "레이블"}
      </TooltipContent>
    </Tooltip>
  );
};

export default MenuItem;
