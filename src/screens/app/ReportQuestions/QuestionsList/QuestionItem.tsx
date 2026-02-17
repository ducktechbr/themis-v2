import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components";
import { useAppNavigation } from "@/hooks";
import { useReportStore } from "@/stores";
import { Question } from "@/types";
import { cn } from "@/utils";

type QuestionItemProps = {
  questionId: string;
  question: Question;
};

export const QuestionItem = React.memo(({ questionId, question }: QuestionItemProps) => {
  const { setReportStore } = useReportStore();
  const { navigate } = useAppNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        setReportStore({ questionId: Number(questionId) });
        navigate("ReportOptions");
      }}
      className={cn(
        "flex-row justify-between items-center rounded-lg p-4 min-h-16 shadow-sm",
        question.fulfilled ? "bg-success " : "bg-secondary",
      )}
    >
      <View className="flex-1 mr-3">
        <Text
          className={cn(
            "text-base font-medium",
            question.fulfilled ? "text-white" : "text-neutral-700",
          )}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {question.title}
        </Text>
      </View>

      {question.fulfilled && (
        <Icon name="CircleCheck" size={20} color="white" />
      )}
    </TouchableOpacity>
  );
});
