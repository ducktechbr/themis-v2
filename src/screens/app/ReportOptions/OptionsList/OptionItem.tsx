import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Option } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components";
import { useOptionAnswer } from "@/services/mutation";
import { useReportStore } from "@/stores";
import { Dialog, DialogContent, MainButton, useToast } from "@/components";
import { useAppNavigation } from "@/hooks";

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
      goBack();
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

  const handleSendAnswer = () => {
    sendAnswer({
      reportId: currentReportId!,
      refcod: currentRefcod!,
      questionId: currentQuestionId!,
      optionId: optionIndex,
      answer: true,
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <Text className="font-semibold text-xl text-dark text-center">
            {questionTitle}
          </Text>
          <Text className="text-dark text-lg text-center font-semibold">
            Opção selecionada:{" "}
            <Text className="text-primary font-bold">{option.option}</Text>
          </Text>

          <View className="flex-row gap-2 max-w-[50%]">
            <MainButton title="Enviar" onPress={handleSendAnswer} />
            <MainButton
              title="Cancelar"
              onPress={() => setIsDialogOpen(false)}
              variant="error"
            />
          </View>
        </DialogContent>
      </Dialog>
    </>
  );
};
