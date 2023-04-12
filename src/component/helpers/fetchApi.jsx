import { consoleLog, devKeyPr } from "./functions-general";

const fetchApi = (url, fd = {}, dispatch = null, method = "get") => {
  let username = devKeyPr;
  let password = "";
  let auth = btoa(`${username}:${password}`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + auth);
  myHeaders.append("Content-Type", "application/json");

  let options = {
    method,
    headers: myHeaders,
  };

  if (method !== "get") {
    options = {
      ...options,
      body: JSON.stringify(fd),
    };
  }

  const data = fetch(url, options)
    .then((res) => {
      return res.json();
    })

    .catch((error) => {
      consoleLog(error);
      return false;
    });
  return data;
};

export default fetchApi;
