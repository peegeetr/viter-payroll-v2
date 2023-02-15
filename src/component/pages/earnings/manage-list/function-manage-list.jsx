import { setError, setMessage } from "../../../../store/StoreAction";
import { employeeRate } from "../../../helpers/payroll-formula";

// get Date Length
export const validatePayPeriod = (values, inputDate, dispatch) => {
  let val = false;
  const installment = values.is_installment;
  console.log(values.is_installment);
  if (
    // earnings
    (new Date(values.earnings_start_pay_date) <
      new Date(inputDate[0].payroll_start_date) ||
      new Date(values.earnings_end_pay_date) >
        new Date(inputDate[0].payroll_end_date) ||
      // deductions
      new Date(values.deduction_start_pay_date) <
        new Date(inputDate[0].payroll_start_date) ||
      new Date(values.deduction_end_pay_date) >
        new Date(inputDate[0].payroll_end_date)) &&
    installment !== "2"
  ) {
    dispatch(setError(true));
    dispatch(
      setMessage("Start and End date is not match for payroll period date.")
    );
    val = true;
  }
  return val;
};

// compute leave
export const computeLeave = (leaveData, employee) => {
  let list = [];
  leaveData.map((lItem) => {
    employee.map((eItem) => {
      if (Number(lItem.leave_list_employee_id) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount: Number(lItem.leave_list_days) * employeeRate(10000, 11).daily,
          employeId: eItem.employee_aid,
        });
      }
    });
  });
  return list;
};

// get Date Length
export const validateDataIsNotEmpty = (payItem, hrisData, dispatch) => {
  let val = false;
  // payItem = 19 is leave
  // payItem = 18 is OT
  if (payItem === 19 && hrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  return val;
};
