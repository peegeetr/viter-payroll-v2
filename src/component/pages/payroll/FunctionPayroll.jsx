import { setError, setMessage } from "../../../store/StoreAction";
import { UrlAdmin } from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";

export const validatePrId = async (
  urlEarning,
  urlDeduction,
  dispatch,
  prId,
  setLoading
) => {
  let val = false;
  const earning = await fetchEarnings(urlEarning);

  const deduction = await fetchDeducations(urlDeduction);

  if (earning.length > 0 || deduction.length > 0) {
    setLoading(false);
    dispatch(setError(true));
    dispatch(
      setMessage(
        `You cannot update ${prId} because it is already associated with Earnings or Deductions.`
      )
    );
    val = true;
  }

  return val;
};

const fetchEarnings = async (urlEarning) => {
  let val = 0;
  // get total result of data
  const result = await queryData(urlEarning, "get");

  return getResult(result);
};

const fetchDeducations = async (urlDeduction) => {
  // get total result of data
  const result = await queryData(urlDeduction, "get");

  return getResult(result);
};

const getResult = (result) => {
  if (typeof result === "undefined") {
    setLoading(false);
    return;
  }
  if (!result.data) {
    setLoading(false);
    return;
  }
  if (result.data) {
    return result.data;
  }
};

// url in hris
export const hrisUrlAdmin = "admin";
export const hrisUrlViewer = "viewer";
export const hrisUrlContributor = "contributor";
export const hrisUrlManager = "manager";
// get beenifits leave
export const getUrlRole = (eItem) => {
  let role = "";
  role =
    eItem.role_is_admin === 1
      ? `/${hrisUrlAdmin}`
      : eItem.role_is_manager === 1
      ? `/${hrisUrlManager}`
      : eItem.role_is_contributor === 1
      ? `/${hrisUrlContributor}`
      : `/${hrisUrlViewer}`;
  return role;
};

export const getNewEmployeList = (payrollList, employee) => {
  let list = [];
  let role = "";
  payrollList.map((plItem) => {
    employee?.data.map((eItem) => {
      if (Number(plItem.payroll_list_employee_id) === eItem.employee_aid) {
        role = getUrlRole(eItem);
        list.push({
          payroll_list_employee_email: plItem.payroll_list_employee_email,
          link: `${role}/my-info/payslip/view?payslipid=${plItem.payroll_list_aid}`,
        });
      }
    });
  });
  return list;
};
