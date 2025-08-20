import { Text } from "react-native";
import { AppContainer } from "@/components";
import useViewModel from "./useViewModel";

export const ReportQuestions = () => {
  const { refcod } = useViewModel();

  return (
    <AppContainer>
      <Text>ReportQuestions {refcod}</Text>
    </AppContainer>
  );
};
