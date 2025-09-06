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
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<SendImageResponse, Error, SendImageParams>({
    mutationFn: sendImage,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reportPages", variables.reportId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reportQuestions", variables.reportId, variables.refcod],
      });
      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
};
