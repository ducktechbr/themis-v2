import { View, FlatList, TextInput } from "react-native";
import { ReportData } from "@/types";
import { SectionItem } from "./SectionItem";
import { useState } from "react";

type SectionsProps = {
  reportData: ReportData;
};

export const Sections = ({ reportData }: SectionsProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Convert ReportData object to array for FlatList
  const sectionsArray = Object.entries(reportData).map(([title, section]) => ({
    title,
    ...section,
  }));

  const filteredSections = sectionsArray.filter((section) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="flex-1">
      <TextInput
        className="bg-zinc-100 p-4 text-neutral-800 font-semibold rounded shadow-xl mb-3"
        placeholder="Buscar seção..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredSections}
        ItemSeparatorComponent={() => <View className="my-2" />}
        renderItem={({ item }) => (
          <SectionItem
            sectionTitle={item.title}
            fulfilled={item.fulfilled}
            items={item.itens}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};
