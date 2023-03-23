import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  otherBenefitsEarningsId,
  wagesEarningsId,
  nightDiffId,
  absencesId,
  undertimeId,
} from "../../../helpers/functions-payitemId";
import TableSpinner from "../../../partials/spinners/TableSpinner";
const PayslipEarnings = ({
  paytypeId,
  empid,
  payrollid,
  hourRate,
  days,
  payslip,
}) => {
  // use if not loadmore button undertime
  const { data: earnings, isLoading } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${paytypeId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    `earnings-${paytypeId}` // key
  );
  let deminimis = payslip?.data[0].payroll_list_deminimis;
  let holidayHrs = Number(payslip?.data[0].payroll_list_holiday_hrs);
  let leaveHrs = Number(payslip?.data[0].payroll_list_leave_hrs);
  let absencesHrs = Number(payslip?.data[0].payroll_list_absences_hrs);
  let undertimeHrs = Number(payslip?.data[0].payroll_list_absences_hrs);
  let totalHrs = holidayHrs + leaveHrs;
  let basicHrs = days * 8 - totalHrs;
  let basicPay = hourRate * basicHrs;
  let gross = payslip?.data[0].payroll_list_gross;
  let totalAmount = basicPay;
  // console.log(earnings, payslip);
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
                  deminimis > 0
                    ? `(De Minimis inclusive ${numberWithCommas(deminimis)})`
                    : ``
                }`}</td>
                <td className="w-[10rem]">{basicHrs}</td>
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
                <td className="w-[20rem]">{item.earnings_details}</td>
                <td className="w-[10rem]">
                  {`${item.earnings_hrs} ${
                    Number(nightDiffId) === item.payitem_aid
                      ? `of ${days * 8}`
                      : ``
                  }`}
                </td>
                {/* <td className="w-[10rem]">{numberOfHolidays * 8}</td> */}
                <td className=" text-right px-4 w-[5rem]">
                  {(hourRate * (Number(item.earnings_rate) / 100)).toFixed(4)}
                </td>
                <td className=" text-right px-4">
                  {item.earnings_payitem_id === absencesId ||
                  item.earnings_payitem_id === undertimeId
                    ? "-"
                    : ""}
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
