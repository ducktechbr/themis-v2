import { useGetReportPages } from "@/services/queries";
import { useRouteParams } from "@/hooks";

export default function useViewModel() {
  const { reportId } = useRouteParams("ReportPages");
  const { data: reportPages, isPending, error } = useGetReportPages(reportId!);

  return { reportPages, isPending, error, reportId };
}
