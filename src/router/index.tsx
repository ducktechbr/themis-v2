import { useAuthStore } from "@/stores";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import LottieView from "lottie-react-native";
import checklist from "@/assets/animations/chcklist.json";
import { View } from "react-native";

export default function Routes() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <View className="flex-1 bg-red-500">
        <LottieView source={checklist} />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
