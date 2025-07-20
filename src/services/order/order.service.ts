import { ServiceOrder } from "@/types";
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
