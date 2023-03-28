import { holidayId, overtimeId } from "../../../helpers/functions-payitemId";

// get beenifits leave
export const getErningsRate = (earning, item) => {
  let list = [];
  let payOtHrs = "";
  let payOtRate = "";
  let payOtAmount = "";
  let payHolidayHrs = "";
  let payHolidayRate = "";
  let payHolidayAmount = "";
  earning?.data.map((eItem) => {
    // check if leave type aid is equal

    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      eItem.earnings_payitem_id === overtimeId &&
      eItem.earnings_payroll_id === item.payroll_list_payroll_id
    ) {
      // leave list return
      payOtHrs = eItem.earnings_hrs;
      payOtRate = eItem.earnings_rate;
      payOtAmount = eItem.earnings_amount;

      list.push({
        employee_id: eItem.earnings_employee_id,
        employee_name: eItem.earnings_employee,
        otHrs: payOtHrs,
        otRate: payOtRate,
        otAmount: payOtAmount,
        holidayHrs: payHolidayHrs,
        holidayRate: payHolidayRate,
        holidayAmount: payHolidayAmount,
      });
    }
    // check if leave type aid is equal
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      eItem.earnings_payitem_id === holidayId &&
      eItem.earnings_payroll_id === item.payroll_list_payroll_id
    ) {
      // leave list return
      payHolidayHrs = eItem.earnings_hrs;
      payHolidayRate = eItem.earnings_rate;
      payHolidayAmount = eItem.earnings_amount;

      list.push({
        employee_id: eItem.earnings_employee_id,
        employee_name: eItem.earnings_employee,
        otHrs: payOtHrs,
        otRate: payOtRate,
        otAmount: payOtAmount,
        holidayHrs: payHolidayHrs,
        holidayRate: payHolidayRate,
        holidayAmount: payHolidayAmount,
      });
    }

    payOtHrs = "";
    payOtRate = "";
    payOtAmount = "";
    payHolidayHrs = "";
    payHolidayRate = "";
    payHolidayAmount = "";
  });
  console.log(list);
  return list;
};
