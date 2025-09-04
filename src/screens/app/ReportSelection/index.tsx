import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

import { ReportsList } from "./ReportsList";
import useViewModel from "./useViewModel";

import empty from "@/assets/animations/empty-state.json";
import { AppContainer, MainButton } from "@/components";

export const ReportSelection = () => {
  const { reports, isPending, navigate, reportId } = useViewModel();

  return (
    <AppContainer>
      {!isPending && reports && reports.length > 0 && (
        <>
          <ReportsList reports={reports} />
          <View className="mb-5">
            <MainButton
              title="Próximo"
              disabled={!reportId || isPending}
              onPress={() => navigate("ReportPages")}
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
