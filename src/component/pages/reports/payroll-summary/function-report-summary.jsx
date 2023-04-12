import { holidayId, overtimeId } from "../../../helpers/functions-payitemId";

// get beenifits leave
export const getErningsRate = (earning, item, isView) => {
  let list = [];
  let payHrs = "";
  let payRate = "";
  let payAmount = "";
  earning?.data.map((eItem) => {
    // check if leave type aid is equal
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      eItem.earnings_payroll_id === item.payroll_list_payroll_id
    ) {
      if (!isView && eItem.earnings_payitem_id === overtimeId) {
        // leave list return
        payHrs = eItem.earnings_hrs;
        payRate = eItem.earnings_rate;
        payAmount = eItem.earnings_amount;

        list.push({
          employee_id: eItem.earnings_employee_id,
          employee_name: eItem.earnings_employee,
          hrs: payHrs,
          rate: payRate,
          amount: payAmount,
        });
      }
      // check if leave type aid is equal
      if (isView && eItem.earnings_payitem_id === holidayId) {
        // leave list return
        payHrs = eItem.earnings_hrs;
        payRate = eItem.earnings_rate;
        payAmount = eItem.earnings_amount;

        list.push({
          employee_id: eItem.earnings_employee_id,
          employee_name: eItem.earnings_employee,
          hrs: payHrs,
          rate: payRate,
          amount: payAmount,
        });
      }
    }
  });
  return list;
};
