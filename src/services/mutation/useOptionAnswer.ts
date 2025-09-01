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
    onSuccess: (data, variables) => {
      // Invalidate specific queries with parameters
      queryClient.invalidateQueries({
        queryKey: ["reportQuestions", variables.reportId, variables.refcod],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "reportOptions",
          variables.reportId,
          variables.refcod,
          variables.questionId,
        ],
      });

      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
};
