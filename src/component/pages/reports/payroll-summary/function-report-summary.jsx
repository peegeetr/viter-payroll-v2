import { holidayId, overtimeId } from "../../../helpers/functions-payitemId";

// get beenifits leave
export const getErningsOtRate = (earning, item) => {
  let list = [];
  earning?.data.map((eItem) => {
    // check if leave type aid is equal
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      eItem.earnings_payitem_id === overtimeId
    ) {
      // leave list return
      list.push({
        employee_aid: item.employee_aid,
        employee_name: eItem.earnings_employee,
        hrs: 1,
        rate: 20,
        amount: 5,
        total: 5,
      });
    }
  });
  console.log("types", list, earning);
  return list;
};
// get beenifits leave
export const getErningsHolidayRate = (earning, item) => {
  let list = [];
  earning?.data.map((eItem) => {
    // check if leave type aid is equal
    if (
      eItem.earnings_employee_id === item.payroll_list_employee_id &&
      eItem.earnings_payitem_id === holidayId
    ) {
      // leave list return
      list.push({
        employee_aid: item.employee_aid,
        employee_name: eItem.earnings_employee,
        hrs: 1,
        rate: 20,
        amount: 5,
        total: 5,
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
