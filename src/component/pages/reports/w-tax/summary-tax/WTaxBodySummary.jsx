import React from "react";
import HeaderPrint from "../../../../partials/HeaderPrint";
import {
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { getMonthName } from "../yearly-tax/functions-wtax";

const WTaxBodySummary = ({ result, month, monthlyTax }) => {
  let totalShareEe = 0;
  let shareEe = 0;
  let totalBenefits = 0;
  let benefits = 0;
  let totalDeminimis = 0;
  let deminimis = 0;
  let taxMonthly = 0;
  let totalCompensation = 0;
  let compensation = 0;
  let taxableCompensation = 0;
  let nonTax = 0;
  let taxWithheld = 0;

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const getSummary = () => {
    let list = {};
    result?.pages.map((page, key) => {
      page.data.map((item, key) => {
        totalShareEe += item.sss + item.pag + item.phic;
        shareEe = item.sss + item.pag + item.phic;
        totalBenefits += item.month13 + item.benefits;
        benefits = item.month13 + item.benefits;
        totalDeminimis += item.deminimis;
        deminimis = item.deminimis;
        taxWithheld += item.tax;
        nonTax = totalDeminimis + totalShareEe + totalBenefits;
        totalCompensation += Number(item.gross) + Number(item.benefits);
        compensation = Number(item.gross) + Number(item.benefits);

        // compute monthly tax due
        taxMonthly += payComputeTaxDue(
          compensation,
          monthlyTax,
          benefits,
          shareEe,
          deminimis
        );
      });
    });

    list.totalShareEe = totalShareEe.toFixed(2);
    list.totalBenefits = totalBenefits.toFixed(4);
    list.totalCompensation = totalCompensation.toFixed(2);
    list.taxableCompensation = taxableCompensation.toFixed(2);
    list.totalDeminimis = totalDeminimis.toFixed(2);
    list.taxWithheld = taxWithheld.toFixed(2);
    list.nonTax = nonTax.toFixed(2);
    list.taxMonthly = taxMonthly.toFixed(2);
    // reset accumulated variables
    taxMonthly = 0;
    totalShareEe = 0;
    totalBenefits = 0;
    totalDeminimis = 0;
    totalCompensation = 0;
    taxWithheld = 0;
    return list;
  };

  const payComputeTaxDue = (
    compensation,
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
      Number(compensation.toFixed(2)) - totalNonTaxableCompensation;

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

    return taxDue;
  };

  return (
    <>
      <div className="mb-8 print:mb-12">
        <HeaderPrint />
        <div className="text-center pb-4 font-bold print:pt-4">
          <p className="m-0  text-lg">Tax Summary</p>
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
                {pesoSign}
                {numberWithCommas(
                  Number(getSummary().totalCompensation).toFixed(2)
                )}
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
                {pesoSign}
                {numberWithCommas(
                  Number(getSummary().totalBenefits).toFixed(2)
                )}
              </td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr>
              <td className="w-[15rem]">Deminimis</td>
              <td className="w-[8rem] text-right px-4">
                {pesoSign}
                {numberWithCommas(
                  Number(getSummary().totalDeminimis).toFixed(2)
                )}
              </td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr>
              <td className="w-[15rem]">Employee Share (SSS, PHIC, PGBG)</td>
              <td className="w-[8rem] text-right px-4">
                {pesoSign}
                {numberWithCommas(Number(getSummary().totalShareEe).toFixed(2))}
              </td>
              <td className=" text-right px-4"></td>
            </tr>
            <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem] ">Total Non Taxable Compensation</td>
              <td className=" text-right px-4"></td>
              <td className=" text-right px-4">
                {pesoSign}
                {numberWithCommas(Number(getSummary().nonTax).toFixed(2))}
              </td>
            </tr>

            <tr className="  bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem] ">Tax Withheld</td>
              <td className=" text-right px-4"></td>
              <td className=" text-right px-4">
                {pesoSign}
                {/* {numberWithCommas(Number(getSummary().taxMonthly).toFixed(2))} */}
                {numberWithCommas(Number(getSummary().taxWithheld).toFixed(2))}
                {/* {taxWithheld} */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WTaxBodySummary;
