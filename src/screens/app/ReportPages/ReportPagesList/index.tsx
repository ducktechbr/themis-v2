import { useCallback, useMemo, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import { ListItem } from "./ListItem";

import { Icon, MainButton, useToast } from "@/components";
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
  const sections: SectionEntry[] = useMemo(
    () => Object.entries(reportPages),
    [reportPages],
  );
  const { reportId, responsibleId } = useReportStore();
  const { user } = useAuthStore();
  const { navigate } = useAppNavigation();
  const { toast } = useToast();
  const canFinishReport = responsibleId == user.id;

  const [highlightedSection, setHighlightedSection] = useState<{
    title: string;
    type: "success" | "error";
    timestamp: number;
  } | null>(null);

  const handleSectionSuccess = (sectionTitle: string) => {
    setHighlightedSection({
      title: sectionTitle,
      type: "success",
      timestamp: Date.now(),
    });
  };

  const { mutate: finishReport, isPending } = useFinishReport({
    onSuccess: () => {
      toast("Relatório finalizado com sucesso!", "success");
      navigate("ReportSelection");
    },
    onError: (errorMessage) => {
      toast(errorMessage ?? "Erro ao finalizar relatório. Tente novamente.", "destructive");
    },
  });

  const keyExtractor = useCallback((item: SectionEntry) => item[0], []);

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
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View className="my-3" />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            refetchReport={refetchReport}
            highlightedItem={
              highlightedSection?.title === item[0]
                ? highlightedSection.title
                : undefined
            }
            highlightType={highlightedSection?.type}
            onSectionSuccess={handleSectionSuccess}
          />
        )}
        ListFooterComponent={() => (
          <View className="mb-10 mt-6">
            {canFinishReport && (
              <MainButton
                title="Finalizar ordem de serviço"
                onPress={handleFinishReport}
                disabled={isPending}
              />
            )}
            {!canFinishReport && (
              <View className="items-center gap-2">
                <Icon name="CircleAlert" size={24} color="#f3842a" />
                <Text className="flex-1 text-ascent text-center">
                  Somente o técnico responsável pode finalizar a ordem de
                  serviço.
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};
