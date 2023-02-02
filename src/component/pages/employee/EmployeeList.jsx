import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const EmployeeList = ({ setItemEdit, handleSearch }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const search = React.useRef(null);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.user_system_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
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

  return (
    <>
      <SearchBar search={search} handleSearch={handleSearch} store={store} />
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[15rem]">Employeee</th>
              <th className="min-w-[30rem]">Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>Lumabas, Cyrene M.</td>
              <td className="break-all">
                cyrenecyrenecyrene.lumabas@frontlinebusiness.com.ph
              </td>
              <td>{1 === 1 ? <StatusActive /> : <StatusInactive />}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link
                    to={`${devNavUrl}/${UrlAdmin}/employee/details`}
                    type="button"
                    className="btn-action-table tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={handleEdit}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    type="button"
                    className="btn-action-table tooltip-action-table"
                    data-tooltip="Archive"
                    onClick={handleArchive}
                  >
                    <FaArchive />
                  </button>
                  <button
                    type="button"
                    className="btn-action-table tooltip-action-table"
                    data-tooltip="Restore"
                    onClick={handleRestore}
                  >
                    <FaHistory />
                  </button>
                  <button
                    type="button"
                    className="btn-action-table tooltip-action-table"
                    data-tooltip="Delete"
                    onClick={handleDelete}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                <ServerError />
              </td>
            </tr>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                {/*{loading && <TableSpinner />}*/}
                <NoData />
              </td>
            </tr>
          </tbody>
        </table>

        {/* {!store.isSearch && (
          <Loadmore
            handleLoad={handleLoad}
            loading={loading}
            result={result}
            totalResult={totalResult}
          />
        )} */}
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/user-systems/active/${id}`}
          msg={"Are you sure you want to archive this user"}
          item={`"${dataItem.user_system_email}"`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/user-systems/${id}`}
          mysqlApiRestore={`/v1/user-systems/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this user"
              : "Are you sure you want to restore this user"
          }
          item={`"${dataItem.user_system_email}"`}
        />
      )}
    </>
  );
};

export default EmployeeList;
