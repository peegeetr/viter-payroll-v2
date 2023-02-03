import React from "react";
import { FaEdit } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useLoadRates from "../../../custom-hooks/useLoadRates.jsx";
import { devApiUrl } from "../../../helpers/functions-general.jsx";
import NoData from "../../../partials/NoData.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import ModalEditRate from "./ModalEditRate.jsx";

const RatesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const { rate, rateLoading } = useLoadRates(`${devApiUrl}/v1/rates`, "get");
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleEdit = () => {
    setItemEdit(rate);
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        {rateLoading && <TableSpinner />}
        <div className="w-full max-w-[450px]  ">
          <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center mt-5">
            <h4>Rate Percentage</h4>
            <button
              type="button"
              className="tooltip-action-table"
              data-tooltip="Edit"
              onClick={handleEdit}
            >
              <FaEdit />
            </button>
          </div>{" "}
          {rate.length > 0 ? (
            rate.map((item, key) => {
              return (
                <div
                  key={key}
                  className="text-left grid grid-cols-2 xs:grid-cols-2 mb-5 pl-2"
                >
                  <div className="font-semibold ">
                    <p>Night Differential :</p>
                    <p>Overtime :</p>
                    <p>Special Holiday :</p>
                    <p>Regular Holidays :</p>
                    <p>Rest Day :</p>
                  </div>
                  <div className="pl-2 ">
                    <div>
                      <p>{item.rates_night_differential}%</p>
                      <p>{item.rates_overtime}%</p>
                      <p>{item.rates_special_holiday}%</p>
                      <p>{item.rates_regular_holiday}%</p>
                      <p>{item.rates_rest_day}%</p>
                    </div>
                  </div>{" "}
                </div>
              );
            })
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {store.isAdd && <ModalEditRate itemEdit={itemEdit} />}
    </>
  );
};

export default RatesList;
