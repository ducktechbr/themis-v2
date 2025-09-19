import { Text, TextInput, View } from "react-native";

type TextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
};

export const TextAnswerInput = ({
  value,
  onChangeText,
  placeholder = "Digite aqui...",
  label = "Digite sua resposta:",
}: TextInputProps) => {
  return (
    <View className="w-full">
      <Text className="text-neutral-300 text-sm font-medium mb-2">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 text-neutral-300"
        placeholder={placeholder}
        placeholderTextColor="#d4d4d4"
        value={value}
        onChangeText={onChangeText}
        multiline={false}
      />
    </View>
  );
};
