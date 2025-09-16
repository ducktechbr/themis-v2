import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useGetReportOptions } from "@/hooks/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId, refcod, questionId, imageAnswer, imageSource } =
    useReportStore();

  const {
    data: options,
    isPending,
    error,
    refetch,
  } = useGetReportOptions(reportId!, refcod!, questionId!);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return {
    options,
    isPending,
    error,
    questionId,
    imageAnswer,
    imageSource,
  };
}
