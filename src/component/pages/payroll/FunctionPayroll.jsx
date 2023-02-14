import fetchApi from "../../helpers/fetchApi";

export const validatePrId = async (urlEarning, urlDeduction) => {
  let val = false;
  const earning = await fetchEarnings(urlEarning);

  const deduction = await fetchDeducations(urlDeduction);

  if (earning.length > 0 || deduction.length > 0) {
    val = true;
  }

  return val;
};
const fetchEarnings = async (urlEarning) => {
  let val = 0;
  // get total result of data
  const result = await fetchApi(urlEarning, {});

  return getResult(result);
};

const fetchDeducations = async (urlDeduction) => {
  // get total result of data
  const result = await fetchApi(urlDeduction, {});

  return getResult(result);
};

const getResult = (result) => {
  if (typeof result === "undefined") {
    console.log("undefined");
    return;
  }
  if (!result.data) {
    console.log("no data");
    return;
  }
  if (result.data) {
    return result.data;
  }
};
