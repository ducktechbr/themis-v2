import { useMutation } from "@tanstack/react-query";

import { startReportFill } from "@/services";

export const useStartReportFill = () => {
  return useMutation({
    mutationFn: startReportFill,
  });
};
