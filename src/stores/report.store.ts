import { create } from "zustand";

type ReportStore = {
  reportId: number | null;
  refcod: number | null;
  questionId: number | null;
  setReportStore: (data: Partial<ReportStore>) => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  reportId: null,
  refcod: null,
  questionId: null,
  setReportStore: (data) => set((state) => ({ ...state, ...data })),
}));
