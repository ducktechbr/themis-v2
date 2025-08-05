import { AppContainer } from "@/components";
import { View, Text, ActivityIndicator } from "react-native";
import { Sections } from "./Sections";

import useViewModel from "./useViewModel";

export const DocumentPages = () => {
  const { documentId, data, isPending, error } = useViewModel();

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

  if (!data) {
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
        <Text className="text-2xl font-bold text-center mb-4">
          Documento #{documentId}
        </Text>
        <Sections reportData={data} />
      </View>
    </AppContainer>
  );
};
