import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../helpers/functions-general";
const PayslipWages = ({ paytypeId, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: earnings } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    "pay-wages" // key
  );
  console.log("earnings", paytypeId, earnings);
  return (
    <>
      <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
        <td className="w-[30rem]">{earnings?.data[0].paytype_name}</td>
        <td className="w-[10rem]">hours</td>
        <td>rate</td>
        <td>total</td>
      </tr>
      <tr>
        <td className="w-[20rem]">Basic Pay (Deminimis inclusive)</td>
        <td className="w-[10rem]">0.00</td>
        <td>0.00</td>
        <td>0.00</td>
      </tr>
      {earnings?.data.map((item, key) => {
        return (
          <tr key={key}>
            <td className="w-[20rem]">
              {item.payitem_name} {item.earnings_details}
            </td>
            <td className="w-[10rem]">0</td>
            <td>{item.earnings_amount}</td>
            <td>0.00</td>
          </tr>
        );
      })}
      <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
        <td colSpan={3} className="uppercase text-right xs:pr-16">
          Total {earnings?.data[0].paytype_name}
        </td>
        <td>9,830.55</td>
      </tr>
    </>
  );
};

export default PayslipWages;
