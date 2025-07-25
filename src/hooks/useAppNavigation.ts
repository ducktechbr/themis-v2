import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RoutesParamsList } from "@/types";

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RoutesParamsList>>();
};
