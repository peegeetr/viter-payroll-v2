import { setError, setMessage } from "../../../../store/StoreAction";
import { formatDate, getWorkingDays } from "../../../helpers/functions-general";
import { employeeRate } from "../../../helpers/payroll-formula";
import StatusActive from "../../../partials/status/StatusActive";
import StatusOngoing from "../../../partials/status/StatusOngoing";

// get Date Length
export const validatePayPeriod = (values, inputDate, dispatch) => {
  let val = false;
  const installment = values.is_installment;
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
          details: `Leave (${formatDate(lItem.leave_list_start_date)})(${
            lItem.leave_list_days
          })`,
          unpaidDetails: `Unpaid Leave (${formatDate(
            lItem.leave_list_start_date
          )})(${lItem.leave_list_days})`,
        });
      }
    });
  });
  return list;
};

// compute Overtime
export const computeOvertime = (overtimeData, employee, payrollDraft) => {
  const days = getWorkingDays(
    new Date(payrollDraft[0].payroll_start_date),
    new Date(payrollDraft[0].payroll_end_date)
  );
  let list = [];
  overtimeData.map((otItem) => {
    employee.map((eItem) => {
      if (Number(otItem.task_employee_id) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount:
            Number(otItem.task_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly,
          employeId: eItem.employee_aid,
          details: `Overtime (${formatDate(otItem.task_created)} ${
            otItem.task_created.split(" ")[1]
          })`,
        });
      }
    });
  });
  return list;
};

// compute Night Diff
export const computeNightDiff = (nightDiffData, employee, payrollDraft) => {
  const days = getWorkingDays(
    new Date(payrollDraft[0].payroll_start_date),
    new Date(payrollDraft[0].payroll_end_date)
  );
  let list = [];
  nightDiffData.map((ndItem) => {
    employee.map((eItem) => {
      if (Number(ndItem.employee_aid) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount:
            ndItem.employee_job_nd_per_day *
            employeeRate(eItem.employee_job_salary, days).hourly,
          employeId: eItem.employee_aid,
          details: `Night Differencial`,
          // details: `Night Differencial (${formatDate(eItem.employee_created)})`,
        });
      }
    });
  });
  console.log(nightDiffData, list);
  return list;
};

// get Date Length
export const validateDataIsNotEmpty = (
  payItem,
  payLeaveHrisData,
  absencesHrisData,
  overtimeHrisData,
  dispatch
) => {
  let val = false;
  // payItem = 19 is leave
  // payItem = 18 is OT
  // payItem = 36 is absences
  // payItem = 43 is undertime
  // payItem = 23 is nightDiff

  if (payItem === 19 && payLeaveHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === 36 && absencesHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === 18 && overtimeHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === 23 && nightDiffHrisData.length === 0) {
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
