import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../helpers/functions-general";
const PayslipOtherBenifits = ({ otherBenefitsId, empid, payrollid }) => {
  // use if not loadmore button undertime
  const { data: otherBenefits } = useQueryData(
    `${devApiUrl}/v1/payslip/earnings/${otherBenefitsId}/${empid}/${payrollid}`, // endpoint
    "get", // method
    "otherBenefits" // key
  );
  console.log("other", otherBenefitsId, otherBenefits);
  return (
    <>
      {otherBenefits?.data.length > 0 && (
        <>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={4} className="w-[20rem] uppercase">
              {otherBenefits?.data[0].paytype_name}
            </td>
          </tr>
          {otherBenefits?.data.map((item, key) => {
            return (
              <tr key={key}>
                <td className="w-[20rem]">{item.payitem_name}</td>
                <td className="w-[10rem]">130% ({item.earnings_amount})</td>
                <td>0.00</td>
                <td>0.00</td>
              </tr>
            );
          })}
          <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
            <td colSpan={3} className="uppercase text-right xs:pr-16">
              Total {otherBenefits?.data[0].paytype_name}
            </td>
            <td>9,830.55</td>
          </tr>
        </>
      )}

      <tr>
        <td colSpan={4}>&nbsp;</td>
      </tr>
    </>
  );
};

export default PayslipOtherBenifits;
