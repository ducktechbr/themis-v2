import { CameraView } from "expo-camera";
import { Accelerometer } from "expo-sensors";
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
  const [orientation, setOrientation] = useState<
    | "portrait"
    | "landscape"
    | "portrait-upside-down"
    | "landscape-left"
    | "landscape-right"
  >("portrait");

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y } = accelerometerData;

      // Determinar orientação baseada na gravidade
      // Corrigido para iOS - valores invertidos
      // y < -0.6: portrait (normal) - gravidade para baixo no iOS
      // y > 0.6: portrait-upside-down - gravidade para cima no iOS
      // x < -0.6: landscape-right - gravidade para direita no iOS
      // x > 0.6: landscape-left - gravidade para esquerda no iOS

      const threshold = 0.6; // Limiar para evitar mudanças muito sensíveis

      if (Math.abs(y) > Math.abs(x)) {
        if (y < -threshold) {
          setOrientation("portrait");
        } else if (y > threshold) {
          setOrientation("portrait-upside-down");
        }
      } else {
        if (x < -threshold) {
          setOrientation("landscape-right");
        } else if (x > threshold) {
          setOrientation("landscape-left");
        }
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
        const imageAsset = {
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
          type: "image" as const,
          fileName: `camera_photo_${Date.now()}.jpg`,
          fileSize: undefined,
          orientation: orientation,
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
