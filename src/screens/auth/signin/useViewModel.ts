import { useState } from "react";
import { useAuthStore } from "@/stores";
import { useKeyboardListener } from "@/hooks";
import { cn } from "@/utils";

export default function useViewModel() {
  const { signIn } = useAuthStore();
  const isKeyboardOpen = useKeyboardListener();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleSingIn = async () => {
    if (username === "" || password === "") {
      alert("Usuário e senha não podem ser vazios!");
      return;
    }
    signIn(username, password);
  };

  return {
    username,
    password,
    isKeyboardOpen,
    showPassword,
    setUsername,
    setPassword,
    cn,
    setShowPassword,
    handleSingIn,
  };
}
