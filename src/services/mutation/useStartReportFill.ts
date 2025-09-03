import { useMutation } from "@tanstack/react-query";

import { startReportFill } from "../report/report.service";

export const useStartReportFill = () => {
  return useMutation({
    mutationFn: startReportFill,
    onSuccess: (data) => {
      console.log("Report fill started successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to start report fill:", error);
    },
  });
};
