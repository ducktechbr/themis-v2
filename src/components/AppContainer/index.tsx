import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "../Header";

type AppContainerProps = {
  children: ReactNode;
};

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 px-4">
        <Header />
        {children}
      </View>
    </SafeAreaView>
  );
};
