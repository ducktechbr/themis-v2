import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "@/screens/auth";
import { RouteParams } from "@/types";

export default function AuthRoutes() {
  const Stack = createStackNavigator<RouteParams>();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
