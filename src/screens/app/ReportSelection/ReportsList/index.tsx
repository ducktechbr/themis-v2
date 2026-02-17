import { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";

import { ListItem } from "./ListItem";

import { SearchInput } from "@/components";
import { Report } from "@/types";

type ReportsListProps = {
  reports: Report[];
};

export const ReportsList = ({ reports }: ReportsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = useMemo(
    () =>
      reports.filter((report) =>
        Object.values(report)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    [reports, searchTerm],
  );

  const renderItem = useCallback(
    ({ item }: { item: Report }) => <ListItem report={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: Report) => String(item.id_service_order),
    [],
  );

  return (
    <View className="flex-1">
      <SearchInput
        placeholder="Pesquisar por endereço, OS, tipo..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="mb-3"
      />
      <FlatList
        data={filteredReports}
        contentContainerStyle={{ paddingBottom: 30 }}
        ItemSeparatorComponent={() => <View className="my-2" />}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        removeClippedSubviews
      />
    </View>
  );
};
