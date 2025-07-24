import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import logo from "@/assets/full_logo.png";
import { Icon } from "@/components";

import useViewModel from "./useViewModel";

export const SignIn = () => {
  const {
    username,
    password,
    isKeyboardOpen,
    setUsername,
    setPassword,
    signIn,
    cn,
  } = useViewModel();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 justify-center items-center">
        <Image source={logo} />
      </View>
      <View
        className={cn(
          "flex-1 gap-5 w-[90%] mx-auto transform transition-all ease-in-out duration-700",
          isKeyboardOpen ? "mb-72" : ""
        )}
      >
        <View className="flex-row items-center w-full">
          <View className="bg-white h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
            <Icon name="User" />
          </View>
          <TextInput
            className="bg-white py-5 rounded-tr-lg rounded-br-lg text-neutral-800 font-semibold flex-1"
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
            className="bg-white py-5 rounded-tr-lg rounded-br-lg text-neutral-800 font-semibold flex-1 shadow-xl"
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          className="bg-success justify-center items-center py-4 rounded-lg"
          onPress={() => signIn(username, password)}
        >
          <Text className="text-white font-bold text-xl">Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row gap-2 justify-center">
          <Text className="text-white font-semibold text-lg">
            Esqueceu sua senha? Clique aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
