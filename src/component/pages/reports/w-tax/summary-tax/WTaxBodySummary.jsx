import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import { numberWithCommas } from "../../../../helpers/functions-general";
import { computeTaxYearly } from "../../../../helpers/payroll-formula";
import { getMonthName } from "../yearly-tax/functions-wtax";

const WTaxBodySummary = ({
  result,
  monthFrom,
  monthTo,
  monthlyTax,
  yearlyTax,
  monthlyGross,
}) => {
  let totalShareEe = 0;
  let totalBenefits = 0;
  let taxMonthly = 0;
  let taxYearly = 0;
  let taxWitheld = 0;
  let taxPayable = 0;
  let nonTax = 0;
  let empGrossMonthly = 0;

  // console.log("monthlyGrosss", monthlyGross);

  const payComputeTaxDue = (emp, monthlyTax) => {
    let taxDue = 0;
    console.log(monthlyGross?.length);
    // monthlyGross.length > 0 &&
    monthlyGross?.map((mg) => {
      if (emp.payroll_list_employee_id === mg.payroll_list_employee_id) {
        let totalShareEe = mg.sss + mg.pag + mg.phic;
        let totalBenefits = mg.month13 + mg.bonus + mg.benefits;
        const totalNonTaxableCompensation =
          Number(totalBenefits.toFixed(2)) + totalShareEe + mg.deminimis;
        let taxableCompensationIncome =
          Number(mg.gross.toFixed(2)) - totalNonTaxableCompensation;
        monthlyTax.map((sTax) => {
          if (
            Number(taxableCompensationIncome) >=
              Number(sTax.tax_monthly_range_from) &&
            Number(taxableCompensationIncome) <=
              Number(sTax.tax_monthly_range_to)
          ) {
            taxDue +=
              (taxableCompensationIncome -
                Number(sTax.tax_monthly_less_amount)) *
                (Number(sTax.tax_monthly_rate) / 100) +
              Number(sTax.tax_monthly_additional_amount);
          }
        });

        const nonTax = totalNonTaxableCompensation;
        // console.log(taxDue, totalShareEe);
      }
    });
    return taxDue;
  };

  return (
    <>
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => {
            // totalShareEe = 0;
            // totalBenefits = 0;
            taxMonthly = 0;
            totalShareEe = item.sss + item.pag + item.phic;
            totalBenefits = item.month13 + item.bonus + item.benefits;
            nonTax = totalBenefits + totalShareEe + item.deminimis;
            // compute monthly tax due
            taxMonthly = payComputeTaxDue(item, monthlyTax);
            // console.log(taxMonthly);
            // compute yearly tax due
            // taxYearly = computeTaxPayable(item.gross, yearlyTax);
            taxYearly = computeTaxYearly(item.gross, yearlyTax, nonTax);
            taxPayable = taxYearly;
            taxWitheld = taxPayable - taxMonthly;
            // console.log(item, taxMonthly, taxWitheld);
            return (
              <div key={key} className="mb-8 print:mb-12">
                <HeaderPrint />
                <div className="text-center pb-4 font-bold print:pt-4">
                  {monthFrom !== "" && (
                    <>
                      <p className="m-0">Tax Summary</p>
                      <p className="m-0 text-primary font-bold">{`${getMonthName(
                        monthFrom
                      )} - ${getMonthName(monthTo)}`}</p>
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
                      <td className="w-[15rem] ">Tax Withheld</td>
                      <td className=" text-right px-4"></td>
                      <td className=" text-right px-4">
                        {numberWithCommas(taxMonthly.toFixed(2))}
                        {/* {taxMonthly} */}
                      </td>
                    </tr>
                    <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
                      <td className="w-[15rem] ">Tax Due</td>
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

export default WTaxBodySummary;
