import { Alert, FlatList, Text, View } from "react-native";

import { ListItem } from "./ListItem";

import { MainButton, useToast } from "@/components";
import { useAppNavigation, useFinishReport } from "@/hooks";
import { useAuthStore, useReportStore } from "@/stores";
import { ReportPages, Section } from "@/types";

type SectionEntry = [string, Section];

type ReportPagesListProps = {
  reportPages: ReportPages;
  refetchReport: () => void;
};

export const ReportPagesList = ({
  reportPages,
  refetchReport,
}: ReportPagesListProps) => {
  const sections: SectionEntry[] = Object.entries(reportPages);
  const { reportId, responsibleId } = useReportStore();
  const { user } = useAuthStore();
  const { navigate } = useAppNavigation();
  const { toast } = useToast();
  const canFinishReport = responsibleId !== user.id;
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
      "Finalizar ordem de serviço",
      "Tem certeza que deseja finalizar esta ordem de serviço? Esta ação só poderá ser desfeita pelo administrador.",
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
      ],
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
        renderItem={({ item }) => (
          <ListItem item={item} refetchReport={refetchReport} />
        )}
        ListFooterComponent={() => (
          <View className="mb-10 mt-6">
            {canFinishReport && (
              <MainButton
                title="Finalizar ordem de serviço"
                onPress={handleFinishReport}
                disabled={isPending}
                variant="dark"
              />
            )}
            {!canFinishReport && (
              <Text className="text-neutral-600 text-center">
                Somente o técnico responsável pode finalizar a ordem de serviço.
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
