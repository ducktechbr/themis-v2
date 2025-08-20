import { Report, ReportPages } from "@/types";
import { axiosInstance } from "../config";

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
