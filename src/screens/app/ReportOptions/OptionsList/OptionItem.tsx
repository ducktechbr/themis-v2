import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { AnswerModal } from "./AnswerModal";

import { Icon, useToast } from "@/components";
import { useOptionAnswer } from "@/services/mutations";
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
  const { reportId, refcod, questionId } = useReportStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isFulfilled =
    option.fulfilled || (questionId ? option.fulfilled : false);

  const { mutate: sendAnswer, isPending } = useOptionAnswer({
    onSuccess: () => {
      if (questionId) {
        option.fulfilled = true;
      }
      toast("Resposta enviada com sucesso!", "success");
    },
    onError: () => {
      toast("Erro ao enviar resposta!", "destructive");
    },
  });

  const handleSendAnswer = (answer?: string) => {
    sendAnswer({
      reportId: reportId!,
      refcod: refcod!,
      questionId: questionId!,
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
