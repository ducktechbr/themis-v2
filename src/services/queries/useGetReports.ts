import { useQuery } from "@tanstack/react-query";

import { getReports } from "@/services/report";
import { Report } from "@/types";

export const useGetReports = () => {
  return useQuery<Report[]>({
    queryKey: ["reports"],
    queryFn: () => getReports(),
    staleTime: 1000 * 60 * 5,
  });
};
