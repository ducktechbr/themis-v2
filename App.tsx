import Routes from "@/router";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { useLoadFont } from "@/hooks";

export default function App() {
 const isLoadFont = useLoadFont();

 if (!isLoadFont) {
  return;
 }

 return (
  <GestureHandlerRootView>
   <NavigationContainer>
    <StatusBar style="auto" />
    <Routes />
   </NavigationContainer>
  </GestureHandlerRootView>
 );
}
