import { getPayPeriod } from "../../../helpers/functions-general";

// get beenifits leave
export const getEmployeeDetails = (item, employee) => {
  let employee_name = "";
  let isWorkOnHoliday = "";
  employee?.data.map((eItem) => {
    console.log(item);
    // check if leave type aid is equal
    if (eItem.employee_aid === Number(item.holiday_exemption_eid)) {
      employee_name = `${eItem.employee_lname}, ${eItem.employee_fname}`;
      isWorkOnHoliday = `${eItem.employee_job_work_reg_hol}`;
    }
  });
  return { employee_name, isWorkOnHoliday };
};

export const getRateDate = (item, holidayDate, date) => {
  let rate = "";
  holidayDate?.data.map((hItem) => {
    // check if leave type aid is equal
    if (item && hItem.holidays_date === item.holiday_exemption_holiday_date) {
      rate = hItem.holidays_rate;
    }
    if (hItem.holidays_date === date) {
      rate = hItem.holidays_rate;
    }
  });
  return rate;
};
// getPayPeriod()
export const getPayPeriodHoliday = (item, payPeriodHoliday) => {
  let payperiod = "";
  payPeriodHoliday?.data.map((phItem) => {
    // check if leave type aid is equal
    if (
      phItem.payroll_list_employee_id === item.holiday_exemption_eid &&
      phItem.payroll_id === item.holiday_exemption_pr_id
    ) {
      payperiod = getPayPeriod(
        phItem.payroll_start_date,
        phItem.payroll_end_date
      );
    }
  });
  return payperiod;
};
// getPayPeriod()
export const getHolidayName = (item, Allholiday) => {
  let holidayName = "";
  Allholiday?.data.map((allhItem) => {
    // check if leave type aid is equal
    if (allhItem.holidays_aid === Number(item.holiday_exemption_holiday_id)) {
      holidayName = `${allhItem.holidays_name},
        (${allhItem.holidays_rate}%)`;
    }
  });
  return holidayName;
};
