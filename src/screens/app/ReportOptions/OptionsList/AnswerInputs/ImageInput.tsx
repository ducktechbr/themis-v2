import { launchImageLibraryAsync } from "expo-image-picker";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components";
import { useAppNavigation } from "@/hooks";
import { useReportStore } from "@/stores";

type ImageInputProps = {
  onClose: () => void;
  label?: string;
};

export const ImageAnswerInput = ({
  onClose,
  label = "Upload de imagem:",
}: ImageInputProps) => {
  const { navigate } = useAppNavigation();
  const { setReportStore, imageAnswer, imageSource } = useReportStore();
  const handleCameraPress = () => {
    onClose();
    navigate("Camera");
  };

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReportStore({ imageAnswer: result.assets[0], imageSource: "gallery" });
    }
  };

  return (
    <View className="w-full">
      <Text className="text-dark text-sm font-medium mb-2">{label}</Text>
      <View className="flex-row gap-2">
        <TouchableOpacity
          className="items-center border h-24 flex-1 justify-center rounded-md"
          onPress={pickImage}
        >
          {imageAnswer && imageSource === "gallery" ? (
            <Image
              source={{ uri: imageAnswer.uri }}
              className="w-full h-24 rounded-md"
            />
          ) : (
            <>
              <Icon name="Image" size={20} color="black" />
              <Text className="text-dark font-semibold">Fotos</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center border h-24 flex-1 justify-center rounded-md"
          onPress={handleCameraPress}
        >
          {imageAnswer && imageSource === "camera" ? (
            <Image
              source={{ uri: imageAnswer.uri }}
              className="w-full h-24 rounded-md"
            />
          ) : (
            <>
              <Icon name="Camera" size={20} color="black" />
              <Text className="text-dark font-semibold">Câmera</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
