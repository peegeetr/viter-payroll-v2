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
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const PayTypeLink = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const { payType, payTypeLoading } = useLoadPayType("/v1/paytype", "get");

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.paytype_aid);
    setData(item);
    setDel(true);
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
      {payType.length > 0 ? (
        payType.map((item, key) => {
          return (
            <li key={key} className="py-2">
              <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
                <Link
                  to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
                  className="w-full py-4"
                  onClick={() => dispatch(setStartIndex(0))}
                >
                  <div className="text-left grid lg:grid-cols-[2fr_1fr] ">
                    <div>
                      <div className="flex items-center">
                        <span className="text-lg mr-4">
                          <FaClipboardList />
                        </span>
                        <p className="text-base font-bold my-0">
                          <span className="capitalize">
                            {item.paytype_name}
                          </span>
                          <br />
                          <span className="capitalize">
                            {item.paytype_category}
                          </span>
                        </p>
                      </div>
                      <p className="ml-[35px] my-0">
                        {item.paytype_description}
                      </p>
                    </div>
                    <div className="ml-[35px] lg:m-0">
                      <p className=" font-bold">Status</p>

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
                    to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
                    className="btn-action-table tooltip-action-table group-hover:bg-primary group-hover:text-white"
                    data-tooltip="View"
                    onClick={() => dispatch(setStartIndex(0))}
                  >
                    <FaList className="inline " />
                  </Link>
                  {item.paytype_is_active === 1 ? (
                    <>
                      <button
                        to={`${devNavUrl}/${UrlAdmin}/employees/details`}
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
        })
      ) : payType === -1 ? (
        <li className="text-center ">
          <div colSpan="100%" className="p-10">
            <ServerError />
          </div>
        </li>
      ) : (
        <li className="text-center ">
          <div colSpan="100%" className="p-10">
            <NoData />
          </div>
        </li>
      )}
      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/paytype/${id}`}
          msg={"Are you sure you want to archive"}
          item={`"${dataItem.paytype_name}"`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/paytype/${id}`}
          mysqlApiRestore={`/v1/paytype/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore "
          }
          item={`${dataItem.paytype_name}`}
        />
      )}
    </>
  );
};

export default PayTypeLink;
