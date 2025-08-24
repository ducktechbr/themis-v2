export type Question = {
  title: string;
  fulfilled: boolean;
};

export type ReportQuestions = {
  "item-title": string;
  questions: {
    [key: string]: Question;
  };
};
