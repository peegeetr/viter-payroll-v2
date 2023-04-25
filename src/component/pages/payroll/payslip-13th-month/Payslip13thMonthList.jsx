import {
  getWorkingDays,
  numberWithCommas,
} from "../../../helpers/functions-general";
import PayslipHeader from "../payslip/PayslipHeader";

const Payslip13thMonthList = ({ payslip }) => {
  console.log(payslip);
  const days = getWorkingDays(
    new Date(payslip?.data[0].payroll_start_date),
    new Date(payslip?.data[0].payroll_end_date)
  );
  let netPay =
    Number(payslip?.data[0].payroll_list_13th_month) -
    Number(payslip?.data[0].payroll_list_tax);

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
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                Total compensation{" "}
                {payslip?.data[0].payroll_pay_date.split("-")[0]}
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_13th_month).toFixed(2)
                )}
              </td>
            </tr>

            {/* tax */}
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="w-[20rem] uppercase print:py-[2px]">
                TAX
              </td>
              <td
                colSpan={3}
                className="w-[20rem] uppercase text-right px-4 print:py-[2px]"
              >
                Total
              </td>
            </tr>
            <tr className="hover:bg-white">
              <td colSpan={3} className="w-[20rem]  print:py-[2px]">
                Payroll Tax
              </td>
              <td
                colSpan={3}
                className="w-[20rem] uppercase text-right px-4 print:py-[2px]"
              >
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_tax).toFixed(2)
                )}
              </td>
            </tr>

            {/* total deduction */}
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                total deductions
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(
                  Number(payslip?.data[0].payroll_list_tax).toFixed(2)
                )}
              </td>
            </tr>
            <tr className="hover:bg-white">
              <td colSpan={4} className=" print:py-[2px]">
                &nbsp;
              </td>
            </tr>

            {/* netpay */}
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px] "
              >
                13th Month
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(Number(netPay).toFixed(2))}
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

export default Payslip13thMonthList;
