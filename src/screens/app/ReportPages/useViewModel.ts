import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import { useRouteParams } from "@/hooks";
import { useGetReportPages } from "@/services/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const routeParams = useRouteParams<"ReportPages">();
  const reportId = routeParams?.reportId;
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
