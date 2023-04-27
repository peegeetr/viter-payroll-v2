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

export const getRateDate = (item, holidayDate) => {
  let rate = "";
  holidayDate?.data.map((hItem) => {
    // check if leave type aid is equal
    if (hItem.holidays_date === item.holiday_exemption_holiday_date) {
      rate = hItem.holidays_rate;
    }
  });
  return rate;
};
