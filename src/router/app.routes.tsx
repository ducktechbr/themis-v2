import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "@/screens/app";
import { RoutesParamsList } from "@/types";

export default function AppRoutes() {
  const Stack = createStackNavigator<RoutesParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
