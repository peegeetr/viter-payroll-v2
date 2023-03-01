export const checkLocalStorage = () => {
  let fbsPayroll = null;
  try {
    fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));
    // console.log(hrisv3token);
  } catch (error) {
    fbsPayroll = null;
  }

  return fbsPayroll;
};
