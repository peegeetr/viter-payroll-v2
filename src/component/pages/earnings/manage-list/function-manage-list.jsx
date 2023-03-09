import { setError, setMessage } from "../../../../store/StoreAction";
import { formatDate, getWorkingDays } from "../../../helpers/functions-general";
import {
  absencesId,
  leaveId,
  nightDiffId,
  overtimeId,
  undertimeId,
} from "../../../helpers/functions-payitemId";
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
      new Date(inputDate?.data[0].payroll_start_date) ||
      new Date(values.earnings_start_pay_date) >
        new Date(inputDate?.data[0].payroll_end_date) ||
      new Date(values.earnings_end_pay_date) <
        new Date(inputDate?.data[0].payroll_end_date) ||
      // deductions
      new Date(values.deduction_start_pay_date) <
        new Date(inputDate?.data[0].payroll_start_date) ||
      new Date(values.deduction_start_pay_date) >
        new Date(inputDate?.data[0].payroll_end_date) ||
      new Date(values.deduction_end_pay_date) <
        new Date(inputDate?.data[0].payroll_end_date)) &&
    installment === "2"
  ) {
    dispatch(setError(true));
    dispatch(setMessage("Date range is out of payroll period date."));
    val = true;
  }
  return val;
};
export const getUnderTimeSpent = (item) => {
  const totalHrs = Number(item);
  const totalMins = Number(totalHrs * 60);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  // // get total time
  // getTotalTimeSpent(mins.toFixed(), hrs);

  return `${hrs}h ${mins.toFixed()}m`;
};
// compute undertime
export const computeUndertime = (undertimeData, employee, payrollDraft) => {
  const days = getWorkingDays(
    new Date(payrollDraft?.data[0].payroll_start_date),
    new Date(payrollDraft?.data[0].payroll_end_date)
  );
  let list = [];
  undertimeData?.data.map((uItem) => {
    employee?.data.map((eItem) => {
      if (uItem.employee_aid === eItem.employee_aid) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount:
            Number(uItem.undertime_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly,
          employeId: eItem.employee_aid,
          details: `${formatDate(uItem.undertime_date)}(${getUnderTimeSpent(
            uItem.undertime_spent
          )})`,
          hrisDate: uItem.undertime_date,
          hrisUndertimeOut: `${uItem.undertime_time_out} ${getUnderTimeSpent(
            uItem.undertime_spent
          )}`,
        });
      }
    });
  });
  return list;
};

// compute leave
export const computeLeave = (leaveData, employee, payrollDraft) => {
  const days = getWorkingDays(
    new Date(payrollDraft?.data[0].payroll_start_date),
    new Date(payrollDraft?.data[0].payroll_end_date)
  );
  let list = [];
  leaveData?.data.map((lItem) => {
    employee?.data.map((eItem) => {
      if (Number(lItem.leave_list_employee_id) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount:
            Number(lItem.leave_list_days) *
            employeeRate(eItem.employee_job_salary, days).daily,
          employeId: eItem.employee_aid,
          details: `${formatDate(
            lItem.leave_list_start_date
          )}, number of days (${lItem.leave_list_days})`,
          hrisStartDate: lItem.leave_list_start_date,
          hrisEndDate: lItem.leave_list_return_date,
          unpaidDetails: `${formatDate(
            lItem.leave_list_start_date
          )}, number of days (${lItem.leave_list_days}) `,
        });
      }
    });
  });
  return list;
};

// compute OT
export const computeOvertime = (
  overtimeData,
  employee,
  payrollDraft,
  holidays
) => {
  let list = [];
  employee?.data.map((eItem) => {
    overtimeData?.data.map((otItem) => {
      if (Number(otItem.task_employee_id) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount: Number(otFinalAmount(otItem, eItem, holidays, payrollDraft)),
          employeId: eItem.employee_aid,
          hrisDate: otItem.task_created,
          details: `${formatDate(otItem.task_created)} ${
            otItem.task_created.split(" ")[1]
          } (${getUnderTimeSpent(otItem.task_spent)})`,
        });
      }
    });
  });
  return list;
};

