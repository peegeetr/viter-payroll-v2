import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ModalDeleteRestoreRq from "../../../../partials/modals/ModalDeleteRestoreRq";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
const TaxYearlyList = ({ setItemEdit, item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [dataItem, setData] = React.useState(null);

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: bracketYearly,
  } = useQueryData(
    `${devApiUrl}/v1/tax/bracket-yearly`, // endpoint
    "get", // method
    "taxBracketYearly" // key
  );

  let counter = 0;

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.semi_monthly_aid);
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
              <th>Fixed Tax</th>
              <th>Rate % </th>
              <th className="max-w-[7rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || bracketYearly?.data.length === 0) && (
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
            {bracketYearly?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}</td>
                  <td>
                    {numberWithCommas(Number(item.tax_yearly_from).toFixed(2))}
                  </td>
                  <td>
                    {numberWithCommas(Number(item.tax_yearly_to).toFixed(2))}
                  </td>
                  <td>
                    {numberWithCommas(
                      Number(item.tax_yearly_fixed_tax).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(Number(item.tax_yearly_rate).toFixed(2))}%
                  </td>
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
                        data-tooltip="Archive"
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
          mysqlApiDelete={`${devApiUrl}/v1/tax/bracket-yearly/${id}`}
          msg={"Are you sure you want to remove this data"}
          item={`${dataItem.semi_monthly_range_from} to ${dataItem.semi_monthly_range_to}`}
          arrKey="taxBracketYearly"
        />
      )}
    </>
  );
};

export default TaxYearlyList;
