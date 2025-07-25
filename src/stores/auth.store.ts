import { create } from "zustand";
import { signIn } from "@/services/auth";
import { User } from "@/types";

type AuthStoreProps = {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthStoreProps>((set) => ({
  user: {
    id: 0,
    entitie_id: 0,
    idlocal: null,
    user_group_id: 0,
    document: "",
    name: "",
    email: "",
    username: "",
    assinatura: null,
    last_date_login: null,
    matricula: null,
    device_token: "",
    status_user: 0,
  },
  isAuthenticated: false,
  loading: false,
  signOut: () => set({ isAuthenticated: false }),
  signIn: async (username: string, password: string) => {
    try {
      set({ loading: true });
      const response = await signIn(username, password);
      if (!response || response === undefined) return;
      set({ loading: false, isAuthenticated: true, user: response });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));
