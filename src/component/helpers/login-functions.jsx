import { consoleLog, devNavUrl, UrlAdmin } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  consoleLog(data);
  switch (data.account_role_is_admin) {
    case "1":
      navigate(`${devNavUrl}/${UrlAdmin}/home`);
      break;
    default:
      // navigate(`${devNavUrl}/${UrlTrainee}/home`);
      break;
  }
};
