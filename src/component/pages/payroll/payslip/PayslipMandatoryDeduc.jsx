import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  empContributionEarningsId,
  mandatoryDeductionId,
} from "../../../helpers/functions-payitemId";
import { totalSum } from "./functionPayslip";
const PayslipMandatoryDeduc = ({ paytypeId, payslip, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: deductions, isLoading } = useQueryData(
    `${devApiUrl}/v1/payslip/deductions/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `deductions-${paytypeId}` // key
  );
  // console.log(deductions);
  return (
    <>
      {payslip?.data.length > 0 && (
        <>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td className="w-[20rem] uppercase">Mandatory deduction</td>
            <td className="w-[20rem] uppercase">EE</td>
            <td colSpan={2} className="w-[20rem] uppercase">
              ER
            </td>
          </tr>
          <tr className="hover:bg-transparent">
            <td className="w-[20rem]"> SSS</td>
            <td className="w-[10rem]">
              {payslip?.data[0].payroll_list_sss_ee}
            </td>
            <td>{payslip?.data[0].payroll_list_sss_er} </td>
            <td>{payslip?.data[0].payroll_list_sss_ee}</td>
            {/* <td>{numberWithCommas(Number(sssTotal).toFixed(2))} </td> */}
          </tr>
          <tr className="hover:bg-transparent">
            <td className="w-[20rem]">Pag-ibig</td>
            <td className="w-[10rem]">
              {payslip?.data[0].payroll_list_pagibig_ee}
            </td>
            <td>{payslip?.data[0].payroll_list_pagibig_er}</td>
            <td>{payslip?.data[0].payroll_list_pagibig_ee}</td>
          </tr>
          <tr className="hover:bg-transparent">
            <td className="w-[20rem]">Philhealth</td>
            <td className="w-[10rem]">
              {payslip?.data[0].payroll_list_philhealth_ee}
            </td>
            <td>{payslip?.data[0].payroll_list_philhealth_er}</td>
            <td>{payslip?.data[0].payroll_list_philhealth_ee}</td>
          </tr>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={3} className="uppercase text-right xs:pr-16">
              Total Mandatory deduction
            </td>
            <td>
              {numberWithCommas(
                Number(payslip?.data[0].payroll_list_madatory_ee).toFixed(2)
              )}
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default PayslipMandatoryDeduc;
