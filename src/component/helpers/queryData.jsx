import { devKeyHr, devKeyPr } from "./functions-general";

export const queryData = (endpoint, method = "get", fd = {}, prKey = true) => {
  let url = endpoint;
  let username = prKey ? devKeyPr : devKeyHr;
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

  const data = fetch(url, options).then((res) => res.json());
  return data;
};
