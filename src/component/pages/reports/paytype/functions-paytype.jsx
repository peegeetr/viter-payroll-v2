import { getPayPeriod } from "../../../helpers/functions-general";

// get beenifits leave
export const getPaytype = (item, paytype) => {
  let list = [];
  paytype?.data.map((ptItem) => {
    // check if leave type aid is equal
    if (
      Number(item.earnings_paytype_id) === ptItem.paytype_aid ||
      Number(item.deduction_paytype_id) === ptItem.paytype_aid
    ) {
      list.push({
        payitem_name: item.payitem_name,
        paytype_name: ptItem.paytype_name,
        payPeriod: 0,
        // payPeriod: getPayPeriod(
        //   item.earnings_start_pay_date,
        //   item.earnings_end_pay_date
        // ),
      });
    }
  });
  // console.log(list);
  return list;
};
