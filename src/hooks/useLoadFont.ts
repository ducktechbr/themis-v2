import {
 Poppins_400Regular,
 Poppins_600SemiBold,
 Poppins_700Bold,
 useFonts,
} from "@expo-google-fonts/poppins";

export const useLoadFont = () => {
 const [isFontLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
 });

 return isFontLoaded;
};
