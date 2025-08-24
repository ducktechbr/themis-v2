import { Text, View, ActivityIndicator } from "react-native";
import { AppContainer } from "@/components";
import useViewModel from "./useViewModel";
import { OptionsList } from "./OptionsList";

export const QuestionOptions = () => {
  const { questionOptions, isPending, error } = useViewModel();

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
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">
          {questionOptions?.question_title}
        </Text>

        {questionOptions && <OptionsList questionOptions={questionOptions} />}
      </View>
    </AppContainer>
  );
};
