import { Dispatch, SetStateAction } from "react";
import { View, FlatList, TextInput } from "react-native";
import { ServiceOrder } from "@/types";
import { ListItem } from "./ListItem";
import { useState } from "react";

type ReportsListProps = {
  serviceOrders: ServiceOrder[];
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
};

export const ReportsList = ({
  serviceOrders,
  selected,
  setSelected,
}: ReportsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = serviceOrders.filter((order) =>
    Object.values(order)
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
        data={filteredOrders}
        ItemSeparatorComponent={() => <View className="my-2" />}
        renderItem={({ item }) => (
          <ListItem
            serviceOrder={item}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        keyExtractor={(item) => String(item.id_service_order)}
      />
    </View>
  );
};
