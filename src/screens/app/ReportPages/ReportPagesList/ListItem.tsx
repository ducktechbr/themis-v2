import { useState } from "react";
import { Text, Pressable, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Section, Item } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components/";
import { useAppNavigation } from "@/hooks";

type ListItemProps = {
  title: string;
  section: Section;
};

export const ListItem = ({ title, section }: ListItemProps) => {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const { navigate } = useAppNavigation();
  const toggleOpen = () => {
    const newOpen = !open;
    setOpen(newOpen);

    animatedHeight.value = withTiming(newOpen ? contentHeight : 0, {
      duration: 400,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const renderContent = () => (
    <View className="rounded-b-lg bg-white p-2">
      {section.itens.map((item: Item) => (
        <TouchableOpacity
          onPress={() => {
            navigate("ReportQuestions", { refcod: item.refcod });
          }}
          key={item.refcod}
          className={cn(
            "flex-row justify-between items-center  rounded-lg bg-neutral-300 h-14 px-4",
            item.fulfilled ? "bg-success" : "bg-neutral-300"
          )}
        >
          <Text
            className={cn(
              "text-base",
              item.fulfilled ? "text-white" : "text-black"
            )}
            testID="item-title"
          >
            {item.itemTitle}
          </Text>
          {item.fulfilled ? (
            <Icon
              name="CircleCheck"
              size={20}
              color={section.fulfilled ? "white" : "black"}
            />
          ) : (
            <Icon
              name="Circle"
              size={20}
              color={section.fulfilled ? "white" : "black"}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View
      className={cn(
        section.fulfilled ? "bg-success" : "bg-white",
        "rounded-lg"
      )}
    >
      <Pressable
        onPress={toggleOpen}
        className="p-4 flex-row justify-between items-center"
      >
        <Text
          className={cn(
            "text-lg font-semibold",
            section.fulfilled ? "text-white" : "text-black"
          )}
          testID="section-title"
        >
          {title}
        </Text>
        {/* <Text className="text-sm text-gray-500" testID="section-status">
          {section.fulfilled ? "Concluído" : "Pendente"}
        </Text> */}
        <Icon
          name={open ? "ChevronUp" : "ChevronDown"}
          size={20}
          color={section.fulfilled ? "white" : "black"}
        />
      </Pressable>

      <View
        style={{ position: "absolute", left: -9999, opacity: 0 }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (height > 0 && contentHeight !== height) {
            setContentHeight(height);
          }
        }}
      >
        {renderContent()}
      </View>

      <Animated.View style={animatedStyle}>{renderContent()}</Animated.View>
    </View>
  );
};
