import React from "react";
import { StoreContext } from "../../store/StoreContext";
import { fetchData } from "../helpers/fetchData";
import { devKey } from "../helpers/functions-general";

const useLoadJobTitle = (url, method = null, param2 = null) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [jobTitle, setResult] = React.useState([]);
  const [jobTitleLoading, setLoading] = React.useState(false);

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
    jobTitleLoading,
    jobTitle,
  };
};

export default useLoadJobTitle;
