import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RouteParams } from "@/types";

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RouteParams>>();
};
