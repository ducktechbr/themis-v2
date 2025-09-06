import { useEffect } from "react";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { ScreenLoading } from "@/components";
import { useAuthStore } from "@/stores";

export default function Routes() {
  const { isAuthenticated, loading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (loading) return <ScreenLoading />;

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
