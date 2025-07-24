import { AppContainer, Header } from "@/components";

import useViewModel from "./useViewModel";
import { View, Text } from "react-native";

export const Home = () => {
  const { data } = useViewModel();

  return (
    <AppContainer>
      <Header />
      {data?.map((item, index) => (
        <View
          key={index}
          className="bg-white rounded p-2"
          style={{ shadowOpacity: 0.5, shadowOffset: { width: 5, height: 5 } }}
        >
          <Text>{item.type_service_order}</Text>
          <Text>{item.local}</Text>
          <Text>{item.uniorg}</Text>
          <Text>{item.id_service_order}</Text>
        </View>
      ))}
    </AppContainer>
  );
};
