import React from "react";
import {
  FaArchive,
  FaEdit,
  FaHistory,
  FaRegListAlt,
  FaTrash,
} from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadPayItem from "../../../custom-hooks/useLoadPayItem";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl, getUrlParam } from "../../../helpers/functions-general";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalConfirmRq from "../../../partials/modals/ModalConfirmRq";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";

const PayItemList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const paytypeid = getUrlParam().get("paytypeid");

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: payItem,
  } = useQueryData(
    `${devApiUrl}/v1/paytype/${paytypeid}`, // endpoint
    "get", // method
    "payItem" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.payitem_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payitem_aid);
    setData(item);
    setDel(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payitem_aid);
    setData(item);
    setDel(null);
  };

  return (
    <>
      <div className="relative  z-0">
        {isLoading && <TableSpinner />}

        {(isLoading || payItem?.data.length === 0) && (
          <div className="text-center mt-5">
            {isLoading && <TableSpinner />}
            <NoData />
          </div>
        )}
        {error && (
          <div className="text-center mt-5">
            <ServerError />
          </div>
        )}

        {payItem?.data.map((item, key) => {
          return (
            <div
              key={key}
              className="sm:flex justify-between py-3 items-center border-b-2 border-solid "
            >
              <div>
                <div className="flex mb-0 ">
                  <FaRegListAlt className="text-lg  mr-5 translate-y-1 " />
                  <div className="text-left flex ">
                    <p className="font-semibold mb-0">Pay Item :</p>
                    <p className="pl-2 mb-0 ">{item.payitem_name}</p>
                  </div>
                </div>
                <p className="my-0 pl-[2.4rem] text-primary">
                  {item.paytype_name}
                </p>
                <p className="mb-0 pl-[2.4rem]">
                  {item.payitem_is_active === 1 ? (
                    <StatusActive />
                  ) : (
                    <StatusInactive />
                  )}
                </p>
              </div>
              <div className="flex sm:mt-0 mt-5 justify-center items-center gap-1">
                {item.payitem_is_active === 1 ? (
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
            </div>
          );
        })}
      </div>

      {store.isConfirm && (
        <ModalConfirmRq
          id={id}
          isDel={isDel}
          mysqlApiArchive={`${devApiUrl}/v1/payitem/active/${id}`}
          msg={"Are you sure you want to archive "}
          item={`${dataItem.payitem_name}`}
          arrKey="payItem"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/payitem/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/payitem/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore "
          }
          item={`${dataItem.payitem_name}`}
          arrKey="payItem"
        />
      )}
    </>
  );
};

export default PayItemList;
