import { setError, setMessage } from "../../../../store/StoreAction";
import {
  formatDate,
  getWorkingDays,
  getWorkingDaysInMonth,
} from "../../../helpers/functions-general";
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
      // new Date(values.earnings_end_pay_date) <
      //   new Date(inputDate?.data[0].payroll_end_date) ||
      // // deductions
      new Date(values.deduction_start_pay_date) <
        new Date(inputDate?.data[0].payroll_start_date) ||
      new Date(values.deduction_start_pay_date) >
        new Date(inputDate?.data[0].payroll_end_date) ||
      new Date(values.deduction_end_pay_date) <
        new Date(inputDate?.data[0].payroll_end_date)) &&
    installment !== "2"
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
  const days = getWorkingDaysInMonth(
    new Date(payrollDraft?.data[0].payroll_start_date)
  );
  // const days = getWorkingDays(
  //   new Date(payrollDraft?.data[0].payroll_start_date),
  //   new Date(payrollDraft?.data[0].payroll_end_date)
  // );
  let list = [];
  undertimeData?.data.map((uItem) => {
    employee?.data.map((eItem) => {
      if (uItem.employee_aid === eItem.employee_aid) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount: (
            Number(uItem.undertime_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly
          ).toFixed(4),
          hours: Number(uItem.undertime_spent),
          rate: 100,
          employeId: eItem.employee_aid,
          details: `Undertime ${formatDate(
            uItem.undertime_date
          )}(${getUnderTimeSpent(uItem.undertime_spent)})`,
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
  // const days = getWorkingDays(
  //   new Date(payrollDraft?.data[0].payroll_start_date),
  //   new Date(payrollDraft?.data[0].payroll_end_date)
  // );

  const days = getWorkingDaysInMonth(
    new Date(payrollDraft?.data[0].payroll_start_date)
  );

  let list = [];
  leaveData?.data.map((lItem) => {
    employee?.data.map((eItem) => {
      if (Number(lItem.leave_list_employee_id) === Number(eItem.employee_aid)) {
        list.push({
          name: `${eItem.employee_lname}, ${eItem.employee_fname}`,
          amount: (
            Number(lItem.leave_list_days) *
            employeeRate(eItem.employee_job_salary, days).daily
          ).toFixed(2),
          hours: Number(lItem.leave_list_days) * 8,
          rate: 100,
          employeId: eItem.employee_aid,
          details: `Leave ${formatDate(lItem.leave_list_start_date)}, Day/s (${
            lItem.leave_list_days
          })`,
          hrisStartDate: lItem.leave_list_start_date,
          hrisEndDate: lItem.leave_list_return_date,
          unpaidDetails: `Unpaid ${formatDate(
            lItem.leave_list_start_date
          )}, Day/s (${lItem.leave_list_days}) `,
        });
      }
    });
  });

  // console.log(list);
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
          amount: Number(
            otFinalAmount(otItem, eItem, holidays, payrollDraft).finalAmount
          ).toFixed(2),
          hours: otItem.task_spent,
          rate: Number(
            otFinalAmount(otItem, eItem, holidays, payrollDraft).otRate
          ),
          employeId: eItem.employee_aid,
          hrisDate: otItem.task_created,
          details: `OT ${
            otFinalAmount(otItem, eItem, holidays, payrollDraft).isHoliday
              ? "HOL"
              : ""
          } ${
            otFinalAmount(otItem, eItem, holidays, payrollDraft).isRestDay
              ? "RD"
              : ""
          } (${
            otFinalAmount(otItem, eItem, holidays, payrollDraft).otRate
          }%) ${formatDate(otItem.task_created.split(" ")[0])} ${
            otItem.task_time_started.split(" ")[1]
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
  // console.log(absencesHrisData);
  let val = false;
  // leaveId = 19 is leave
  // overtimeId = 18 is OT
  // absencesId = 36 is absences
  // nightDiffId = 23 is nightDiff
  // undertimeId = 43 is undertime
  if (payItem === Number(leaveId) && payLeaveHrisData?.data.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(absencesId) && absencesHrisData?.data.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(overtimeId) && overtimeHrisData?.data.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(nightDiffId) && nightDiffHrisData?.data.length === 0) {
    dispatch(setError(true));
    dispatch(setMessage("No data found."));
    val = true;
  }
  if (payItem === Number(undertimeId) && undertimeHrisData?.data.length === 0) {
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
    : item.earnings_number_of_installment > item.earnings_num_pay ||
      item.deduction_number_of_installment > item.deduction_num_pay
    ? (val = <StatusOngoing text="Ongoing" />)
    : (val = <StatusActive text="Paid" />);

  return val;
};

export const otHolidayComputed = (regularAmount, holidayRate, rate) => {
  let totalHolidayAmount = 0;
  let totalOtAmount = 0;
  let finalAmount = 0;
  // 100% or 30% additional holiday
  totalHolidayAmount = regularAmount * holidayRate;
  // additional OT rate 30% or 25%
  totalOtAmount = totalHolidayAmount * rate - totalHolidayAmount;
  // total of additional salary
  // finalAmount = totalHolidayAmount + totalOtAmount + regularAmount;
  finalAmount = totalHolidayAmount + totalOtAmount;
  console.log(totalHolidayAmount, totalOtAmount, finalAmount);
  return finalAmount;
};

// computation amount of OT, OT + holiday, and OT + holiday + restday
export const otFinalAmount = (otItem, eItem, holidays, payrollDraft) => {
  // const days = getWorkingDays(
  //   new Date(payrollDraft?.data[0].payroll_start_date),
  //   new Date(payrollDraft?.data[0].payroll_end_date)
  // );
  const days = getWorkingDaysInMonth(
    new Date(payrollDraft?.data[0].payroll_start_date)
  );

  console.log(employeeRate(eItem.employee_job_salary, days).hourly);
  let rate25 = 125 / 100;
  let restRate30 = 130 / 100;
  let restRate10 = 110 / 100;
  let otRate = 125; // default rate value
  let regRate = 100; // reg rate value
  let isHoliday = false;
  let isRestDay = false;
  let regularAmount = 0;
  let finalAmount = 0;
  let totalOtAmount25 = 0;
  let totalOtHolidayRestAmount = 0;
  let totalOtRestAmount = 0;
  let totalOtHolidayAmount = 0;
  let totalOtNightDiff = 0;
  let otDate = otItem.task_created.split(" ")[0];
  let otTime = otItem.task_time_started.split(" ")[1];
  let otTimeHr = otTime.split(":")[0];
  let isNd = otItem.task_ot_is_night_diff;
  holidays?.data.map((holidaysItem) => {
    // if overtime and holiday is same date
    if (holidaysItem.holidays_date === otDate) {
      let holidayRate = holidaysItem.holidays_rate / 100;

      //if overtime is regular or special holiday day and restday
      if (new Date(otDate).getDay() == 0 || new Date(otDate).getDay() == 6) {
        // otRate = ((restRate30 + (holidayRate - 1)) * regRate).toFixed(2);
        otRate = (restRate30 * regRate).toFixed(2);
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
          isNd === 1 &&
          ((otTimeHr >= 22 && otTimeHr <= 23) ||
            (otTimeHr >= 0 && otTimeHr < 6))
        ) {
          regularAmount = totalOtHolidayRestAmount;
          // regularAmount =
          //   Number(otItem.task_spent) *
          //   employeeRate(eItem.employee_job_salary, days).hourly;
          totalOtNightDiff = regularAmount * restRate10 - regularAmount;
          otRate = (restRate30 * regRate).toFixed(2);
          // otRate = (
          //   (restRate30 + (holidayRate - 1) + (restRate10 - 1)) *
          //   regRate
          // ).toFixed(2);
          totalOtHolidayRestAmount =
            totalOtHolidayRestAmount + totalOtNightDiff;
        }
        finalAmount = totalOtHolidayRestAmount;
      }

      //if overtime is regular or special holiday day not restday
      if (!isRestDay) {
        // console.log("holiday");
        otRate = (rate25 * regRate).toFixed(2);
        // otRate = ((rate25 + (holidayRate - 1)) * regRate).toFixed(2);
        totalOtHolidayAmount = otHolidayComputed(
          (regularAmount =
            Number(otItem.task_spent) *
            employeeRate(eItem.employee_job_salary, days).hourly),
          holidayRate,
          rate25
        );
        // console.log(totalOtHolidayAmount);
        isHoliday = true;
        if (
          isNd === 1 &&
          ((otTimeHr >= 22 && otTimeHr <= 23) ||
            (otTimeHr >= 0 && otTimeHr < 6))
        ) {
          // console.log("holiday nd");
          regularAmount = totalOtHolidayAmount;
          // regularAmount =
          //   Number(otItem.task_spent) *
          //   employeeRate(eItem.employee_job_salary, days).hourly;
          totalOtNightDiff = regularAmount * restRate10 - regularAmount;
          otRate = (rate25 * regRate).toFixed(2);
          // otRate = (
          //   (rate25 + (holidayRate - 1) + (restRate10 - 1)) *
          //   regRate
          // ).toFixed(2);
          totalOtHolidayAmount = totalOtHolidayAmount + totalOtNightDiff;
        }
        finalAmount = totalOtHolidayAmount;
      }
    }
  });

  // if overtime and saturday or sunday
  if (
    (new Date(otDate).getDay() == 0 || new Date(otDate).getDay() == 6) &&
    !isHoliday
  ) {
    // console.log("rest");
    regularAmount =
      Number(otItem.task_spent) *
      employeeRate(eItem.employee_job_salary, days).hourly;
    otRate = (restRate30 * regRate).toFixed(2);
    totalOtRestAmount = regularAmount * restRate30;
    isRestDay = true;

    if (
      isNd === 1 &&
      ((otTimeHr >= 22 && otTimeHr <= 23) || (otTimeHr >= 0 && otTimeHr < 6))
    ) {
      regularAmount = totalOtRestAmount;
      // regularAmount =
      //   Number(otItem.task_spent) *
      //   employeeRate(eItem.employee_job_salary, days).hourly;
      totalOtNightDiff = regularAmount * restRate10 - regularAmount;
      otRate = (restRate30 * regRate).toFixed(2);
      // otRate = ((restRate30 + restRate10 - 1) * regRate).toFixed(2);
      totalOtRestAmount = totalOtRestAmount + totalOtNightDiff;
    }
    finalAmount = totalOtRestAmount;
  }

  // if overtime is normal day
  if (!isRestDay && !isHoliday) {
    // console.log("normal");
    regularAmount =
      Number(otItem.task_spent) *
      employeeRate(eItem.employee_job_salary, days).hourly;
    // if dont have holiday and not saturday or sunday
    otRate = (rate25 * regRate).toFixed(2);
    totalOtAmount25 = regularAmount * rate25;
    // console.log("normal nd", isNd, otTimeHr, otItem.task_time_started);
    if (
      isNd === 1 &&
      ((otTimeHr >= 22 && otTimeHr <= 23) || (otTimeHr >= 0 && otTimeHr < 6))
    ) {
      regularAmount = totalOtAmount25;
      // regularAmount =
      //   Number(otItem.task_spent) *
      //   employeeRate(eItem.employee_job_salary, days).hourly;
      // if dont have holiday and not saturday or sunday
      totalOtNightDiff = regularAmount * restRate10 - regularAmount;
      otRate = (rate25 * regRate).toFixed(2);
      totalOtAmount25 = totalOtAmount25 + totalOtNightDiff;
    }
    finalAmount = totalOtAmount25;
  }
  // OT + holiday + restday (special or Regular) with or without leave
  // finalAmount = isHoliday && isRestDay && totalOtHolidayRestAmount;
  // OT + holiday (special or Regular) with or without leave
  // finalAmount = isHoliday && !isRestDay && totalOtHolidayAmount;
  // OT + restday with or without leave
  // finalAmount = !isHoliday && isRestDay && totalOtRestAmount;
  // OT normal day with or without leave
  // finalAmount = !isHoliday && !isRestDay && totalOtAmount25;

  return { finalAmount, otRate, isHoliday, isRestDay };
};
