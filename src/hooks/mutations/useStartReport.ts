import { useMutation, useQueryClient } from "@tanstack/react-query";

import { startReport } from "@/services/report";

type StartReportResponse = {
  status: string;
  message: string;
};

export const useStartReport = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<StartReportResponse, Error, number>({
    mutationFn: startReport,
    onSuccess: (data, reportId) => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
      queryClient.invalidateQueries({
        queryKey: ["documentPages", reportId],
      });

      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
};
