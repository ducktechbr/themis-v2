import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

type AppContainerProps = {
  children: ReactNode;
};

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 px-4">{children}</View>
    </SafeAreaView>
  );
};
