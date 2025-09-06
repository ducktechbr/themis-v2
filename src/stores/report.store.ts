import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

type ReportStore = {
  reportId: number | null;
  refcod: number | null;
  questionId: number | null;
  imageAnswer: ImagePickerAsset | null;
  imageSource: "camera" | "gallery" | null;
  setReportStore: (data: Partial<ReportStore>) => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  reportId: null,
  refcod: null,
  questionId: null,
  imageAnswer: null,
  imageSource: null,
  setReportStore: (data) => set((state) => ({ ...state, ...data })),
}));
