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
  const [flash, setFlash] = useState<"on" | "off" | "auto">("off");
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y } = accelerometerData;

      const threshold = 0.6;

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
        navigate("Preview", { viewOnly: false });
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleToggleFlashMode = () => {
    setFlash((prevFlashMode) => {
      switch (prevFlashMode) {
        case "off":
          return "on";
        case "on":
          return "auto";
        case "auto":
        default:
          return "off";
      }
    });
  };

  const handleZoomChange = (newZoom: number) => {
    // Limita o zoom entre 0 e 1 (0 = 1x, 1 = 5x)
    const clampedZoom = Math.max(0, Math.min(newZoom, 1));
    setZoom(clampedZoom);
  };

  const handlePinchGesture = (scale: number) => {
    // Calcula o novo zoom baseado na escala do gesto
    const sensitivity = 0.015; // Sensibilidade reduzida para controle mais suave
    const zoomIncrement = (scale - 1) * sensitivity;
    const newZoom = zoom + zoomIncrement;
    handleZoomChange(newZoom);
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
    flash,
    setFlash,
    handleToggleFlashMode,
    zoom,
    handleZoomChange,
    handlePinchGesture,
  };
}
