import { useState } from "react";
import { useListOrders } from "@/services";

export default function useViewModel() {
  const { data: serviceOrders, isPending } = useListOrders();
  const [selected, setSelected] = useState<number | null>(null);

  return { selected, serviceOrders, isPending, setSelected };
}
