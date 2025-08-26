import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useGetReportPages } from "@/services/queries";
import { useRouteParams } from "@/hooks";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId } = useRouteParams("ReportPages");
  const { setCurrentReportId } = useReportStore();
  const {
    data: reportPages,
    isPending,
    error,
    refetch,
  } = useGetReportPages(reportId!);

  useEffect(() => {
    if (reportId) {
      setCurrentReportId(reportId);
    }
  }, [reportId, setCurrentReportId]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return { reportPages, isPending, error, reportId };
}
