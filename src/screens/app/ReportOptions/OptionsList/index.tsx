import { ImagePickerAsset } from "expo-image-picker";
import { FlatList, View } from "react-native";

import { OptionItem } from "./OptionItem";

import { Option, OptionTypeEnum } from "@/types";

type OptionsListProps = {
  options: {
    question_title: string;
    options: Option[];
  };
  imageAnswer: ImagePickerAsset | null;
  imageSource: "camera" | "gallery" | null;
};

export const OptionsList = ({
  options,
  imageAnswer,
  imageSource,
}: OptionsListProps) => {
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
            shouldAutoOpen={
              imageSource === "camera" &&
              item.type === OptionTypeEnum.IMAGE &&
              !!imageAnswer
            }
          />
        )}
      />
    </View>
  );
};
