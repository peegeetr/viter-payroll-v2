import React from "react";
import { FaEdit, FaHistory, FaTrash, FaUserSlash } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useLoadUsers from "../../../../custom-hooks/useLoadUsers";
import { devApiUrl } from "../../../../helpers/functions-general";
import ModalConfirm from "../../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusInactive from "../../../../partials/status/StatusInactive";

const SystemUserList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 0;

  const { users, usersLoading } = useLoadUsers(
    `${devApiUrl}/v1/user-systems`,
    "get"
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleReset = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(true);
  };

  const handleSuspend = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(null);
  };

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[10rem]">Name</th>
              <th className="w-[25rem]">Email</th>
              <th className="w-[8rem]">Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((item, key) => {
                counter++;
                return (
                  <tr key={key}>
                    <td>{counter}.</td>
                    <td>{item.user_system_name}</td>
                    <td>{item.user_system_email}</td>
                    <td>{item.role_name}</td>
                    <td>
                      {item.user_system_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {item.user_system_is_active === 1 ? (
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
                              data-tooltip="Reset"
                              onClick={() => handleReset(item)}
                            >
                              <MdPassword />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Suspend"
                              onClick={() => handleSuspend(item)}
                            >
                              <FaUserSlash />
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
            ) : users === -1 ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            ) : (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {usersLoading && <TableSpinner />}
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
          mysqlApiReset={`${devApiUrl}/v1/user-systems/reset`}
          mysqlApiArchive={`${devApiUrl}/v1/user-systems/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to reset password"
              : "Are you sure you want to archive "
          }
          item={`${dataItem.user_system_email}`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/user-systems/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/user-systems/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore "
          }
          item={`${dataItem.user_system_email}`}
        />
      )}
    </>
  );
};

export default SystemUserList;
