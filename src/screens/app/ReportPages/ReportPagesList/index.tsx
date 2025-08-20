import { View, FlatList } from "react-native";

import { ReportPages, Section } from "@/types";
import { ListItem } from "./ListItem";

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
        ItemSeparatorComponent={() => <View className="my-2" />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem title={item[0]} section={item[1]} />
        )}
      />
    </View>
  );
};
