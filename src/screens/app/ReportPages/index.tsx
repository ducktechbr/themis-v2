import { ActivityIndicator, Text, View } from "react-native";

import { ReportPagesList } from "./ReportPagesList";
import useViewModel from "./useViewModel";

import { AppContainer, MainButton } from "@/components";

export const ReportPages = () => {
  const {
    reportPages,
    isPending,
    error,
    isLoading,
    hasPermission,
    hasCoordinates,
    coordinatesError,
    retryLocation,
    checkLocationPermission,
  } = useViewModel();

  if (isPending || isLoading) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-lg">Carregando seções...</Text>
        </View>
      </AppContainer>
    );
  }

  if (coordinatesError && !hasPermission) {
    return (
      <AppContainer>
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center">
            <Text className="text-xl font-semibold text-white mb-4">
              Acesso à Localização Necessário
            </Text>
            <Text className="text-base text-dark text-center mb-6 leading-6">
              Para continuar, precisamos do acesso à sua localização. Esta
              informação é necessária para o funcionamento do aplicativo.
            </Text>
          </View>
          <View className="w-full gap-3">
            <MainButton
              title="Permitir Localização"
              onPress={() => {
                console.log("Botão de retry pressionado");
                retryLocation();
              }}
            />
            <MainButton
              title="Verificar Configurações"
              onPress={() => {
                console.log("Verificando configurações");
                checkLocationPermission();
              }}
            />
          </View>
        </View>
      </AppContainer>
    );
  }

  if (error || (coordinatesError && hasPermission)) {
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

  if (!reportPages || !hasCoordinates) {
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
