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
  let str = "ACCOUNT NO., EMPLOYEE NAME, NETPAY";
  console.log(dataExport);
  dataExport?.map((item, i, row) => {
    totalNet += Number(item.payroll_list_net_pay);
    totalEmployee++;
    str +=
      "\n" +
      item.payroll_list_employee_account_number
        .replace(/,/g, " ")
        .replace(/(\r\n|\n|\r)/g, " ") +
      "," +
      `${item.payroll_list_employee_name.replace(/,/g, " ")}` +
      "," +
      item.payroll_list_net_pay
        .replace(/,/g, " ")
        .replace(/(\r\n|\n|\r)/g, " ");
  });
  str += "\n\n\n TOTAL NETPAY";
  str += "\n" + totalNet.toFixed(4);
  str += "\n\n TOTAL EMPLOYEE";
  str += "\n" + totalEmployee.toFixed(4);

  const data = str;
  const fileName = `${exportDate}`;

  return saveData(data, fileName);
};
