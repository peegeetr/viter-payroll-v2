import { formatDate } from "../../../helpers/functions-general";

// get number of Months
export const getNumberOfMonths = (date) => {
  const today = new Date();
  const d = new Date(date);
  // let totalCount = today.getFullYear() - d.getFullYear();
  let totalCount = today.getMonth() - d.getMonth();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    totalCount--;
  }
  if (totalCount < 0) {
    totalCount = 0;
  } else {
    totalCount = `${totalCount + 1}`;
  }
  return `${totalCount}`;
};

export const getEndOfInstallment = (numMonth, date) => {
  let startDate = new Date(date);
  startDate.setMonth(startDate.getMonth() + Number(numMonth) - 1);
  let endDate = new Date(startDate.toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split("T")[0];
  return `${endDate}`;
};

export const getMonths = () => {
  let monthStart = 1;
  let monthCount = 12;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let list = [];

  for (let i = 0; i < monthCount; i++) {
    monthStart++;
    list.push({
      count: `${Number(monthStart) - 1}`,
      month: `${months[Number(monthStart) - 1]}`,
    });
  }
  return list;
};
