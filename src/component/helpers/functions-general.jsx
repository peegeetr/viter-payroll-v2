import React from "react";

// Online URL dev
export const hrisDevApiUrl =
  "https://hris.frontlinebusiness.com.ph/dev-app/rest";
export const hrisdevBaseImgUrl =
  "https://hris.frontlinebusiness.com.ph/dev-app/img";
export const hrisdevBaseUrl = "https://hris.frontlinebusiness.com.ph/dev-app";
export const hrisdevNavUrl = "/dev-app";

// Local URL dev
// export const devApiUrl = "http://localhost/react-vite/viter-hris-v3/rest";
// export const devBaseUrl = "http://localhost/react-vite/viter-hris-v3/public";
// export const devBaseImgUrl =
//   "http://localhost/react-vite/viter-hris-v3/public/img";
// export const devNavUrl = "/dev-app";

// cy url
export const devApiUrl = "http://localhost/projects/viter-payroll-v2/rest";
export const devBaseUrl = "http://localhost/projects/viter-payroll-v2/public";
export const devNavUrl = "/dev-app";

export const UrlAdmin = "admin";

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
  localStorage.setItem(
    "fwcdonationtoken",
    JSON.stringify({ token: jwt, data })
  );
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
  return `${months[month]} ${date} ${year}`;
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
