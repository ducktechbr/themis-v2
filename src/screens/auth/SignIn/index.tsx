import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useViewModel from "./useViewModel";

import logo from "@/assets/images/full_logo.png";
import { Checkbox, Icon, MainButton } from "@/components";
import { cn } from "@/utils";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center">
          <Image
            source={logo}
            className={cn(
              isKeyboardOpen ? "w-[40%] h-[40%]" : "w-[55%] h-[55%]",
            )}
            resizeMode="contain"
          />
        </View>
        <View
          className={cn(
            "flex-1 gap-5 w-[90%] mx-auto transform transition-all ease-in-out duration-500",
            isKeyboardOpen ? "mb-96" : "mb-0",
          )}
        >
          <View className="flex-row items-center w-full">
            <View className="bg-secondary h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
              <Icon name="User" color="#747474" />
            </View>
            <TextInput
              className="bg-secondary h-16 rounded-tr-lg rounded-br-lg text-neutral-300 font-semibold flex-1"
              placeholder="Usuário"
              placeholderTextColor="#747474"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View className="flex-row items-center">
            <View className="bg-secondary h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
              <Icon name="Lock" size={22} color="#747474" />
            </View>
            <TextInput
              className="bg-secondary h-16  text-neutral-300 font-semibold flex-1 shadow-xl"
              placeholder="Senha"
              placeholderTextColor="#747474"
              secureTextEntry={showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              activeOpacity={1}
              className="bg-secondary h-full items-center flex-row rounded-tr-lg rounded-br-lg p-1 pr-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={!showPassword ? "EyeOff" : "Eye"} color="#747474" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setRememberme(!rememberme)}>
            <Checkbox
              label="Me manter conectado"
              labelClasses={cn(
                "text-neutral-500 font-semibold text-base",
                rememberme && "text-[#f3842a]",
              )}
              checkboxClasses="w-5 h-5 border-2 border-neutral-500"
              checked={rememberme}
              onCheckedChange={setRememberme}
              iconColor="#f3842a"
              iconSize={14}
              checkedBorderColor="#f3842a"
            />
          </TouchableOpacity>
          <MainButton title="Entrar" onPress={handleSingIn} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
