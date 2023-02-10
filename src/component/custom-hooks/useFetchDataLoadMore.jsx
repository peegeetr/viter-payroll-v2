import React from "react";
import { setIsSearch, setSave, setStartIndex } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import fetchApi from "../helpers/fetchApi";
import { fetchData } from "../helpers/fetchData";
import { consoleLog } from "../helpers/functions-general";

const useFetchDataLoadMore = (url, url2, perPage, search) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [totalResult, setTotalResult] = React.useState(perPage);
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // reset values every state refresh
    setResult([]);
    search.current.value = "";
    dispatch(setIsSearch(false));
    fData();
  }, [store.isSave]);

  const fData = async () => {
    fetchData(
      setLoading, // Boolean loading values optional
      url,
      {}, // form data values
      setResult,
      "",
      "", // additional error msg if needed optional
      dispatch, // context api action
      store, // context api state
      false, // boolean to show success modal
      true, // boolean to show load more functionality button
      null,
      "get" // method
      // dispatch(setStartIndex(0))
    );
    /* para maupdate yun number nng nakaload sa table na items */
    dispatch(setStartIndex(store.startIndex + perPage));

    // get total result of data
    const result = await fetchApi(url2);

    consoleLog(result);

    if (typeof result === "undefined") {
      console.log("undefined");
      return;
    }

    if (result.data.length === 0) {
      setTotalResult([]);
      return;
    }

    if (result.data.length > 0) {
      setTotalResult(result.data.length);
    }
  };

  const handleLoad = () => {
    fetchData(
      setLoading, // Boolean loading values optional
      url,
      {}, // form data values
      setResult,
      "", // success msg optional
      "Server connection error. Please contact  technical support.", // additional error msg if needed optional
      dispatch, // context api action
      store, // context api state
      false, // boolean to show success modal
      true, // boolean to show load more functionality button
      null,
      "get" // method
    );
    // setStartIndex((prevState) => prevState + perPage);
    dispatch(setStartIndex(store.startIndex + perPage));
  };

  const handleSearch = async (e, search, endpoint) => {
    e.preventDefault();
    // setIsSearch(true);
    let val = search.current.value;
    if (val === "") return;
    dispatch(setIsSearch(true));
    fetchData(
      setLoading,
      endpoint + `${val}`,
      {}, // form data values
      setResult,
      "", // success msg
      "Server connection error. Please contact technical support.", // additional error msg if needed
      dispatch, // context api action
      store, // context api state
      false, // boolean to show success modal
      false, // boolean to show load more functionality button
      null,
      "get" // method
    );
    dispatch(setStartIndex(0));
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(setIsSearch(false));
      dispatch(setStartIndex(0));
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }
  };

  return {
    loading,
    handleLoad,
    totalResult,
    result,
    handleSearch,
    handleChange,
  };
};

export default useFetchDataLoadMore;
