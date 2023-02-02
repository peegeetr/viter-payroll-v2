import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { hrisFetchData } from "../../helpers/hrisFetchData";

const hrisUseLoadJobTitle = (url, method = null, param2 = null) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [jobTitle, setResult] = React.useState([]);
  const [jobTitleLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, [store.isSave]);

  const getData = async () => {
    hrisFetchData(
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

export default hrisUseLoadJobTitle;
