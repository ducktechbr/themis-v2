import { useState } from "react";
import { View, FlatList, TextInput } from "react-native";

import { ListItem } from "./ListItem";

import { Report } from "@/types";

type ReportsListProps = {
  reports: Report[];
};

export const ReportsList = ({ reports }: ReportsListProps) => {
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
        renderItem={({ item }) => <ListItem report={item} />}
        keyExtractor={(item) => String(item.id_service_order)}
      />
    </View>
  );
};
