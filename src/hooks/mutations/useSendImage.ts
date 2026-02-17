import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";

import { sendImage } from "@/services/report";

type SendImageParams = {
  reportId: number;
  refcod: number;
  questionId: number;
  optionId: number;
  image: ImagePickerAsset;
  latitude?: number;
  longitude?: number;
};

type SendImageResponse = { success: boolean; message?: string };

export const useSendImage = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error?: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<SendImageResponse, Error, SendImageParams>({
    mutationFn: sendImage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["documentPages", variables.reportId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reportQuestions", variables.reportId, variables.refcod],
      });
      onSuccess();
    },
    onError: (error) => {
      console.error("Erro no upload:", error);
      // Tratamento específico de erros
      if (error.message.includes("Network Error")) {
        onError("Erro de conexão. Verifique sua internet e tente novamente.");
      } else if (error.message.includes("timeout")) {
        onError("Upload demorou muito. Tente novamente.");
      } else {
        onError("Erro ao enviar imagem. Tente novamente.");
      }
    },
  });
};
