import { useGetReportOptions } from "@/services/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { currentReportId, currentRefcod, currentQuestionId } =
    useReportStore();

  const {
    data: options,
    isPending,
    error,
  } = useGetReportOptions(currentReportId!, currentRefcod!, currentQuestionId!);

  return {
    options,
    isPending,
    error,
    currentQuestionId,
  };
}
