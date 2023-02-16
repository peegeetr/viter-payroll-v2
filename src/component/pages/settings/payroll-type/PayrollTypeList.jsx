import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useLoadPayrollType from "../../../custom-hooks/useLoadPayrollType.jsx";
import { devApiUrl } from "../../../helpers/functions-general.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore.jsx";
import NoData from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import StatusActive from "../../../partials/status/StatusActive.jsx";
import StatusInactive from "../../../partials/status/StatusInactive.jsx";

const PayrollTypeList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const { payrollType, payrollTypeLoading } = useLoadPayrollType(
    `${devApiUrl}/v1/payroll-type`,
    "get"
  );
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

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
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrollType.length > 0 ? (
              payrollType.map((item, key) => {
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
              })
            ) : payrollType === -1 ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            ) : (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {payrollTypeLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`${devApiUrl}/v1/payroll-type/active/${id}`}
          msg={"Are you sure you want to archive this payroll type"}
          item={`${dataItem.payroll_type_name}`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/payroll-type/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/payroll-type/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this payroll type"
              : "Are you sure you want to restore this payroll type"
          }
          item={`${dataItem.payroll_type_name}`}
        />
      )}
    </>
  );
};

export default PayrollTypeList;
