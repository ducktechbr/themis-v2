export enum OptionTypeEnum {
  IMAGE = "image",
  TEXT = "text",
  SELECT = "select",
  SELECT_TEXT = "select-text",
  LONG_TEXT = "long-text",
  DATE = "date",
}

export type Option = {
  option: string;
  type: OptionTypeEnum;
  fulfilled?: boolean;
};

export type OptionsResponse = {
  question_title: string;
  options: Option[];
};

export type AnswerParams = {
  reportId: number;
  refcod: number;
  questionId: number;
  optionId: number;
  answer: string | boolean;
  latitude?: number;
  longitude?: number;
};

export type AnswerResponse = {
  status: string;
  message: string;
};
