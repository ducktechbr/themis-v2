import { useRoute, RouteProp } from "@react-navigation/native";

import { RouteParams } from "@/types";

export const useRouteParams = <
  T extends keyof RouteParams
>(): RouteParams[T] => {
  const route = useRoute<RouteProp<RouteParams, T>>();
  return route.params as RouteParams[T];
};
