// get beenifits leave
export const getEmployeeName = (item, employee) => {
  let employee_name = "";
  employee?.data.map((eItem) => {
    // check if leave type aid is equal
    if (eItem.employee_aid === Number(item.holiday_exemption_eid)) {
      employee_name = `${eItem.employee_lname}, ${eItem.employee_fname}`;
    }
  });
  return employee_name;
};
