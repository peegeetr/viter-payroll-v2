import { setError, setMessage } from "../../../../store/StoreAction";
import { getWorkingDays } from "../../../helpers/functions-general";
import { employeeRate } from "../../../helpers/payroll-formula";
import StatusActive from "../../../partials/status/StatusActive";
import StatusOngoing from "../../../partials/status/StatusOngoing";

// get Date Length
export const validatePayPeriod = (values, inputDate, dispatch) => {
  let val = false;
  const installment = values.is_installment;
  console.log(values.is_installment);
  if (
    // earnings
    (new Date(values.earnings_start_pay_date) <
      new Date(inputDate[0].payroll_start_date) ||
      new Date(values.earnings_start_pay_date) >
        new Date(inputDate[0].payroll_end_date) ||
      // deductions
      new Date(values.deduction_start_pay_date) <
        new Date(inputDate[0].payroll_start_date) ||
      new Date(values.deduction_start_pay_date) >
        new Date(inputDate[0].payroll_end_date)) &&
    installment === "2"
  ) {
    dispatch(setError(true));
    dispatch(setMessage("Start date is out of payroll period date."));
    val = true;
  }
  return val;
};

// compute leave
export const computeLeave = (leaveData, employee, payrollDraft) => {
  const days = getWorkingDays(
    new Date(payrollDraft[0].payroll_start_date),
    new Date(payrollDraft[0].payroll_end_date)
  );
  let list = [];
  leaveData.map((lItem) => {
    employee.map((eItem) => {
      if (Number(lItem.leave_list_employee_id) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount:
            Number(lItem.leave_list_days) *
            employeeRate(eItem.employee_job_salary, days).daily,
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

// check status of earnings

export const getStatus = (item) => {
  let val = "";
  item.earnings_number_of_installment === 0 ||
  item.deduction_number_of_installment === 0
    ? (val = <StatusActive text="Recurring" />)
    : item.earnings_number_of_installment !== item.earnings_num_pay ||
      item.deduction_number_of_installment !== item.deduction_num_pay
    ? (val = <StatusOngoing text="Ongoing" />)
    : (val = <StatusActive text="Paid" />);

  return val;
};
