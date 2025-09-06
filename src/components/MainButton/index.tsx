import { Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/utils";

type MainButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: "default" | "success" | "error" | "dark";
  onPress?: () => void;
};

export const MainButton = ({
  title,
  loading,
  disabled,
  variant = "default",
  onPress,
}: MainButtonProps) => {
  const spinValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${spinValue.value}deg`,
      },
    ],
  }));

  if (loading) {
    spinValue.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
  }

  const getButtonStyle = () => {
    if (disabled) return "bg-neutral-500";

    switch (variant) {
      case "success":
        return "bg-success";
      case "error":
        return "bg-red-500";
      case "dark":
        return "bg-dark";
      default:
        return "bg-success";
    }
  };

  const getTextStyle = () => {
    if (disabled) return "text-neutral-400";

    switch (variant) {
      case "success":
        return "text-white";
      case "error":
        return "text-white";
      case "dark":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <TouchableOpacity
      className={cn(
        "justify-center items-center h-14 rounded-lg w-full",
        getButtonStyle()
      )}
      onPress={onPress}
      disabled={disabled}
    >
      {loading && (
        <Animated.View
          className="w-6 h-6 border-[2.5px] border-neutral-600 border-t-primary rounded-full"
          style={animatedStyle}
        />
      )}
      {!loading && (
        <Text className={cn("font-bold text-xl", getTextStyle())}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
