import { View, Text, TouchableOpacity } from "react-native";
import { Option, OptionTypeEnum } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components";
import { useOptionAnswer } from "@/services/mutation";
import { useReportStore } from "@/stores";

type OptionItemProps = {
  option: Option;
  isSelected?: boolean;
  onPress?: () => void;
};

export const OptionItem = ({
  option,
  isSelected = false,
  onPress,
}: OptionItemProps) => {
  const { mutate: sendAnswer, isPending } = useOptionAnswer();
  const { currentReportId, currentRefcod, currentQuestionId } =
    useReportStore();

  // sendAnswer({
  //   reportId: currentReportId,
  //   refcod: currentRefcod,
  //   questionId: currentQuestionId,
  //   optionId: 0,
  //   answer: true,
  // });

  return (
    <TouchableOpacity
      onPress={onPress}
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
  );
};
