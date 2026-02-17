import { useAppNavigation } from "@/hooks";
import { useStartReport } from "@/hooks/mutations";
import { useGetReports } from "@/hooks/queries";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { data: reports, isPending } = useGetReports();
  const { reportId } = useReportStore();

  const { mutate: startReport, isPending: isStartingReport } = useStartReport({
    onSuccess: () => {
      navigate("ReportPages");
    },
    onError: () => {},
  });

  const { navigate } = useAppNavigation();

  const handleNext = () => {
    if (reportId) {
      startReport(reportId);
    }
  };

  return {
    reports,
    isPending: isPending || isStartingReport,
    navigate,
    reportId,
    handleNext,
  };
}
