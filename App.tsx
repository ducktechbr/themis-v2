import Routes from "@/router";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { useLoadFont } from "@/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const isLoadFont = useLoadFont();
  const queryClient = new QueryClient();

  if (!isLoadFont) {
    return;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Routes />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
