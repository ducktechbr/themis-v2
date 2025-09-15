import { useState } from "react";
import { Alert, Text, View } from "react-native";

import {
  DateAnswerInput,
  ImageAnswerInput,
  LongTextAnswerInput,
  TextAnswerInput,
} from "./AnswerInputs";

import { Dialog, DialogContent, MainButton } from "@/components";
import { useSendImage } from "@/hooks/mutations";
import { useAuthStore, useReportStore } from "@/stores";
import { Option, OptionTypeEnum } from "@/types";

type AnswerModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  questionTitle: string;
  option: Option;
  handleSendAnswer: (answer?: string) => void;
  reportId: number;
  refcod: number;
  questionId: number;
  optionId: number;
  loading: boolean;
};

export const AnswerModal = ({
  isDialogOpen,
  setIsDialogOpen,
  questionTitle,
  option,
  handleSendAnswer,
  reportId,
  refcod,
  questionId,
  optionId,
  loading,
}: AnswerModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuthStore();
  const { imageAnswer } = useReportStore();

  const { mutate: sendImage, isPending: isSendingImage } = useSendImage({
    onSuccess: () => {
      handleSendAnswer("image_uploaded");
      setIsDialogOpen(false);
      setReportStore({ imageAnswer: null });
    },
    onError: (errorMessage) => {
      Alert.alert("Erro ao enviar imagem", errorMessage || "Tente novamente.");
    },
  });
  const { setReportStore } = useReportStore();
  const getAnswerValue = () => {
    switch (option.type) {
      case OptionTypeEnum.TEXT:
      case OptionTypeEnum.LONG_TEXT:
      case OptionTypeEnum.DATE:
      case OptionTypeEnum.SELECT_TEXT:
        return inputValue;
      case OptionTypeEnum.SELECT:
        return "true";
      case OptionTypeEnum.IMAGE:
        return "image_uploaded";
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    if (option.type === OptionTypeEnum.IMAGE) {
      if (imageAnswer) {
        sendImage({
          reportId,
          refcod,
          questionId,
          optionId,
          image: imageAnswer,
          latitude: user.latitude,
          longitude: user.longitude,
        });
      }
    } else {
      const answer = getAnswerValue();
      handleSendAnswer(answer);
      setIsDialogOpen(false);
      setInputValue("");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setInputValue("");
    setReportStore({ imageAnswer: null, imageSource: null });
  };

  const renderAnswerInput = () => {
    switch (option.type) {
      case OptionTypeEnum.TEXT:
        return (
          <TextAnswerInput value={inputValue} onChangeText={setInputValue} />
        );

      case OptionTypeEnum.LONG_TEXT:
        return (
          <LongTextAnswerInput
            value={inputValue}
            onChangeText={setInputValue}
          />
        );

      case OptionTypeEnum.DATE:
        return (
          <DateAnswerInput value={inputValue} onChangeText={setInputValue} />
        );

      case OptionTypeEnum.SELECT_TEXT:
        return (
          <TextAnswerInput value={inputValue} onChangeText={setInputValue} />
        );

      case OptionTypeEnum.IMAGE:
        return <ImageAnswerInput onClose={() => setIsDialogOpen(false)} />;

      case OptionTypeEnum.SELECT:
        return null;

      default:
        return null;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <Text className="font-semibold text-xl text-dark text-center">
          {questionTitle}
        </Text>
        <Text className="text-dark text-lg text-center font-semibold">
          Opção selecionada:{" "}
        </Text>
        <Text className="text-primary font-bold text-center">
          {option.option}
        </Text>

        {renderAnswerInput()}

        <View className="flex-row gap-2 justify-center w-[50%] mx-auto">
          {loading ||
            (isSendingImage && (
              <Text className="text-center p-3">Enviando...</Text>
            ))}
          {!loading && !isSendingImage && (
            <>
              <MainButton
                title="Cancelar"
                onPress={handleCancel}
                variant="error"
              />
              <MainButton
                title="Enviar"
                onPress={handleSubmit}
                disabled={
                  loading ||
                  isSendingImage ||
                  (option.type === OptionTypeEnum.IMAGE && !imageAnswer)
                }
              />
            </>
          )}
        </View>
      </DialogContent>
    </Dialog>
  );
};
