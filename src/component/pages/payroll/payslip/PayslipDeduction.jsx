import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  empContributionEarningsId,
  mandatoryDeductionId,
} from "../../../helpers/functions-payitemId";
const PayslipDeduction = ({ paytypeId, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: deductions } = useQueryData(
    `${devApiUrl}/v1/payslip/deductions/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `deductions-${paytypeId}` // key
  );

  let totalOtherDeductions = 0;

  return (
    <>
      {deductions?.data.length > 0 && paytypeId !== mandatoryDeductionId && (
        <>
          <tr className="hover:bg-white">
            <td colSpan={4} className=" print:py-[2px]">
              &nbsp;
            </td>
          </tr>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={4} className="w-[20rem] uppercase print:py-[2px]">
              {deductions?.data[0].paytype_name}
            </td>
          </tr>
        </>
      )}
      {deductions?.data.map((item, key) => {
        totalOtherDeductions += Number(item.deduction_amount);
        return (
          <tr key={key} className="hover:bg-transparent">
            <td className="w-[20rem] print:py-[2px]">
              {item.deduction_details}
            </td>
            <td className="w-[10rem] print:py-[2px]"></td>
            <td className=" print:py-[2px]"></td>
            <td className="text-right px-4 print:py-[2px]">
              {numberWithCommas(Number(item.deduction_amount).toFixed(2))}
            </td>
          </tr>
        );
      })}
      {deductions?.data.length > 0 && (
        <>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100 ">
            <td
              colSpan={3}
              className="uppercase text-right xs:pr-4 print:py-[2px]"
            >
              Total {deductions?.data[0].paytype_name}
            </td>
            <td className=" text-right px-4 print:py-[2px]">
              {numberWithCommas(totalOtherDeductions.toFixed(2))}
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default PayslipDeduction;
