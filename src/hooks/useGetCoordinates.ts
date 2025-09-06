import * as Location from "expo-location";
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
    console.log("requestLocation chamada");
    try {
      setStatus((prev) => ({ ...prev, isLoading: true, error: null }));

      const { status: permissionStatus } =
        await Location.getForegroundPermissionsAsync();

      console.log("Status atual da permissão:", permissionStatus);

      if (permissionStatus !== "granted") {
        console.log("Solicitando nova permissão...");
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();

        console.log("Novo status da permissão:", newStatus);

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

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
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
    const { status } = await Location.getForegroundPermissionsAsync();
    console.log("Verificando status da permissão:", status);

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
