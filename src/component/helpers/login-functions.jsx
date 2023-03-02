import { devNavUrl, UrlSystem } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/${UrlSystem}/payroll`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/payroll`)
    : navigate(`${devNavUrl}/nopage`);
};
