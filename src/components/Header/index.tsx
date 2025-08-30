import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../Icon";
import { getScreenDisplayName } from "@/utils";
import { useRoute } from "@react-navigation/native";
import { RouteParams } from "@/types";
import { useAppNavigation } from "@/hooks";
import { Dialog, DialogContent } from "../Dialog";
import { useState } from "react";

export const Header = () => {
  const route = useRoute();
  const screenDisplayName = getScreenDisplayName(
    route.name as keyof RouteParams
  );
  const { goBack } = useAppNavigation();
  const [settingsOpen, setSettingsOpen] = useState(false);
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
        <TouchableOpacity
          className="absolute right-0"
          onPress={() => setSettingsOpen(true)}
        >
          <Icon name="Settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <Text>Settings</Text>
        </DialogContent>
      </Dialog>
    </>
  );
};
