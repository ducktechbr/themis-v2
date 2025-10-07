import { useState } from "react";
import { Linking } from "react-native";

import { useKeyboardListener } from "@/hooks";
import { useAuthStore } from "@/stores";
import { cn } from "@/utils";

export default function useViewModel() {
  const { signIn, outdatedVersionError, clearOutdatedVersionError } =
    useAuthStore();
  const isKeyboardOpen = useKeyboardListener();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [rememberme, setRememberme] = useState(false);

  const handleSingIn = async () => {
    if (username === "" || password === "") {
      alert("Usuário e senha não podem ser vazios!");
      return;
    }
    signIn(username, password, rememberme);
  };

  const handleUpdateApp = () => {
    Linking.openURL("https://install-app.sistemathemis.com");
  };

  const handleCloseModal = () => {
    clearOutdatedVersionError();
  };

  return {
    username,
    password,
    isKeyboardOpen,
    showPassword,
    rememberme,
    outdatedVersionError,
    setRememberme,
    setUsername,
    setPassword,
    cn,
    setShowPassword,
    handleSingIn,
    handleUpdateApp,
    handleCloseModal,
  };
}
