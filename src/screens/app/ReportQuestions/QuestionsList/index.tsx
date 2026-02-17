import { useCallback, useMemo, useState } from "react";
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

  const questions: QuestionEntry[] = useMemo(
    () => Object.entries(reportQuestions.questions),
    [reportQuestions.questions],
  );

  const filteredQuestions = useMemo(
    () =>
      questions.filter(([, question]) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [questions, searchTerm],
  );

  const renderItem = useCallback(
    ({ item }: { item: QuestionEntry }) => (
      <QuestionItem questionId={item[0]} question={item[1]} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: QuestionEntry) => item[0], []);

  return (
    <View>
      <SearchInput
        placeholder="Pesquisar por título..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="mb-3"
      />
      <FlatList
        data={filteredQuestions}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        removeClippedSubviews
      />
    </View>
  );
};
