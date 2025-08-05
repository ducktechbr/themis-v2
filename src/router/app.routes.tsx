import { createStackNavigator } from "@react-navigation/stack";
import { DocumentPages, SelectDocument } from "@/screens/app";
import { RoutesParamsList } from "@/types";

export default function AppRoutes() {
  const Stack = createStackNavigator<RoutesParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectDocument" component={SelectDocument} />
      <Stack.Screen name="DocumentPages" component={DocumentPages} />
    </Stack.Navigator>
  );
}
