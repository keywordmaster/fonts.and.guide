import Link from "next/link";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

const Logo: React.FC = () => {
  // Implement your component logic here

  return (
    <div className="border-b p-2">
      <Link href="/" prefetch>
        <Button variant="outline" size="icon" aria-label="Home">
          <Icon.Triangle className="size-5 fill-foreground" />
        </Button>
      </Link>
    </div>
  );
};

export default Logo;
