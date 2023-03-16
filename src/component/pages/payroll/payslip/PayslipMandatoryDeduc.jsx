import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../helpers/functions-general";
import { empContributionEarningsId } from "../../../helpers/functions-payitemId";
const PayslipMandatoryDeduc = ({ paytypeId, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: earnings } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `earnings-${paytypeId}` // key
  );
  return (
    <>
      {earnings?.data.length > 0 && paytypeId === empContributionEarningsId && (
        <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
          <td className="w-[20rem] uppercase">Mandatory deduction</td>
          <td className="w-[20rem] uppercase">EE</td>
          <td colSpan={2} className="w-[20rem] uppercase">
            ER
          </td>
        </tr>
      )}
      {earnings?.data.map((item, key) => {
        return (
          <tr key={key} className="hover:bg-transparent">
            <td className="w-[20rem]">
              {item.payitem_name} {item.earnings_details}
            </td>
            <td className="w-[10rem]">0</td>
            <td>0</td>
            <td>{item.earnings_amount}</td>
          </tr>
        );
      })}
      {earnings?.data.length > 0 && (
        <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
          <td colSpan={3} className="uppercase text-right xs:pr-16">
            Total Mandatory deduction
          </td>
          <td>9,830.55</td>
        </tr>
      )}
    </>
  );
};

export default PayslipMandatoryDeduc;
