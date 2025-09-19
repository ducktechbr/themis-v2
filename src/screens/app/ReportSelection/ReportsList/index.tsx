import { useState } from "react";
import { FlatList, TextInput, View } from "react-native";

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
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <View className="flex-1">
      <TextInput
        className="bg-secondary p-4 text-white font-semibold rounded shadow-xl mb-3"
        placeholder="Pesquisar"
        placeholderTextColor="#aaa"
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
