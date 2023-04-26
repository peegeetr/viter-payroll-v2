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
import useLoadPayType from "../../custom-hooks/useLoadPayType";
import useQueryData from "../../custom-hooks/useQueryData";
import {
  devApiUrl,
  devNavUrl,
  getUserType,
  UrlAdmin,
} from "../../helpers/functions-general";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalConfirmRq from "../../partials/modals/ModalConfirmRq";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import ModalDeleteRestoreRq from "../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const PayTypeLink = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: payType,
  } = useQueryData(
    `${devApiUrl}/v1/paytype`, // endpoint
    "get", // method
    "payType" // key
  );
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.paytype_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.paytype_aid);
    setData(item);
    setDel(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.paytype_aid);
    setData(item);
    setDel(null);
  };

  return (
    <>
      {isLoading && <TableSpinner />}

      {(isLoading || payType?.data.length === 0) && (
        <li className="text-center ">
          <div colSpan="100%" className="p-10">
            {isLoading && <TableSpinner />}
            <NoData />
          </div>
        </li>
      )}
      {error && (
        <li className="text-center ">
          <div colSpan="100%" className="p-10">
            <ServerError />
          </div>
        </li>
      )}

      {payType?.data.map((item, key) => {
        return (
          <li key={key} className="py-2">
            <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
              <Link
                to={`${link}/pay-type/pay-item?paytypeid=${item.paytype_aid}`}
                className="w-full py-1"
              >
                <div className="text-left grid lg:grid-cols-[3fr_1fr] ">
                  <div className="">
                    <div className="flex items-center">
                      <span className="text-lg mr-4">
                        <FaClipboardList />
                      </span>
                      <p className=" font-bold my-0">
                        <span className="capitalize">{item.paytype_name}</span>
                      </p>
                    </div>
                    <p className="ml-[35px] my-0  ">
                      <span className="capitalize text-primary block ">
                        {item.paytype_category}
                      </span>

                      {item.paytype_description}
                    </p>
                  </div>
                  <div className="ml-[35px] lg:m-0">
                    <p className="font-bold text-xs">Status</p>

                    <p className="my-0">
                      {item.paytype_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-1">
                <Link
                  to={`${link}/pay-type/pay-item?paytypeid=${item.paytype_aid}`}
                  className="btn-action-table tooltip-action-table "
                  data-tooltip="View"
                  onClick={() => dispatch(setStartIndex(0))}
                >
                  <FaList className="inline " />
                </Link>
                {item.paytype_is_active === 1 ? (
                  <>
                    <button
                      to={`${link}/employees/details`}
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
            </div>
          </li>
        );
      })}

      {store.isConfirm && (
        <ModalConfirmRq
          id={id}
          isDel={isDel}
          mysqlApiArchive={`${devApiUrl}/v1/paytype/active/${id}`}
          msg={"Are you sure you want to archive "}
          item={`${dataItem.paytype_name}`}
          arrKey="payType"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/paytype/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/paytype/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore "
          }
          item={`${dataItem.paytype_name}`}
          arrKey="payType"
        />
      )}
    </>
  );
};

export default PayTypeLink;
