// formatting date
function formatDateInstallment(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// get number of Months
export const getNumberOfMonths = (startDate) => {
  const todayDate = new Date();
  const sDate = new Date(startDate);
  const todayYear = todayDate.getFullYear();
  const sDateYear = sDate.getFullYear();
  const todayMonth = todayDate.getMonth();
  const sDateMonth = sDate.getMonth();
  let totalMonth = 0;
  let totalYear = todayYear - sDateYear;
  let numberOfMonths = 0;

  if (totalYear === 0) {
    totalMonth = todayMonth - sDateMonth;
    numberOfMonths = totalMonth < 0 ? 0 : totalMonth + 1;
  }

  if (totalYear === 1) {
    let lastYearMonth = 0;
    lastYearMonth = 11 - sDateMonth;
    totalMonth = todayMonth + lastYearMonth + 1;
    numberOfMonths = totalMonth + 1;
  }

  if (totalYear > 1) {
    let startYearMonth = 0;
    let todayYearMonth = 0;
    let todayYearCount = 0;
    startYearMonth = 11 - sDateMonth;
    todayYearMonth = 11 - todayMonth;
    todayYearCount = 12 * totalYear - todayYearMonth;
    totalMonth = todayYearCount + startYearMonth;
    numberOfMonths = totalMonth + 1;
  }
  return numberOfMonths;
};

export const getReadNumberOfMonths = (date, months) => {
  let totalMonths = getNumberOfMonths(date);
  let result = 0;
  if (totalMonths > months) {
    result = months;
  }
  if (totalMonths <= months) {
    result = totalMonths;
  }
  return result;
};

export const getNumMonth = (numMonth, totalNumMonths) => {
  let result = 0;
  if (numMonth <= totalNumMonths) {
    result = numMonth;
  }
  if (numMonth > totalNumMonths) {
    result = totalNumMonths;
  }

  return `${result}`;
};

export const getEndOfInstallment = (numMonth, date) => {
  let startDate = new Date(date);
  let newDate = startDate.setMonth(startDate.getMonth() + Number(numMonth) - 1);
  let endDate = formatDateInstallment(newDate);
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

export const getPayItemName = (payItem, id) => {
  let payTypeName = "";
  payItem?.map((ptItem) => {
    // check if leave type aid is equal
    if (ptItem.payitem_aid === Number(id)) {
      payTypeName = ptItem.payitem_name;
    }
  });
  return payTypeName;
};
