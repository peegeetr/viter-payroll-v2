import React from "react";
import { setError } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import fetchApi from "../helpers/fetchApi";
import { consoleLog } from "../helpers/functions-general";

const useLoadAllNightDiff = (url) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [nightDiff, setResult] = React.useState([]);
  const [nightDiffLoading, setLoading] = React.useState(false);

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
    nightDiffLoading,
    nightDiff,
  };
};

export default useLoadAllNightDiff;
