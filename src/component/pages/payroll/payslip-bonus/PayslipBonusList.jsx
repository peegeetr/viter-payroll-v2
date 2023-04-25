import useQueryData from "../../../custom-hooks/useQueryData";
import {
  getWorkingDays,
  numberWithCommas,
} from "../../../helpers/functions-general";
import { otherBenefitsEarningsId } from "../../../helpers/functions-payitemId";
import PayslipHeader from "../payslip/PayslipHeader";
import PayslipEarningsBonus from "./PayslipEarningsBonus";

const PayslipBonusList = ({ payslip }) => {
  const days = getWorkingDays(
    new Date(payslip?.data[0].payroll_start_date),
    new Date(payslip?.data[0].payroll_end_date)
  );

  return (
    <>
      <PayslipHeader
        payslip={payslip}
        empid={payslip?.data[0].payroll_list_employee_id}
        days={days}
      />

      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <tbody>
            <PayslipEarningsBonus
              paytypeId={otherBenefitsEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            {/* netpay */}
            <tr>
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                Total Bonus
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_bonus).toFixed(2)
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center my-8 ">
          <small>
            <i>
              This is a computer generated payslip. Does not require signature
            </i>
          </small>
        </div>
      </div>
    </>
  );
};

export default PayslipBonusList;
