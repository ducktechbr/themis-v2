import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "@/screens/auth";
import { RoutesParamsList } from "@/types";

export default function AuthRoutes() {
  const Stack = createStackNavigator<RoutesParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
