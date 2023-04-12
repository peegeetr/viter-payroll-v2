import { useQuery } from "@tanstack/react-query";
import { queryData } from "../helpers/queryData";

// Queries hook
const useQueryData = (
  endpoint,
  method,
  key = "",
  fd = {},
  id = null,
  prKey
) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => queryData(endpoint, method, fd, prKey),
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });
};

export default useQueryData;
