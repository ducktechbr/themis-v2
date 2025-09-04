import { useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ToastProvider } from "@/components";
import { poppins } from "@/constants";
import Routes from "@/router";
import "./global.css";

export default function App() {
  useFonts(poppins);
  const queryClient = new QueryClient();

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
