import { useState } from "react";
import { Text, Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Section, Item } from "@/types";
import { cn } from "@/utils";
import { Icon } from "@/components/";

type ListItemProps = {
  title: string;
  section: Section;
};

export const ListItem = ({ title, section }: ListItemProps) => {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

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

  // Renderiza o conteúdo para medir altura
  const renderContent = () => (
    <View className={"rounded-b-lg bg-white"}>
      {section.itens.map((item: Item) => (
        <View
          key={item.refcod}
          className="flex-row justify-between items-center my-2 bg-red-500"
        >
          <Text className="text-base" testID="item-title">
            {item.itemTitle}
          </Text>
          {item.fulfilled ? (
            <Text className="text-green-600" testID="item-status">
              ✓
            </Text>
          ) : (
            <Text className="text-yellow-600" testID="item-status">
              •
            </Text>
          )}
        </View>
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

      {/* Conteúdo oculto para medir altura */}
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

      {/* Container animado que expande/colapsa como gaveta */}
      <Animated.View style={animatedStyle}>{renderContent()}</Animated.View>
    </View>
  );
};
