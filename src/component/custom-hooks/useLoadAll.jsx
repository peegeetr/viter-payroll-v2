import React from "react";
import { setError } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import fetchApi from "../helpers/fetchApi";
import { consoleLog } from "../helpers/functions-general";

const useLoadAll = (url) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    // get total result of data
    const result = await fetchApi(url, {});
    // consoleLog(result);

    if (typeof result === "undefined") {
      dispatch(setError(true));
      consoleLog("undefined");
      return;
    }
    if (!result.data) {
      dispatch(setError(true));
      setResult([]);
      return;
    }
    if (result.data) {
      setResult(result.data);
    }
  };

  return {
    loading,
    result,
    setResult,
  };
};

export default useLoadAll;
