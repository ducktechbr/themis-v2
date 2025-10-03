import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Icon, LoadingSpinner } from "@/components";
import { useAppNavigation } from "@/hooks";
import { useReportStore } from "@/stores";
import { cn, pickImageFromLibrary } from "@/utils";

type ImageInputProps = {
  onClose: () => void;
  label?: string;
  enableGalleryUploads: number;
};

export const ImageAnswerInput = ({
  onClose,
  label = "Upload de imagem via:",
  enableGalleryUploads,
}: ImageInputProps) => {
  const { navigate } = useAppNavigation();
  const { setReportStore, imageAnswer, imageSource } = useReportStore();
  const [loading, setLoading] = useState(false);
  const handleCameraPress = () => {
    onClose();
    navigate("Camera");
  };

  const pickImage = async () => {
    setLoading(true);
    const image = await pickImageFromLibrary();

    if (image) {
      setReportStore({ imageAnswer: image, imageSource: "gallery" });
      onClose();
      navigate("Preview", { viewOnly: false });
    }
    setLoading(false);
  };

  const handleViewFullScreen = () => {
    if (imageAnswer) {
      setReportStore({ previewImageUri: imageAnswer.uri });
      onClose();
      navigate("Preview", { viewOnly: false });
    }
  };

  return (
    <View className="w-full">
      {imageAnswer && (
        <View className="mb-4">
          <View className="relative">
            <Image
              source={{ uri: imageAnswer.uri }}
              className="w-full h-48 rounded-md"
              resizeMode="cover"
            />
            <View className="absolute top-2 left-2 bg-black/60 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">
                Da {imageSource === "camera" ? "câmera" : "galeria"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleViewFullScreen}
            className="mt-2 items-center"
          >
            <Text className="text-neutral-700 font-semibold text-sm underline">
              Ver em tela cheia
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text
        className={cn(
          "text-neutral-700 text-sm font-medium mb-2",
          enableGalleryUploads === 1 ? "" : "text-center",
        )}
      >
        {imageAnswer ? "Trocar imagem:" : label}
      </Text>
      <View className="flex-row gap-2">
        {enableGalleryUploads === 1 && (
          <TouchableOpacity
            className="items-center border h-24 flex-1 justify-center rounded-md border-neutral-700"
            onPress={pickImage}
          >
            <View className="items-center justify-center">
              {!loading && (
                <>
                  <Icon name="Image" size={20} color="black" />
                  <Text className="text-neutral-700 font-semibold">Fotos</Text>
                </>
              )}
              {loading && (
                <>
                  <LoadingSpinner />
                  <Text className="text-neutral-700 font-normal text-base">
                    Abrindo galeria...
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={cn(
            "items-center border h-24 justify-center rounded-md border-neutral-700",
            enableGalleryUploads === 1 ? "flex-1" : "w-36 mx-auto",
          )}
          onPress={handleCameraPress}
        >
          <Icon name="Camera" size={20} color="black" />
          <Text className="text-neutral-700 font-semibold">Câmera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
