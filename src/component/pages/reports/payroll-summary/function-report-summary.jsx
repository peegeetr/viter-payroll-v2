import { holidayId, overtimeId } from "../../../helpers/functions-payitemId";

// get beenifits leave
export const getErningsRate = (earning, item) => {
  let otList = [];
  let holidayList = [];
  earning?.data.map((eItem) => {
    // check if leave type aid is equal
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
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
  });
  return { otList, holidayList };
};

/* table {
    position: relative
}

1st tr {
  position: sticky
  top: 0
}

2nd tr {
  position: sticky
  top: 35px
}

className="sticky left-[1px] bg-white"  

*/
