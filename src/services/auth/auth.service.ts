import { axiosInstance } from "../config";

import { User } from "@/types";

export const signIn = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "loginv2");
    formData.append("username", username);
    formData.append("password", password);
    const { data } = await axiosInstance.post<User[]>("/", formData);
    return data[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
