import { ImagePickerAsset } from "expo-image-picker";
import { useCallback } from "react";
import { FlatList, View } from "react-native";

import { OptionItem } from "./OptionItem";

import { MainButton } from "@/components";
import { useAppNavigation } from "@/hooks";
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
  const { goBack } = useAppNavigation();

  const keyExtractor = useCallback(
    (item: Option, index: number) => `${item.option}-${index}`,
    [],
  );

  return (
    <View className="flex-1">
      <FlatList
        data={options.options}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        renderItem={({ item, index }) => (
          <OptionItem
            option={item}
            questionTitle={options.question_title}
            optionIndex={index}
            shouldAutoOpen={
              (imageSource === "camera" || imageSource === "gallery") &&
              item.type === OptionTypeEnum.IMAGE &&
              !!imageAnswer
            }
          />
        )}
      />
      <View className="pb-5">
        <MainButton title="Feito!" onPress={goBack} />
      </View>
    </View>
  );
};
