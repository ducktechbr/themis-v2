import { Alert, FlatList, View } from "react-native";

import { ListItem } from "./ListItem";

import { MainButton, useToast } from "@/components";
import { useAppNavigation, useFinishReport } from "@/hooks";
import { useReportStore } from "@/stores";
import { ReportPages, Section } from "@/types";

type SectionEntry = [string, Section];

type ReportPagesListProps = {
  reportPages: ReportPages;
};

export const ReportPagesList = ({ reportPages }: ReportPagesListProps) => {
  const sections: SectionEntry[] = Object.entries(reportPages);
  const { reportId } = useReportStore();
  const { navigate } = useAppNavigation();
  const { toast } = useToast();
  const { mutate: finishReport, isPending } = useFinishReport({
    onSuccess: () => {
      toast("Relatório finalizado com sucesso!", "success");
      navigate("ReportSelection");
    },
    onError: () => {
      toast("Erro ao finalizar relatório", "destructive");
    },
  });

  const handleFinishReport = () => {
    Alert.alert(
      "Finalizar Relatório",
      "Tem certeza que deseja finalizar este relatório? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Finalizar",
          style: "destructive",
          onPress: () => finishReport(reportId!),
        },
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={sections}
        keyExtractor={(item) => item[0]}
        ItemSeparatorComponent={() => <View className="my-3" />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListItem item={item} />}
        ListFooterComponent={() => (
          <View className="mt-6 ">
            <MainButton
              title="Finalizar Relatório"
              onPress={handleFinishReport}
              disabled={isPending}
              variant="dark"
            />
          </View>
        )}
      />
    </View>
  );
};
