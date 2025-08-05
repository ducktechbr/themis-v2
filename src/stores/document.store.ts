import { create } from "zustand";

type DocumentStoreProps = {
  documentId: number | null;
  setDocumentId: (documentId: number) => void;
};

export const useDocumentStore = create<DocumentStoreProps>((set) => ({
  documentId: null,
  setDocumentId: (documentId) => set({ documentId }),
}));
