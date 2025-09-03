import { View, FlatList } from "react-native";

import { OptionItem } from "./OptionItem";

import { Option } from "@/types";

type OptionsListProps = {
  options: {
    question_title: string;
    options: Option[];
  };
};

export const OptionsList = ({ options }: OptionsListProps) => {
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
          />
        )}
      />
    </View>
  );
};
