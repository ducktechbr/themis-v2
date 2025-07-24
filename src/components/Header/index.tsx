import { View, Text } from "react-native";
import { Icon } from "../Icon";
import { useAuthStore } from "@/stores";
import { greetings } from "@/utils";

export const Header = () => {
  const { user } = useAuthStore();
  const hello = greetings();
  return (
    <View className="flex-row items-center ">
      <View>
        <Text className="text-white text-lg">{hello},</Text>
        <Text className="font-bold text-white text-xl">{user.name}</Text>
      </View>
    </View>
  );
};
