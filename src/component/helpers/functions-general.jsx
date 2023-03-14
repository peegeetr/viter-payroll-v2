import React from "react";

// Online URL dev hris
export const hrisDevBaseImgUrl = "https://hr-app.frontlinebusiness.com.ph/img";
export const hrisDevApiUrl = "https://hr-app.frontlinebusiness.com.ph/rest";
export const hrisdevBaseUrl = "https://hr-app.frontlinebusiness.com.ph";
export const hrisdevNavUrl = "";

// Online URL dev payroll
export const devBaseImgUrl = "https://payroll-app.frontlinebusiness.com.ph/img";
export const devApiUrl = "https://payroll-app.frontlinebusiness.com.ph/rest";
export const devBaseUrl = "https://payroll-app.frontlinebusiness.com.ph";
export const devNavUrl = "";

// Local URL dev
// export const devApiUrl = "http://localhost/react-vite/viter-hris-v3/rest";
// export const devBaseUrl = "http://localhost/react-vite/viter-hris-v3/public";
// export const devBaseImgUrl =
//   "https://hris.frontlinebusiness.com.ph/dev-app/img";
// export const devBaseUrl = "https://hris.frontlinebusiness.com.ph/dev-app";
// export const devNavUrl = "/dev-app";

// Local URL dev
// export const devApiUrl = "http://localhost/viter-payroll-v2/rest";
// export const devBaseUrl = "http://localhost/viter-payroll-v2/public";
// export const devBaseImgUrl = "http://localhost/viter-payroll-v2/public/img";
// export const devNavUrl = "";

// cy url
// export const devBaseImgUrl = "https://payroll-app.frontlinebusiness.com.ph/img";
// export const devApiUrl = "http://localhost/projects/viter-payroll-v2/rest";
// export const devBaseUrl = "http://localhost/projects/viter-payroll-v2/public";
// export const devNavUrl = "";

// // local URL dev hris
// export const hrisDevBaseImgUrl =
//   "https://hris.frontlinebusiness.com.ph/dev-app/img";
// export const hrisDevApiUrl = "http://localhost/projects/viter-hris-v3/rest";
// export const hrisdevBaseUrl = "http://localhost/projects/viter-hris-v3/public";
// export const hrisdevNavUrl = "/dev-app";

export const UrlAdmin = "";
export const UrlSystem = "system";
export const is_developer = "is_developer";

export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

// console log values
export const consoleLog = (values, param2 = null) => {
  console.log(values, param2);
};

// Copyright year
export const copyrightYear = () => {
  return new Date().getFullYear();
};

// accept only numbers
export const handleNumOnly = (e) => {
  if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 46) {
    e.preventDefault();
  }
};

// format the numbers separated by comma
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// do load more
export const doLoadmore = (data, setResult) => {
  if (data.count === 0) {
    setResult([]);
  } else {
    setResult((prevState) => [...prevState, ...data.data]);
  }
};

// do list
export const doList = (data, setResult) => {
  if (data.count === 0) {
    setResult([]);
  } else {
    setResult(data.data);
    // setResult([]);
  }
};

// get the url id parameter
export const getUrlParam = (id) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const param = urlParams.get(id);
  // return param;
  return urlParams;
};

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
  const data = fetch(url, {
    method: "post",
    body: fd,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error + " api endpint error");
    });
  return data;
};

// storage after login
export function setStorageRoute(jwt, data) {
  localStorage.setItem("fbsPayroll", JSON.stringify({ token: jwt, data }));
}

// formatting date
export const formatDate = (dateVal) => {
  const d = new Date(dateVal);
  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const day = d.getDay();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // return `${days[day]} ${months[month]} ${date} ${year}`;
  // return `${days[day]}, ${months[month]} ${date}`;
  return `${days[day]} ${months[month]} ${date} ${year} `;
  // return `${months[month]}. ${date}, ${year}`;
  // return `${date} `;
};

// get focus on a button
export const GetFocus = (id) => {
  React.useEffect(() => {
    const obj = document.getElementById(id);
    obj.focus();
  }, []);
};

// get school year
export const expirationYear = () => {
  const d = new Date();
  const year = d.getFullYear();

  return `${year}`;
};

// Capital first letter
export const capitalFirstLetter = (val) => {
  const str = val;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

// get working days in a month
export const getWorkingDaysInMonth = (date) => {
  var d = new Date(date);
  var currentDay = d.getDate();
  var year = d.getYear() + 1900;
  var month = d.getMonth();
  var total = 0;
  var done = 0;
  for (var day = 1; day <= 31; day++) {
    var t = new Date(year, month, day);
    if (t.getMonth() > month) break; // month has less than 31 days
    if (t.getDay() == 0 || t.getDay() == 6) continue; // no weekday
    total++; // increase total
    if (t.getDate() <= currentDay) done++; // increase past days
  }
  return total;
};

// get working days between dates
export const getWorkingDays = (startDate, endDate) => {
  // clone date to avoid messing up original date and time
  let frD = new Date(startDate.getTime()),
    toD = new Date(endDate.getTime()),
    numOfWorkingDays = 0;

  while (frD <= toD) {
    let day = frD.getDay();
    frD.setDate(frD.getDate() + 1);
    if (day == 0 || day == 6) continue;
    numOfWorkingDays++;
  }

  return numOfWorkingDays;
};

// get pay period working days between dates
export const getPayPeriod = (result) => {
  const mo = formatDate(result?.pages[0].data[0].payroll_start_date).split(
    " "
  )[1];
  const startDay = formatDate(
    result?.pages[0].data[0].payroll_start_date
  ).split(" ")[2];
  const endDay = formatDate(result?.pages[0].data[0].payroll_end_date).split(
    " "
  )[2];
  const year = formatDate(result?.pages[0].data[0].payroll_start_date).split(
    " "
  )[3];
  return `${mo} ${startDay} - ${endDay}, ${year}`;
};

// get user type
export const getUserType = (developer) => {
  let link = "";
  developer ? (link = `${devNavUrl}/${UrlSystem}`) : (link = `${devNavUrl}`);
  return link;
};
