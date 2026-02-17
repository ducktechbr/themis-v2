import {
  Accuracy,
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

import { useAuthStore } from "@/stores";

type LocationStatus = {
  isLoading: boolean;
  hasPermission: boolean;
  hasCoordinates: boolean;
  error: string | null;
};

export const useGetCoordinates = () => {
  const { updateUserCoordinates, user } = useAuthStore();
  const [status, setStatus] = useState<LocationStatus>({
    isLoading: true,
    hasPermission: false,
    hasCoordinates: false,
    error: null,
  });

  const requestLocation = useCallback(async () => {
    try {
      setStatus((prev) => ({ ...prev, isLoading: true, error: null }));

      const { status: permissionStatus } =
        await getForegroundPermissionsAsync();

      if (permissionStatus !== "granted") {
        const { status: newStatus } = await requestForegroundPermissionsAsync();

        if (newStatus !== "granted") {
          Alert.alert(
            "Permissão Necessária",
            "Para usar esta funcionalidade, você precisa permitir o acesso à localização nas configurações do dispositivo.",
            [
              {
                text: "Cancelar",
                style: "cancel",
                onPress: () => {
                  setStatus({
                    isLoading: false,
                    hasPermission: false,
                    hasCoordinates: false,
                    error: "Permissão de localização negada pelo usuário",
                  });
                },
              },
              {
                text: "Abrir Configurações",
                onPress: () => {
                  Linking.openSettings();
                  setStatus({
                    isLoading: false,
                    hasPermission: false,
                    hasCoordinates: false,
                    error: "Permissão de localização negada pelo usuário",
                  });
                },
              },
            ]
          );
          return;
        }
      }

      const location = await getCurrentPositionAsync({
        accuracy: Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      updateUserCoordinates(latitude, longitude);

      setStatus({
        isLoading: false,
        hasPermission: true,
        hasCoordinates: true,
        error: null,
      });
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setStatus({
        isLoading: false,
        hasPermission: false,
        hasCoordinates: false,
        error: "Erro ao obter localização",
      });
    }
  }, [updateUserCoordinates]);
  useEffect(() => {
    if (!user.latitude || !user.longitude) {
      requestLocation();
    } else {
      setStatus({
        isLoading: false,
        hasPermission: true,
        hasCoordinates: true,
        error: null,
      });
    }
  }, [requestLocation, user.latitude, user.longitude]);

  const checkPermissionStatus = useCallback(async () => {
    const { status } = await getForegroundPermissionsAsync();

    if (status === "granted") {
      await requestLocation();
    }

    return status;
  }, [requestLocation]);

  return {
    ...status,
    retry: requestLocation,
    checkPermission: checkPermissionStatus,
  };
};
