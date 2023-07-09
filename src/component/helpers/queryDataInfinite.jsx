import { queryData } from "./queryData";

export const queryDataInfinite = (
  urlSearch,
  urlList,
  isSearch,
  prKey,
  method = "get",
  fd = {}
) => {
  return queryData(isSearch ? urlSearch : urlList, method, fd, prKey);
};
