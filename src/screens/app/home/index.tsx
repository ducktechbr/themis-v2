import { Text, View } from "react-native";
import { useAuthStore } from "@/stores";

import useViewModel from "./useViewModel";

export default function Home() {
  const { user } = useAuthStore();
  const { data } = useViewModel();

  return (
    <View className="bg-black justify-center items-center flex-1">
      <Text className="text-white">
        {data?.map((item, index) => (
          <Text key={index}>{item.id_service_order}</Text>
        ))}
      </Text>
    </View>
  );
}
