import { ActivityIndicator, Text, View } from "react-native";

import { QuestionsList } from "./QuestionsList/index";
import useViewModel from "./useViewModel";

import { AppContainer } from "@/components";

export const ReportQuestions = () => {
  const { reportQuestions, isPending } = useViewModel();

  return (
    <AppContainer>
      <View className="px-4">
        <Text className="text-xl font-bold mb-4 text-neutral-700">
          {reportQuestions?.["item-title"]}
        </Text>
        {isPending && <ActivityIndicator size="large" color="black" />}
        {reportQuestions && !isPending && (
          <QuestionsList reportQuestions={reportQuestions} />
        )}
      </View>
    </AppContainer>
  );
};
