import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import checklist from "@/assets/animations/chcklist.json";
import { useAuthStore } from "@/stores";

export default function Routes() {
  const { isAuthenticated, loading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (loading) {
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
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
