import { View, FlatList } from "react-native";

import { QuestionItem } from "./QuestionItem";

import { ReportQuestions } from "@/types";

type QuestionEntry = [string, import("@/types").Question];

type QuestionsListProps = {
  reportQuestions: ReportQuestions;
};

export const QuestionsList = ({ reportQuestions }: QuestionsListProps) => {
  const questions: QuestionEntry[] = Object.entries(reportQuestions.questions);

  const handleQuestionPress = (questionId: string) => {
    // TODO: Implementar navegação para responder a questão
    console.log("Question pressed:", questionId);
  };

  return (
    <View>
      <FlatList
        data={questions}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <QuestionItem
            questionId={item[0]}
            question={item[1]}
            onPress={() => handleQuestionPress(item[0])}
          />
        )}
      />
    </View>
  );
};
