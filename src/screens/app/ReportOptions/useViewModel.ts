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

  console.log(options);

  return {
    options,
    isPending,
    error,
    currentQuestionId,
  };
}
