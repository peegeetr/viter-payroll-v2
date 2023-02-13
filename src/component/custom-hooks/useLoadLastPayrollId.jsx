import React from "react";
import { StoreContext } from "../../store/StoreContext";
import fetchApi from "../helpers/fetchApi";
import { consoleLog, devApiUrl } from "../helpers/functions-general";

const useLoadLastPayrollId = (url, param1 = null) => {
  const { store } = React.useContext(StoreContext);
  const [result, setResult] = React.useState([]);
  const [lastId, setLastId] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    const result = await fetchApi(url, {});

    consoleLog(result);

    if (typeof result === "undefined") {
      consoleLog("undefined");
      return;
    }
    if (!result.data) {
      consoleLog("no data");
      return;
    }

    if (result.data) {
      if (result.data.length > 0) {
        let sid = result.data[0].payroll_id.split("-");
        let id = Number(sid[1]) + 1;
        if (id < 10) {
          id = "00" + id;
          result.data.length > 0 ? setLastId("PR-" + id) : setLastId("PR-001");
        } else if (id < 100) {
          id = "0" + id;
          result.data.length > 0 ? setLastId("PR-" + id) : setLastId("PR-001");
        } else {
          id = id;
          result.data.length > 0 ? setLastId("PR-" + id) : setLastId("PR-001");
        }
      } else {
        setLastId("PR-001");
      }
    }
  };
  return {
    result,
    lastId,
  };
};

export default useLoadLastPayrollId;
