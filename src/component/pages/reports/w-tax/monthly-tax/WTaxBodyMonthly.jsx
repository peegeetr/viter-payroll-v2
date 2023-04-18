import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import {
  getPayPeriod,
  numberWithCommas,
} from "../../../../helpers/functions-general";

const WTaxBodyMonthly = ({ result, monthlyTax, startDate, endDate }) => {
  let totalShareEe = 0;
  let totalBenefits = 0;
  let tax = 0;
  let nonTax = 0;

  const payComputeTaxDue = (
    gross,
    monthlyTax,
    totalBenefits,
    totalMadatoryEe,
    totalDiminimis
  ) => {
    let taxDue = 0;
    const totalNonTaxableCompensation =
      Number(totalBenefits.toFixed(2)) + totalMadatoryEe + totalDiminimis;
    let taxableCompensationIncome =
      Number(gross.toFixed(2)) - totalNonTaxableCompensation;
    monthlyTax.map((sTax) => {
      if (
        Number(taxableCompensationIncome) >=
          Number(sTax.tax_monthly_range_from) &&
        Number(taxableCompensationIncome) <= Number(sTax.tax_monthly_range_to)
      ) {
        taxDue =
          (taxableCompensationIncome - Number(sTax.tax_monthly_less_amount)) *
            (Number(sTax.tax_monthly_rate) / 100) +
          Number(sTax.tax_monthly_additional_amount);
      }
    });

    nonTax = totalNonTaxableCompensation;
    return taxDue;
  };

  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => {
            totalShareEe = 0;
            totalBenefits = 0;
            tax = 0;
            totalShareEe += item.sss + item.pag + item.phic;
            totalBenefits += item.month13 + item.bonus + item.benefits;
            // compute monthly tax due
            tax = payComputeTaxDue(
              item.gross,
              monthlyTax,
              totalBenefits,
              totalShareEe,
              item.deminimis
            );
            return (
              <div key={key} className="mb-8 print:mb-12">
                <HeaderPrint />
                <div className="text-center pb-4 font-bold print:pt-4">
                  {startDate !== "" && (
                    <>
                      <p className="m-0">Tax Summary</p>
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
                    <tr className="bg-gray-200 hover:bg-gray-200 text-primary">
                      <td>Total Amount of Compensation</td>
                      <td className="w-[8rem] text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(Number(item.gross).toFixed(2))}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">
                        Less Non Taxable Compensation
                      </td>
                      <td className="w-[8rem] text-right px-4">0.00</td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">13th Month & Other Benefits</td>
                      <td className="w-[8rem] text-right px-4">
                        {numberWithCommas(Number(totalBenefits).toFixed(2))}
                      </td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">De Minimis</td>
                      <td className="w-[8rem] text-right px-4">
                        {numberWithCommas(Number(item.deminimis).toFixed(2))}
                      </td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">
                        Employee Share (SSS, PHIC, PGBG)
                      </td>
                      <td className="w-[8rem] text-right px-4">
                        {numberWithCommas(Number(totalShareEe).toFixed(2))}
                      </td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                      <td className="w-[15rem] ">
                        Total Non Taxable Compensation
                      </td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(nonTax.toFixed(2))}
                      </td>
                    </tr>
                    <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                      <td className="w-[15rem] ">Tax Withheld</td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(tax.toFixed(2))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
};

export default WTaxBodyMonthly;
