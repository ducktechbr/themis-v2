import { Text, TextInput, View } from "react-native";

type LongTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
};

export const LongTextAnswerInput = ({
  value,
  onChangeText,
  placeholder = "Digite aqui...",
  label = "Digite sua resposta detalhada:",
}: LongTextInputProps) => {
  return (
    <View className="w-full">
      <Text className="text-dark text-sm font-medium mb-2">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 text-dark min-h-[100px]"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        textAlignVertical="top"
      />
    </View>
  );
};
