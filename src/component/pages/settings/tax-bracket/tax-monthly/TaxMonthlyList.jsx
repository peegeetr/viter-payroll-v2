import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import useLoadTaxMonthly from "../../../../custom-hooks/useLoadTaxMonthly.jsx";
import useQueryData from "../../../../custom-hooks/useQueryData.jsx";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../../helpers/functions-general.jsx";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore.jsx";
import ModalDeleteRestoreRq from "../../../../partials/modals/ModalDeleteRestoreRq.jsx";
import NoData from "../../../../partials/NoData.jsx";
import ServerError from "../../../../partials/ServerError.jsx";
import TableSpinner from "../../../../partials/spinners/TableSpinner.jsx";
const TaxMonthlyList = ({ setItemEdit, item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [dataItem, setData] = React.useState(null);

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: monthly,
  } = useQueryData(
    `${devApiUrl}/v1/tax/monthly`, // endpoint
    "get", // method
    "monthly" // key
  );

  let counter = 0;

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.tax_monthly_aid);
    setData(item);
    setDel(true);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Range From</th>
              <th>Range To</th>
              <th>Less Amount</th>
              <th>Rate % </th>
              <th>Addt'l Amount</th>
              <th className="max-w-[7rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || monthly?.data.length === 0) && (
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
            {monthly?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}</td>
                  <td>
                    {numberWithCommas(
                      Number(item.tax_monthly_range_from).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      Number(item.tax_monthly_range_to).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      Number(item.tax_monthly_less_amount).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(Number(item.tax_monthly_rate).toFixed(2))}
                    %
                  </td>
                  <td>
                    {numberWithCommas(
                      Number(item.tax_monthly_additional_amount).toFixed(2)
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
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
          mysqlApiDelete={`${devApiUrl}/v1/tax/monthly/${id}`}
          msg={"Are you sure you want to remove this data"}
          item={`${dataItem.tax_monthly_range_from} to ${dataItem.tax_monthly_range_to}`}
          arrKey="monthly"
        />
      )}
    </>
  );
};

export default TaxMonthlyList;
