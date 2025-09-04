import { useAppNavigation } from "@/hooks";
import { useGetReports } from "@/services/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { data: reports, isPending } = useGetReports();
  const { reportId } = useReportStore();

  const { navigate } = useAppNavigation();

  return { reports, isPending, navigate, reportId };
}
