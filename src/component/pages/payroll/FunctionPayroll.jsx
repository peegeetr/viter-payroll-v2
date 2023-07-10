import { setError, setMessage } from "../../../store/StoreAction";
import { UrlAdmin, removeComma } from "../../helpers/functions-general";
import { payrollCategory13thMonthId } from "../../helpers/functions-payroll-category-id";
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
          payrollId: plItem.payroll_list_payroll_id,
        });
      }
    });
  });
  return list;
};

// get values remove comma
export const getValuesRemoveComma = (values) => {
  let list = [];
  const sss_er = removeComma(values.payroll_list_sss_er);
  const sss_ee = removeComma(values.payroll_list_sss_ee);
  const pagibig_er = removeComma(values.payroll_list_pagibig_er);
  const pagibig_ee = removeComma(values.payroll_list_pagibig_ee);
  const philhealth_er = removeComma(values.payroll_list_philhealth_er);
  const philhealth_ee = removeComma(values.payroll_list_philhealth_ee);
  const sss_loan = removeComma(values.payroll_list_sss_loan);
  const pagibig_loan = removeComma(values.payroll_list_pagibig_loan);
  const pagibig_mp2 = removeComma(values.payroll_list_pagibig_mp2);
  const fca_tuition = removeComma(values.payroll_list_fca_tuition);
  const fwc_tithes = removeComma(values.payroll_list_fwc_tithes);
  const other_deduction = removeComma(values.payroll_list_other_deduction);
  const basic_pay = removeComma(values.payroll_list_basic_pay);
  const tax = removeComma(values.payroll_list_tax);
  const gross = removeComma(values.payroll_list_gross);
  const deduction = removeComma(values.payroll_list_deduction);
  const net_pay = removeComma(values.payroll_list_net_pay);
  const madatory_ee =
    Number(sss_ee) + Number(pagibig_ee) + Number(philhealth_ee);

  list.push({
    payroll_list_sss_er: sss_er,
    payroll_list_sss_ee: sss_ee,
    payroll_list_pagibig_er: pagibig_er,
    payroll_list_pagibig_ee: pagibig_ee,
    payroll_list_philhealth_er: philhealth_er,
    payroll_list_philhealth_ee: philhealth_ee,
    payroll_list_madatory_ee: madatory_ee,
    payroll_list_sss_loan: sss_loan,
    payroll_list_pagibig_loan: pagibig_loan,
    payroll_list_pagibig_mp2: pagibig_mp2,
    payroll_list_fca_tuition: fca_tuition,
    payroll_list_fwc_tithes: fwc_tithes,
    payroll_list_other_deduction: other_deduction,
    payroll_list_tax: tax,
    payroll_list_basic_pay: basic_pay,
    payroll_list_gross: gross,
    payroll_list_deduction: deduction,
    payroll_list_net_pay: net_pay,
  });
  return list;
};

export const getEmployeeList = (employee, values) => {
  let list = [];
  let countEarly13thMonth = 0;
  // check if have early 13th month
  employee?.data.map((eItem) => {
    countEarly13thMonth += Number(eItem.employee_job_early_13th_month);
  });

  // if have early 13th month and category id is 13th month
  if (
    countEarly13thMonth > 0 &&
    Number(values.payroll_category_type) === payrollCategory13thMonthId
  ) {
    employee?.data.map((eItem) => {
      if (
        eItem.employee_job_payroll_elegibility === 1 &&
        eItem.employee_job_early_13th_month === 1
      ) {
        list.push({
          employee_aid: eItem.employee_aid,
          employee_lname: eItem.employee_lname,
          employee_fname: eItem.employee_fname,
          employee_job_email: eItem.employee_job_email,
          employee_job_salary: eItem.employee_job_salary,
          employee_job_nd_per_day: eItem.employee_job_nd_per_day,
          employee_job_work_reg_hol: eItem.employee_job_work_reg_hol,
          employee_job_deminimis: eItem.employee_job_deminimis,
          employee_job_pagibig_amount: eItem.employee_job_pagibig_amount,
          department_name: eItem.department_name,
          employee_job_sss_deduc: eItem.employee_job_sss_deduc,
          employee_job_pag_ibig_deduc: eItem.employee_job_pag_ibig_deduc,
          employee_job_phil_health_deduc: eItem.employee_job_phil_health_deduc,
          employee_job_account_number: eItem.employee_job_account_number,
          employee_job_payroll_elegibility:
            eItem.employee_job_payroll_elegibility,
          employee_job_early_13th_month: eItem.employee_job_early_13th_month,
        });
      }
    });
  }

  return { countEarly13thMonth, list };
};

export const getResultEmployeeList = (employee, values) => {
  let list = employee?.data;

  if (getEmployeeList(employee, values).countEarly13thMonth > 0) {
    list = getEmployeeList(employee, values).list;
  }

  return list;
};
