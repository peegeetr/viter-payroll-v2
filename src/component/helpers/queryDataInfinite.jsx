import { queryData } from "./queryData";

export const queryDataInfinite = (urlSearch, urlList, isSearch) => {
  return queryData(isSearch ? urlSearch : urlList, "get", {});
};
