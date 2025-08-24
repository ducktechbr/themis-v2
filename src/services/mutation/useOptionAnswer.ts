import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendQuestionAnswer } from "@/services/report";
import { AnswerParams, AnswerResponse } from "@/types";

export const useOptionAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<AnswerResponse, Error, AnswerParams>({
    mutationFn: sendQuestionAnswer,
    onSuccess: (data) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ["reportQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["reportOptions"] });

      console.log("Resposta salva com sucesso:", data.message);
    },
    onError: (error) => {
      console.error("Erro ao salvar resposta:", error);
    },
  });
};
