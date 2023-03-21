import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  otherBenefitsEarningsId,
  wagesEarningsId,
} from "../../../helpers/functions-payitemId";
import TableSpinner from "../../../partials/spinners/TableSpinner";
const PayslipEarnings = ({
  paytypeId,
  empid,
  payrollid,
  gross,
  deminimis,
  hourRate,
  days,
}) => {
  // use if not loadmore button undertime
  const { data: earnings, isLoading } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `earnings-${paytypeId}` // key
  );
  let numberOfHolidays = earnings?.data.length > 0 ? earnings?.data.length : 0;
  let basicPay = hourRate * (days - numberOfHolidays) * 8;
  let basicHrs = days - numberOfHolidays;
  let totalAmount = basicPay;
  let isDeminimis = deminimis;
  console.log(earnings);
  return (
    <>
      {isLoading ? (
        <tr className="text-center ">
          <td colSpan="100%" className="p-10">
            {/* <TableSpinner /> */}
            Loading...
          </td>
        </tr>
      ) : (
        <>
          {paytypeId === wagesEarningsId && (
            <>
              <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase">
                <td className="w-[30rem]">WAGES</td>
                <td className="w-[10rem]">hours</td>
                <td className="w-[10rem] text-right  px-4">rate</td>
                <td className="text-right  px-4">total</td>
              </tr>
              <tr className="hover:bg-transparent">
                <td className="w-[20rem]">{`Basic Pay ${
                  isDeminimis > 0
                    ? `(De Minimis inclusive ${numberWithCommas(deminimis)})`
                    : ``
                }`}</td>
                <td className="w-[10rem]">{basicHrs * 8}</td>
                <td className="text-right   px-4">{hourRate}</td>
                <td className="text-right px-4">
                  {numberWithCommas(basicPay.toFixed(2))}
                </td>
              </tr>
            </>
          )}

          {paytypeId === otherBenefitsEarningsId &&
            earnings?.data.length > 0 && (
              <>
                <tr className="hover:bg-white">
                  <td colSpan={4}></td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td colSpan={4} className="w-[20rem] uppercase">
                    {earnings?.data[0].paytype_name}
                  </td>
                </tr>
              </>
            )}
          {earnings?.data.map((item, key) => {
            totalAmount += Number(item.earnings_amount);
            return (
              <tr key={key} className="hover:bg-transparent">
                <td className="w-[20rem]">
                  {item.payitem_name} {item.earnings_details}
                </td>
                <td className="w-[10rem]">{8}</td>
                {/* <td className="w-[10rem]">{numberOfHolidays * 8}</td> */}
                <td className=" text-right px-4 w-[5rem]">
                  {(
                    hourRate *
                    (Number(item.earnings_holidays_rate) / 100)
                  ).toFixed(4)}
                </td>
                <td className=" text-right px-4">
                  {numberWithCommas(Number(item.earnings_amount).toFixed(2))}
                </td>
              </tr>
            );
          })}
          {earnings?.data.length > 0 && (
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="uppercase text-right xs:pr-4">
                Total {earnings?.data[0].paytype_name}
              </td>
              <td className=" text-right px-4">
                {numberWithCommas(Number(gross).toFixed(2))}
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

export default PayslipEarnings;
