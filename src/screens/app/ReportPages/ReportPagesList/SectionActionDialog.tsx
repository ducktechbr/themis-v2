import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { Dialog, MainButton, useToast } from "@/components";
import { useDuplicateSection, useRenameSection } from "@/hooks/mutations";
import { useReportStore } from "@/stores";

type SectionActionDialogProps = {
  visible: boolean;
  onClose: () => void;
  sectionTitle: string;
  action: "duplicate" | "rename";
  refetchReport: () => void;
  onSuccess?: (sectionTitle: string) => void;
  onError?: (sectionTitle: string) => void;
};

export const SectionActionDialog = ({
  visible,
  onClose,
  sectionTitle,
  action,
  refetchReport,
  onSuccess,
}: SectionActionDialogProps) => {
  const [newSectionName, setNewSectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const { reportId } = useReportStore();
  const { toast } = useToast();

  const { mutate: duplicateSection } = useDuplicateSection({
    onSuccess: () => {
      setNewSectionName("");
      setLoading(false);
      refetchReport();
      toast("✅ Seção duplicada com sucesso!", "success");
      onSuccess?.(newSectionName.trim());
      onClose();
    },
    onError: () => {
      setLoading(false);
      toast("❌ Erro ao duplicar seção", "destructive");
      // Não chamamos onError callback pois só queremos o toast para erros
    },
  });

  const { mutate: renameSection } = useRenameSection({
    onSuccess: () => {
      setNewSectionName("");
      setLoading(false);
      refetchReport();
      toast("✅ Seção renomeada com sucesso!", "success");
      onSuccess?.(sectionTitle);
      onClose();
    },
    onError: () => {
      setLoading(false);
      toast("❌ Erro ao renomear seção", "destructive");
      // Não chamamos onError callback pois só queremos o toast para erros
    },
  });

  const validateSectionName = (name: string): boolean => {
    if (name.trim() === "") {
      toast("⚠️ O nome da seção não pode ser vazio", "destructive");
      setNewSectionName("");
      return false;
    }

    if (/^\d+$/.test(name.trim())) {
      toast("⚠️ O nome da seção não pode conter apenas números", "destructive");
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
        <Text className="text-xl font-semibold text-neutral-700 mb-4">
          {dialogTitle}
        </Text>

        <Text className="text-base text-neutral-500 mb-4">
          Seção: <Text className="font-medium">{sectionTitle}</Text>
        </Text>

        <TextInput
          className="border border-neutral-700 rounded-lg p-3 mb-6 text-base text-neutral-700 font-semibold"
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
