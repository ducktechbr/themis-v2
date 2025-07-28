import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ServiceOrder } from "@/types";
import { cn } from "@/utils";

type ListItemProps = {
  serviceOrder: ServiceOrder;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
};

export const ListItem = ({
  serviceOrder,
  selected,
  setSelected,
}: ListItemProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "rounded p-2 gap-2",
        selected === serviceOrder.id_service_order
          ? "bg-success"
          : "bg-zinc-100"
      )}
      style={{ shadowOpacity: 0.3, shadowOffset: { width: 5, height: 5 } }}
      onPress={() => setSelected(serviceOrder.id_service_order)}
    >
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          documento:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {serviceOrder.type_service_order}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          agência:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {serviceOrder.uniorg}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          local:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {serviceOrder.local}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          n˚ de serviço:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selected === serviceOrder.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {serviceOrder.id_service_order}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
