import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { numberWithCommas } from "../../../helpers/functions-general";

const PayrunSummaryBody = ({ result }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => (
            <tbody key={key}>
              <tr className="bg-gray-300 hover:bg-gray-300 text-primary font-bold ">
                <td className="print:py-[2px]">
                  {item.payroll_list_employee_name}
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Basic Pay</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  {numberWithCommas((1000000).toFixed(2))}
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Overtime Pay</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Paid Leave</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  9,500.00
                </td>
                <td></td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Absences</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Holiday</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">
                  Night Shift Differential
                </td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">
                  Wages Total (De Minimis Inclusive)
                </td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">De Minimis Total</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">13th month</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Bonus</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Other Benefits</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">
                  13th month & other benefits total
                </td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              {/* total earnings ER */}
              <tr className="bg-gray-200 hover:bg-gray-200 font-bold uppercase">
                <td className="w-[15rem] print:py-[2px]">total earnings</td>
                <td></td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              {/* employee contributions ER */}
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">SSS Er</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">PGBG Er</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">PHIC Er</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="bg-gray-200  hover:bg-gray-200 font-bold uppercase">
                <td className="w-[15rem] print:py-[2px]">
                  employee contributions total
                </td>
                <td></td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              {/* Mandatory deductions EE */}
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">SSS Ee</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">PGBG Ee</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">PHIC Ee</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">
                  Mandatory deductions total
                </td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              {/* Optional deductions*/}
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">SSS Loan</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">PGBG Loan</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">PGBG MP2</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">
                  Optional deductions total
                </td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              {/* Other deductions*/}
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">FWC Thesis</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">FCA Tuition</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white ">
                <td className="w-[15rem] print:py-[2px]">Other Deductions</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">
                  Other deductions total
                </td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="hover:bg-white font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">Payroll Tax total</td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className="bg-gray-200   hover:bg-gray-200 font-bold uppercase">
                <td className="w-[15rem] print:py-[2px]">total deductions</td>
                <td></td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr className=" bg-primary text-white hover:bg-primary font-bold uppercase ">
                <td className="w-[15rem] print:py-[2px]">Netpay</td>
                <td></td>
                <td className="w-[8rem] text-right px-4 print:py-[2px]">
                  0.00
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default PayrunSummaryBody;
