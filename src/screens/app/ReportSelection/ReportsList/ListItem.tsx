import { Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components";
import { useReportStore } from "@/stores";
import { Report } from "@/types";
import { cn } from "@/utils";

type ListItemProps = {
  report: Report;
};

export const ListItem = ({ report }: ListItemProps) => {
  const { setReportStore, reportId } = useReportStore();
  return (
    <TouchableOpacity
      className={cn(
        "rounded p-2 gap-2 bg-secondary border-2 border-transparent relative shadow-xs",
        reportId === report.id_service_order
          ? "border-ascent"
          : "border-transparent",
      )}
      onPress={() =>
        setReportStore({
          reportId: report.id_service_order,
          responsibleId: report.user_id,
        })
      }
    >
      <View className="flex-row gap-2 items-center flex-1">
        <Icon
          name="MapPin"
          size={20}
          color={reportId === report.id_service_order ? "black" : "#d4d4d4"}
        />
        <Text
          className={cn(
            "uppercase font-semibold flex-1",
            reportId === report.id_service_order
              ? "text-neutral-800"
              : "text-neutral-500",
          )}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {report.address}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center flex-1">
        <Icon
          name="FileText"
          size={20}
          color={reportId === report.id_service_order ? "black" : "#d4d4d4"}
        />
        <Text
          className={cn(
            "uppercase font-semibold flex-1",
            reportId === report.id_service_order
              ? "text-neutral-800"
              : "text-neutral-500",
          )}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {report.type_service_order}
        </Text>
      </View>
      <View className="flex-row gap-2 items-center flex-1">
        <View className="flex-row gap-2 items-center flex-1">
          <Icon
            name="Tag"
            size={20}
            color={reportId === report.id_service_order ? "black" : "#d4d4d4"}
          />
          <Text
            className={cn(
              "uppercase font-semibold flex-1",
              reportId === report.id_service_order
                ? "text-neutral-800"
                : "text-neutral-500",
            )}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            OS {report.id_service_order}
          </Text>
        </View>

        <View className="flex-row gap-2 items-center flex-1">
          <Icon
            name="Building"
            size={20}
            color={reportId === report.id_service_order ? "black" : "#d4d4d4"}
          />
          <Text
            className={cn(
              "uppercase font-semibold flex-1",
              reportId === report.id_service_order
                ? "text-neutral-800"
                : "text-neutral-500",
            )}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {report.uniorg}
          </Text>
        </View>

        <View className="">
          {report.status_service_order === "G" && (
            <View className="flex-row gap-1 items-center p-1 rounded-md bg-warning">
              <Text className="text-white text-xs">Gerado</Text>
              <Icon name="Clock" size={14} color="#ffffff" />
            </View>
          )}
          {report.status_service_order === "I" && (
            <View className="flex-row gap-1 items-center p-1 rounded-md bg-success">
              <Text className="text-white text-xs">Iniciado</Text>
              <Icon name="Play" size={14} color="#ffffff" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
