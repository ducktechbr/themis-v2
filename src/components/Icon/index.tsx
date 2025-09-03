import * as Icons from "lucide-react-native";
import React from "react";

export type IconName = keyof typeof Icons;

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  ...rest
}) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) {
    console.warn(`Ícone "${name}" não encontrado em lucide.`);
    return null;
  }

  const IconComponent = LucideIcon as React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    [key: string]: unknown;
  }>;

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...rest}
    />
  );
};
