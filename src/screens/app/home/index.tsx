import { Text, View } from "react-native";
import { useAuthStore } from "@/stores";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <View className="bg-black justify-center items-center flex-1">
      <Text className="text-white">{user.name}</Text>
    </View>
  );
}
