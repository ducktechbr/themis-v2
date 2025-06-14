import SigIn from "@/screens/auth/signin";
import { createStackNavigator } from "@react-navigation/stack";
import { RootRoutesParamsList } from "./routes.types";
export default function AuthRoutes() {
 const Stack = createStackNavigator<RootRoutesParamsList>();
 return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
   <Stack.Screen name="SignIn" component={SigIn} />
  </Stack.Navigator>
 );
}
