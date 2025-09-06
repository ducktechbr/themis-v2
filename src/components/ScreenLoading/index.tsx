import LottieView from "lottie-react-native";
import { View } from "react-native";

import checklist from "@/assets/animations/chcklist.json";

export const ScreenLoading = () => {
  return (
    <View className="flex-1 bg-primary">
      <LottieView
        source={checklist}
        style={{ flex: 1 }}
        autoPlay
        loop={false}
      />
    </View>
  );
};
