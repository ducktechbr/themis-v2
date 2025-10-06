import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

import { useReportStore } from "./report.store";

import { signIn } from "@/services/auth";
import { User } from "@/types";

type AuthStoreProps = {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (username: string, password: string, rememberme: boolean) => void;
  initializeAuth: () => void;
  signOut: () => void;
  setUser: (user: User) => void;
  updateUserCoordinates: (latitude: number, longitude: number) => void;
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
    app_version: "",
  },
  isAuthenticated: false,
  loading: false,
  signOut: async () => {
    try {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");

      const reportStore = useReportStore.getState();
      reportStore.setReportStore({
        reportId: null,
        refcod: null,
        questionId: null,
        imageAnswer: null,
        imageSource: null,
        previewImageUri: null,
      });

      set({
        isAuthenticated: false,
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
          app_version: "",
        },
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      set({ isAuthenticated: false });
    }
  },
  setUser: (user: User) => set({ user }),
  updateUserCoordinates: (latitude: number, longitude: number) =>
    set((state) => ({
      user: {
        ...state.user,
        latitude,
        longitude,
      },
    })),
  initializeAuth: async () => {
    try {
      set({ loading: true });

      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");

      if (username && password) {
        const response = await signIn(username, password);
        if (response) {
          set({ user: response, isAuthenticated: true });
        } else {
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("password");
        }
      }
    } catch (error) {
      console.error("Erro no auto login:", error);
      try {
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
      } catch (storageError) {
        console.error("Erro ao remover credenciais:", storageError);
      }
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (username: string, password: string, rememberme: boolean) => {
    try {
      set({ loading: true });
      const response = await signIn(username, password);
      if (!response || response === undefined) {
        set({ loading: false, isAuthenticated: false });
        Alert.alert("Erro ao autenticar", "Usuário ou senha inválidos");
        return;
      }
      if (rememberme) {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
      }
      set({ loading: false, isAuthenticated: true, user: response });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));
