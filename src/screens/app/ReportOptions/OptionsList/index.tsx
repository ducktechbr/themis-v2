import { View, FlatList } from "react-native";
import { OptionItem } from "./OptionItem";
import { Option } from "@/types";
import { useState } from "react";

type OptionsListProps = {
  options: Option[];
};

export const OptionsList = ({ options }: OptionsListProps) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  const handleOptionPress = (option: Option, index: number) => {
    setSelectedOptionIndex(selectedOptionIndex === index ? null : index);
    console.log("Option pressed:", option, "Index:", index);
  };

  return (
    <View>
      <FlatList
        data={options}
        keyExtractor={(item, index) => `${item.option}-${index}`}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OptionItem
            option={item}
            isSelected={selectedOptionIndex === index}
            onPress={() => handleOptionPress(item, index)}
          />
        )}
      />
    </View>
  );
};
