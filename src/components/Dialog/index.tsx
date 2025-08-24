import React from "react";
import { View, Text, TouchableOpacity, Modal as RNModal } from "react-native";
import { cn } from "@/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <TouchableOpacity
        className="w-full h-full"
        onPress={() => onOpenChange(false)}
        activeOpacity={1}
      >
        <View className="flex flex-1 justify-center items-center bg-black/75">
          <TouchableOpacity
            className="bg-white rounded-lg p-6 shadow-lg w-[90%]"
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {children}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  asChild,
}) => {
  return <>{children}</>;
};

export const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className,
}) => {
  return <View className={cn("flex gap-4", className)}>{children}</View>;
};
