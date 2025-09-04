import { ActivityIndicator, Text, View } from "react-native";

import { QuestionsList } from "./QuestionsList/index";
import useViewModel from "./useViewModel";

import { AppContainer } from "@/components";

export const ReportQuestions = () => {
  const { reportQuestions, isPending } = useViewModel();

  return (
    <AppContainer>
      <View className="px-4">
        <Text className="text-xl font-bold mb-4 text-white">
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
