import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { memo } from "react";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
  className?: string;
}

const Icon = memo(function Icon({ name, ...props }: IconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name], {});

  return <LucideIcon {...props} />;
});

export default Icon;

export const isIconName = (
  name: string,
): name is keyof typeof dynamicIconImports => {
  return dynamicIconImports[name] !== undefined;
};
