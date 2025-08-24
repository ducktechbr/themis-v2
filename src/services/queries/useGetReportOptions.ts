import { useQuery } from "@tanstack/react-query";
import { getReportOptions } from "@/services/report";
import { OptionsResponse } from "@/types";

export const useGetReportOptions = (
  reportId: number,
  refcod: number,
  questionId: number
) => {
  return useQuery<OptionsResponse>({
    queryKey: ["reportOptions", reportId, refcod, questionId],
    queryFn: () => getReportOptions(reportId, refcod, questionId),
    staleTime: 1000 * 60 * 5,
    enabled: !!reportId && !!refcod && !!questionId,
  });
};
