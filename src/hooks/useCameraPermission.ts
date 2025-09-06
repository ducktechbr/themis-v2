import { Camera, PermissionStatus } from "expo-camera";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useCameraPermission = () => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      setIsLoading(true);
      const { status } = await Camera.getCameraPermissionsAsync();
      setPermissionStatus(status);
    } catch (error) {
      Alert.alert("Erro ao verificar permissão da câmera:", error as string);
      setPermissionStatus(PermissionStatus.DENIED);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissionStatus(status);
      return status === PermissionStatus.GRANTED;
    } catch (error) {
      Alert.alert("Erro ao solicitar permissão da câmera:", error as string);
      setPermissionStatus(PermissionStatus.DENIED);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = permissionStatus === PermissionStatus.GRANTED;
  const isDenied = permissionStatus === PermissionStatus.DENIED;
  const isUndetermined = permissionStatus === PermissionStatus.UNDETERMINED;

  return {
    permissionStatus,
    isLoading,
    hasPermission,
    isDenied,
    isUndetermined,
    requestPermission,
    checkPermission,
  };
};
