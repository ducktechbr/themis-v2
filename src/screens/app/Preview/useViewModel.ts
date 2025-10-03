import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useMemo, useState } from "react";
import { Dimensions } from "react-native";

import { useAppNavigation, useRouteParams } from "@/hooks";
import { useReportStore } from "@/stores";
import { pickImageFromLibrary } from "@/utils";

export default function useViewModel() {
  const { goBack } = useAppNavigation();
  const { imageAnswer, setReportStore, previewImageUri, imageSource } =
    useReportStore();
  const params = useRouteParams<"Preview">();
  const viewOnly = params?.viewOnly;

  const [isRotating, setIsRotating] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState(
    viewOnly ? previewImageUri : imageAnswer?.uri || "",
  );

  useEffect(() => {
    return () => {
      if (viewOnly) {
        setReportStore({ previewImageUri: null });
      }
    };
  }, [viewOnly, setReportStore]);

  const screenDimensions = useMemo(() => {
    const { width, height } = Dimensions.get("window");
    const captureAreaHeight = height * 0.65;
    return {
      width,
      height: captureAreaHeight,
    };
  }, []);

  const imageStyle = useMemo(() => {
    return {
      width: screenDimensions.width - 32,
      height: screenDimensions.height,
    };
  }, [screenDimensions]);

  const rotateLeft = async () => {
    if (!currentImageUri || isRotating) return;

    setIsRotating(true);
    try {
      const manipulatedImage = await manipulateAsync(
        currentImageUri,
        [{ rotate: -90 }],
        { compress: 0.8, format: SaveFormat.JPEG },
      );

      setCurrentImageUri(manipulatedImage.uri);

      if (imageAnswer) {
        const updatedImage = {
          ...imageAnswer,
          uri: manipulatedImage.uri,
          width: manipulatedImage.width,
          height: manipulatedImage.height,
        };
        setReportStore({ imageAnswer: updatedImage });
      }
    } catch (error) {
      console.error("Error rotating image:", error);
    } finally {
      setIsRotating(false);
    }
  };

  const rotateRight = async () => {
    if (!currentImageUri || isRotating) return;

    setIsRotating(true);
    try {
      const manipulatedImage = await manipulateAsync(
        currentImageUri,
        [{ rotate: 90 }],
        { compress: 0.8, format: SaveFormat.JPEG },
      );

      setCurrentImageUri(manipulatedImage.uri);

      if (imageAnswer) {
        const updatedImage = {
          ...imageAnswer,
          uri: manipulatedImage.uri,
          width: manipulatedImage.width,
          height: manipulatedImage.height,
        };
        setReportStore({ imageAnswer: updatedImage });
      }
    } catch (error) {
      console.error("Error rotating image:", error);
    } finally {
      setIsRotating(false);
    }
  };

  const handleChooseAnother = async () => {
    if (imageSource === "gallery") {
      const newImage = await pickImageFromLibrary();
      if (newImage) {
        setReportStore({ imageAnswer: newImage, imageSource: "gallery" });
        setCurrentImageUri(newImage.uri);
      }
    } else {
      setReportStore({ imageAnswer: null, imageSource: null });
      goBack();
    }
  };

  const saveToGallery = async (assetUri: string) => {
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (permission.granted) {
      await MediaLibrary.saveToLibraryAsync(assetUri);
    }
  };

  const handleConfirmImage = () => {
    if (currentImageUri && imageSource === "camera") {
      saveToGallery(currentImageUri);
    }
    if (imageSource === "gallery") {
      goBack();
    } else {
      goBack();
      goBack();
    }
  };

  return {
    viewOnly,
    currentImageUri,
    isRotating,
    imageStyle,
    imageSource,
    rotateLeft,
    rotateRight,
    handleChooseAnother,
    handleConfirmImage,
    goBack,
  };
}
