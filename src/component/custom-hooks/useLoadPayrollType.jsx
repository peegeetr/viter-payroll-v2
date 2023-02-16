import React from "react";
import { StoreContext } from "../../store/StoreContext";
import { fetchData } from "../helpers/fetchData";

const useLoadPayrollType = (url, method = null) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [payrollType, setResult] = React.useState([]);
  const [payrollTypeLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    fetchData(
      setLoading, // Boolean loading values optional
      url,
      {}, // form data values
      setResult,
      "", // success msg optional
      "", // additional error msg if needed optional
      dispatch, // context api action
      store, // context api state
      false, // boolean to show success modal
      false, // boolean to show load more functionality button
      null, // navigation
      method
    );
  };

  return {
    payrollTypeLoading,
    payrollType,
  };
};

export default useLoadPayrollType;
