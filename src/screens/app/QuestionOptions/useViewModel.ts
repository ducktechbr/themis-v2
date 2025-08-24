import { useGetReportOptions } from "@/services/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { currentReportId, currentRefcod, currentQuestionId } =
    useReportStore();

  const {
    data: questionOptions,
    isPending,
    error,
  } = useGetReportOptions(currentReportId!, currentRefcod!, currentQuestionId!);

  return {
    questionOptions,
    isPending,
    error,
    currentQuestionId,
  };
}
