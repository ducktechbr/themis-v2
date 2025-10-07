import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

import { ReportsList } from "./ReportsList";
import useViewModel from "./useViewModel";

import empty from "@/assets/animations/empty-state.json";
import { AppContainer, MainButton } from "@/components";
import { useAuthStore } from "@/stores";
import { greetings } from "@/utils";

export const ReportSelection = () => {
  const { reports, isPending, reportId, handleNext } = useViewModel();
  const { user } = useAuthStore();
  return (
    <AppContainer>
      {!isPending && reports && reports.length > 0 && (
        <>
          <Text className="text-neutral-700 font-bold text-lg mb-2">
            {greetings()}, {user.username}
          </Text>
          <ReportsList reports={reports} />
          <View className="mb-5 mt-2">
            <MainButton
              variant="success"
              title="Próximo"
              disabled={!reportId || isPending}
              onPress={handleNext}
            />
          </View>
        </>
      )}
      {!isPending && reports && reports.length === 0 && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white font-bold text-lg">
            Você não possuiu relatórios para preencher!
          </Text>
          <LottieView source={empty} style={{ width: 300, height: 300 }} />
        </View>
      )}
    </AppContainer>
  );
};
