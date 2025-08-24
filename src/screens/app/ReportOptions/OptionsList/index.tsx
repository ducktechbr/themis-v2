import { View, FlatList } from "react-native";
import { OptionItem } from "./OptionItem";
import { Option } from "@/types";
import { useState } from "react";

type OptionsListProps = {
  options: {
    question_title: string;
    options: Option[];
  };
};

export const OptionsList = ({ options }: OptionsListProps) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  const handleOptionPress = (index: number) => {
    setSelectedOptionIndex(selectedOptionIndex === index ? null : index);
    console.log("Option pressed at index:", index);
  };

  return (
    <View>
      <FlatList
        data={options.options}
        keyExtractor={(item, index) => `${item.option}-${index}`}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OptionItem
            option={item}
            questionTitle={options.question_title}
            optionIndex={index}
            isSelected={selectedOptionIndex === index}
            onPress={() => handleOptionPress(index)}
          />
        )}
      />
    </View>
  );
};
