import { View, Text, TouchableOpacity } from "react-native";
import { Question } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components";

type QuestionItemProps = {
  questionId: string;
  question: Question;
  onPress?: () => void;
};

export const QuestionItem = ({
  questionId,
  question,
  onPress,
}: QuestionItemProps) => {
  console.log(question);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "flex-row justify-between items-center rounded-lg p-4 min-h-16",
        question.fulfilled ? "bg-success" : "bg-white"
      )}
    >
      <View className="flex-1 mr-3">
        <Text
          className={cn(
            "text-base font-medium",
            question.fulfilled ? "text-white" : "text-black"
          )}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {question.title}
        </Text>
      </View>

      {question.fulfilled ? (
        <Icon name="CircleCheck" size={20} color="white" />
      ) : (
        <Icon name="Circle" size={20} color="black" />
      )}
    </TouchableOpacity>
  );
};
