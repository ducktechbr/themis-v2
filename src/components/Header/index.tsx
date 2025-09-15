import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import { Dialog, DialogContent } from "../Dialog";
import { Icon } from "../Icon";

import { useAppNavigation } from "@/hooks";
import { useAuthStore } from "@/stores";
import { RouteParams } from "@/types";
import { cn, getScreenDisplayName } from "@/utils";

type HeaderProps = {
  renderSettings?: boolean;
};

export const Header = ({ renderSettings = true }: HeaderProps) => {
  const route = useRoute();
  const screenDisplayName = getScreenDisplayName(
    route.name as keyof RouteParams,
  );
  const { goBack } = useAppNavigation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { signOut } = useAuthStore();

  const settingsActions = [
    {
      title: "Login na Web",
      onPress: () => Linking.openURL("https://sistemathemis.com"),
    },
    {
      title: "Política de Privacidade",
      onPress: () => Linking.openURL("https://sistemathemis.com/privacy"),
    },
    { title: "Sair", onPress: () => signOut() },
  ];

  return (
    <>
      <View className="flex-row items-center justify-between py-4 mb-2">
        {route.name !== "ReportSelection" && (
          <TouchableOpacity className="absolute left-0 z-10" onPress={goBack}>
            <Icon name="ArrowLeft" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text className="text-white text-xl font-bold flex-1 text-center">
          {screenDisplayName}
        </Text>
        {renderSettings && (
          <TouchableOpacity
            className="absolute right-0"
            onPress={() => setSettingsOpen(true)}
          >
            <Icon name="Settings" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          {settingsActions.map((action) => (
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 border-b border-primary"
              key={action.title}
              onPress={action.onPress}
            >
              <Text
                className={cn(
                  "font-semibold text-lg",
                  action.title === "Sair" && "text-red-500",
                )}
              >
                {action.title}
              </Text>
              <Icon
                name="ChevronRight"
                size={24}
                color={action.title === "Sair" ? "red" : "black"}
              />
            </TouchableOpacity>
          ))}
          <Text className="text-right text-sm text-gray-500">v2.0.0</Text>
        </DialogContent>
      </Dialog>
    </>
  );
};
