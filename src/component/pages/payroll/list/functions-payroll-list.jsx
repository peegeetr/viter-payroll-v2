import { overtimeId } from "../../../helpers/functions-general";
import { computeOt } from "../../../helpers/payroll-formula";

export const runPayroll = (employee, payrollEarnings) => {
  let totalOt = 0;
  let otAmount = 0;
  let totalLeave = 0;
  employee.map((item) => {
    totalOt = overtime(item, payrollEarnings);
    console.log("123", totalOt);
    return totalOt;
  });
  // console.log("totalOt", totalOt);
  return totalOt;
};

export const overtime = (item, payrollEarnings) => {
  let total = 0;
  payrollEarnings.map((peItem) => {
    if (
      item.payroll_earning_type === peItem.earnings_payroll_type_id &&
      item.payroll_list_payroll_id === peItem.earnings_payroll_id &&
      item.payroll_list_employee_id === peItem.earnings_employee_id
    ) {
      if (peItem.earnings_payitem_id === overtimeId) {
        total += Number(peItem.earnings_amount);
      }
    }
  });

  return total;
};
