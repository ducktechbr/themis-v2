import { create } from "zustand";

type ReportStore = {
  currentReportId: number | null;
  currentRefcod: number | null;
  setCurrentReportId: (reportId: number) => void;
  setCurrentRefcod: (refcod: number) => void;
  clearCurrentReport: () => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  currentReportId: null,
  currentRefcod: null,
  setCurrentReportId: (reportId: number) => set({ currentReportId: reportId }),
  setCurrentRefcod: (refcod: number) => set({ currentRefcod: refcod }),
  clearCurrentReport: () => set({ currentReportId: null, currentRefcod: null }),
}));
