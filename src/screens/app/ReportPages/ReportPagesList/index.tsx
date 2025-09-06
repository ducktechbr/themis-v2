import { FlatList, View } from "react-native";

import { ListItem } from "./ListItem";

import { ReportPages, Section } from "@/types";

type SectionEntry = [string, Section];

type ReportPagesListProps = {
  reportPages: ReportPages;
};

export const ReportPagesList = ({ reportPages }: ReportPagesListProps) => {
  const sections: SectionEntry[] = Object.entries(reportPages);

  return (
    <View>
      <FlatList
        data={sections}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={() => <View className="my-3" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
};
