import { View, Text, TouchableOpacity } from "react-native";
import { QuestionOption, QuestionOptionType } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components";

type OptionItemProps = {
  option: QuestionOption;
  onPress?: () => void;
};

export const OptionItem = ({ option, onPress }: OptionItemProps) => {
  const getIconName = (type: QuestionOptionType) => {
    switch (type) {
      case QuestionOptionType.IMAGE:
        return "Image";
      case QuestionOptionType.TEXT:
        return "Type";
      case QuestionOptionType.SELECT:
        return "List";
      case QuestionOptionType.LONG_TEXT:
        return "FileText";
      case QuestionOptionType.DATE:
        return "Calendar";
      default:
        return "Circle";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row justify-between items-center rounded-lg p-4 mb-3 bg-white"
      style={{ minHeight: 64 }}
    >
      <View className="flex-1 mr-3">
        <Text
          className="text-base font-medium text-black"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {option.option}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">Tipo: {option.type}</Text>
      </View>

      <Icon name={getIconName(option.type)} size={20} color="black" />
    </TouchableOpacity>
  );
};
