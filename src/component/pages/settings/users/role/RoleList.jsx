import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useLoadRole from "../../../../custom-hooks/useLoadRole";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { devApiUrl } from "../../../../helpers/functions-general";
import ModalConfirm from "../../../../partials/modals/ModalConfirm";
import ModalConfirmRq from "../../../../partials/modals/ModalConfirmRq";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import ModalDeleteRestoreRq from "../../../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusInactive from "../../../../partials/status/StatusInactive";

const RoleList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 0;

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: role,
  } = useQueryData(
    `${devApiUrl}/v1/roles`, // endpoint
    "get", // method
    "role" // key
  );

  // const { role, roleLoading } = useLoadRole(`${devApiUrl}/v1/roles`, "get");

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.role_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.role_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.role_aid);
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
              <th className="min-w-[10rem]">Name</th>
              <th className="min-w-[25rem]">Description</th>
              <th>Status</th>
              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || role?.data.length === 0) && (
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
            {role?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}.</td>
                  <td>{item.role_name}</td>
                  <td>{item.role_description}</td>
                  <td>
                    {item.role_is_active === 1 ? (
                      <StatusActive />
                    ) : (
                      <StatusInactive />
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {item.role_is_active === 1 ? (
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
          mysqlApiArchive={`${devApiUrl}/v1/roles/active/${id}`}
          msg={"Are you sure you want to archive this role"}
          item={`${dataItem.role_name}`}
          isDeveloper={`${dataItem.role_is_developer}`}
          arrKey="role"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/roles/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/roles/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this role"
              : "Are you sure you want to restore this role"
          }
          item={`${dataItem.role_name}`}
          isDeveloper={`${dataItem.role_is_developer}`}
          arrKey="role"
        />
      )}
    </>
  );
};

export default RoleList;
