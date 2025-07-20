import React from "react";
import * as Icons from "lucide-react-native";

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

 const IconComponent = LucideIcon as React.ComponentType<any>;

 return (
  <IconComponent
   size={size}
   color={color}
   strokeWidth={strokeWidth}
   {...rest}
  />
 );
};
