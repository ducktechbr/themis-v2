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
    "duplicate",
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
    <View className="rounded-b-lg bg-secondary p-4">
      {section.duplicatable && isOpen && (
        <View className="flex-row gap-3 mb-3">
          <TouchableOpacity
            className="flex-row items-center gap-2 border-2 p-2 rounded border-white flex-1"
            onPress={handleDuplicate}
          >
            <Icon name="Copy" size={20} color="#d4d4d4" />
            <Text
              className="text-neutral-300 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Duplicar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center gap-2 border-2 p-2 rounded border-white flex-1"
            onPress={handleRename}
          >
            <Icon name="Pencil" size={20} color="#d4d4d4" />
            <Text
              className="text-neutral-300 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Renomear
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {section.itens.map((item: Item, index: number) => (
        <TouchableOpacity
          onPress={() => {
            setReportStore({ refcod: item.refcod });
            navigate("ReportQuestions");
          }}
          key={item.refcod}
          className={cn(
            "flex-row justify-between items-center rounded-lg",
            item.fulfilled
              ? "bg-secondary border border-ascent"
              : "bg-secondary border-2 border-neutral-700",
            index !== section.itens.length - 1 && "mb-3",
          )}
          style={{
            minHeight: SPACING.ITEM_MIN_HEIGHT,
            padding: SPACING.ITEM_PADDING,
          }}
        >
          <Text
            className={cn(
              "text-sm flex-1 mr-3",
              item.fulfilled ? "text-white" : "text-neutral-300",
            )}
            testID="item-title"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.itemTitle}
          </Text>
          <View className="flex-shrink-0">
            {item.fulfilled ? (
              <Icon name="CircleCheck" size={20} color="#22c55e" />
            ) : (
              <Icon name="Circle" size={20} color="#d4d4d4" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View
      className={cn(
        section.fulfilled ? "border-ascent" : "border-neutral-700",
        "rounded-lg shadow-sm bg-secondary border-2",
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
        <View className="flex-row items-center gap-3 flex-1">
          <Icon
            name={section.fulfilled ? "Layers" : "Layers2"}
            size={20}
            color={section.fulfilled ? "#22c55e" : "#737373"}
          />
          <Text
            className={cn(
              "text-sm font-semibold text-neutral-300 flex-1",
              section.fulfilled ? "text-neutral-300" : "text-neutral-500",
            )}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>

        <View
          className={cn(
            "ml-2 flex-shrink-0",
            section.duplicatable && isOpen ? "self-start" : "self-center",
          )}
        >
          <Animated.View style={chevronStyle}>
            <Icon
              name="ChevronDown"
              size={20}
              color={section.fulfilled ? "#d4d4d4" : "#737373"}
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
