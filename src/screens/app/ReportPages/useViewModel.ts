import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import { useStartReportFill } from "@/services/mutations";
import { useGetReportPages } from "@/services/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId } = useReportStore();

  const { mutate: startReportFill, isPending: isStartingReport } =
    useStartReportFill();

  const {
    data: reportPages,
    isPending,
    error,
    refetch,
  } = useGetReportPages(reportId!);

  useEffect(() => {
    if (reportId) {
      startReportFill(reportId);
    }
  }, [reportId, startReportFill]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return {
    reportPages,
    isPending: isPending || isStartingReport,
    error,
    reportId,
  };
}
