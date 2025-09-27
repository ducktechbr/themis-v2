import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header, Icon, MainButton } from "@/components";
import { useAppNavigation, useRouteParams } from "@/hooks";
import { useReportStore } from "@/stores";
import { cn } from "@/utils";

export const Preview = () => {
  const { goBack } = useAppNavigation();
  const { imageAnswer, setReportStore, previewImageUri } = useReportStore();
  const params = useRouteParams<"Preview">();
  const viewOnly = params?.viewOnly;

  const [isRotating, setIsRotating] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState(
    viewOnly ? previewImageUri : imageAnswer?.uri || "",
  );

  useEffect(() => {
    return () => {
      if (viewOnly) {
        setReportStore({ previewImageUri: null });
      }
    };
  }, [viewOnly, setReportStore]);

  const screenDimensions = useMemo(() => {
    const { width, height } = Dimensions.get("window");
    const captureAreaHeight = height * 0.65;
    return {
      width,
      height: captureAreaHeight,
    };
  }, []);

  const imageStyle = useMemo(() => {
    return {
      width: screenDimensions.width - 32,
      height: screenDimensions.height,
    };
  }, [screenDimensions]);

  const rotateLeft = async () => {
    if (!currentImageUri || isRotating) return;

    setIsRotating(true);
    try {
      const manipulatedImage = await manipulateAsync(
        currentImageUri,
        [{ rotate: -90 }],
        { compress: 0.8, format: SaveFormat.JPEG },
      );

      setCurrentImageUri(manipulatedImage.uri);

      if (imageAnswer) {
        const updatedImage = {
          ...imageAnswer,
          uri: manipulatedImage.uri,
          width: manipulatedImage.width,
          height: manipulatedImage.height,
        };
        setReportStore({ imageAnswer: updatedImage });
      }
    } catch (error) {
      console.error("Error rotating image:", error);
    } finally {
      setIsRotating(false);
    }
  };

  const rotateRight = async () => {
    if (!currentImageUri || isRotating) return;

    setIsRotating(true);
    try {
      const manipulatedImage = await manipulateAsync(
        currentImageUri,
        [{ rotate: 90 }],
        { compress: 0.8, format: SaveFormat.JPEG },
      );

      setCurrentImageUri(manipulatedImage.uri);

      if (imageAnswer) {
        const updatedImage = {
          ...imageAnswer,
          uri: manipulatedImage.uri,
          width: manipulatedImage.width,
          height: manipulatedImage.height,
        };
        setReportStore({ imageAnswer: updatedImage });
      }
    } catch (error) {
      console.error("Error rotating image:", error);
    } finally {
      setIsRotating(false);
    }
  };

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
        />
      </View>

      {!viewOnly && (
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
              variant="success"
              onPress={() => {
                goBack();
                goBack();
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
