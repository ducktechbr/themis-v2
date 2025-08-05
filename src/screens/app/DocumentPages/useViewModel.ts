import { useDocumentStore } from "@/stores";
import { useGetDocumentPages } from "@/services/queries";

export default function useViewModel() {
  const { documentId } = useDocumentStore();
  const { data, isPending, error } = useGetDocumentPages(documentId!);

  console.log(data);

  return { documentId, data, isPending, error };
}
