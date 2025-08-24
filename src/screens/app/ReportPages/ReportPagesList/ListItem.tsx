import { useState, useEffect } from "react";
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

const SPACING = {
  HEADER_PADDING: 16,
  CONTENT_PADDING: 16,
  ITEM_PADDING: 16,
  ITEM_MARGIN: 12,
  ITEM_MIN_HEIGHT: 56,
  HEADER_MIN_HEIGHT: 64,
} as const;

type ListItemProps = {
  title: string;
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
};

export const ListItem = ({
  title,
  section,
  isOpen,
  onToggle,
}: ListItemProps) => {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const { navigate } = useAppNavigation();

  useEffect(() => {
    animatedHeight.value = withTiming(isOpen ? contentHeight : 0, {
      duration: 400,
    });
  }, [isOpen, contentHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const renderContent = () => (
    <View className="rounded-b-lg bg-white p-4">
      {section.itens.map((item: Item, index: number) => (
        <TouchableOpacity
          onPress={() => {
            navigate("ReportQuestions", { refcod: item.refcod });
          }}
          key={item.refcod}
          className={cn(
            "flex-row justify-between items-center rounded-lg",
            item.fulfilled ? "bg-success" : "bg-neutral-200",
            index !== section.itens.length - 1 && "mb-3"
          )}
          style={{
            minHeight: SPACING.ITEM_MIN_HEIGHT,
            padding: SPACING.ITEM_PADDING,
          }}
        >
          <Text
            className={cn(
              "text-base flex-1 mr-3",
              item.fulfilled ? "text-white" : "text-black"
            )}
            testID="item-title"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.itemTitle}
          </Text>
          {item.fulfilled ? (
            <Icon name="CircleCheck" size={20} color="white" />
          ) : (
            <Icon name="Circle" size={20} color="black" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View
      className={cn(
        section.fulfilled ? "bg-success" : "bg-white",
        "rounded-lg shadow-sm"
      )}
    >
      <Pressable
        onPress={onToggle}
        className="flex-row justify-between items-center"
        style={{
          minHeight: SPACING.HEADER_MIN_HEIGHT,
          padding: SPACING.HEADER_PADDING,
        }}
      >
        <Text
          className={cn(
            "text-base font-semibold flex-1 mr-3",
            section.fulfilled ? "text-white" : "text-black"
          )}
          testID="section-title"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Icon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
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
