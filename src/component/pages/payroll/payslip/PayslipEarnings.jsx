import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import {
  absencesId,
  employeeReferralBonusId,
  hazardPayId,
  holidayId,
  inflationAdjustmentId,
  leaveId,
  nightDiffId,
  otherBenefitsEarningsId,
  overtimeId,
  payAdjustmentId,
  undertimeId,
  wagesEarningsId,
} from "../../../helpers/functions-payitemId";
const PayslipEarnings = ({
  paytypeId,
  empid,
  payrollid,
  hourRate,
  days,
  payslip,
  periodPay,
  dailyRate,
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
  let ndHrs = Number(payslip?.data[0].payroll_list_nd_hrs);
  let totalHrs = holidayHrs + leaveHrs;
  let basicHrs = days * 8 - totalHrs;
  let basicPay = periodPay;
  let gross = payslip?.data[0].payroll_list_gross;
  let totalBenefits = payslip?.data[0].payroll_list_total_benefits;
  let totalAmount = basicPay;
  // console.log(earnings);
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
              <tr className="font-semibold bg-gray-100 hover:bg-gray-100 uppercase ">
                <td className="w-[30rem] print:py-[2px]">WAGES</td>
                <td className="w-[10rem] print:py-[2px]">
                  {`${undertimeHrs > 0 || ndHrs > 0 ? "hours" : ""}`}
                </td>
                <td className="w-[10rem] print:py-[2px] text-right px-4">
                  {/* hourly rate */}
                </td>
                <td className="text-right print:py-[2px] px-4">total</td>
              </tr>
              <tr className="hover:bg-transparent">
                <td className="w-[20rem] print:py-[2px]">{`Basic Pay ${
                  deminimis > 0
                    ? `(De Minimis inclusive ${numberWithCommas(deminimis)})`
                    : ``
                }`}</td>
                <td className="w-[10rem] print:py-[2px]">{/* {basicHrs} */}</td>
                <td className="text-right print:py-[2px] px-4">
                  {/* {hourRate.toFixed(4)} */}
                </td>
                <td className="text-right print:py-[2px] px-4">
                  {numberWithCommas(basicPay.toFixed(2))}
                </td>
              </tr>
            </>
          )}

          {paytypeId === otherBenefitsEarningsId &&
            earnings?.data.length > 0 && (
              <>
                <tr className="hover:bg-white">
                  <td colSpan={4} className="print:py-[2px]">
                    &nbsp;
                  </td>
                </tr>
                <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
                  <td
                    colSpan={4}
                    className="w-[20rem] uppercase print:py-[2px]"
                  >
                    {earnings?.data[0].paytype_name}
                  </td>
                </tr>
              </>
            )}
          {earnings?.data.map((item, key) => {
            totalAmount += Number(item.earnings_amount);
            return (
              <tr key={key} className="hover:bg-transparent">
                <td className="w-[20rem] print:py-[2px]">
                  {item.earnings_details}
                </td>
                <td className="w-[10rem] print:py-[2px]">
                  {(overtimeId === item.earnings_payitem_id ||
                    nightDiffId === item.earnings_payitem_id ||
                    undertimeId === item.earnings_payitem_id) &&
                    `${Number(item.earnings_hrs).toFixed(4)}`}
                  {/* {holidayId !== item.earnings_payitem_id &&
                    absencesId !== item.earnings_payitem_id &&
                    leaveId !== item.earnings_payitem_id &&
                    hazardPayId !== item.earnings_payitem_id &&
                    payAdjustmentId !== item.earnings_payitem_id &&
                    inflationAdjustmentId !== item.earnings_payitem_id &&
                    employeeReferralBonusId !== item.earnings_payitem_id &&
                    `${Number(item.earnings_hrs).toFixed(4)}`} */}
                </td>
                {/* <td className="w-[10rem]">{numberOfHolidays * 8}</td> */}
                <td className=" text-right px-4 w-[5rem] print:py-[2px]">
                  {/* {holidayId !== item.earnings_payitem_id &&
                    absencesId !== item.earnings_payitem_id &&
                    Number(nightDiffId) !== item.payitem_aid &&
                    (item.earnings_rate === ""
                      ? ""
                      : (hourRate * (Number(item.earnings_rate) / 100)).toFixed(
                          4
                        ))} */}
                  {(overtimeId === item.earnings_payitem_id ||
                    nightDiffId === item.earnings_payitem_id ||
                    undertimeId === item.earnings_payitem_id) &&
                    `${hourRate.toFixed(4)} / Hr`}
                  {/* {holidayId !== item.earnings_payitem_id &&
                    absencesId !== item.earnings_payitem_id &&
                    leaveId !== item.earnings_payitem_id &&
                    hazardPayId !== item.earnings_payitem_id &&
                    payAdjustmentId !== item.earnings_payitem_id &&
                    inflationAdjustmentId !== item.earnings_payitem_id &&
                    employeeReferralBonusId !== item.earnings_payitem_id &&
                    `${hourRate.toFixed(4)} / Hr`} */}
                </td>
                <td className=" text-right px-4 print:py-[2px]">
                  {item.earnings_payitem_id === absencesId ||
                  item.earnings_payitem_id === undertimeId
                    ? "-"
                    : ""}
                  {leaveId === item.earnings_payitem_id
                    ? `(${numberWithCommas(
                        Number(item.earnings_amount).toFixed(2)
                      )})`
                    : numberWithCommas(Number(item.earnings_amount).toFixed(2))}
                </td>
              </tr>
            );
          })}
          {/* {earnings?.data.length > 0 && (
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={3} className="uppercase text-right xs:pr-4">
                Total {earnings?.data[0].paytype_name}
              </td>
              <td className=" text-right px-4">
                {numberWithCommas(Number(gross).toFixed(2))}
              </td>
            </tr>
          )} */}

          {paytypeId === wagesEarningsId && (
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100 ">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px]"
              >
                Total WAGES
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(Number(gross).toFixed(2))}
              </td>
            </tr>
          )}

          {paytypeId === otherBenefitsEarningsId && totalBenefits > 0 && (
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td
                colSpan={3}
                className="uppercase text-right xs:pr-4 print:py-[2px]"
              >
                Total 13TH MONTH & OTHER BENEFITS
              </td>
              <td className=" text-right px-4 print:py-[2px]">
                {numberWithCommas(Number(totalBenefits).toFixed(2))}
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

export default PayslipEarnings;
