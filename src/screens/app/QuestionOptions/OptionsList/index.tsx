import { View, FlatList } from "react-native";
import { QuestionOptionsResponse } from "@/types";
import { OptionItem } from "./OptionItem";

type OptionsListProps = {
  questionOptions: QuestionOptionsResponse;
};

export const OptionsList = ({ questionOptions }: OptionsListProps) => {
  const handleOptionPress = (option: import("@/types").QuestionOption) => {
    // TODO: Implementar navegação para responder a opção
    console.log("Option pressed:", option);
  };

  return (
    <View>
      <FlatList
        data={questionOptions.options}
        keyExtractor={(item, index) => `${item.option}-${index}`}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OptionItem option={item} onPress={() => handleOptionPress(item)} />
        )}
      />
    </View>
  );
};
