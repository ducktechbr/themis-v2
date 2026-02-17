import { useMutation, useQueryClient } from "@tanstack/react-query";

import { renameSection } from "@/services/report";

type RenameSectionParams = {
  documentId: number;
  sectionTitle: string;
  newSectionTitle: string;
};

type RenameSectionResponse = {
  success: boolean;
  message?: string;
};

export const useRenameSection = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<RenameSectionResponse, Error, RenameSectionParams>({
    mutationFn: renameSection,
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
