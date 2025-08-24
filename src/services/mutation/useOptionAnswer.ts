import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendQuestionAnswer } from "@/services/report";
import { AnswerParams, AnswerResponse } from "@/types";

export const useOptionAnswer = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<AnswerResponse, Error, AnswerParams>({
    mutationFn: sendQuestionAnswer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reportQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["reportOptions"] });

      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
};
