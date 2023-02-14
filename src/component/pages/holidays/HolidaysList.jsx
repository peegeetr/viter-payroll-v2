import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useLoadHolidays from "../../custom-hooks/useLoadHolidays.jsx";
import { devApiUrl, formatDate } from "../../helpers/functions-general";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner.jsx";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const HolidaysList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const search = React.useRef(null);

  const { holidays, holidaysLoading } = useLoadHolidays(
    `${devApiUrl}/v1/holidays`,
    "get"
  );
  let counter = 0;

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
              <th className="min-w-[10rem]">Holidays</th>
              <th className="min-w-[10rem]">Date</th>
              <th className="min-w-[5rem]">Type</th>
              <th>Rate</th>

              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length > 0 ? (
              holidays.map((item, key) => {
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
                    <td>{item.holidays_type}</td>
                    <td>{item.holidays_rate}</td>

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
              })
            ) : holidays === -1 ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            ) : (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {holidaysLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/holidays/${id}`}
          mysqlApiRestore={null}
          msg="Are you sure you want to delete this holiday"
          item={`${dataItem.holidays_name}`}
        />
      )}
    </>
  );
};

export default HolidaysList;
