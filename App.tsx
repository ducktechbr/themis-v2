import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "@expo-google-fonts/poppins";
import { poppins } from "@/constants";
import Routes from "@/router";
import "./global.css";
import { ToastProvider } from "@/components";

export default function App() {
  useFonts(poppins);
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ToastProvider position="top">
          <NavigationContainer>
            <StatusBar style="auto" />
            <Routes />
          </NavigationContainer>
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
