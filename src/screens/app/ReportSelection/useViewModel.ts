import { useState } from "react";

import { useAppNavigation } from "@/hooks";
import { useGetReports } from "@/services/queries";

export default function useViewModel() {
  const { data: reports, isPending } = useGetReports();
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const { navigate } = useAppNavigation();

  return { selectedReport, reports, isPending, setSelectedReport, navigate };
}
