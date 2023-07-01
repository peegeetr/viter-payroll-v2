import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import {
  getPayPeriod,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";

const WTaxBodyMonthly = ({ result, monthlyTax, month, year }) => {
  let totalShareEe = 0;
  let totalBenefits = 0;
  let tax = 0;
  let nonTax = 0;
  let totalCompensation = 0;

  const payComputeTaxDue = (
    gross,
    monthlyTax,
    totalBenefits,
    totalMadatoryEe,
    totalDiminimis
  ) => {
    let taxDue = 0;
    const totalNonTaxableCompensation =
      Number(totalBenefits.toFixed(2)) +
      Number(totalMadatoryEe) +
      Number(totalDiminimis);
    let taxableCompensationIncome =
      Number(gross.toFixed(2)) +
      Number(totalBenefits) -
      totalNonTaxableCompensation;

    console.log(totalNonTaxableCompensation, taxableCompensationIncome);
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
  // console.log(result);
  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => {
            totalShareEe = 0;
            totalBenefits = 0;
            tax = 0;
            totalShareEe += item.sss + item.pag + item.phic;
            totalBenefits += item.month13 + item.benefits;
            // compute monthly tax due
            tax = payComputeTaxDue(
              item.gross,
              monthlyTax,
              totalBenefits,
              totalShareEe,
              item.deminimis
            );
            totalCompensation = Number(item.gross) + Number(item.benefits);
            return (
              <div key={key} className="mb-8 print:mb-20">
                <HeaderPrint />
                <div className="text-center pb-4 font-bold print:pt-4">
                  {month !== "" && (
                    <>
                      <p className="m-0 text-lg">Tax Summary</p>
                      <p className="m-0 text-primary font-bold">
                        {`${month} - ${year}`}
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
                        {pesoSign}
                        {/* {numberWithCommas(Number(item.gross).toFixed(2))} */}
                        {numberWithCommas(totalCompensation.toFixed(2))}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">
                        Less Non Taxable Compensation
                      </td>
                      <td className="w-[8rem] text-right px-4"></td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">13th Month & Other Benefits</td>
                      <td className="w-[8rem] text-right px-4">
                        {pesoSign}
                        {numberWithCommas(Number(totalBenefits).toFixed(2))}
                      </td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">De Minimis</td>
                      <td className="w-[8rem] text-right px-4">
                        {pesoSign}
                        {numberWithCommas(Number(item.deminimis).toFixed(2))}
                      </td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">
                        Employee Share (SSS, PHIC, PGBG)
                      </td>
                      <td className="w-[8rem] text-right px-4">
                        {pesoSign}
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
                        {pesoSign}
                        {numberWithCommas(nonTax.toFixed(2))}
                      </td>
                    </tr>
                    <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                      <td className="w-[15rem] ">Tax Withheld</td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {pesoSign}
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
