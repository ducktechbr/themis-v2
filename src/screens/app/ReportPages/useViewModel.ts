import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import {
  useGetCoordinates,
  useGetReportPages,
  useStartReportFill,
} from "@/hooks";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId } = useReportStore();

  const {
    isLoading,
    hasPermission,
    hasCoordinates,
    error: coordinatesError,
    retry: retryLocation,
    checkPermission: checkLocationPermission,
  } = useGetCoordinates();
  const { mutate: startReportFill, isPending: isStartingReport } =
    useStartReportFill();

  const {
    data: reportPages,
    isPending,
    error,
    refetch: refetchReport,
  } = useGetReportPages(reportId!);

  useEffect(() => {
    if (reportId) {
      startReportFill(reportId);
    }
  }, [reportId, startReportFill]);

  useFocusEffect(
    useCallback(() => {
      refetchReport();
    }, [refetchReport])
  );

  return {
    reportPages,
    isPending: isPending || isStartingReport,
    error,
    reportId,
    isLoading,
    hasPermission,
    hasCoordinates,
    coordinatesError,
    retryLocation,
    checkLocationPermission,
    refetchReport,
  };
}
