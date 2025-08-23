import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Report } from "@/types";
import { cn } from "@/utils";

type ListItemProps = {
  report: Report;
  selectedReport: number | null;
  setSelectedReport: Dispatch<SetStateAction<number | null>>;
};

export const ListItem = ({
  report,
  selectedReport,
  setSelectedReport,
}: ListItemProps) => {
  const selectReport = () => {
    setSelectedReport(report.id_service_order);
  };

  return (
    <TouchableOpacity
      className={cn(
        "rounded p-2 gap-2",
        selectedReport === report.id_service_order
          ? "bg-success"
          : "bg-zinc-100"
      )}
      style={{ shadowOpacity: 0.3, shadowOffset: { width: 5, height: 5 } }}
      onPress={selectReport}
    >
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          documento:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {report.type_service_order}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          agência:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {report.uniorg}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          local:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {report.local}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <Text
          className={cn(
            "uppercase",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          n˚ de serviço:
        </Text>
        <Text
          className={cn(
            "uppercase font-semibold",
            selectedReport === report.id_service_order
              ? "text-neutral-300"
              : "text-neutral-700"
          )}
        >
          {report.id_service_order}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
