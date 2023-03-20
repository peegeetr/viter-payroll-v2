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

  console.log(deductions);

  return (
    <>
      {deductions?.data.length > 0 && paytypeId !== mandatoryDeductionId && (
        <>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={4} className="w-[20rem] uppercase">
              {deductions?.data[0].paytype_name}
            </td>
          </tr>
        </>
      )}
      {deductions?.data.map((item, key) => {
        return (
          <tr key={key} className="hover:bg-transparent">
            <td className="w-[20rem]">
              {item.payitem_name} {item.earnings_details}
            </td>
            <td className="w-[10rem]"></td>
            <td></td>
            <td className="text-right px-4">
              {numberWithCommas(item.deduction_amount)}
            </td>
          </tr>
        );
      })}
      {deductions?.data.length > 0 && (
        <>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={3} className="uppercase text-right xs:pr-4">
              Total {deductions?.data[0].paytype_name}
            </td>
            <td className=" text-right px-4">
              {numberWithCommas(
                Number(deductions?.data[0].deduction_amount).toFixed(2)
              )}
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default PayslipDeduction;