// get Date Length
export const validateDataIsNotEmpty = (
  payItem,
  payLeaveHrisData,
  absencesHrisData,
  overtimeHrisData,
  undertimeHrisData,
  dispatch
) => {
  let val = false;
  // leaveId = 19 is leave
  // overtimeId = 18 is OT
  // absencesId = 36 is absences
  // nightDiffId = 23 is nightDiff
  // undertimeId = 43 is undertime
  if (payItem === Number(leaveId) && payLeaveHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(absencesId) && absencesHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(overtimeId) && overtimeHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(nightDiffId) && nightDiffHrisData.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(undertimeId) && undertimeHrisData.length === 0) {
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

export const otHolidayComputed = (regularAmount, holidayRate, rate) => {
  let totalHolidayAmount = 0;
  let totalAmount = 0;
  let finalAmount = 0;
  // 100% or 30% additional holiday
  totalHolidayAmount = regularAmount * holidayRate - regularAmount;
  // additional rate ot or night diff
  totalAmount = regularAmount * rate - regularAmount;
  // total of additional salary
  finalAmount = totalHolidayAmount + totalAmount;
  return finalAmount;
};

// computation amount of OT, OT + holiday, and OT + holiday + restday
export const otFinalAmount = (otItem, eItem, holidays, payrollDraft) => {
  const days = getWorkingDays(
    new Date(payrollDraft?.data[0].payroll_start_date),
    new Date(payrollDraft?.data[0].payroll_end_date)
  );
  let rate25 = 125 / 100;
  let restRate30 = 130 / 100;
  let restRate10 = 110 / 100;
  let isHoliday = false;
  let isRestDay = false;
  let ratedAmount = 0;
  let regularAmount = 0;
  let finalAmount = 0;
  let totalOtAmount25 = 0;
  let totalOtHolidayRestAmount = 0;
  let totalOtRestAmount = 0;
  let totalOtHolidayAmount = 0;
  let totalOtNightDiff = 0;
  let otDate = otItem.task_created.split(" ")[0];
  let otTime = otItem.task_created.split(" ")[1];
  let otTimeHr = otTime.split(":")[0];
  holidays?.data.map((holidaysItem) => {
    // if overtime and holiday is same date
    if (holidaysItem.holidays_date === otDate) {
      let holidayRate = holidaysItem.holidays_rate / 100;

      //if overtime is regular or special holiday day and restday
      if (new Date(otDate).getDay() == 0 || new Date(otDate).getDay() == 6) {
        totalOtHolidayRestAmount = otHolidayComputed(
          (regularAmount =
            Number(otItem.task_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly),
          holidayRate,
          restRate30
        );
        isHoliday = true;
        isRestDay = true;

        // if overtime is night shift and holiday
        if (
          (otTimeHr >= 22 && otTimeHr <= 23) ||
          (otTimeHr >= 0 && otTimeHr <= 6)
        ) {
          regularAmount =
            Number(otItem.task_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly;
          // if dont have holiday and not saturday or sunday
          totalOtNightDiff = regularAmount * restRate10 - regularAmount;
          totalOtHolidayRestAmount =
            totalOtHolidayRestAmount + totalOtNightDiff;
        }
      }

      //if overtime is regular or special holiday day
      if (!isRestDay) {
        totalOtHolidayAmount = otHolidayComputed(
          (regularAmount =
            Number(otItem.task_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly),
          holidayRate,
          rate25
        );
        isHoliday = true;
        if (
          (otTimeHr >= 22 && otTimeHr <= 23) ||
          (otTimeHr >= 0 && otTimeHr <= 6)
        ) {
          regularAmount =
            Number(otItem.task_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly;
          // if dont have holiday and not saturday or sunday
          totalOtNightDiff = regularAmount * restRate10 - regularAmount;
          totalOtHolidayAmount = totalOtHolidayAmount + totalOtNightDiff;
        }
      }
    }
  });

  // if overtime and saturday or sunday
  if (
    (new Date(otDate).getDay() == 0 || new Date(otDate).getDay() == 6) &&
    !isHoliday
  ) {
    regularAmount =
      Number(otItem.task_spent) *
      employeeRate(eItem.employee_job_salary, days).hourly;
    //if dont have holiday and saturday or sunday
    ratedAmount = regularAmount * restRate30;
    //total of 30% additional
    totalOtRestAmount = ratedAmount - regularAmount;
    isRestDay = true;

    if (
      (otTimeHr >= 22 && otTimeHr <= 23) ||
      (otTimeHr >= 0 && otTimeHr <= 6)
    ) {
      regularAmount =
        Number(otItem.task_spent) *
        employeeRate(eItem.employee_job_salary, days).hourly;
      // if dont have holiday and not saturday or sunday
      totalOtNightDiff = regularAmount * restRate10 - regularAmount;
      totalOtRestAmount = totalOtRestAmount + totalOtNightDiff;
    }
  }

  // if overtime is normal day
  if (!isRestDay && !isHoliday) {
    regularAmount =
      Number(otItem.task_spent) *
      employeeRate(eItem.employee_job_salary, days).hourly;
    // if dont have holiday and not saturday or sunday
    ratedAmount = regularAmount * rate25;
    //total of 25% additional
    totalOtAmount25 = ratedAmount - regularAmount;

    if (
      (otTimeHr >= 22 && otTimeHr <= 23) ||
      (otTimeHr >= 0 && otTimeHr <= 6)
    ) {
      regularAmount =
        Number(otItem.task_spent) *
        employeeRate(eItem.employee_job_salary, days).hourly;
      // if dont have holiday and not saturday or sunday
      totalOtNightDiff = regularAmount * restRate10 - regularAmount;

      totalOtAmount25 = totalOtAmount25 + totalOtNightDiff;
    }
  }
  // OT + holiday + restday (special or Regular) with or without leave
  finalAmount += isHoliday && isRestDay && totalOtHolidayRestAmount;
  // OT + holiday (special or Regular) with or without leave
  finalAmount += isHoliday && !isRestDay && totalOtHolidayAmount;
  // OT + restday with or without leave
  finalAmount += !isHoliday && isRestDay && totalOtRestAmount;
  // OT normal day with or without leave
  finalAmount += !isHoliday && !isRestDay && totalOtAmount25;

  return finalAmount;
};
