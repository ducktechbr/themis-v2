import { Text, TextInput, View } from "react-native";

type DateInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
};

export const DateAnswerInput = ({
  value,
  onChangeText,
  placeholder = "DD/MM/AAAA",
  label = "Selecione uma data:",
}: DateInputProps) => {
  return (
    <View className="w-full">
      <Text className="text-neutral-700 text-sm font-medium mb-2">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 text-neutral-700"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};
