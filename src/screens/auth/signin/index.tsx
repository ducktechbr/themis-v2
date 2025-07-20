import { useState } from "react";
import { useAuthStore } from "@/stores";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import logo from "@/assets/logo.png";

import { Icon } from "@/components";

export default function SignIn() {
  const { signIn } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-1 justify-center items-center">
        <Image source={logo} />
      </View>
      <View className="flex-1 gap-5 w-[90%] mx-auto">
        <View className="flex-row items-center w-full">
          <View className="bg-white h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
            <Icon name="User" />
          </View>
          <TextInput
            className="bg-white py-4 rounded-tr-lg rounded-br-lg text-neutral-800 font-semibold flex-1"
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View className="flex-row items-center">
          <View className="bg-white h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
            <Icon name="Lock" size={22} />
          </View>
          <TextInput
            className="bg-white py-4 rounded-tr-lg rounded-br-lg text-neutral-800 font-semibold flex-1 shadow-xl"
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          className="bg-primary justify-center items-center p-3 rounded-lg"
          onPress={() => signIn(username, password)}
        >
          <Text className="text-white font-bold text-xl">Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row gap-2 justify-center">
          <Text className="text-neutral-800 font-semibold">
            Esqueceu sua senha? Clique aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
