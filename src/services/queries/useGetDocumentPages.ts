import { useQuery } from "@tanstack/react-query";
import { getDocumentPages } from "@/services/order";
import { ReportData } from "@/types";

export const useGetDocumentPages = (serviceOrderId: number) => {
  return useQuery<ReportData>({
    queryKey: ["documentPages", serviceOrderId],
    queryFn: () => getDocumentPages(serviceOrderId),
    staleTime: 1000 * 60 * 5,
    enabled: !!serviceOrderId,
  });
};
