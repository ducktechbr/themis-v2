import { CameraView } from "expo-camera";
import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

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
    DeviceMotion.setUpdateInterval(300);

    const subscription = DeviceMotion.addListener((deviceMotionData) => {
      const { accelerationIncludingGravity } = deviceMotionData;

      if (!accelerationIncludingGravity) {
        return;
      }

      const { x, y } = accelerationIncludingGravity;
      const threshold = 0.6;
      let detectedOrientation: typeof orientation = "portrait";

      if (Math.abs(y) > Math.abs(x)) {
        if (y < -threshold) {
          detectedOrientation = "portrait";
        } else if (y > threshold) {
          detectedOrientation = "portrait-upside-down";
        }
      } else {
        if (x < -threshold) {
          detectedOrientation = "landscape-right";
        } else if (x > threshold) {
          detectedOrientation = "landscape-left";
        }
      }

      if (detectedOrientation !== orientation) {
        setOrientation(detectedOrientation);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, [orientation]);

  const capturePhoto = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo) {
        const needsRotation =
          Platform.OS === "ios" && orientation !== "portrait";
        let finalImageUri = photo.uri;
        let finalWidth = photo.width;
        let finalHeight = photo.height;

        if (needsRotation) {
          try {
            let rotationDegrees = 0;
            switch (orientation) {
              case "landscape-left":
                rotationDegrees = 90;
                break;
              case "landscape-right":
                rotationDegrees = -90;
                break;
              case "portrait-upside-down":
                rotationDegrees = 180;
                break;
              default:
                rotationDegrees = 0;
            }

            const { manipulateAsync, SaveFormat } = await import(
              "expo-image-manipulator"
            );
            const rotatedImage = await manipulateAsync(
              photo.uri,
              [{ rotate: rotationDegrees }],
              {
                compress: 0.8,
                format: SaveFormat.JPEG,
              },
            );

            finalImageUri = rotatedImage.uri;
            finalWidth = rotatedImage.width;
            finalHeight = rotatedImage.height;
          } catch (error) {
            console.error("Error rotating image:", error);
            finalImageUri = photo.uri;
            finalWidth = photo.width;
            finalHeight = photo.height;
          }
        }

        const imageAsset = {
          uri: finalImageUri,
          width: finalWidth,
          height: finalHeight,
          type: "image" as const,
          fileName: `camera_photo_${Date.now()}.jpg`,
          fileSize: undefined,
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
    const clampedZoom = Math.max(0, Math.min(newZoom, 1));
    setZoom(clampedZoom);
  };

  const handlePinchGesture = (scale: number) => {
    const sensitivity = 0.015;
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
