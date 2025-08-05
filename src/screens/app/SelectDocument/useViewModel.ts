import { useEffect, useState } from "react";
import { useListOrders } from "@/services";
import { useAppNavigation } from "@/hooks";

export default function useViewModel() {
  const { data: serviceOrders, isPending } = useListOrders();
  const [selected, setSelected] = useState<number | null>(null);
  const { navigate } = useAppNavigation();

  return { selected, serviceOrders, isPending, setSelected, navigate };
}
