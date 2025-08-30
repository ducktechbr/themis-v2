import { View, Text } from "react-native";
import { AppContainer, MainButton } from "@/components";
import { ReportsList } from "./ReportsList";

import LottieView from "lottie-react-native";
import empty from "@/assets/animations/empty-state.json";

import useViewModel from "./useViewModel";

export const ReportSelection = () => {
  const { reports, isPending, selectedReport, setSelectedReport, navigate } =
    useViewModel();

  return (
    <AppContainer>
      {!isPending && reports && reports.length > 0 && (
        <>
          <ReportsList
            reports={reports}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
          />
          <View className="mb-5">
            <MainButton
              title="Próximo"
              disabled={!selectedReport}
              onPress={() =>
                navigate("ReportPages", { reportId: selectedReport })
              }
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
