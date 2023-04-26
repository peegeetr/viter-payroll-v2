import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import { devApiUrl } from "../../../helpers/functions-general.jsx";
import ModalConfirmRq from "../../../partials/modals/ModalConfirmRq.jsx";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq.jsx";
import NoData from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import StatusActive from "../../../partials/status/StatusActive.jsx";
import StatusInactive from "../../../partials/status/StatusInactive.jsx";

const PayrollTypeList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: payrollType,
  } = useQueryData(
    `${devApiUrl}/v1/payroll-type`, // endpoint
    "get", // method
    "payrollType" // key
  );
  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payroll_type_aid);
    setData(item);
    setDel(true);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.payroll_type_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payroll_type_aid);
    setData(item);
    setDel(null);
  };

  let counter = 0;

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        {isFetching && !isLoading && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[10rem] w-[20rem]">Name</th>
              <th>Status</th>

              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || payrollType?.data.length === 0) && (
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
            {payrollType?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}</td>
                  <td>{item.payroll_type_name}</td>
                  <td>
                    {item.payroll_type_active === 1 ? (
                      <StatusActive />
                    ) : (
                      <StatusInactive />
                    )}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      {item.payroll_type_active === 1 ? (
                        <>
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
                            onClick={() => handleArchive(item)}
                          >
                            <FaArchive />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Restore"
                            onClick={() => handleRestore(item)}
                          >
                            <FaHistory />
                          </button>
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirmRq
          id={id}
          isDel={isDel}
          mysqlApiArchive={`${devApiUrl}/v1/payroll-type/active/${id}`}
          msg={"Are you sure you want to archive "}
          item={`${dataItem.payroll_type_name}`}
          arrKey="payrollType"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/payroll-type/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/payroll-type/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete"
              : "Are you sure you want to restore"
          }
          item={`${dataItem.payroll_type_name}`}
          arrKey="payrollType"
        />
      )}
    </>
  );
};

export default PayrollTypeList;
