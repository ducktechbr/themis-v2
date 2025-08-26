import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Option } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components";
import { useOptionAnswer } from "@/services/mutation";
import { useReportStore } from "@/stores";
import { useToast } from "@/components";
import { useAppNavigation } from "@/hooks";
import { AnswerModal } from "./AnswerModal";

type OptionItemProps = {
  option: Option;
  questionTitle: string;
  optionIndex: number;
  isSelected: boolean;
  onPress: () => void;
};

export const OptionItem = ({
  option,
  questionTitle,
  optionIndex,
  isSelected,
  onPress,
}: OptionItemProps) => {
  const { goBack } = useAppNavigation();
  const { toast } = useToast();
  const { mutate: sendAnswer, isPending } = useOptionAnswer({
    onSuccess: () => {
      toast("Resposta enviada com sucesso!", "success");
    },
    onError: () => {
      toast("Erro ao enviar resposta!", "destructive");
    },
  });
  const { currentReportId, currentRefcod, currentQuestionId } =
    useReportStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePress = () => {
    setIsDialogOpen(true);
    onPress();
  };

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
        onPress={handlePress}
        disabled={isPending}
        className={cn(
          "flex-row justify-between items-center rounded-lg p-4 mb-3 min-h-16",
          isSelected ? "bg-success" : "bg-white"
        )}
      >
        <View className="flex-1 mr-3">
          <Text
            className={cn(
              "text-base font-medium",
              isSelected ? "text-white" : "text-black"
            )}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {option.option}
          </Text>
          <Text
            className={cn(
              "text-sm mt-1",
              isSelected ? "text-white/80" : "text-gray-500"
            )}
          >
            Tipo: {option.type}
          </Text>
        </View>

        <Icon name="Circle" size={20} color={isSelected ? "white" : "black"} />
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
