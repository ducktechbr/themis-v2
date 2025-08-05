import { ServiceOrder, ReportData } from "@/types";
import { axiosInstance } from "../config";

export const getOrders = async (): Promise<ServiceOrder[]> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "getServiceOrderByUserId");
    const { data } = await axiosInstance.post<ServiceOrder[]>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDocumentPages = async (
  serviceOrderId: number
): Promise<ReportData> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "GET_OS_KEYS");
    formData.append("OS", String(serviceOrderId));
    const { data } = await axiosInstance.post<ReportData>("/", formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
