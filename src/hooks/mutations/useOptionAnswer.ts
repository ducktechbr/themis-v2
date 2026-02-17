import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendQuestionAnswer } from "@/services/report";
import { AnswerParams, AnswerResponse } from "@/types";

export const useOptionAnswer = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error?: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<AnswerResponse, Error, AnswerParams>({
    mutationFn: sendQuestionAnswer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["documentPages", variables.reportId],
      });
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
      if (error.message.includes("Network Error")) {
        onError("Sem conexão com a internet. Verifique sua rede e tente novamente.");
      } else if (error.message.includes("timeout")) {
        onError("A requisição demorou muito. Tente novamente.");
      } else {
        onError("Erro ao enviar resposta. Tente novamente.");
      }
    },
  });
};
