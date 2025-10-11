import { axiosInstance } from "../config";

import { OutdatedVersionError, User } from "@/types";

const CURRENT_APP_VERSION = "2.0.5";

export const signIn = async (
  username: string,
  password: string,
): Promise<User> => {
  try {
    const formData = new FormData();
    formData.append("metodo", "loginv2");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("app_version", CURRENT_APP_VERSION);

    const { data } = await axiosInstance.post<
      User[] | { status: boolean; error?: string }
    >("/", formData);

    if (!Array.isArray(data)) {
      if (data.error) {
        throw new OutdatedVersionError(data.error);
      }
      throw new Error("Erro ao fazer login");
    }

    if (data.length > 0) {
      return data[0];
    }

    throw new Error("Resposta inválida do servidor");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
