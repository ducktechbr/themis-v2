import { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { SectionActionDialog } from "./SectionActionDialog";

import { Icon } from "@/components/";
import { useAppNavigation } from "@/hooks";
import { useReportStore } from "@/stores";
import { Item, Section } from "@/types";
import { cn } from "@/utils";

const SPACING = {
  HEADER_PADDING: 16,
  CONTENT_PADDING: 16,
  ITEM_PADDING: 16,
  ITEM_MARGIN: 12,
  ITEM_MIN_HEIGHT: 56,
  HEADER_MIN_HEIGHT: 64,
} as const;

type ListItemProps = {
  item: [string, Section];
  refetchReport: () => void;
};

export const ListItem = ({ item, refetchReport }: ListItemProps) => {
  const [title, section] = item;
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState<"duplicate" | "rename">(
    "duplicate"
  );
  const animatedHeight = useSharedValue(0);
  const chevronRotation = useSharedValue(0);
  const { navigate } = useAppNavigation();
  const { setReportStore } = useReportStore();

  useEffect(() => {
    animatedHeight.value = withTiming(isOpen ? contentHeight : 0, {
      duration: 400,
    });
    chevronRotation.value = withTiming(isOpen ? 180 : 0, {
      duration: 300,
    });
  }, [isOpen, contentHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  const handleDuplicate = () => {
    setDialogAction("duplicate");
    setDialogVisible(true);
  };

  const handleRename = () => {
    setDialogAction("rename");
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
  };

  const renderContent = () => (
    <View className="rounded-b-lg bg-white p-4">
      {section.itens.map((item: Item, index: number) => (
        <TouchableOpacity
          onPress={() => {
            setReportStore({ refcod: item.refcod });
            navigate("ReportQuestions");
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
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between"
        style={{
          minHeight: SPACING.HEADER_MIN_HEIGHT,
          padding: SPACING.HEADER_PADDING,
        }}
      >
        <View className="flex-1">
          <Text
            className={cn(
              "text-base font-semibold",
              section.fulfilled ? "text-white" : "text-black"
            )}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {section.duplicatable && isOpen && (
            <View className="flex-row gap-2 mt-5">
              <TouchableOpacity
                className="flex-row items-center gap-2 border p-1 rounded"
                onPress={handleDuplicate}
              >
                <Icon name="Copy" size={20} color="black" />
                <Text>Duplicar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center gap-2 border p-1 rounded"
                onPress={handleRename}
              >
                <Icon name="Pencil" size={20} color="black" />
                <Text>Renomear</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          className={cn(
            "ml-3",
            section.duplicatable && isOpen ? "self-start" : "self-center"
          )}
        >
          <Animated.View style={chevronStyle}>
            <Icon
              name="ChevronDown"
              size={20}
              color={section.fulfilled ? "white" : "black"}
            />
          </Animated.View>
        </View>
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

      <SectionActionDialog
        visible={dialogVisible}
        onClose={handleCloseDialog}
        sectionTitle={title}
        action={dialogAction}
        refetchReport={refetchReport}
      />
    </View>
  );
};
