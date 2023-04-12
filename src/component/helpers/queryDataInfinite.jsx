import { queryData } from "./queryData";

export const queryDataInfinite = (urlSearch, urlList, isSearch, prKey) => {
  return queryData(isSearch ? urlSearch : urlList, "get", {}, prKey);
};
