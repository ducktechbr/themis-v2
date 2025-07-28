import { TouchableOpacity, Text } from "react-native";
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
  onPress?: () => void;
};

export const MainButton = ({
  title,
  loading,
  disabled,
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

  return (
    <TouchableOpacity
      className={cn(
        "bg-success justify-center items-center h-14 rounded-lg",
        disabled ? "bg-neutral-500" : ""
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
        <Text
          className={cn(
            "text-white font-bold text-xl",
            disabled ? "text-neutral-400" : ""
          )}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
