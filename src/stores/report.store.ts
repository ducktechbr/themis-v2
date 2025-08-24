import { create } from "zustand";

type ReportStore = {
  currentReportId: number | null;
  currentRefcod: number | null;
  currentQuestionId: number | null;
  setCurrentReportId: (reportId: number) => void;
  setCurrentRefcod: (refcod: number) => void;
  setCurrentQuestionId: (questionId: number) => void;
  clearCurrentReport: () => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  currentReportId: null,
  currentRefcod: null,
  currentQuestionId: null,
  setCurrentReportId: (reportId: number) => set({ currentReportId: reportId }),
  setCurrentRefcod: (refcod: number) => set({ currentRefcod: refcod }),
  setCurrentQuestionId: (questionId: number) =>
    set({ currentQuestionId: questionId }),
  clearCurrentReport: () =>
    set({
      currentReportId: null,
      currentRefcod: null,
      currentQuestionId: null,
    }),
}));
