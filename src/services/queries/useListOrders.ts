import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/order";
import { ServiceOrder } from "@/types";

export const useListOrders = () => {
  return useQuery<ServiceOrder[]>({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    staleTime: 1000 * 60 * 5,
  });
};
