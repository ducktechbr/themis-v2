import { createStackNavigator } from "@react-navigation/stack";
import { ReportPages, SelectReport, ReportQuestions } from "@/screens/app";
import { RouteParams } from "@/types";

export default function AppRoutes() {
  const Stack = createStackNavigator<RouteParams>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectReport" component={SelectReport} />
      <Stack.Screen name="ReportPages" component={ReportPages} />
      <Stack.Screen name="ReportQuestions" component={ReportQuestions} />
    </Stack.Navigator>
  );
}
