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
  placeholder = "MM/AAAA",
  label = "Selecione uma data:",
}: DateInputProps) => {
  const formatDate = (text: string) => {
    const numbers = text.replace(/\D/g, "");

    const limitedNumbers = numbers.slice(0, 6);

    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`;
    }
  };

  const handleTextChange = (text: string) => {
    const formatted = formatDate(text);
    onChangeText(formatted);
  };

  return (
    <View className="w-full">
      <Text className="text-neutral-700 text-sm font-medium mb-2">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 text-neutral-700"
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        maxLength={5} // MM/YY = 5 caracteres
      />
    </View>
  );
};
