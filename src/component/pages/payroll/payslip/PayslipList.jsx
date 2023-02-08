const PayslipList = () => {
  return (
    <>
      <div className="relative overflow-x-auto z-0">
        <div className="xs:grid grid-cols-2 mb-5">
          <p className="mb-0">
            <span className="font-semibold">Employee : </span> Lumabas, Cyrene
          </p>
          <p className="mb-0">
            <span className="font-semibold">Pay Day : </span> Jan 15 2023
          </p>
          <p className="mb-0">
            <span className="font-semibold">Department : </span> IT
          </p>
          <p className="mb-0">
            <span className="font-semibold">Frequency : </span> Semi-monthly
          </p>
          <p className="mb-0">
            <span className="font-semibold">Position : </span> Developer
          </p>
          <p className="mb-0">
            <span className="font-semibold">Pay Period : </span> Jan 1 - 15 2023
          </p>
        </div>
      </div>

      <div className="relative text-center overflow-x-auto z-0 ">
        <table>
          <tbody>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
              <td className="w-[20rem]">wages</td>
              <td className="w-[10rem]">hours</td>
              <td>rate</td>
              <td>total</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Basic Pay (Deminimis inclusive)</td>
              <td className="w-[10rem]">88</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">OverTime Pay</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Paid Leave</td>
              <td className="w-[10rem]">0</td>
              <td>100%(0.00)</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">SPC Coco Festival (Holiday)</td>
              <td className="w-[10rem]">0</td>
              <td>130%(0.00)</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Inlfation Adjustment</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Pay Adjustment</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Hazard Pay</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Hazard</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Absences</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Deminimis</td>
              <td className="w-[10rem]"></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Wages
              </td>
              <td>9,830.55</td>
            </tr>
            {/* 2nd */}
            <tr>
              <td colSpan={4}></td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={4} className="w-[20rem] uppercase">
                13th month & other benefits
              </td>
            </tr>
            <tr>
              <td className="w-[20rem]">13th Month</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Bonus</td>
              <td className="w-[10rem]">0</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[20rem]">Employee Referral Bonus</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Bereavement</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Separation Pay</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Other Allowances</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                TOTAL 13th month & other benefits
              </td>
              <td>9,830.55</td>
            </tr>

            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Earnings
              </td>
              <td>9,830.55</td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>

            {/* 3nd */}
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={4} className="w-[20rem] uppercase">
                Mandatory Deductions
              </td>
            </tr>
            <tr>
              <td className="w-[20rem]">SSS</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Pag-ibig</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Phil-Health</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Mandatory deductions
              </td>
              <td>9,830.55</td>
            </tr>

            {/* 3nd */}
            <tr>
              <td colSpan={4}></td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={4} className="w-[20rem] uppercase">
                Optional Deductions
              </td>
            </tr>
            <tr>
              <td className="w-[20rem]">Pag-Ibig Loan</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Pag-Ibig Loan</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">SSS Loan</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Optional deductions
              </td>
              <td>9,830.55</td>
            </tr>

            {/* 3nd */}
            <tr>
              <td colSpan={4}></td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={4} className="w-[20rem] uppercase">
                Other Deductions
              </td>
            </tr>
            <tr>
              <td className="w-[20rem]">FCA - Tuition</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">FWC - Tithes</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Other Deductions</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="uppercase text-right xs:pr-16">
                Total Other deductions
              </td>
              <td>9,830.55</td>
            </tr>

            {/* 4nd */}
            <tr>
              <td colSpan={4}></td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={4} className="w-[20rem] uppercase">
                TAX
              </td>
            </tr>
            <tr>
              <td className="w-[20rem]">Payroll Tax</td>
              <td className="w-[10rem]">0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16 pr-4">
                total payroll tax
              </td>
              <td>9,830.55</td>
            </tr>

            {/* total */}
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-300 hover:bg-gray-300 uppercase">
              <td colSpan={3} className="uppercase text-right xs:pr-16 pr-4">
                total deductions
              </td>
              <td>9,830.55</td>
            </tr>
            {/* netpay */}
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="bg-primary hover:bg-primary text-white uppercase">
              <td colSpan={2}></td>
              <td>net pay</td>
              <td>9,196.35</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PayslipList;
