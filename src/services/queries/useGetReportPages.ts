import { useQuery } from "@tanstack/react-query";
import { getReportPages } from "@/services/report";
import { ReportData } from "@/types";

export const useGetReportPages = (reportId: number) => {
  return useQuery<ReportData>({
    queryKey: ["documentPages", reportId],
    queryFn: () => getReportPages(reportId),
    staleTime: 1000 * 60 * 5,
    enabled: !!reportId,
  });
};
