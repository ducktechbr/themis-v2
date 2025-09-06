import { axiosInstance } from "../config";

import {
  AnswerParams,
  AnswerResponse,
  OptionsResponse,
  Report,
  ReportPages,
  ReportQuestions,
} from "@/types";

export const getReports = async (): Promise<Report[]> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "getServiceOrderByUserId");
    const { data } = await axiosInstance.post<Report[]>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportPages = async (
  reportId: number
): Promise<ReportPages> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "GET_OS_KEYS");
    formData.append("OS", String(reportId));
    const { data } = await axiosInstance.post<ReportPages>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportQuestions = async (
  reportId: number,
  refcod: number
): Promise<ReportQuestions> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "GET_QUESTIONS_BY_REF");
    formData.append("os", String(reportId));
    formData.append("refcod", String(refcod));
    const { data } = await axiosInstance.post<ReportQuestions>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportOptions = async (
  reportId: number,
  refcod: number,
  questionId: number
): Promise<OptionsResponse> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "GET_OPTIONS_BY_REF");
    formData.append("os", String(reportId));
    formData.append("refcod", String(refcod));
    formData.append("question", String(questionId));
    const { data } = await axiosInstance.post<OptionsResponse>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendQuestionAnswer = async (
  params: AnswerParams
): Promise<AnswerResponse> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "sendSOresponse");
    formData.append("soid", String(params.reportId));
    formData.append("itemREFcod", String(params.refcod));
    formData.append("question", String(params.questionId));
    formData.append("option", String(params.optionId));
    formData.append("answer", String(params.answer));
    formData.append("latitude", String(params.latitude));
    formData.append("longitude", String(params.longitude));

    const { data } = await axiosInstance.post<AnswerResponse>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const startReportFill = async (
  reportId: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "startReportFill");
    formData.append("report_id", String(reportId));

    const { data } = await axiosInstance.post("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const duplicateSection = async (params: {
  documentId: number;
  sectionTitle: string;
  newSectionTitle: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "duplicateSection");
    formData.append("documentId", String(params.documentId));
    formData.append("sectionTitle", params.sectionTitle);
    formData.append("newSectionTitle", params.newSectionTitle);

    const { data } = await axiosInstance.post("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const renameSection = async (params: {
  documentId: number;
  sectionTitle: string;
  newSectionTitle: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "renameSection");
    formData.append("documentId", String(params.documentId));
    formData.append("sectionTitle", params.sectionTitle);
    formData.append("newSectionTitle", params.newSectionTitle);

    const { data } = await axiosInstance.post("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const finishReport = async (
  reportId: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "endServiceOrder");
    formData.append("id_service_order", String(reportId));

    const { data } = await axiosInstance.post("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
