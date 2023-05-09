import React from "react";
import { FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { StoreContext } from "../../../../../store/StoreContext";
import { setIsAdd } from "../../../../../store/StoreAction";
import {
  getPayPeriod,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { getErningsRate } from "../function-report-summary";

const ModalViewDetails = ({ item, isView, earnings }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  let counter = 0;
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {isView ? "Holiday" : "Overtime"} Details
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 pb-8 rounded-b-2xl ">
            <p className="m-0">
              <span className="text-primary">Name: </span>
              {item.payroll_list_employee_name}
            </p>
            <p>
              <span className="text-primary">PayDate: </span>
              {`${getPayPeriod(
                item.payroll_start_date,
                item.payroll_end_date
              )}`}
            </p>
            <table className="">
              <thead className="relative z-0">
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-center">HRS</th>
                  <th className="text-center">RATE</th>
                  <th className="pr-4 !w-0 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {getErningsRate(earnings, item, isView)?.map((eItem, key) => {
                  counter++;
                  return (
                    <tr key={key}>
                      <td className="text-left">{counter}.</td>
                      <td className="text-center">{eItem.hrs}</td>
                      <td className="text-center">{eItem.rate}%</td>
                      <td className="pr-4 text-right">
                        {numberWithCommas(Number(eItem.amount))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewDetails;
