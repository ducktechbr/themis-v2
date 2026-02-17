import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishReport } from "@/services/report";

type FinishReportResponse = {
  success: boolean;
  message?: string;
};

export const useFinishReport = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error?: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<FinishReportResponse, Error, number>({
    mutationFn: finishReport,
    onSuccess: (data, reportId) => {
      queryClient.invalidateQueries({
        queryKey: ["documentPages", reportId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });

      onSuccess();
    },
    onError: (error) => {
      if (error.message.includes("Network Error")) {
        onError("Sem conexão com a internet. Verifique sua rede e tente novamente.");
      } else {
        onError("Erro ao finalizar relatório. Tente novamente.");
      }
    },
  });
};
