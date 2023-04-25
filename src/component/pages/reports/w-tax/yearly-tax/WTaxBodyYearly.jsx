import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import {
  getPayPeriod,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { computeTaxYearly } from "../../../../helpers/payroll-formula";

const WTaxBodyYearly = ({ result, year, monthlyTax, yearlyTax }) => {
  let totalShareEe = 0;
  let totalBenefits = 0;
  let taxMonthly = 0;
  let taxYearly = 0;
  let taxWitheld = 0;
  let taxPayable = 0;
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

  const computeTaxPayable = (gross, yearlyTax) => {
    let taxDue = 0;
    // const minimum = 250000;
    // if (Number(gross) >= 0 && Number(gross) <= minimum) {
    //   return taxPayable;
    // }

    yearlyTax.map((yTax) => {
      if (
        Number(gross) >= Number(yTax.tax_yearly_from) &&
        Number(gross) <= Number(yTax.tax_yearly_to)
      ) {
        taxDue =
          (Number(gross) - Number(yTax.tax_yearly_from)) *
            (Number(yTax.tax_yearly_rate) / 100) +
          Number(yTax.tax_yearly_fixed_tax);
      }
    });

    // console.log(gross, taxDue);
    return taxDue;
  };

  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => {
            totalShareEe = 0;
            totalBenefits = 0;
            taxMonthly = 0;
            totalShareEe += item.sss + item.pag + item.phic;
            totalBenefits += item.month13 + item.bonus + item.benefits;
            // compute monthly tax due
            taxMonthly = payComputeTaxDue(
              item.gross,
              monthlyTax,
              totalBenefits,
              totalShareEe,
              item.deminimis
            );

            // compute yearly tax due
            // taxYearly = computeTaxPayable(item.gross, yearlyTax);
            taxYearly = computeTaxYearly(item.gross, yearlyTax);
            taxWitheld = taxYearly - taxMonthly;
            console.log(taxWitheld);
            return (
              <div key={key} className="mb-8 print:mb-12">
                <HeaderPrint />
                <div className="text-center pb-4 font-bold print:pt-4">
                  {year !== "" && (
                    <>
                      <p className="m-0">Tax Summary</p>
                      <p className="m-0 text-primary font-bold">{year}</p>
                      <p className="m-0 text-primary font-bold">
                        {item.payroll_list_employee_name}
                      </p>
                    </>
                  )}
                </div>
                <table>
                  <tbody>
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
                      <td className="w-[8rem] text-right px-4"></td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">13th Month & Other Benefits</td>
                      <td className="w-[8rem] text-right px-4">
                        {" "}
                        {numberWithCommas(Number(totalBenefits).toFixed(2))}
                      </td>
                      <td className=" text-right px-4"></td>
                    </tr>
                    <tr>
                      <td className="w-[15rem]">Deminimis</td>
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
                      <td className="w-[15rem] ">Tax Payable</td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(taxPayable.toFixed(2))}
                      </td>
                    </tr>
                    <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                      <td className="w-[15rem] ">Tax Due</td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(taxMonthly.toFixed(2))}
                      </td>
                    </tr>
                    <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                      <td className="w-[15rem] ">Tax Withheld</td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(taxWitheld.toFixed(2))}
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

export default WTaxBodyYearly;
