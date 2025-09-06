import { CameraView } from "expo-camera";
import { Gyroscope } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

import { useAppNavigation, useCameraPermission } from "@/hooks";
import { useReportStore } from "@/stores";

export default function useViewModel() {
  const { hasPermission, requestPermission, checkPermission, isLoading } =
    useCameraPermission();
  const { navigate } = useAppNavigation();
  const { setReportStore } = useReportStore();
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  useEffect(() => {
    // Configurar o giroscópio para detectar orientação
    Gyroscope.setUpdateInterval(500); // Atualizar a cada 500ms

    const subscription = Gyroscope.addListener((gyroscopeData) => {
      const { y } = gyroscopeData;

      // Detectar orientação baseado na rotação do eixo Y
      // Valores positivos indicam rotação para landscape
      if (Math.abs(y) > 0.5) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const capturePhoto = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo) {
        // Salvar a foto no store como um objeto similar ao ImagePickerAsset
        const imageAsset = {
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
          type: "image" as const,
          fileName: `camera_photo_${Date.now()}.jpg`,
          fileSize: undefined, // Será definido pelo sistema
        };

        setReportStore({ imageAnswer: imageAsset, imageSource: "camera" });
        navigate("Preview");
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  return {
    hasPermission,
    requestPermission,
    checkPermission,
    isLoading,
    cameraRef,
    isCapturing,
    orientation,
    capturePhoto,
  };
}
