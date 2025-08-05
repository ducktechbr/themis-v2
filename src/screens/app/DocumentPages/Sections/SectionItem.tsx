import { View, Text, TouchableOpacity } from "react-native";
import { Item } from "@/types";
import { cn } from "@/utils";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItem,
  DropDownItemSeparator,
} from "@/components/DropDown";

type SectionItemProps = {
  sectionTitle: string;
  fulfilled: boolean;
  items: Item[];
};

export const SectionItem = ({
  sectionTitle,
  fulfilled,
  items,
}: SectionItemProps) => {
  return (
    <DropDown>
      <DropDownTrigger>
        <TouchableOpacity
          className={cn(
            "rounded p-4 gap-2",
            fulfilled ? "bg-success" : "bg-zinc-100"
          )}
          style={{ shadowOpacity: 0.3, shadowOffset: { width: 5, height: 5 } }}
        >
          <View className="flex-row gap-2 items-center justify-between">
            <Text
              className={cn(
                "uppercase font-semibold text-lg",
                fulfilled ? "text-neutral-300" : "text-neutral-700"
              )}
            >
              {sectionTitle}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text
                className={cn(
                  "text-sm",
                  fulfilled ? "text-neutral-300" : "text-neutral-600"
                )}
              >
                {items.filter((item) => item.fulfilled).length}/{items.length}
              </Text>
              <View
                className={cn(
                  "w-3 h-3 rounded-full",
                  fulfilled ? "bg-neutral-300" : "bg-neutral-400"
                )}
              />
            </View>
          </View>
          <View className="flex-row gap-2 items-center">
            <Text
              className={cn(
                "uppercase text-sm",
                fulfilled ? "text-neutral-300" : "text-neutral-600"
              )}
            >
              Status:
            </Text>
            <Text
              className={cn(
                "uppercase font-semibold text-sm",
                fulfilled ? "text-neutral-300" : "text-neutral-700"
              )}
            >
              {fulfilled ? "Concluído" : "Pendente"}
            </Text>
          </View>
        </TouchableOpacity>
      </DropDownTrigger>
      <DropDownContent>
        <DropDownLabel labelTitle="Itens da Seção" />
        {items.map((item, index) => (
          <View key={item.refcod}>
            <DropDownItem
              className={cn(item.fulfilled ? "bg-success/20" : "bg-zinc-50")}
            >
              <View className="flex-row items-center justify-between">
                <Text
                  className={cn(
                    "flex-1 text-sm",
                    item.fulfilled ? "text-neutral-700" : "text-neutral-600"
                  )}
                >
                  {item.itemTitle}
                </Text>
                <View
                  className={cn(
                    "w-2 h-2 rounded-full ml-2",
                    item.fulfilled ? "bg-success" : "bg-neutral-400"
                  )}
                />
              </View>
            </DropDownItem>
            {index < items.length - 1 && <DropDownItemSeparator />}
          </View>
        ))}
      </DropDownContent>
    </DropDown>
  );
};
