import { useState } from "react";
import { View, FlatList } from "react-native";

import { ReportPages, Section } from "@/types";
import { ListItem } from "./ListItem";

type SectionEntry = [string, Section];

type ReportPagesListProps = {
  reportPages: ReportPages;
};

export const ReportPagesList = ({ reportPages }: ReportPagesListProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const sections: SectionEntry[] = Object.entries(reportPages);

  const handleToggleSection = (sectionTitle: string) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <View>
      <FlatList
        data={sections}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={() => <View className="my-3" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem
            title={item[0]}
            section={item[1]}
            isOpen={openSection === item[0]}
            onToggle={() => handleToggleSection(item[0])}
          />
        )}
      />
    </View>
  );
};
