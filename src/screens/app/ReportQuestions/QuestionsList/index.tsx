import { useState } from "react";
import { FlatList, View } from "react-native";

import { QuestionItem } from "./QuestionItem";

import { SearchInput } from "@/components";
import { ReportQuestions } from "@/types";

type QuestionEntry = [string, import("@/types").Question];

type QuestionsListProps = {
  reportQuestions: ReportQuestions;
};

export const QuestionsList = ({ reportQuestions }: QuestionsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const questions: QuestionEntry[] = Object.entries(reportQuestions.questions);

  const filteredQuestions = questions.filter(([, question]) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <View>
      <SearchInput
        placeholder="Pesquisar"
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="mb-3"
      />
      <FlatList
        data={filteredQuestions}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <QuestionItem questionId={item[0]} question={item[1]} />
        )}
      />
    </View>
  );
};
