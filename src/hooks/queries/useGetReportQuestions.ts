import { useQuery } from "@tanstack/react-query";

import { getReportQuestions } from "@/services/report";
import { ReportQuestions } from "@/types";

export const useGetReportQuestions = (reportId: number, refcod: number) => {
  return useQuery<ReportQuestions>({
    queryKey: ["reportQuestions", reportId, refcod],
    queryFn: () => getReportQuestions(reportId, refcod),
    staleTime: 1000 * 60 * 5,
    enabled: !!reportId && !!refcod,
  });
};
