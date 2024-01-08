import React from "react";

// Mac
// const urlHris = "http://localhost/react-vite/viter-hris-v3"
// const urlHrisImg = "http://localhost/react-vite/viter-hris-v3/public/img"
// const urlPayroll = "http://localhost/react-vite/viter-payroll-v2"
// const urlPayrollImg = "http://localhost/react-vite/viter-payroll-v2/public/img"

// Mon
// const urlHris = "http://localhost/viter-hris-v3";
// const urlHrisImg = "http://localhost/viter-hris-v3/public/img";
// const urlPayroll = "http://localhost/viter-payroll-v2";
// const urlPayrollImg = "http://localhost/viter-payroll-v2/public/img";

// // Cyrene
// const urlHris = "http://localhost/projects/viter-hris-v3";
// const urlHrisImg = "http://localhost/projects/viter-hris-v3/public/img";
// const urlPayroll = "http://localhost/projects/viter-payroll-v2";
// const urlPayrollImg = "http://localhost/projects/viter-payroll-v2/public/img";

// // Mac, Mon, Cy
// export const hrisdevNavUrl = "/dev-app";
// export const devNavUrl = "/v2";

// // Patrick
// const urlHris = `https://hr-app.frontlinebusiness.com.ph`;
// const urlHrisImg = `https://hr-app.frontlinebusiness.com.ph/img`;
// const urlPayroll = `https://payroll-app.frontlinebusiness.com.ph`;
// const urlPayrollImg = `https://payroll-app.frontlinebusiness.com.ph/img`;
// export const hrisdevNavUrl = "";
// export const devNavUrl = "";

// // ONLINE DEV and LOCAL hris
// export const hrisDevBaseImgUrl = `${urlHrisImg}`;
// export const hrisDevApiUrl = `${urlHris}/rest`;
// export const hrisdevBaseUrl = `${urlHris}`;

// // ONLINE DEV and LOCAL payroll
// export const devBaseImgUrl = `${urlPayrollImg}`;
// export const devApiUrl = `${urlPayroll}/rest`;
// export const devBaseUrl = `${urlPayroll}`;

// // // // Online prod hris
export const hrisDevBaseImgUrl = "https://hris.frontlinebusiness.com.ph/img";
export const hrisDevApiUrl = "https://hris.frontlinebusiness.com.ph/rest";
export const hrisdevBaseUrl = "https://hris.frontlinebusiness.com.ph";
export const hrisdevNavUrl = "";

// Online prod payroll
export const devBaseImgUrl = "https://payroll.frontlinebusiness.com.ph/v2/img";
export const devApiUrl = "https://payroll.frontlinebusiness.com.ph/v2/rest";
export const devBaseUrl = "https://payroll.frontlinebusiness.com.ph/v2";
export const devNavUrl = "/v2";

export const baseUrl = "/v2";
export const isDemoMode = "0";
export const UrlAdmin = "";
export const UrlSystem = "system";
export const is_developer = "is_developer";

export const devKeyPr = "sKPgVdamzw7hL9IqTKFLOqrGVJaHaOwSN4nYhm8Hv9dwjtHZg88e";
export const devKeyHr =
  "$2a$05$9mjWb0WZnCU9k79dNAn85ecjwAQfFjz.EZhgNYBvb5Lwgth7FZBXW";

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
export function setStorageRoute(jwt, isDev) {
  localStorage.setItem("fbsPayroll", JSON.stringify({ token: jwt, isDev }));
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
export const getPayPeriod = (startDate, endDate) => {
  const mo = formatDate(startDate).split(" ")[1];
  const startDay = formatDate(startDate).split(" ")[2];
  const endMo = formatDate(endDate).split(" ")[1];
  const endDay = formatDate(endDate).split(" ")[2];
  const year = formatDate(endDate).split(" ")[3];
  return `${mo} ${startDay} - ${endMo} ${endDay}, ${year}`;
};

// get pay period working days between dates
export const getPayslipPeriod = (result) => {
  const mo = formatDate(result.data[0].payroll_start_date).split(" ")[1];
  const startDay = formatDate(result.data[0].payroll_start_date).split(" ")[2];
  const endDay = formatDate(result.data[0].payroll_end_date).split(" ")[2];
  const year = formatDate(result.data[0].payroll_start_date).split(" ")[3];
  return `${mo} ${startDay} - ${endDay}, ${year}`;
};

// get user type
export const getUserType = (developer) => {
  let link = "";
  developer ? (link = `${devNavUrl}/${UrlSystem}`) : (link = `${devNavUrl}`);
  return link;
};

// remove number format with comma
export const removeComma = (value) => {
  // console.log(value);
  return value.replace(/[,]/g, "");
  // console.log(value.replace(/[,]/g, ""));
};

export const getDateNow = () => {
  return new Date(new Date().toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split("T")[0];
};

export const currentYear = () => {
  const d = new Date();
  const year = d.getFullYear();
  return year;
};

export const getYearCount = (hiredDate) => {
  let yearCount = 0;
  const hired = new Date(hiredDate);
  const current = new Date();
  const hiredYear = hired.getYear();
  const currentYear = current.getYear();

  yearCount = currentYear - hiredYear;

  if (yearCount <= 1) {
    return `${yearCount} year`;
  } else {
    return `${yearCount} years`;
  }
};

// get employee tenure
export const getTenure = (dte) => {
  const dStart = new Date(dte);
  const dNow = new Date();
  const mStart = dStart.getMonth();
  const mNow = dNow.getMonth();
  const yStart = dStart.getFullYear();
  const yNow = dNow.getFullYear();
  let tenure = 0;
  if (mNow >= mStart) {
    tenure = yNow - yStart;
  } else {
    tenure = yNow - yStart - 1;
  }

  return tenure > 1 ? `${tenure} yrs` : `${tenure} yr`;
};

// tooltips
export const showTips = (item) => {
  return `${item.payroll_list_employee_name}`;
};

export const pesoSign = <span className="mr-1"> &#8369; </span>;

export const getYearNow = () => {
  const d = new Date();
  const year = d.getFullYear();
  return year;
};
