import { useGetReportQuestions } from "@/services/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { currentReportId, currentRefcod } = useReportStore();

  const {
    data: reportQuestions,
    isPending,
    error,
  } = useGetReportQuestions(currentReportId!, currentRefcod!);

  return {
    refcod: currentRefcod,
    reportQuestions,
    isPending,
    error,
    currentReportId,
  };
}
