import { useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ToastProvider } from "@/components";
import { poppins } from "@/constants";
import Routes from "@/router";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(poppins);
  const queryClient = new QueryClient();

  if (fontsLoaded) {
    SplashScreen.hide();
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="light" />
          <ToastProvider position="bottom">
            <Routes />
          </ToastProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
