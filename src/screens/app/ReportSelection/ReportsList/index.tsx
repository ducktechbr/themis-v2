import { useState } from "react";
import { FlatList, View } from "react-native";

import { ListItem } from "./ListItem";

import { SearchInput } from "@/components";
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
      <SearchInput
        placeholder="Pesquisar"
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="mb-3"
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
