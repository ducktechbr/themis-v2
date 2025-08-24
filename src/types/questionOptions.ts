export enum QuestionOptionType {
  IMAGE = "image",
  TEXT = "text",
  SELECT = "select",
  LONG_TEXT = "long-text",
  DATE = "date",
}

export type QuestionOption = {
  option: string;
  type: QuestionOptionType;
};

export type QuestionOptionsResponse = {
  question_title: string;
  options: QuestionOption[];
};
