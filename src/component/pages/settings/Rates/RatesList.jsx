import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import { devApiUrl } from "../../../helpers/functions-general.jsx";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq.jsx";
import NoData from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";

const RatesList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const { rate, rateLoading } = useLoadRates(`${devApiUrl}/v1/rates`, "get");
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: rate,
  } = useQueryData(
    `${devApiUrl}/v1/rates`, // endpoint
    "get", // method
    "rate" // key
  );
  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

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
              <th>Percentage</th>
              <th>Pay Type</th>
              <th>Pay Item</th>
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
                  <td>{item.rates_name}</td>
                  <td>{item.rates_percent}%</td>
                  <td>{item.paytype_name}</td>
                  <td>{item.payitem_name}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Delete"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default RatesList;
