import React from "react";
import { setError } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import fetchApi from "../helpers/fetchApi";
import { fetchData } from "../helpers/fetchData";

const useLoadPayrollType = (url, method = null) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [payrollType, setResult] = React.useState([]);
  const [payrollTypeLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    setLoading(true);
    // get total result of data
    const result = await fetchApi(url, {});
    // consoleLog(result);

    if (typeof result === "undefined") {
      dispatch(setError(true));
      setLoading(false);
      consoleLog("undefined");
      return;
    }
    if (!result.data) {
      dispatch(setError(true));
      setLoading(false);
      setResult([]);
      return;
    }
    if (result.data) {
      setLoading(false);
      setResult(result.data);
    }
  };

  return {
    payrollTypeLoading,
    payrollType,
  };
};

export default useLoadPayrollType;
