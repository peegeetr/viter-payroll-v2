import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import { getPayPeriod } from "../../../../helpers/functions-general";

const WTaxBodyYearly = ({ result, year, employeeId }) => {
  console.log("result", result);
  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => (
            <div key={key} className="mb-8 print:mb-12">
              <HeaderPrint />
              <div className="text-center pb-4 font-bold print:pt-4">
                {year !== "" && (
                  <>
                    <p className="m-0">Tax Summary</p>
                    <p className="m-0 text-primary font-bold">{year}</p>
                    <p className="m-0 text-primary font-bold">
                      {employeeId === "0"
                        ? "All Employee"
                        : item.payroll_list_employee_name}
                    </p>
                  </>
                )}
              </div>
              <table>
                <tbody>
                  <tr className="bg-gray-200 hover:bg-gray-200 text-primary">
                    <td>Total Amount of Compensation</td>
                    <td className="w-[8rem] text-right px-4">0.00</td>
                    <td className=" text-right px-4">0.00</td>
                  </tr>
                  <tr>
                    <td className="w-[15rem]">Less Non Taxable Compensation</td>
                    <td className="w-[8rem] text-right px-4">0.00</td>
                    <td className=" text-right px-4"></td>
                  </tr>
                  <tr>
                    <td className="w-[15rem]">13th Month & Other Benefits</td>
                    <td className="w-[8rem] text-right px-4">9,500.00</td>
                    <td className=" text-right px-4"></td>
                  </tr>
                  <tr>
                    <td className="w-[15rem]">Deminimis</td>
                    <td className="w-[8rem] text-right px-4">0.00</td>
                    <td className=" text-right px-4"></td>
                  </tr>
                  <tr>
                    <td className="w-[15rem]">
                      Employee Share (SSS, PHIC, PGBG)
                    </td>
                    <td className="w-[8rem] text-right px-4">0.00</td>
                    <td className=" text-right px-4"></td>
                  </tr>
                  <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                    <td className="w-[15rem] ">
                      Total Non Taxable Compensation
                    </td>
                    <td className=" text-right px-4">9,500.00</td>
                    <td className=" text-right px-4">9,500.00</td>
                  </tr>
                  <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                    <td className="w-[15rem] ">Tax Withheld</td>
                    <td className=" text-right px-4">0.00</td>
                    <td className=" text-right px-4">{item.totalTax}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default WTaxBodyYearly;
