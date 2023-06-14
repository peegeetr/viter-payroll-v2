import { formatDate } from "../../../helpers/functions-general";

export const handleExportLeave = (dataExport, exportDate) => {
  const saveData = (data, fileName) => {
    let a = document.createElement("a");
    const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  let totalNet = 0;
  let totalEmployee = 0;
  let str = "ACCOUNT NO., LAST NAME, FIRST NAME, MIDDLE NAME, NETPAY";
  console.log(dataExport);
  dataExport?.map((item, i, row) => {
    totalNet += Number(item.netPay);
    totalEmployee++;
    str +=
      "\n" +
      item.employee_job_number
        .replace(/,/g, " ")
        .replace(/(\r\n|\n|\r)/g, " ") +
      "," +
      `${item.employee_lname.replace(/,/g, " ")}` +
      "," +
      ` ${item.employee_fname.replace(/,/g, " ")}` +
      "," +
      ` ${item.employee_mname.replace(/,/g, " ")}` +
      "," +
      item.netPay.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
  });
  str += "\n\n\n , , , TOTAL NETPAY" + "," + totalNet.toFixed(4);
  str += "\n, , , TOTAL EMPLOYEE" + "," + totalEmployee.toFixed(4);

  const data = str;
  const fileName = `${exportDate}`;

  return saveData(data, fileName);
};

export const getNetAmount = (item, result) => {
  let netPay = 0;
  let list = [];
  result?.data.map((netItem) => {
    if (item.employee_aid === Number(netItem.payroll_list_employee_id)) {
      netPay = netItem.payroll_list_net_pay;
    }
  });
  return netPay;
};

export const getBankTemplateList = (employee, result) => {
  let list = [];
  employee?.data.map((empItem) => {
    result?.map((netItem) => {
      if (empItem.employee_aid === Number(netItem.payroll_list_employee_id)) {
        list.push({
          employee_job_number: empItem.employee_job_number,
          employee_lname: empItem.employee_lname,
          employee_fname: empItem.employee_fname,
          employee_mname: empItem.employee_mname,
          start_date: netItem.payroll_start_date,
          end_date: netItem.payroll_end_date,
          netPay: netItem.payroll_list_net_pay,
        });
      }
    });
  });
  return list;
};
