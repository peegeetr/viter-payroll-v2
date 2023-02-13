import React from "react";
import { StoreContext } from "../../store/StoreContext";
import fetchApi from "../helpers/fetchApi";
import { consoleLog } from "../helpers/functions-general";

const useLoadPayPeriod = (url) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [payPeriod, setResult] = React.useState([]);
  const [payPeriodLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    // get total result of data
    const result = await fetchApi(url, {});
    // consoleLog(result);

    if (typeof result === "undefined") {
      consoleLog("undefined");
      return;
    }
    if (!result.data) {
      setResult([]);
      return;
    }
    if (result.data) {
      setResult(result.data);
    }
  };

  return {
    payPeriodLoading,
    payPeriod,
  };
};

export default useLoadPayPeriod;
