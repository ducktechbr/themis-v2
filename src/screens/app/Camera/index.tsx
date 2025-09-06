import { CameraView } from "expo-camera";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import useViewModel from "./useViewModel";

import { Icon, MainButton } from "@/components";
import { cn } from "@/utils";

export const Camera = () => {
  const {
    hasPermission,
    requestPermission,
    cameraRef,
    isCapturing,
    orientation,
    capturePhoto,
  } = useViewModel();

  if (!hasPermission) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-white text-lg font-bold mb-5 px-4">
            Para anexar uma imagem precisamos de acesso à sua câmera.
          </Text>
          <View className="w-full px-4">
            <MainButton
              onPress={requestPermission}
              title="Permitir acesso à câmera"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1">
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <View className="absolute inset-0">
        <View className="flex-1 bg-black/50" />
        <View className="h-[65%]">
          <View className="absolute top-4 right-4 bg-black/60 px-3 py-2 rounded-lg flex-row items-center">
            <Icon
              name={
                orientation === "portrait" ? "Smartphone" : "TabletSmartphone"
              }
              size={16}
              color="white"
            />
            <Text className="text-white text-xs font-medium ml-2 capitalize">
              {orientation === "portrait" ? "Retrato" : "Paisagem"}
            </Text>
          </View>

          <View className="absolute bottom-8 left-0 right-0 items-center">
            <Text className="text-white text-center text-sm font-medium bg-black/30 px-4 py-2 rounded-lg">
              Posicione o item dentro da área
            </Text>
          </View>
        </View>
        <View className="flex-1 bg-black/50" />
      </View>

      <View className="absolute bottom-0 left-0 right-0 items-center justify-center pb-8">
        <TouchableOpacity
          className="w-20 h-20 border-2 border-white rounded-full items-center justify-center"
          onPress={capturePhoto}
          disabled={isCapturing}
        >
          <View
            className={`w-10 h-10 rounded-full ${
              isCapturing ? "bg-gray-400" : "bg-primary"
            }`}
          />
        </TouchableOpacity>

        <Text
          className={cn(
            "text-white text-sm mt-2 text-center flex-1",
            !isCapturing ? "opacity-0" : "opacity-100"
          )}
        >
          Capturando...
        </Text>
      </View>
    </View>
  );
};
