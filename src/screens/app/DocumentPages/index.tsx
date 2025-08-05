import { AppContainer } from "@/components";
import { Text } from "react-native";

import useViewModel from "./useViewModel";

export const DocumentPages = () => {
  const { documentId } = useViewModel();

  return (
    <AppContainer>
      <Text>DocumentPages {documentId}</Text>
    </AppContainer>
  );
};
