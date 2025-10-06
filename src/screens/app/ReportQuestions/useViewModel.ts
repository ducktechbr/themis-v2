import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useGetReportQuestions } from "@/hooks/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId, refcod } = useReportStore();

  const {
    data: reportQuestions,
    isPending,
    error,
    refetch,
  } = useGetReportQuestions(reportId!, refcod!);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return {
    refcod,
    reportQuestions,
    isPending,
    error,
    reportId,
  };
}
