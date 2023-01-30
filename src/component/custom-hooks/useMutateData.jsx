import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../helpers/queryData";

// Mutations hook
const useMutateData = (endpoint, method, key = "", fd = {}, id = null) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => queryData(endpoint, method, fd),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  return mutation;
};

export default useMutateData;
