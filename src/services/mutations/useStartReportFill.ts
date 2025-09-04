import { useMutation } from "@tanstack/react-query";

import { startReportFill } from "../report/report.service";

export const useStartReportFill = () => {
  return useMutation({
    mutationFn: startReportFill,
  });
};
