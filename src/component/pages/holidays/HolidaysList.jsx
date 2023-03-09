import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import { devApiUrl, formatDate } from "../../helpers/functions-general";
import ModalDeleteRestoreRq from "../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner.jsx";

const HolidaysList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const search = React.useRef(null);

  let counter = 0;

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: holidays,
  } = useQueryData(
    `${devApiUrl}/v1/holidays`, // endpoint
    "get", // method
    "holidays" // key
  );
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.holidays_aid);
    setData(item);
    setDel(true);
  };

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[10rem] w-[10rem]">Holidays</th>
              <th className="min-w-[10rem] w-[10rem]">Date</th>
              <th className="min-w-[5rem] w-[10rem]">Type</th>
              <th>Rate</th>
              <th>Remarks</th>

              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || holidays?.data.length === 0) && (
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
            {holidays?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}</td>
                  <td>{item.holidays_name}</td>
                  <td>
                    {`${formatDate(item.holidays_date).split(" ")[0]} 
                      ${formatDate(item.holidays_date).split(" ")[1]} 
                      ${formatDate(item.holidays_date).split(" ")[2]}
                      ${formatDate(item.holidays_date).split(" ")[3]}
                      `}
                  </td>
                  <td className="capitalize">{item.holidays_type} Holiday</td>
                  <td>{item.holidays_rate}%</td>
                  <td>
                    {item.holidays_observed ? "Observed" : "Not observed"}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => {
                          handleEdit(item);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Delete"
                        onClick={() => {
                          handleDelete(item);
                        }}
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
          mysqlApiDelete={`${devApiUrl}/v1/holidays/${id}`}
          mysqlApiRestore={null}
          msg="Are you sure you want to delete this holiday"
          item={`${dataItem.holidays_name}`}
          arrKey="holidays"
        />
      )}
    </>
  );
};

export default HolidaysList;
