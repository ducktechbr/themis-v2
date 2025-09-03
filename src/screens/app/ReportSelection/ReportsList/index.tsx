import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { View, FlatList, TextInput } from "react-native";

import { ListItem } from "./ListItem";

import { Report } from "@/types";

type ReportsListProps = {
  reports: Report[];
  selectedReport: number | null;
  setSelectedReport: Dispatch<SetStateAction<number | null>>;
};

export const ReportsList = ({
  reports,
  selectedReport,
  setSelectedReport,
}: ReportsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter((report) =>
    Object.values(report)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <View className="flex-1">
      <TextInput
        className="bg-zinc-100 p-4 text-neutral-800 font-semibold rounded shadow-xl mb-3"
        placeholder="Buscar..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredReports}
        contentContainerStyle={{ paddingBottom: 30 }}
        ItemSeparatorComponent={() => <View className="my-2" />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem
            report={item}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
          />
        )}
        keyExtractor={(item) => String(item.id_service_order)}
      />
    </View>
  );
};
