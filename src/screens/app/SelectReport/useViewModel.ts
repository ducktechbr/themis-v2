import { useState } from "react";
import { useGetReports } from "@/services/queries";
import { useAppNavigation } from "@/hooks";

export default function useViewModel() {
  const { data: reports, isPending } = useGetReports();
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const { navigate } = useAppNavigation();

  return { selectedReport, reports, isPending, setSelectedReport, navigate };
}
