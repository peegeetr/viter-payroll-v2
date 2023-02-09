// expiring services
export const getDateLength = (
  inputStartDate,
  inputendDate,
  payStartDate,
  payEndDate
) => {
  const start = new Date(inputStartDate);
  const end = new Date(inputendDate);
  const payStart = new Date(payStartDate);
  const payEendD = new Date(payEndDate);

  //end date
  const endYear = end.getFullYear() - payStart.getFullYear();
  const endDays = end.getDate() - payStart.getDate();
  const endMonths = end.getMonth() - payStart.getMonth();
  const endDate = endYear * 365 + endMonths * 30.417 + endDays;

  //start date
  const startYear = payEendD.getFullYear() - start.getFullYear();
  const startDays = payEendD.getDate() - start.getDate();
  const startMonths = payEendD.getMonth() - start.getMonth();
  const startDate = startYear * 365 + startMonths * 30.417 + startDays;

  //pay date
  const payYear = payEendD.getFullYear() - payStart.getFullYear();
  const payDays = payEendD.getDate() - payStart.getDate();
  const payMonths = payEendD.getMonth() - payStart.getMonth();
  const PayDate = payYear * 365 + payMonths * 30.417 + payDays;

  // return `${startDate} - ${endDate} = ${PayDate}`;
  //result
  if (inputStartDate === "n/a" && inputendDate === "n/a") {
    return `true1 ${startDate} - ${endDate} = ${PayDate}`;
  } else if (endDate < "0" || startDate < "0") {
    return `false1 ${startDate} - ${endDate} = ${PayDate}`;
  } else if (endDate <= PayDate && startDate <= PayDate) {
    return `true2 ${startDate} - ${endDate} = ${PayDate}`;
  } else if (endDate === "0" && startDate === "0") {
    return `true3 ${startDate} - ${endDate} = ${PayDate}`;
  } else {
    return `false2 ${startDate} - ${endDate} = ${PayDate}`;
  }
};
