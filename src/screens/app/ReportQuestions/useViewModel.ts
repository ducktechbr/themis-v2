import { useGetReportQuestions } from "@/hooks/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId, refcod } = useReportStore();

  const {
    data: reportQuestions,
    isPending,
    error,
  } = useGetReportQuestions(reportId!, refcod!);

  return {
    refcod,
    reportQuestions,
    isPending,
    error,
    reportId,
  };
}
