import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useAppNavigation } from "@/hooks";
import { useGetReports } from "@/hooks/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { data: reports, isPending, refetch } = useGetReports();
  const { reportId } = useReportStore();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const { navigate } = useAppNavigation();

  return { reports, isPending, navigate, reportId };
}
