import { ImagePickerAsset } from "expo-image-picker";
import { create } from "zustand";

// Estender ImagePickerAsset para incluir orientação
type ImageAssetWithOrientation = ImagePickerAsset & {
  orientation?:
    | "portrait"
    | "landscape"
    | "portrait-upside-down"
    | "landscape-left"
    | "landscape-right";
};

type ReportStore = {
  reportId: number | null;
  refcod: number | null;
  questionId: number | null;
  imageAnswer: ImageAssetWithOrientation | null;
  imageSource: "camera" | "gallery" | null;
  previewImageUri: string | null;
  responsibleId: number | null;
  setReportStore: (data: Partial<ReportStore>) => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  reportId: null,
  refcod: null,
  questionId: null,
  imageAnswer: null,
  imageSource: null,
  previewImageUri: null,
  responsibleId: null,
  setReportStore: (data) => set((state) => ({ ...state, ...data })),
}));
