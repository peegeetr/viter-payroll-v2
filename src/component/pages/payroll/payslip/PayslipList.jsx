import {
  otherBenefitsEarningsId,
  wagesEarningsId,
  mandatoryDeductionId,
  optionalDeductionId,
  paytypeOtherDeductionId,
  taxDeductionId,
  empContributionEarningsId,
} from "../../../helpers/functions-payitemId";
import PayslipDeduction from "./PayslipDeduction";
import PayslipEarnings from "./PayslipEarnings";
import PayslipHeader from "./PayslipHeader";
import PayslipMandatoryDeduc from "./PayslipMandatoryDeduc";

const PayslipList = ({ payslip }) => {
  return (
    <>
      <PayslipHeader
        payslip={payslip}
        empid={payslip?.data[0].payroll_list_employee_id}
      />

      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <tbody>
            <PayslipEarnings
              paytypeId={wagesEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />
            {/* 2nd */}
            <PayslipEarnings
              paytypeId={otherBenefitsEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            <tr className="hover:bg-white">
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Earnings
              </td>
              <td>9,830.55</td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>

            {/* deduction */}
            <PayslipMandatoryDeduc
              paytypeId={empContributionEarningsId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            <PayslipDeduction
              paytypeId={optionalDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            <PayslipDeduction
              paytypeId={paytypeOtherDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />
            <PayslipDeduction
              paytypeId={taxDeductionId}
              empid={payslip?.data[0].payroll_list_employee_id}
              payrollid={payslip?.data[0].payroll_list_payroll_id}
            />

            {/* total */}
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16 pr-4">
                total deductions
              </td>
              <td>9,830.55</td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            {/* netpay */}
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16 pr-4">
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
  );
};

export default PayslipList;
