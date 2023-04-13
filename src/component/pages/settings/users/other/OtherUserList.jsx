import React from "react";
import { FaEdit, FaHistory, FaTrash, FaUserSlash } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../../helpers/functions-general";
import ModalConfirmRq from "../../../../partials/modals/ModalConfirmRq";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import ModalDeleteRestoreRq from "../../../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusInactive from "../../../../partials/status/StatusInactive";

const OtherUserList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [isUser, setisUser] = React.useState(false);
  let counter = 0;

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: otherUsers,
  } = useQueryData(
    `${devApiUrl}/v1/user-others`, // endpoint
    "get", // method
    "otherUsers" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleSuspend = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.user_other_aid);
    setData(item);
    setDel(null);
    setisUser(true);
  };

  const handleReset = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.user_other_aid);
    setData(item);
    setDel(true);
    setisUser(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.user_other_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.user_other_aid);
    setData(item);
    setDel(true);
  };

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        {isFetching && !isLoading && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[15rem]">Name</th>
              <th className="w-[25rem]">Email</th>
              <th className="w-[10rem]">Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || otherUsers?.data.length === 0) && (
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
            {otherUsers?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}.</td>
                  <td>{item.user_other_name}</td>
                  <td>{item.user_other_email}</td>
                  <td>{item.role_name}</td>
                  <td>
                    {item.user_other_is_active === 1 ? (
                      <StatusActive />
                    ) : (
                      <StatusInactive />
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {item.user_other_is_active === 1 ? (
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
            })}
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirmRq
          id={id}
          isDel={isDel}
          mysqlApiReset={`${devApiUrl}/v1/user-others/reset`}
          mysqlApiArchive={`${devApiUrl}/v1/user-others/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to reset this user"
              : "Are you sure you want to archive this user"
          }
          item={`${dataItem.user_other_email}`}
          role_id={`${dataItem.user_other_role_id}`}
          arrKey="otherUsers"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/user-others/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/user-others/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this user"
              : "Are you sure you want to restore this user"
          }
          item={`${dataItem.user_other_email}`}
          role_id={`${dataItem.user_other_role_id}`}
          arrKey="otherUsers"
        />
      )}
    </>
  );
};

export default OtherUserList;
