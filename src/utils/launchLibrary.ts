import { launchImageLibraryAsync } from "expo-image-picker";

export const pickImageFromLibrary = async () => {
  const result = await launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0];
  }

  return null;
};
