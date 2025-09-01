import { create } from "zustand";

type ReportStore = {
  currentReportId: number | null;
  currentRefcod: number | null;
  currentQuestionId: number | null;
  answeredOptions: Set<string>;
  setCurrentReportId: (reportId: number) => void;
  setCurrentRefcod: (refcod: number) => void;
  setCurrentQuestionId: (questionId: number) => void;
  markOptionAsAnswered: (questionId: number, optionIndex: number) => void;
  isOptionAnswered: (questionId: number, optionIndex: number) => boolean;
  clearCurrentReport: () => void;
};

export const useReportStore = create<ReportStore>((set, get) => ({
  currentReportId: null,
  currentRefcod: null,
  currentQuestionId: null,
  answeredOptions: new Set(),
  setCurrentReportId: (reportId: number) => set({ currentReportId: reportId }),
  setCurrentRefcod: (refcod: number) => set({ currentRefcod: refcod }),
  setCurrentQuestionId: (questionId: number) =>
    set({ currentQuestionId: questionId }),
  markOptionAsAnswered: (questionId: number, optionIndex: number) => {
    const key = `${questionId}-${optionIndex}`;
    console.log(`Marking option as answered: ${key}`);
    set((state) => {
      const newSet = new Set([...state.answeredOptions, key]);
      console.log(`Updated answeredOptions:`, Array.from(newSet));
      return {
        answeredOptions: newSet,
      };
    });
  },
  isOptionAnswered: (questionId: number, optionIndex: number) => {
    const key = `${questionId}-${optionIndex}`;
    const isAnswered = get().answeredOptions.has(key);
    console.log(`Checking if option ${key} is answered:`, isAnswered);
    return isAnswered;
  },
  clearCurrentReport: () =>
    set({
      currentReportId: null,
      currentRefcod: null,
      currentQuestionId: null,
      answeredOptions: new Set(),
    }),
}));
