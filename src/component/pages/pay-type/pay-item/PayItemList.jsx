import React from "react";
import {
  FaArchive,
  FaEdit,
  FaHistory,
  FaRegListAlt,
  FaTrash,
} from "react-icons/fa";
import { setIsConfirm, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { devNavUrl, UrlAdmin } from "../../../helpers/functions-general";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import StatusActive from "../../../partials/status/StatusActive";

const PayItemList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.department_aid);
    setData(item);
    setDel(true);
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
      {/* {loading && <TableSpinner />} */}
      <div className="relative  z-0">
        <div className="xs:flex justify-between py-5 items-center border-b-2 border-solid ">
          <div className="flex mb-5 xs:mb-0 ">
            <FaRegListAlt className="h-8 w-8 mx-5" />
            <div className="text-left grid grid-cols-2 ">
              <p className="mb-0 font-semibold">Pay Type : </p>
              <p className="mb-0 pl-2">Wages</p>
              <p className="font-semibold">Pay Item :</p>
              <p className="pl-2">Tax Description return </p>
              <p className="mb-0 font-semibold">Status :</p>
              <p className="mb-0  pl-2">
                <StatusActive />
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <button
              to={`${devNavUrl}/${UrlAdmin}/employees/details`}
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Edit"
            >
              <FaEdit />
            </button>
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
        </div>

        <div className="text-center mt-5">
          <ServerError />
        </div>

        <div className="text-center mt-5">
          <NoData />
        </div>
      </div>
      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/departments/active/${id}`}
          mysqlApiDelete={`/v1/departments/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to archive"
              : "Are you sure you want to delete"
          }
          item={`"${dataItem.department_name}"`}
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
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore "
          }
          item={`"${dataItem.user_system_email}"`}
        />
      )}
    </>
  );
};

export default PayItemList;
