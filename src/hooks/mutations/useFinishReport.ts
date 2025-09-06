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
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<FinishReportResponse, Error, number>({
    mutationFn: finishReport,
    onSuccess: (data, reportId) => {
      // Invalidate all report-related queries
      queryClient.invalidateQueries({
        queryKey: ["reportPages", reportId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });

      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
};
