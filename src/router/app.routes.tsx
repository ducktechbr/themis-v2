import { createStackNavigator } from "@react-navigation/stack";

import {
  ReportPages,
  ReportSelection,
  ReportQuestions,
  ReportOptions,
} from "@/screens/app";
import { RouteParams } from "@/types";

export default function AppRoutes() {
  const Stack = createStackNavigator<RouteParams>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportSelection" component={ReportSelection} />
      <Stack.Screen name="ReportPages" component={ReportPages} />
      <Stack.Screen name="ReportQuestions" component={ReportQuestions} />
      <Stack.Screen name="ReportOptions" component={ReportOptions} />
    </Stack.Navigator>
  );
}
