import { holidayId, overtimeId } from "../../../helpers/functions-payitemId";

// get beenifits leave
export const getErningsRate = (earning, item) => {
<<<<<<< HEAD
  let otList = [];
  let holidayList = [];
=======
  let list = [];
  let payOtHrs = "";
  let payOtRate = "";
  let payOtAmount = "";
  let payHolidayHrs = "";
  let payHolidayRate = "";
  let payHolidayAmount = "";
>>>>>>> 17a6c1d35c01713cff25728db740e30ae00f71c6
  earning?.data.map((eItem) => {
    // check if leave type aid is equal

    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
<<<<<<< HEAD
      eItem.earnings_payitem_id === overtimeId
    ) {
      // leave list return
      otList.push({
        employee_id: eItem.earnings_employee_id,
        employee_name: eItem.earnings_employee,
        otHrs: eItem.earnings_hrs,
        otRate: eItem.earnings_rate,
        otAmount: eItem.earnings_amount,
        holidayHrs: eItem.earnings_hrs,
        holidayRate: eItem.earnings_rate,
        holidayAmount: eItem.earnings_amount,
      });
    }
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      eItem.earnings_payitem_id === holidayId
    ) {
      // leave list return
      holidayList.push({
=======
      eItem.earnings_payitem_id === overtimeId &&
      eItem.earnings_payroll_id === item.payroll_list_payroll_id
    ) {
      // leave list return
      payOtHrs = eItem.earnings_hrs;
      payOtRate = eItem.earnings_rate;
      payOtAmount = eItem.earnings_amount;

      list.push({
>>>>>>> 17a6c1d35c01713cff25728db740e30ae00f71c6
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
<<<<<<< HEAD
  return { otList, holidayList };
=======
  console.log(list);
  return list;
>>>>>>> 17a6c1d35c01713cff25728db740e30ae00f71c6
};
