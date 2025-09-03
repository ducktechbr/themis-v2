import { useState } from "react";

import { useKeyboardListener } from "@/hooks";
import { useAuthStore } from "@/stores";
import { cn } from "@/utils";

export default function useViewModel() {
  const { signIn } = useAuthStore();
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

  return {
    username,
    password,
    isKeyboardOpen,
    showPassword,
    rememberme,
    setRememberme,
    setUsername,
    setPassword,
    cn,
    setShowPassword,
    handleSingIn,
  };
}
