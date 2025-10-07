import { axiosInstance } from "../config";

import { OutdatedVersionError, SignInResponse, User } from "@/types";

export const signIn = async (
  username: string,
  password: string,
): Promise<User> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "login_app");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("app_version", "2.0.1");
    const { data } = await axiosInstance.post<SignInResponse>("/", formData);

    if (!data.status) {
      if (data.error) {
        throw new OutdatedVersionError(data.error);
      }
      throw new Error("Erro ao fazer login");
    }

    if (data.data && data.data.length > 0) {
      return data.data[0];
    }

    throw new Error("Resposta inválida do servidor");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
