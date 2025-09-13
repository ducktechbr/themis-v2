import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { AnswerModal } from "./AnswerModal";

import { Icon, useToast } from "@/components";
import { useAppNavigation } from "@/hooks";
import { useOptionAnswer } from "@/hooks/mutations";
import { useAuthStore, useReportStore } from "@/stores";
import { Option } from "@/types";
import { cn } from "@/utils";

type OptionItemProps = {
  option: Option;
  questionTitle: string;
  optionIndex: number;
  shouldAutoOpen?: boolean;
};

export const OptionItem = ({
  option,
  questionTitle,
  optionIndex,
  shouldAutoOpen = false,
}: OptionItemProps) => {
  const { toast } = useToast();
  const { reportId, refcod, questionId, setReportStore } = useReportStore();
  const { user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { navigate } = useAppNavigation();

  // Abrir modal automaticamente quando a imagem é da câmera
  useEffect(() => {
    if (shouldAutoOpen) {
      setIsDialogOpen(true);
    }
  }, [shouldAutoOpen]);

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
      latitude: user.latitude,
      longitude: user.longitude,
    });
    setIsDialogOpen(false);
  };

  const handlePreview = (e: any) => {
    e.stopPropagation();
    if (option.value) {
      const imageUrl = `https://app.sistemathemis.com/${option.value}`;
      setReportStore({ previewImageUri: imageUrl });
      navigate("Preview", { viewOnly: true });
    }
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

        <View className="flex-row items-center">
          {isFulfilled && option.type === "image" && option.value && (
            <TouchableOpacity onPress={handlePreview} className="mr-3">
              <Icon name="Eye" size={24} color="white" />
            </TouchableOpacity>
          )}
          <Icon
            name={isFulfilled ? "CircleCheck" : "Circle"}
            size={20}
            color={isFulfilled ? "white" : "black"}
          />
        </View>
      </TouchableOpacity>

      <AnswerModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        questionTitle={questionTitle}
        option={option}
        handleSendAnswer={handleSendAnswer}
        reportId={reportId!}
        refcod={refcod!}
        questionId={questionId!}
        optionId={optionIndex}
      />
    </>
  );
};
