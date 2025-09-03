import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AnswerModal } from "./AnswerModal";

import { Icon } from "@/components";
import { useToast } from "@/components";
import { useOptionAnswer } from "@/services/mutation";
import { useReportStore } from "@/stores";
import { Option } from "@/types";
import { cn } from "@/utils";

type OptionItemProps = {
  option: Option;
  questionTitle: string;
  optionIndex: number;
};

export const OptionItem = ({
  option,
  questionTitle,
  optionIndex,
}: OptionItemProps) => {
  const { toast } = useToast();
  const {
    currentReportId,
    currentRefcod,
    currentQuestionId,
    markOptionAsAnswered,
    isOptionAnswered,
  } = useReportStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Debug: log option data
  console.log(`Option ${optionIndex}:`, {
    option: option.option,
    fulfilled: option.fulfilled,
    currentQuestionId,
    isAnswered: currentQuestionId
      ? isOptionAnswered(currentQuestionId, optionIndex)
      : false,
  });

  const isFulfilled =
    option.fulfilled ||
    (currentQuestionId
      ? isOptionAnswered(currentQuestionId, optionIndex)
      : false);

  const { mutate: sendAnswer, isPending } = useOptionAnswer({
    onSuccess: () => {
      if (currentQuestionId) {
        markOptionAsAnswered(currentQuestionId, optionIndex);
      }
      toast("Resposta enviada com sucesso!", "success");
    },
    onError: () => {
      toast("Erro ao enviar resposta!", "destructive");
    },
  });

  const handleSendAnswer = (answer?: string) => {
    sendAnswer({
      reportId: currentReportId!,
      refcod: currentRefcod!,
      questionId: currentQuestionId!,
      optionId: optionIndex,
      answer: answer || "true",
    });
    setIsDialogOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsDialogOpen(true)}
        disabled={isPending}
        className={cn(
          "flex-row justify-between items-center rounded-lg p-4 mb-3 min-h-16",
          isFulfilled ? "bg-success" : "bg-white"
        )}
      >
        <View className="flex-1 mr-3">
          <Text
            className={cn(
              "text-base font-medium",
              isFulfilled ? "text-white" : "text-black"
            )}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {option.option}
          </Text>
        </View>

        <Icon
          name={isFulfilled ? "CircleCheck" : "Circle"}
          size={20}
          color={isFulfilled ? "white" : "black"}
        />
      </TouchableOpacity>

      <AnswerModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        questionTitle={questionTitle}
        option={option}
        handleSendAnswer={handleSendAnswer}
      />
    </>
  );
};
