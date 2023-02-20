export const employeeRate = (salary, workingDays) => {
  let list = {};
  let dayRate = 0;
  let hourRate = 0;
  let periodSalary = Number(salary) / 2;
  dayRate = periodSalary / Number(workingDays);
  hourRate = dayRate / 8;
  list.daily = dayRate.toFixed(2);
  list.hourly = hourRate.toFixed(4);
  list.period = periodSalary.toFixed(2);
  console.log(list);
  return list;
};

export const computeOt = (item) => {
  //   let amount = 0
  //   if payitemid === 6
  // amount += item.amouadf
};
