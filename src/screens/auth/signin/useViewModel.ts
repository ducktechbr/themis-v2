import { useState } from "react";
import { useAuthStore } from "@/stores";
import { useKeyboardListener } from "@/hooks";
import { cn } from "@/utils";

export default function useViewModel() {
  const { signIn } = useAuthStore();
  const isKeyboardOpen = useKeyboardListener();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return {
    username,
    password,
    isKeyboardOpen,
    setUsername,
    setPassword,
    signIn,
    cn,
  };
}
