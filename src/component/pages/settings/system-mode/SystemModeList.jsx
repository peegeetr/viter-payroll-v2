import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../helpers/functions-general";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const SystemModeList = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  // const { rate, rateLoading } = useLoadRates(`${devApiUrl}/v1/rates`, "get");
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const is_open = false;
  // const is_open =
  //   result.length > 0 && result[0].enable_enrollment_is_enable === "1";
  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: rate,
  } = useQueryData(
    `${devApiUrl}/v1/payroll-type`, // endpoint
    "get", // method
    "rate" // key
  );
  console.log(rate);
  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.rates_aid);
    setData(item);
    setDel(true);
  };

  let counter = 0;

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="max-w-[7rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || rate?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {rate?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}</td>
                  <td>{item.payroll_type_name}</td>

                  <td>
                    {/* <div className="switch__button">
                      <div className="switch">
                        <label>
                          <input
                            type="checkbox"
                            checked={is_open === false ? false : true}
                            // onChange={(e) => {
                            //   result.length > 0
                            //     ? dispatch(setIsConfirm(true))
                            //     : dispatch(setIsAdd(true));
                            // }}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/rates/${id}`}
          msg={"Are you sure you want to delete this rate"}
          item={`${dataItem.rates_name}`}
          arrKey="rate"
        />
      )}
    </>
  );
};

export default SystemModeList;
