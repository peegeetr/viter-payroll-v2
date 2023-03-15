import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl, getUrlParam } from "../../../helpers/functions-general";
import {
  otherBenefitsEarningsId,
  wagesEarningsId,
} from "../../../helpers/functions-payitemId";
import PayslipWages from "./PayslipWages";
import PayslipHeader from "./PayslipHeader";
import PayslipOtherBenifits from "./PayslipOtherBenifits";

const PayslipList = () => {
  // use if not loadmore button undertime
  const payslipId = getUrlParam().get("payslipid");

  // use if not loadmore button undertime
  const { data: payslip } = useQueryData(
    `${devApiUrl}/v1/payslip/${payslipId}`, // endpoint
    "get", // method
    "payslip" // key
  );

  return (
    <>
      {payslip?.data.length > 0 ? (
        <>
          <PayslipHeader
            payslip={payslip}
            empid={payslip?.data[0].payroll_list_employee_id}
          />

          <div className="relative text-center overflow-x-auto z-0">
            <table>
              <tbody>
                <PayslipWages
                  paytypeId={wagesEarningsId}
                  empid={payslip?.data[0].payroll_list_employee_id}
                  payrollid={payslip?.data[0].payroll_list_payroll_id}
                />
                {/* 2nd */}
                <PayslipOtherBenifits
                  otherBenefitsId={otherBenefitsEarningsId}
                  empid={payslip?.data[0].payroll_list_employee_id}
                  payrollid={payslip?.data[0].payroll_list_payroll_id}
                />

                <tr className="font-semibold bg-gray-300 hover:bg-gray-300">
                  <td colSpan={3} className="uppercase text-right xs:pr-16">
                    Total Earnings
                  </td>
                  <td>9,830.55</td>
                </tr>
                <tr>
                  <td colSpan={4}>&nbsp;</td>
                </tr>

                {/* 3nd */}
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={4} className="w-[20rem] uppercase">
                    Mandatory Deductions
                  </td>
                </tr>
                <tr>
                  <td className="w-[20rem]">SSS</td>
                  <td className="w-[10rem]">(EE) 0.00</td>
                  <td>(ER) 0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="w-[20rem]">Pag-ibig</td>
                  <td className="w-[10rem]">(EE) 0.00</td>
                  <td>(ER) 0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="w-[20rem]">Phil-Health</td>
                  <td className="w-[10rem]">(EE) 0.00</td>
                  <td>(ER) 0.00</td>
                  <td>0.00</td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={3} className="uppercase text-right xs:pr-16">
                    Total Mandatory deductions
                  </td>
                  <td>9,830.55</td>
                </tr>

                {/* 3nd */}
                <tr>
                  <td colSpan={4}></td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={4} className="w-[20rem] uppercase">
                    Optional Deductions
                  </td>
                </tr>
                <tr>
                  <td className="w-[20rem]">Pag-Ibig Loan</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="w-[20rem]">Pag-Ibig Loan</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="w-[20rem]">SSS Loan</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={3} className="uppercase text-right xs:pr-16">
                    Total Optional deductions
                  </td>
                  <td>9,830.55</td>
                </tr>

                {/* 3nd */}
                <tr>
                  <td colSpan={4}></td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={4} className="w-[20rem] uppercase">
                    Other Deductions
                  </td>
                </tr>
                <tr>
                  <td className="w-[20rem]">FCA - Tuition</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="w-[20rem]">FWC - Tithes</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="w-[20rem]">Other Deductions</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={3} className="uppercase text-right xs:pr-16">
                    Total Other deductions
                  </td>
                  <td>9,830.55</td>
                </tr>

                {/* 4nd */}
                <tr>
                  <td colSpan={4}></td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={4} className="w-[20rem] uppercase">
                    TAX
                  </td>
                </tr>
                <tr>
                  <td className="w-[20rem]">Payroll Tax</td>
                  <td className="w-[10rem]">0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
                  <td
                    colSpan={3}
                    className="uppercase text-right xs:pr-16 pr-4"
                  >
                    total payroll tax
                  </td>
                  <td>9,830.55</td>
                </tr>

                {/* total */}
                <tr>
                  <td colSpan={4}>&nbsp;</td>
                </tr>
                <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
                  <td
                    colSpan={3}
                    className="uppercase text-right xs:pr-16 pr-4"
                  >
                    total deductions
                  </td>
                  <td>9,830.55</td>
                </tr>
                <tr>
                  <td colSpan={4}>&nbsp;</td>
                </tr>
                {/* netpay */}
                <tr className="bg-primary hover:bg-primary text-white uppercase">
                  <td
                    colSpan={3}
                    className="uppercase text-right xs:pr-16 pr-4"
                  >
                    net pay
                  </td>
                  <td>9,196.35</td>
                </tr>
              </tbody>
            </table>

            <p className="text-center my-8 ">
              <i>
                This is a computer generated payslip. Does not require signature
              </i>
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PayslipList;
