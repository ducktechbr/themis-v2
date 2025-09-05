import { useGetReportOptions } from "@/hooks/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { reportId, refcod, questionId } = useReportStore();

  const {
    data: options,
    isPending,
    error,
  } = useGetReportOptions(reportId!, refcod!, questionId!);

  return {
    options,
    isPending,
    error,
    questionId,
  };
}
