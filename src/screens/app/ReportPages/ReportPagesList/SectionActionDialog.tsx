import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { Dialog, MainButton } from "@/components";
import { useDuplicateSection, useRenameSection } from "@/hooks/mutations";
import { useReportStore } from "@/stores";

type SectionActionDialogProps = {
  visible: boolean;
  onClose: () => void;
  sectionTitle: string;
  action: "duplicate" | "rename";
  refetchReport: () => void;
};

export const SectionActionDialog = ({
  visible,
  onClose,
  sectionTitle,
  action,
  refetchReport,
}: SectionActionDialogProps) => {
  const [newSectionName, setNewSectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const { reportId } = useReportStore();

  const { mutate: duplicateSection } = useDuplicateSection({
    onSuccess: () => {
      setNewSectionName("");
      setLoading(false);
      refetchReport();
      onClose();
    },
    onError: () => {
      setLoading(false);
      Alert.alert("Erro ao duplicar seção");
    },
  });

  const { mutate: renameSection } = useRenameSection({
    onSuccess: () => {
      setNewSectionName("");
      setLoading(false);
      refetchReport();
      onClose();
    },
    onError: () => {
      setLoading(false);
      Alert.alert("Erro ao renomear seção");
    },
  });

  const validateSectionName = (name: string): boolean => {
    if (name.trim() === "") {
      Alert.alert("O nome da seção não pode ser vazio");
      setNewSectionName("");
      return false;
    }

    if (/^\d+$/.test(name.trim())) {
      Alert.alert("O nome da seção não pode conter apenas números");
      setNewSectionName("");
      return false;
    }

    return true;
  };

  const handleAction = () => {
    if (!validateSectionName(newSectionName)) {
      return;
    }

    setLoading(true);

    const params = {
      documentId: reportId!,
      sectionTitle,
      newSectionTitle: newSectionName.trim(),
    };

    if (action === "duplicate") {
      duplicateSection(params);
    } else {
      renameSection(params);
    }
  };

  const handleClose = () => {
    setNewSectionName("");
    setLoading(false);
    onClose();
  };

  const dialogTitle =
    action === "duplicate" ? "Duplicar Seção" : "Renomear Seção";
  const inputPlaceholder =
    action === "duplicate" ? "Nome da nova seção" : "Novo nome da seção";
  const buttonTitle = action === "duplicate" ? "Duplicar" : "Renomear";

  return (
    <Dialog open={visible} onOpenChange={handleClose}>
      <View className="w-full">
        <Text className="text-xl font-semibold text-neutral-300 mb-4">
          {dialogTitle}
        </Text>

        <Text className="text-base text-neutral-300 mb-4">
          Seção: <Text className="font-medium">{sectionTitle}</Text>
        </Text>

        <TextInput
          className="border border-neutral-700 rounded-lg p-3 mb-6 text-base text-neutral-300 font-semibold"
          placeholder={inputPlaceholder}
          placeholderTextColor="#737373"
          value={newSectionName}
          onChangeText={setNewSectionName}
          autoCapitalize="characters"
          editable={!loading}
        />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <MainButton
              title="Cancelar"
              onPress={handleClose}
              disabled={loading}
              variant="error"
            />
          </View>
          <View className="flex-1">
            <MainButton
              title={buttonTitle}
              onPress={handleAction}
              variant="success"
              disabled={loading || newSectionName.trim() === ""}
            />
          </View>
        </View>
      </View>
    </Dialog>
  );
};
