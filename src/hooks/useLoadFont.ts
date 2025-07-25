import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

export const useLoadFont = () => {
  const [isFontLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (error) {
    console.error("Erro ao carregar fontes:", error);
  }

  return isFontLoaded;
};
