import { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
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
  highlightedItem?: string;
  highlightType?: "success" | "error";
  onSectionSuccess?: (sectionTitle: string) => void;
};

export const ListItem = ({
  item,
  refetchReport,
  highlightedItem,
  highlightType,
  onSectionSuccess,
}: ListItemProps) => {
  const [title, section] = item;
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState<"duplicate" | "rename">(
    "duplicate",
  );
  const animatedHeight = useSharedValue(0);
  const chevronRotation = useSharedValue(0);

  const bounceScale = useSharedValue(1);
  const borderOpacity = useSharedValue(0);

  const { navigate } = useAppNavigation();
  const { setReportStore } = useReportStore();

  const isHighlighted = highlightedItem === title;

  useEffect(() => {
    animatedHeight.value = withTiming(isOpen ? contentHeight : 0, {
      duration: 400,
    });
    chevronRotation.value = withTiming(isOpen ? 180 : 0, {
      duration: 300,
    });
  }, [isOpen, contentHeight]);

  useEffect(() => {
    if (isHighlighted && highlightType === "success") {
      bounceScale.value = 1;
      borderOpacity.value = 0;

      bounceScale.value = withSequence(
        withTiming(1.05, { duration: 200 }),
        withTiming(1.0, { duration: 200 }),
      );

      borderOpacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(2400, withTiming(0, { duration: 300 })),
      );
    }
  }, [isHighlighted, highlightType]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounceScale.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    opacity: borderOpacity.value,
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
            className="flex-row items-center gap-2 p-2 rounded bg-secondary flex-1"
            onPress={handleDuplicate}
          >
            <Icon name="Copy" size={20} color="#000000" />
            <Text
              className="text-black flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Duplicar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center gap-2 p-2 rounded bg-secondary flex-1"
            onPress={handleRename}
          >
            <Icon name="Pencil" size={20} color="#000000" />
            <Text
              className="text-black flex-1"
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
              ? "bg-success"
              : "bg-secondary border border-ascent ",
            index !== section.itens.length - 1 && "mb-3",
          )}
          style={{
            minHeight: SPACING.ITEM_MIN_HEIGHT,
            padding: SPACING.ITEM_PADDING,
          }}
        >
          <Text
            className={cn(
              "text-sm flex-1 mr-3 font-black",
              item.fulfilled ? "text-white" : "text-neutral-500",
            )}
            testID="item-title"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.itemTitle}
          </Text>
          <View className="flex-shrink-0">
            {item.fulfilled && (
              <Icon name="CircleCheck" size={20} color="#ffffff" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Animated.View style={bounceStyle}>
      <View
        className={cn(
          section.fulfilled ? "bg-success" : "bg-secondary",
          "rounded-lg shadow-sm relative",
        )}
      >
        {isHighlighted && highlightType === "success" && (
          <Animated.View
            style={[
              borderStyle,
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderWidth: 2,
                borderColor: "#f3842a",
                borderRadius: 8,
                zIndex: 10,
              },
            ]}
          />
        )}
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
              name={section.fulfilled ? "FileCheck2" : "FilePenLine"}
              size={24}
              color={section.fulfilled ? "#Ffff" : "#737373"}
            />
            <Text
              className={cn(
                "text-sm font-black flex-1",
                section.fulfilled ? "text-white" : "text-neutral-700",
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
          onSuccess={onSectionSuccess}
        />
      </View>
    </Animated.View>
  );
};
