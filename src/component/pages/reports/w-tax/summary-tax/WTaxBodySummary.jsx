import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import { numberWithCommas } from "../../../../helpers/functions-general";
import { getMonthName } from "../yearly-tax/functions-wtax";

const WTaxBodySummary = ({ result, month, monthlyTax }) => {
  let totalShareEe = 0;
  let totalBenefits = 0;
  let taxMonthly = 0;
  let totalCompensation = 0;
  let nonTax = 0;
  let tax = 0;
  console.log(monthlyTax);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

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

    monthlyTax?.map((sTax) => {
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
      <div className="mb-8 print:mb-12">
        <HeaderPrint />
        <div className="text-center pb-4 font-bold print:pt-4">
          <p className="m-0">Tax Summary</p>
          <p className="m-0 text-primary font-bold">
            {`${getMonthName(month)} - ${getCurrentYear()}`}
          </p>
        </div>
        <table>
          <tbody>
            <tr className="bg-gray-200 hover:bg-gray-200 text-primary">
              <td>Total Amount of Compensation</td>
              <td className="w-[8rem] text-right px-4"></td>
              <td className=" text-right px-4">
                {/* {numberWithCommas(Number(totalCompensation).toFixed(2))} */}
                0.00
              </td>
            </tr>
            <tr>
              <td className="w-[15rem]">Less Non Taxable Compensation</td>
              <td className="w-[8rem] text-right px-4"></td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr>
              <td className="w-[15rem]">13th Month & Other Benefits</td>
              <td className="w-[8rem] text-right px-4">
                {/* {numberWithCommas(Number(totalBenefits).toFixed(2))} */}
                0.00
              </td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr>
              <td className="w-[15rem]">Deminimis</td>
              <td className="w-[8rem] text-right px-4">
                {/* {numberWithCommas(Number(item.deminimis).toFixed(2))} */}
                0.00
              </td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr>
              <td className="w-[15rem]">Employee Share (SSS, PHIC, PGBG)</td>
              <td className="w-[8rem] text-right px-4">
                {/* {numberWithCommas(Number(totalShareEe).toFixed(2))} */}
                0.00
              </td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem] ">Total Non Taxable Compensation</td>
              <td className=" text-right px-4"></td>
              <td className=" text-right px-4">
                {/* {numberWithCommas(nonTax.toFixed(2))} */}
                0.00
              </td>
            </tr>

            <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem] ">Tax Withheld</td>
              <td className=" text-right px-4"></td>
              <td className=" text-right px-4">
                {/* {numberWithCommas(Number(item.tax).toFixed(2))} */}
                0.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WTaxBodySummary;
