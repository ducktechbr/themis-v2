import { useAuthStore } from "@/stores";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function SignIn() {
 const { signIn } = useAuthStore();
 return (
  <SafeAreaView className="bg-black justify-center items-center flex-1">
   <TouchableOpacity onPress={() => signIn(true)}>
    <Text className="text-white">Sigin</Text>
   </TouchableOpacity>
  </SafeAreaView>
 );
}
