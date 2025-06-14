import { create } from "zustand";

type AuthStoreProps = {
 isAuthenticated: boolean;
 loading: boolean;
 signIn: (isAuthenticated: boolean) => void;
 signOut: () => void;
};

export const useAuthStore = create<AuthStoreProps>((set) => ({
 isAuthenticated: false,
 loading: false,
 signOut: () => set({ isAuthenticated: false }),
 signIn: (isAuthenticated) => set({ isAuthenticated }),
}));
