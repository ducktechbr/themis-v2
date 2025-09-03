import { View, Text, ActivityIndicator } from "react-native";

import { ReportPagesList } from "./ReportPagesList";
import useViewModel from "./useViewModel";

import { AppContainer } from "@/components";

export const ReportPages = () => {
  const { reportPages, isPending, error } = useViewModel();

  if (isPending) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-lg">Carregando seções...</Text>
        </View>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-red-600">Erro ao carregar dados</Text>
          <Text className="text-sm text-gray-600 mt-2">
            Tente novamente mais tarde
          </Text>
        </View>
      </AppContainer>
    );
  }

  if (!reportPages) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Nenhum dado encontrado</Text>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <View className="flex-1">
        <ReportPagesList reportPages={reportPages} />
      </View>
    </AppContainer>
  );
};
