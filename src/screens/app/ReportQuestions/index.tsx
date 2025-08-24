import { Text, View, ActivityIndicator } from "react-native";
import { AppContainer } from "@/components";
import useViewModel from "./useViewModel";
import { QuestionsList } from "./QuestionsList/index";

export const ReportQuestions = () => {
  const { refcod, reportQuestions, isPending, error } = useViewModel();

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
