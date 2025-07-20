import { useListOrders } from "@/services";

export default function useViewModel() {
  const { data } = useListOrders();

  console.log(data);

  return { data };
}
