import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
const PayslipEarningsBonus = ({ paytypeId, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: earnings, isLoading } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `earnings-${paytypeId}` // key
  );

  let totalAmount = 0;
  return (
    <>
      {isLoading ? (
        <tr className="text-center ">
          <td colSpan="100%" className="p-10">
            Loading...
          </td>
        </tr>
      ) : (
        <>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={3} className="w-[20rem] uppercase print:py-[2px]">
              bonus
            </td>
            <td className=" text-right px-4 print:py-[2px]">Total</td>
          </tr>
          {earnings?.data.map((item, key) => {
            totalAmount += Number(item.earnings_amount);
            return (
              <tr key={key} className="hover:bg-transparent">
                <td colSpan={3} className="w-[20rem] print:py-[2px]">
                  {item.earnings_details}
                </td>
                <td className=" text-right px-4 print:py-[2px]">
                  {numberWithCommas(Number(totalAmount).toFixed(2))}
                </td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
};

export default PayslipEarningsBonus;
