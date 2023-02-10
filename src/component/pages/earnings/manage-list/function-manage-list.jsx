import { setError, setMessage } from "../../../../store/StoreAction";

// get Date Length
export const validatePayPeriod = (values, payrollDraft, dispatch) => {
  let val = false;
  if (
    new Date(values.earnings_start_pay_date) <
      new Date(payrollDraft[0].payroll_start_date) ||
    new Date(values.earnings_end_pay_date) >
      new Date(payrollDraft[0].payroll_end_date)
  ) {
    dispatch(setError(true));
    dispatch(
      setMessage("Start date and end date is not avilable for pay date.")
    );
    val = true;
  }
  return val;
};
