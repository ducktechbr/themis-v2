import { useGetReportPages } from "@/services/queries";
import { useRouteParams } from "@/hooks";

export default function useViewModel() {
  const { reportId } = useRouteParams("ReportPages");
  const { data: reportData, isPending, error } = useGetReportPages(reportId);

  return { reportData, isPending, error };
}
