import Home from "@/screens/app/home";
import { createStackNavigator } from "@react-navigation/stack";
import { RootRoutesParamsList } from "./routes.types";

export default function AppRoutes() {
 const Stack = createStackNavigator<RootRoutesParamsList>();
 return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
   <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
 );
}
