import React from "react";
import { StoreContext } from "../../store/StoreContext";
import { fetchData } from "../helpers/fetchData";
import { devKey } from "../helpers/functions-general";

const useLoadAllTest = (url, method = null, param2 = null) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [test, setResult] = React.useState([]);
  const [testloading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    fetchData(
      setLoading, // Boolean loading values optional
      url,
      {
        test_name: "Lusog",
      }, // form data values
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
    testloading,
    test,
  };
};

export default useLoadAllTest;
