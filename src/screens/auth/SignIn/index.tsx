import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";

import { Icon, MainButton, Checkbox } from "@/components";
import logo from "@/assets/images/full_logo.png";
import { cn } from "@/utils";

import useViewModel from "./useViewModel";

export const SignIn = () => {
  const {
    username,
    password,
    isKeyboardOpen,
    showPassword,
    rememberme,
    setRememberme,
    setUsername,
    setPassword,
    setShowPassword,

    handleSingIn,
  } = useViewModel();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 justify-center items-center">
        <Image source={logo} className="w-[55%] h-[55%]" />
      </View>
      <View
        className={cn(
          "flex-1 gap-5 w-[90%] mx-auto transform transition-all ease-in-out duration-500",
          isKeyboardOpen ? "mb-72" : "mb-0"
        )}
      >
        <View className="flex-row items-center w-full">
          <View className="bg-white h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
            <Icon name="User" />
          </View>
          <TextInput
            className="bg-white h-16 rounded-tr-lg rounded-br-lg text-neutral-800 font-semibold flex-1"
            placeholder="Usuário"
            placeholderTextColor="#747474"
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
            className="bg-white h-16  text-neutral-800 font-semibold flex-1 shadow-xl"
            placeholder="Senha"
            placeholderTextColor="#747474"
            secureTextEntry={showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            activeOpacity={1}
            className="bg-white h-full items-center flex-row rounded-tr-lg rounded-br-lg p-1 pr-2"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={!showPassword ? "EyeOff" : "Eye"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setRememberme(!rememberme)}>
          <Checkbox
            label="Me manter conectado"
            labelClasses={cn(
              "text-white font-semibold text-base",
              rememberme && "text-[#2E7D32]"
            )}
            checkboxClasses="w-5 h-5 border-2 border-white "
            checked={rememberme}
            onCheckedChange={setRememberme}
            iconColor="#2E7D32"
            iconSize={14}
            checkedBorderColor="#2E7D32"
          />
        </TouchableOpacity>
        <MainButton title="Entrar" onPress={handleSingIn} />
      </View>
    </SafeAreaView>
  );
};
