import { View, FlatList } from "react-native";

import { ReportData, Section } from "@/types";
import { ListItem } from "./ListItem";

type SectionEntry = [string, Section];

type ReportPagesListProps = {
  reportData: ReportData;
};

export const ReportPagesList = ({ reportData }: ReportPagesListProps) => {
  const sections: SectionEntry[] = Object.entries(reportData);

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
