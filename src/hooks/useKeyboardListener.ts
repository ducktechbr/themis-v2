import { useEffect, useState } from "react";
import { Keyboard, EmitterSubscription } from "react-native";

export function useKeyboardListener(): boolean {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSubscription: EmitterSubscription = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardOpen(true)
    );
    const hideSubscription: EmitterSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardOpen(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardOpen;
}
