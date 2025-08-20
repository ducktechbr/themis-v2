import { View, Text } from "react-native";
import { AppContainer, Header, MainButton } from "@/components";
import { ReportsList } from "./ReportsList";

import LottieView from "lottie-react-native";
import empty from "@/assets/animations/empty-state.json";

import useViewModel from "./useViewModel";

export const SelectReport = () => {
  const { serviceOrders, isPending, selected, setSelected, navigate } =
    useViewModel();

  return (
    <AppContainer>
      <Header />
      {!isPending && serviceOrders && serviceOrders.length > 0 && (
        <>
          <ReportsList
            serviceOrders={serviceOrders}
            selected={selected}
            setSelected={setSelected}
          />
          <View className="mb-5">
            <MainButton
              title="Próximo"
              disabled={!selected}
              onPress={() => navigate("ReportPages")}
            />
          </View>
        </>
      )}
      {!isPending && serviceOrders && serviceOrders.length === 0 && (
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
