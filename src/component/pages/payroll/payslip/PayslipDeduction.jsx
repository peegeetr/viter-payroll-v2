import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../helpers/functions-general";
import { mandatoryDeductionId } from "../../../helpers/functions-payitemId";
const PayslipDeduction = ({ paytypeId, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: deductions } = useQueryData(
    `${devApiUrl}/v1/payslip/deductions/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `deductions-${paytypeId}` // key
  );

  return (
    <>
      {deductions?.data.length > 0 && (
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
            <td className="w-[10rem]">{item.deduction_amount}</td>
            <td>0</td>
            <td>0</td>
          </tr>
        );
      })}
      {deductions?.data.length > 0 && (
        <>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={3} className="uppercase text-right xs:pr-16">
              Total {deductions?.data[0].paytype_name}
            </td>
            <td>9,830.55</td>
          </tr>
        </>
      )}
    </>
  );
};

export default PayslipDeduction;
