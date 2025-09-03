import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { Dialog, DialogContent, MainButton } from "@/components";
import { Option, OptionTypeEnum } from "@/types";

type AnswerModalProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  questionTitle: string;
  option: Option;
  handleSendAnswer: (answer?: string) => void;
};

export const AnswerModal = ({
  isDialogOpen,
  setIsDialogOpen,
  questionTitle,
  option,
  handleSendAnswer,
}: AnswerModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const renderInputByType = () => {
    switch (option.type) {
      case OptionTypeEnum.TEXT:
        return (
          <View className="w-full">
            <Text className="text-dark text-sm font-medium mb-2">
              Digite sua resposta:
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-dark"
              placeholder="Digite aqui..."
              value={inputValue}
              onChangeText={setInputValue}
              multiline={false}
            />
          </View>
        );

      case OptionTypeEnum.LONG_TEXT:
        return (
          <View className="w-full">
            <Text className="text-dark text-sm font-medium mb-2">
              Digite sua resposta detalhada:
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-dark min-h-[100px]"
              placeholder="Digite aqui..."
              value={inputValue}
              onChangeText={setInputValue}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
        );

      case OptionTypeEnum.DATE:
        return (
          <View className="w-full">
            <Text className="text-dark text-sm font-medium mb-2">
              Selecione uma data:
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-dark"
              placeholder="DD/MM/AAAA"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
          </View>
        );

      case OptionTypeEnum.SELECT:
        return null;

      case OptionTypeEnum.SELECT_TEXT:
        return (
          <View className="w-full">
            <Text className="text-dark text-sm font-medium mb-2">
              Digite sua resposta:
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-dark"
              placeholder="Digite aqui..."
              value={inputValue}
              onChangeText={setInputValue}
              multiline={false}
            />
          </View>
        );

      case OptionTypeEnum.IMAGE:
        return (
          <View className="w-full">
            <Text className="text-dark text-sm font-medium mb-2">
              Upload de imagem:
            </Text>
            <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-md p-6 items-center">
              <Text className="text-gray-500 text-center">
                Toque para selecionar uma imagem
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                JPG, PNG ou GIF até 5MB
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  const getAnswerValue = () => {
    switch (option.type) {
      case OptionTypeEnum.TEXT:
        return inputValue;
      case OptionTypeEnum.LONG_TEXT:
        return inputValue;
      case OptionTypeEnum.DATE:
        return inputValue;
      case OptionTypeEnum.SELECT:
        return "true";
      case OptionTypeEnum.SELECT_TEXT:
        return inputValue;
      case OptionTypeEnum.IMAGE:
        return "image_uploaded";
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    const answer = getAnswerValue();
    handleSendAnswer(answer);
    setIsDialogOpen(false);
    setInputValue("");
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setInputValue("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <Text className="font-semibold text-xl text-dark text-center">
          {questionTitle}
        </Text>
        <Text className="text-dark text-lg text-center font-semibold">
          Opção selecionada:{" "}
          <Text className="text-primary font-bold">{option.option}</Text>
        </Text>

        {renderInputByType()}

        <View className="flex-row gap-2 justify-center w-[50%] mx-auto">
          <MainButton title="Enviar" onPress={handleSubmit} />
          <MainButton title="Cancelar" onPress={handleCancel} variant="error" />
        </View>
      </DialogContent>
    </Dialog>
  );
};
