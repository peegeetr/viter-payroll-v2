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
          {payslip?.data.length > 0 && (
            <>
              <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                <th className=" w-[5rem] uppercase print:py-[2px]">
                  Mandatory deduction
                </th>
                <th className=" uppercase text-right px-4 print:py-[2px]">
                  EE
                </th>
                <th className=" uppercase text-right px-4 print:py-[2px]">
                  ER
                </th>
                <th className=" uppercase print:py-[2px]"> </th>
              </tr>
              <tr className="hover:bg-transparent text-right px-4 ">
                <td className="w-[20rem] text-left print:py-[2px]"> SSS</td>
                <td className="w-[10rem] text-right px-4 print:py-[2px]">
                  {payslip?.data[0].payroll_list_sss_ee}
                </td>
                <td className="text-right px-4 print:py-[2px]">
                  {payslip?.data[0].payroll_list_sss_er}{" "}
                </td>
                <td className="text-right px-4 print:py-[2px]">
                  {payslip?.data[0].payroll_list_sss_ee}
                </td>
                {/* <td>{numberWithCommas(Number(sssTotal).toFixed(2))} </td> */}
              </tr>
              <tr className="hover:bg-transparent">
                <td className="w-[20rem] print:py-[2px]">Pag-ibig</td>
                <td className="w-[10rem] print:py-[2px] text-right px-4">
                  {payslip?.data[0].payroll_list_pagibig_ee}
                </td>
                <td className="text-right px-4 print:py-[2px]">
                  {payslip?.data[0].payroll_list_pagibig_er}
                </td>
                <td className="text-right px-4 print:py-[2px]">
                  {payslip?.data[0].payroll_list_pagibig_ee}
                </td>
              </tr>
              <tr className="hover:bg-transparent">
                <td className=" print:py-[2px]">Philhealth</td>
                <td className=" print:py-[2px] text-right px-4">
                  {payslip?.data[0].payroll_list_philhealth_ee}
                </td>
                <td className=" print:py-[2px] text-right px-4">
                  {payslip?.data[0].payroll_list_philhealth_er}
                </td>
                <td className=" print:py-[2px] text-right px-4">
                  {payslip?.data[0].payroll_list_philhealth_ee}
                </td>
              </tr>
              <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                <td
                  colSpan={3}
                  className="uppercase text-right xs:pr-4 print:py-[2px]"
                >
                  Total Mandatory deduction
                </td>
                <td className=" text-right px-4 print:py-[2px]">
                  {numberWithCommas(
                    Number(payslip?.data[0].payroll_list_madatory_ee).toFixed(2)
                  )}
                </td>
              </tr>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PayslipMandatoryDeduc;
