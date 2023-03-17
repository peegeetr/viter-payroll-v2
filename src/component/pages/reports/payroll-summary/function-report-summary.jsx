import { holidayId, overtimeId } from "../../../helpers/functions-payitemId";

// get beenifits leave
export const getErningsRate = (earning, item) => {
  let list = [];
  earning?.data.map((eItem) => {
    // check if leave type aid is equal
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      (eItem.earnings_payitem_id === overtimeId ||
        eItem.earnings_payitem_id === holidayId)
    ) {
      // leave list return
      list.push({
        employee_id: eItem.earnings_employee_id,
        employee_name: eItem.earnings_employee,
        otHrs: 1,
        otRate: 20,
        otAmount: 5,
        holidayHrs: 1,
        holidayRate: 20,
        holidayAmount: 5,
      });
    }
  });
  console.log("types", list, earning);
  return list;
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


*/
