import { useEffect } from "react";
import { useGetReportPages } from "@/services/queries";
import { useRouteParams } from "@/hooks";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId } = useRouteParams("ReportPages");
  const { setCurrentReportId } = useReportStore();
  const { data: reportPages, isPending, error } = useGetReportPages(reportId!);

  useEffect(() => {
    if (reportId) {
      setCurrentReportId(reportId);
    }
  }, [reportId, setCurrentReportId]);

  return { reportPages, isPending, error, reportId };
}
