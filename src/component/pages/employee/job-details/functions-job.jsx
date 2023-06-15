export const getNightDiffTime = (startHrs) => {
  let stardNd = 22;
  let regWorkHrs = 8;
  let resultHrs = 0;
  let totalNdHrs = 0;
  let startNdHrs = Number(startHrs);
  resultHrs = stardNd - startNdHrs;

  // 2pm - 5pm
  if (resultHrs > 4 && resultHrs <= 8) {
    totalNdHrs = regWorkHrs - resultHrs + 1;
  }

  // 6pm - 9pm
  if (resultHrs <= 4 && resultHrs > 0) {
    totalNdHrs = regWorkHrs - resultHrs;
  }

  // 10pm - 11pm
  if (startNdHrs >= stardNd && startNdHrs <= 23) {
    totalNdHrs = regWorkHrs - (startNdHrs - 22) - 1;
  }

  // 12am - 1am
  if (startNdHrs >= 0 && startNdHrs < 2) {
    totalNdHrs = 5 - startNdHrs;
  }

  // 2am - 6am
  if (startNdHrs >= 2 && startNdHrs <= 6) {
    totalNdHrs = 6 - startNdHrs;
  }

  return totalNdHrs;
};

export const getWorkTime = (time) => {
  let t = time;
  // const hour = t.split(":")[0];
  // const minute = t.split(":")[1];
  const hourFormatted = t % 12 || 12; // hour returned in 24 hour format
  const morning = t < 12 ? "AM" : "PM";

  return `${hourFormatted} ${morning} `;
};

export const getWorkFromHome = (day) => {
  const d = day;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  if (days[d] === undefined) return "N/A";
  return `${days[d]} `;
};
