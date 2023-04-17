import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import {
  getPayPeriod,
  numberWithCommas,
} from "../../../helpers/functions-general";
import HeaderPrint from "../../../partials/HeaderPrint";

const PayrunSummaryBody = ({ result, startDate, endDate }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => (
            <div key={key} className="mb-8 print:mb-36">
              <HeaderPrint />
              <div className="text-center pb-4 font-bold print:pt-4">
                {startDate !== "" && (
                  <>
                    <p className="m-0">Employee Pay Run Summary</p>
                    <p className="m-0 text-primary font-bold">
                      {getPayPeriod(startDate, endDate)}
                    </p>
                  </>
                )}
              </div>
              <table>
                <tbody>
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
                      {numberWithCommas(item.payroll_list_basic_pay)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">Overtime Pay</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_overtime_pay)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">Paid Leave</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_leave_pay)}
                    </td>
                    <td></td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">Absences</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_absences)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">Holiday</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_holiday)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">
                      Night Shift Differential
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(
                        item.payroll_list_night_shift_differential
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      Wages Total (De Minimis Inclusive)
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_basic_pay)} */}
                      0.00
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      De Minimis Total
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(
                        Number(item.payroll_list_deminimis).toFixed(2)
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">13th month</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_13th_month)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">Bonus</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_bonus)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">Other Benefits</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_other_allowances)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      13th month & other benefits total
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_basic_pay)} */}
                      0.00
                    </td>
                  </tr>
                  {/* total earnings ER */}
                  <tr className="bg-gray-200 hover:bg-gray-200 font-bold uppercase">
                    <td className="w-[15rem] print:py-[2px]">total earnings</td>
                    <td></td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_basic_pay)} */}
                      0.00
                    </td>
                  </tr>
                  {/* employee contributions ER */}
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">SSS Er</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_sss_er)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">PGBG Er</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_pagibig_er)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">PHIC Er</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_philhealth_er)}
                    </td>
                  </tr>
                  <tr className="bg-gray-200  hover:bg-gray-200 font-bold uppercase">
                    <td className="w-[15rem] print:py-[2px]">
                      employee contributions total
                    </td>
                    <td></td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_philhealth_er)} */}
                      0.00
                    </td>
                  </tr>
                  {/* Mandatory deductions EE */}
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">SSS Ee</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_sss_ee)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">PGBG Ee</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_pagibig_ee)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">PHIC Ee</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_philhealth_ee)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      Mandatory deductions total
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_philhealth_ee)} */}
                      0.00
                    </td>
                  </tr>
                  {/* Optional deductions*/}
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">SSS Loan</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_sss_loan)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">PGBG Loan</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_pagibig_loan)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">PGBG MP2</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_pagibig_mp2)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      Optional deductions total
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_pagibig_mp2)} */}
                      0.00
                    </td>
                  </tr>
                  {/* Other deductions*/}
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">FWC Thesis</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_fwc_tithes)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">FCA Tuition</td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_fca_tuition)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white ">
                    <td className="w-[15rem] print:py-[2px]">
                      Other Deductions
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_other_deduction)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      Other deductions total
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_other_deduction)} */}
                      0.00
                    </td>
                  </tr>
                  <tr className="hover:bg-white font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">
                      Payroll Tax total
                    </td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_tax)}
                    </td>
                  </tr>
                  <tr className="bg-gray-200   hover:bg-gray-200 font-bold uppercase">
                    <td className="w-[15rem] print:py-[2px]">
                      total deductions
                    </td>
                    <td></td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {/* {numberWithCommas(item.payroll_list_tax)} */}
                      0.00
                    </td>
                  </tr>
                  <tr className=" bg-primary text-white hover:bg-primary font-bold uppercase ">
                    <td className="w-[15rem] print:py-[2px]">Netpay</td>
                    <td></td>
                    <td className="w-[8rem] text-right px-4 print:py-[2px]">
                      {numberWithCommas(item.payroll_list_net_pay)}
                    </td>
                  </tr>
                  {/* <tr>
                  <td>&nbsp;</td>
                </tr> */}
                </tbody>
              </table>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default PayrunSummaryBody;
