import { setError, setMessage } from "../../../../store/StoreAction";

// get Date Length
export const validatePayPeriod = (values, inputDate, dispatch) => {
  let val = false;
  if (
    new Date(values.earnings_start_pay_date) <
      new Date(inputDate[0].payroll_start_date) ||
    new Date(values.earnings_end_pay_date) >
      new Date(inputDate[0].payroll_end_date)
  ) {
    dispatch(setError(true));
    dispatch(
      setMessage("Start date and end date is not avilable for pay date.")
    );
    val = true;
  }
  return val;
};

// compute leave
export const computedLeave = (leaveData) => {
  let list = [];
  const data = leaveData.filter((item) => {});
  return list;
};
