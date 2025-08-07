import { useDocumentStore } from "@/stores";
import { useGetDocumentPages } from "@/services/queries";

export default function useViewModel() {
  const { documentId } = useDocumentStore();
  const {
    data: reportData,
    isPending,
    error,
  } = useGetDocumentPages(documentId!);

  return { documentId, reportData, isPending, error };
}
