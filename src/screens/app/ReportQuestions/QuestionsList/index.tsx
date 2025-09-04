import { FlatList, View } from "react-native";

import { QuestionItem } from "./QuestionItem";

import { ReportQuestions } from "@/types";

type QuestionEntry = [string, import("@/types").Question];

type QuestionsListProps = {
  reportQuestions: ReportQuestions;
};

export const QuestionsList = ({ reportQuestions }: QuestionsListProps) => {
  const questions: QuestionEntry[] = Object.entries(reportQuestions.questions);

  return (
    <View>
      <FlatList
        data={questions}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <QuestionItem questionId={item[0]} question={item[1]} />
        )}
      />
    </View>
  );
};
