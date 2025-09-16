import { MaterialIcons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import { Text, TouchableOpacity, View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import useViewModel from "./useViewModel";

import { Icon, MainButton } from "@/components";
import { cn } from "@/utils";

export const Camera = () => {
  const {
    hasPermission,
    requestPermission,
    cameraRef,
    isCapturing,
    orientation,
    flash,
    capturePhoto,
    handleToggleFlashMode,
    zoom,
    handleZoomChange,
    handlePinchGesture,
  } = useViewModel();

  // Handler do gesto de pinça
  const onPinchGestureEvent = (event: {
    nativeEvent: { state: number; scale: number };
  }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handlePinchGesture(event.nativeEvent.scale);
    }
  };

  // Handler para o slider de zoom
  const onSliderGestureEvent = (event: {
    nativeEvent: { state: number; translationX: number };
  }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Converte o movimento X em valor de zoom
      const sensitivity = 0.001; // Sensibilidade reduzida para controle mais preciso
      const zoomDelta = event.nativeEvent.translationX * sensitivity;
      const newZoom = Math.max(0, Math.min(zoom + zoomDelta, 1));
      handleZoomChange(newZoom);
    }
  };

  if (!hasPermission) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-white text-lg font-bold mb-5 px-4">
            Para anexar uma imagem precisamos de acesso à sua câmera.
          </Text>
          <View className="w-full px-4">
            <MainButton
              onPress={requestPermission}
              title="Permitir acesso à câmera"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1">
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Animated.View style={{ flex: 1 }}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            flash={flash}
            zoom={zoom * 0.4}
          />
        </Animated.View>
      </PinchGestureHandler>

      <View className="absolute inset-0">
        <View className="flex-1 bg-black/50" />
        <View className="h-[65%]">
          <View className="flex-row items-center justify-between px-4 pt-1">
            <TouchableOpacity
              className={cn(
                "items-center justify-center border border-white rounded-full p-1",
                flash === "on" && "bg-white/20",
                flash === "auto" && "bg-yellow-500/30",
              )}
              onPress={handleToggleFlashMode}
            >
              <MaterialIcons
                name={
                  flash === "on"
                    ? "flash-on"
                    : flash === "off"
                      ? "flash-off"
                      : "flash-auto"
                }
                size={20}
                color={flash === "auto" ? "yellow" : "white"}
              />
            </TouchableOpacity>
            <View className="bg-black/60 px-3 py-2 rounded-lg flex-row items-center">
              <Icon
                name={
                  orientation.includes("portrait")
                    ? "Smartphone"
                    : "TabletSmartphone"
                }
                size={16}
                color="white"
              />
              <Text className="text-white text-xs font-medium ml-2 capitalize">
                {orientation === "portrait" && "Retrato"}
                {orientation === "portrait-upside-down" && "Retrato Invertido"}
                {orientation === "landscape-left" && "Paisagem ←"}
                {orientation === "landscape-right" && "Paisagem →"}
              </Text>
            </View>
          </View>
          <View className="absolute bottom-8 left-0 right-0 items-center">
            {zoom > 0 ? (
              <PanGestureHandler onGestureEvent={onSliderGestureEvent}>
                <Animated.View className="bg-black/60 rounded-full px-4 py-2 min-w-[200px] justify-center">
                  <View className="h-1 bg-white/30 rounded-full flex-1 my-2">
                    <View
                      className="h-1 bg-white rounded-full"
                      style={{
                        width: `${zoom * 100}%`,
                        marginLeft: 0,
                      }}
                    />
                  </View>
                  <Text className="text-white text-xs text-center font-medium">
                    {(zoom * 4 + 1).toFixed(1)}x
                  </Text>
                </Animated.View>
              </PanGestureHandler>
            ) : (
              <View className="bg-black/60 rounded-full px-3 py-2">
                <Text className="text-white text-xs font-medium">1.0x</Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex-1 bg-black/50" />
      </View>

      <View className="absolute bottom-0 left-0 right-0 items-center justify-center pb-8">
        <TouchableOpacity
          className="w-20 h-20 border-2 border-white rounded-full items-center justify-center"
          onPress={capturePhoto}
          disabled={isCapturing}
        >
          <View
            className={cn(
              "w-10 h-10 rounded-full",
              isCapturing ? "bg-gray-400" : "bg-primary",
            )}
          />
        </TouchableOpacity>

        <Text
          className={cn(
            "text-white text-sm mt-2 text-center flex-1",
            !isCapturing ? "opacity-0" : "opacity-100",
          )}
        >
          Capturando...
        </Text>
      </View>
    </View>
  );
};
