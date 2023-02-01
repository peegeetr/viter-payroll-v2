import React from "react";
import {
  FaArchive,
  FaClipboardList,
  FaEdit,
  FaHistory,
  FaList,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
  setStartIndex,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";

const PayTypeLink = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const handleEdit = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
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
      <li className="py-2">
        <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
          <Link
            to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
            className="w-full py-4"
            onClick={() => dispatch(setStartIndex(0))}
          >
            <div className="flex items-center">
              <span className="text-lg mr-4">
                <FaClipboardList />
              </span>
              <span className="text-base font-bold">Wages</span>
            </div>
            <p className="ml-[35px] my-0">
              Manage what actions and capabilities every account are can perform
              in the system.
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
              className="btn-action-table tooltip-action-table group-hover:bg-primary group-hover:text-white"
              data-tooltip="View"
              onClick={() => dispatch(setStartIndex(0))}
            >
              <FaList className="inline " />
            </Link>

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
      </li>
      {/* 2 */}
      <li className="py-2">
        <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
          <Link
            to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
            className="w-full py-4"
            onClick={() => dispatch(setStartIndex(0))}
          >
            <div className="flex items-center">
              <span className="text-lg mr-4">
                <FaClipboardList />
              </span>
              <span className="text-base font-bold">De Minimis</span>
            </div>
            <p className="ml-[35px] my-0">
              Manage what actions and capabilities every account are can perform
              in the system.
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
              className="btn-action-table tooltip-action-table group-hover:bg-primary group-hover:text-white"
              data-tooltip="View"
              onClick={() => dispatch(setStartIndex(0))}
            >
              <FaList className="inline " />
            </Link>

            <button
              to={`${devNavUrl}/${UrlAdmin}/employees/details`}
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Edit"
              onClick={handleEdit}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Archive"
            >
              <FaArchive />
            </button>
            <button
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Restore"
            >
              <FaHistory />
            </button>
            <button
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </li>
      {/* 3 */}
      <li className="py-2">
        <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
          <Link
            to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
            className="w-full py-4"
            onClick={() => dispatch(setStartIndex(0))}
          >
            <div className="flex items-center">
              <span className="text-lg mr-4">
                <FaClipboardList />
              </span>
              <span className="text-base font-bold">
                13th mo. & other benefits
              </span>
            </div>
            <p className="ml-[35px] my-0">
              Manage what actions and capabilities every account are can perform
              in the system.
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
              className="btn-action-table tooltip-action-table group-hover:bg-primary group-hover:text-white"
              data-tooltip="View"
              onClick={() => dispatch(setStartIndex(0))}
            >
              <FaList className="inline " />
            </Link>

            <button
              to={`${devNavUrl}/${UrlAdmin}/employees/details`}
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Edit"
              onClick={handleEdit}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Archive"
            >
              <FaArchive />
            </button>
            <button
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Restore"
            >
              <FaHistory />
            </button>
            <button
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </li>
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

export default PayTypeLink;
