import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useViewModel from "./useViewModel";

import { Header, Icon, MainButton } from "@/components";
import { cn } from "@/utils";

export const Preview = () => {
  const {
    viewOnly,
    currentImageUri,
    isRotating,
    imageStyle,
    imageSource,
    rotateLeft,
    rotateRight,
    handleChooseAnother,
    handleConfirmImage,
    goBack,
  } = useViewModel();

  if (!currentImageUri) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center px-4 gap-2">
          <Text className="text-white text-lg font-bold">
            Nenhuma imagem encontrada
          </Text>
          <MainButton title="Voltar" onPress={goBack} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4">
        <Header renderSettings={false} darkBackground={true} />
      </View>

      {!viewOnly && (
        <View className="flex-row justify-between items-center py-4 px-4 mb-5">
          <TouchableOpacity
            onPress={rotateLeft}
            disabled={isRotating}
            className={cn(
              "p-4 rounded-full",
              isRotating ? "bg-white/10" : "bg-white/20",
            )}
          >
            <Icon
              name="CornerUpLeft"
              size={24}
              color={isRotating ? "gray" : "white"}
            />
          </TouchableOpacity>

          <Text className="text-white text-lg font-semibold">
            {isRotating ? "Rotacionando imagem..." : "Rotacionar"}
          </Text>

          <TouchableOpacity
            onPress={rotateRight}
            disabled={isRotating}
            className={cn(
              "p-4 rounded-full",
              isRotating ? "bg-white/10" : "bg-white/20",
            )}
          >
            <Icon
              name="CornerUpRight"
              size={24}
              color={isRotating ? "gray" : "white"}
            />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-1 justify-center items-center">
        <Image
          source={{ uri: currentImageUri }}
          style={imageStyle}
          resizeMode="cover"
          className="py-4"
        />
      </View>

      {!viewOnly && (
        <View className="flex-row gap-4 px-4 pb-10 mt-5">
          <View className="flex-1">
            <MainButton
              title={
                imageSource === "gallery" ? "Escolher outra" : "Tirar outra"
              }
              onPress={handleChooseAnother}
              variant="error"
            />
          </View>
          <View className="flex-1">
            <MainButton
              title="Ficou boa"
              variant="success"
              onPress={handleConfirmImage}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
