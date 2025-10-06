import { TextInput, View } from "react-native";

import { Icon } from "@/components";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
};

export const SearchInput = ({
  placeholder = "Pesquisar",
  value,
  onChangeText,
  className = "",
}: SearchInputProps) => {
  return (
    <View className={`flex-row items-center w-full ${className}`}>
      <View className="bg-secondary h-full items-center flex-row rounded-tl-lg rounded-bl-lg p-1">
        <Icon name="Search" color="#747474" />
      </View>
      <TextInput
        className="bg-secondary h-16 rounded-tr-lg rounded-br-lg text-neutral-700 font-semibold flex-1 shadow-xs"
        placeholder={placeholder}
        placeholderTextColor="#747474"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
    </View>
  );
};
