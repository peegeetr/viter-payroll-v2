import { setError, setMessage } from "../../../store/StoreAction";
import { queryData } from "../../helpers/queryData";

export const validatePrId = async (
  urlEarning,
  urlDeduction,
  dispatch,
  prId
) => {
  let val = false;
  const earning = await fetchEarnings(urlEarning);

  const deduction = await fetchDeducations(urlDeduction);

  if (earning.length > 0 || deduction.length > 0) {
    dispatch(setError(true));
    dispatch(
      setMessage(
        `You cannot update ${prId} because it is already associated with Earnings or Deductions.`
      )
    );
    val = true;
  }

  return val;
};

const fetchEarnings = async (urlEarning) => {
  let val = 0;
  // get total result of data
  const result = await queryData(urlEarning, "get");

  return getResult(result);
};

const fetchDeducations = async (urlDeduction) => {
  // get total result of data
  const result = await queryData(urlDeduction, "get");

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
