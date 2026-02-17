import { useMutation, useQueryClient } from "@tanstack/react-query";

import { duplicateSection } from "@/services/report";

type DuplicateSectionParams = {
  documentId: number;
  sectionTitle: string;
  newSectionTitle: string;
};

type DuplicateSectionResponse = {
  success: boolean;
  message?: string;
};

export const useDuplicateSection = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<DuplicateSectionResponse, Error, DuplicateSectionParams>({
    mutationFn: duplicateSection,
    onSuccess: (data, variables) => {
      // Invalidate report pages query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["documentPages", variables.documentId],
      });

      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
};
