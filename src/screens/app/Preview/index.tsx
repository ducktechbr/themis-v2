import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Icon, MainButton } from "@/components";
import { useAppNavigation } from "@/hooks";
import { useReportStore } from "@/stores";

export const Preview = () => {
  const { navigate, goBack } = useAppNavigation();
  const { imageAnswer, setReportStore } = useReportStore();
  const [isRotating, setIsRotating] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState(
    imageAnswer?.uri || ""
  );

  const rotateLeft = async () => {
    if (!imageAnswer || isRotating) return;

    setIsRotating(true);
    try {
      const manipulatedImage = await manipulateAsync(
        currentImageUri,
        [{ rotate: -90 }],
        { compress: 0.8, format: SaveFormat.JPEG }
      );

      setCurrentImageUri(manipulatedImage.uri);

      const updatedImage = {
        ...imageAnswer,
        uri: manipulatedImage.uri,
        width: manipulatedImage.width,
        height: manipulatedImage.height,
      };
      setReportStore({ imageAnswer: updatedImage });
    } catch (error) {
      console.error("Error rotating image:", error);
    } finally {
      setIsRotating(false);
    }
  };

  const rotateRight = async () => {
    if (!imageAnswer || isRotating) return;

    setIsRotating(true);
    try {
      const manipulatedImage = await manipulateAsync(
        currentImageUri,
        [{ rotate: 90 }],
        { compress: 0.8, format: SaveFormat.JPEG }
      );

      setCurrentImageUri(manipulatedImage.uri);

      const updatedImage = {
        ...imageAnswer,
        uri: manipulatedImage.uri,
        width: manipulatedImage.width,
        height: manipulatedImage.height,
      };
      setReportStore({ imageAnswer: updatedImage });
    } catch (error) {
      console.error("Error rotating image:", error);
    } finally {
      setIsRotating(false);
    }
  };

  const handleTakeAnother = () => {
    setReportStore({ imageAnswer: null, imageSource: null });
    goBack();
  };

  const handleKeepPhoto = () => {
    navigate("ReportOptions");
  };

  if (!imageAnswer) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg font-bold">
            Nenhuma imagem encontrada
          </Text>
          <MainButton title="Voltar" onPress={() => navigate("Camera")} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={goBack}>
          <Icon name="ArrowLeft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Preview</Text>
        <View className="w-6" />
      </View>

      <View className="flex-row justify-between items-center py-4 px-4">
        <TouchableOpacity
          onPress={rotateLeft}
          disabled={isRotating}
          className={`p-4 rounded-full ${
            isRotating ? "bg-white/10" : "bg-white/20"
          }`}
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
          className={`p-4 rounded-full ${
            isRotating ? "bg-white/10" : "bg-white/20"
          }`}
        >
          <Icon
            name="CornerUpRight"
            size={24}
            color={isRotating ? "gray" : "white"}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <Image
          source={{ uri: currentImageUri }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row gap-4 px-4 pb-10">
        <View className="flex-1">
          <MainButton
            title="Tirar outra"
            onPress={handleTakeAnother}
            variant="error"
          />
        </View>
        <View className="flex-1">
          <MainButton title="Ficou boa" onPress={handleKeepPhoto} />
        </View>
      </View>
    </SafeAreaView>
  );
};
