import { Text, View, ActivityIndicator } from "react-native";

import { QuestionsList } from "./QuestionsList/index";
import useViewModel from "./useViewModel";

import { AppContainer } from "@/components";

export const ReportQuestions = () => {
  const { reportQuestions, isPending } = useViewModel();

  return (
    <AppContainer>
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">
          {reportQuestions?.["item-title"]}
        </Text>
        {isPending && <ActivityIndicator size="large" color="white" />}
        {reportQuestions && !isPending && (
          <QuestionsList reportQuestions={reportQuestions} />
        )}
      </View>
    </AppContainer>
  );
};
