import { CommonActions } from "@react-navigation/native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Header, Icon, MainButton } from "@/components";
import { useAppNavigation } from "@/hooks";
import { useReportStore } from "@/stores";
import { cn } from "@/utils";

export const Preview = () => {
  const { navigate, goBack, dispatch } = useAppNavigation();
  const { imageAnswer, setReportStore } = useReportStore();
  const [isRotating, setIsRotating] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState(
    imageAnswer?.uri || ""
  );

  const screenDimensions = useMemo(() => {
    const { width, height } = Dimensions.get("window");
    const captureAreaHeight = height * 0.65;
    return {
      width,
      height: captureAreaHeight,
    };
  }, []);

  const imageStyle = useMemo(() => {
    if (!imageAnswer?.orientation) {
      return {
        width: screenDimensions.width - 32,
        height: screenDimensions.height,
      };
    }

    const { orientation } = imageAnswer;
    let rotation = 0;

    switch (orientation) {
      case "portrait":
        rotation = 0;
        break;
      case "portrait-upside-down":
        rotation = 180; // 180° rotation
        break;
      case "landscape-left":
        rotation = 90;
        break;
      case "landscape-right":
        rotation = -90;
        break;
      default:
        rotation = 0;
    }

    return {
      width: screenDimensions.width - 32,
      height: screenDimensions.height,
      transform: [{ rotate: `${rotation}deg` }],
    };
  }, [imageAnswer, screenDimensions]);

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

  if (!imageAnswer) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center px-4 gap-2">
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
      <View className="px-4">
        <Header renderSettings={false} />
      </View>

      <View className="flex-row justify-between items-center py-4 px-4">
        <TouchableOpacity
          onPress={rotateLeft}
          disabled={isRotating}
          className={cn(
            "p-4 rounded-full",
            isRotating ? "bg-white/10" : "bg-white/20"
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
            isRotating ? "bg-white/10" : "bg-white/20"
          )}
        >
          <Icon
            name="CornerUpRight"
            size={24}
            color={isRotating ? "gray" : "white"}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center px-4">
        <View
          style={{
            width: screenDimensions.width - 32,
            height: screenDimensions.height,
            borderRadius: 8,
            overflow: "hidden",
          }}
          className="justify-center items-center"
        >
          <Image
            source={{ uri: currentImageUri }}
            style={imageStyle}
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="flex-row gap-4 px-4 pb-10 mt-5">
        <View className="flex-1">
          <MainButton
            title="Tirar outra"
            onPress={() => {
              setReportStore({ imageAnswer: null, imageSource: null });
              goBack();
            }}
            variant="error"
          />
        </View>
        <View className="flex-1">
          <MainButton
            title="Ficou boa"
            onPress={() => {
              dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: "ReportQuestions" },
                    { name: "ReportOptions" },
                  ],
                })
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
