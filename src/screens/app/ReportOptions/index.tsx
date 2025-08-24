import { Text, View, ActivityIndicator } from "react-native";
import { AppContainer } from "@/components";
import useViewModel from "./useViewModel";
import { OptionsList } from "./OptionsList";

export const ReportOptions = () => {
  const { options, isPending, error } = useViewModel();

  if (isPending) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">Erro ao carregar opções</Text>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <View className="p-4 flex-1">
        <Text className="text-xl font-bold mb-4">
          {options?.question_title}
        </Text>

        {options && <OptionsList options={options.options} />}
      </View>
    </AppContainer>
  );
};
