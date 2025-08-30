import { ComponentPropsWithoutRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { cn } from "@/utils";

interface CheckboxProps extends ComponentPropsWithoutRef<typeof View> {
  label?: string;
  labelClasses?: string;
  checkboxClasses?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  iconColor?: string;
  iconSize?: number;
  checkedBorderColor?: string;
}

function Checkbox({
  label,
  labelClasses,
  checkboxClasses,
  className,
  checked = false,
  onCheckedChange,
  iconColor = "#000000",
  iconSize = 12,
  checkedBorderColor,
  ...props
}: CheckboxProps) {
  const toggleCheckbox = () => {
    onCheckedChange?.(!checked);
  };

  return (
    <View
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    >
      <TouchableOpacity onPress={toggleCheckbox}>
        <View
          className={cn(
            "w-4 h-4 border border-gray-700 rounded bg-background flex justify-center items-center",
            checked && "bg-foreground",
            checkboxClasses
          )}
          style={
            checked && checkedBorderColor
              ? { borderColor: checkedBorderColor }
              : undefined
          }
        >
          {checked && (
            <Text
              className="text-xs"
              style={{
                color: iconColor,
                fontSize: iconSize,
                fontWeight: "bold",
              }}
            >
              ✓
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn("text-primary", labelClasses)}>{label}</Text>
      )}
    </View>
  );
}

export { Checkbox };
