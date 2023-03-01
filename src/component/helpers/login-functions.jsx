import { devNavUrl, UrlAdmin } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/payroll`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${UrlAdmin}/payroll`)
    : navigate(`${devNavUrl}/nopage`);
};
