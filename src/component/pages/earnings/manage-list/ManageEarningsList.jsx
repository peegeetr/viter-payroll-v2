import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useFetchDataLoadMore from "../../../custom-hooks/useFetchDataLoadMore";
import {
  devApiUrl,
  formatDate,
  numberWithCommas,
} from "../../../helpers/functions-general";
import Loadmore from "../../../partials/Loadmore";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";

const ManageEarningsList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const search = React.useRef(null);
  const perPage = 10;
  const start = store.startIndex + 1;
  let counter = 0;

  const {
    loading,
    handleLoad,
    totalResult,
    result,
    handleSearch,
    handleChange,
  } = useFetchDataLoadMore(
    `${devApiUrl}/v1/earnings/limit/${start}/${perPage}`,
    `${devApiUrl}/v1/earnings`,
    perPage,
    search
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.earnings_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.earnings_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.earnings_aid);
    setData(item);
    setDel(true);
  };

  return (
    <>
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        handleChange={handleChange}
        loading={loading}
        result={result}
        store={store}
        url={`${devApiUrl}/v1/earnings/search/`}
      />
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem]">Employeee</th>
              <th className="min-w-[5rem]">Pay Type</th>
              <th className="min-w-[5rem]">Pay Item</th>
              <th className="min-w-[5rem]">Amount</th>
              <th className="min-w-[5rem]">Frequency</th>
              <th className="min-w-[8rem]">No. of Installment</th>
              <th className="min-w-[8rem]">Start Date</th>
              <th className="min-w-[8rem]">End Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((item, key) => {
                counter++;
                return (
                  <tr key={key}>
                    <td>{counter}.</td>
                    <td>{item.earnings_employee}</td>
                    <td>{item.paytype_name}</td>
                    <td>{item.payitem_name}</td>
                    <td>{numberWithCommas(item.earnings_amount)}</td>
                    <td>
                      {item.earnings_frequency === "sm"
                        ? "Semi-monthly"
                        : "Monthly"}
                    </td>
                    <td>{item.earnings_number_of_installment}</td>
                    <td>{formatDate(item.earnings_start_pay_date)}</td>
                    <td>{formatDate(item.earnings_end_pay_date)}</td>
                    <td>
                      {item.earnings_is_active === 1 ? (
                        <StatusActive text="Paid" />
                      ) : (
                        <StatusInactive text="Draft" />
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        {/* <button
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
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Restore"
                          onClick={() => handleRestore(item)}
                        >
                          <FaHistory />
                        </button> */}
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : result === -1 ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            ) : (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!store.isSearch && (
          <Loadmore
            handleLoad={handleLoad}
            loading={loading}
            result={result}
            totalResult={totalResult}
          />
        )}
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`${devApiUrl}/v1/earnings/active/${id}`}
          msg={"Are you sure you want to archive this user"}
          item={`${dataItem.earnings_employee}`}
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/earnings/${id}`}
          mysqlApiRestore={`${devApiUrl}/v1/earnings/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this user"
              : "Are you sure you want to restore this user"
          }
          item={`${dataItem.earnings_employee}`}
        />
      )}
    </>
  );
};

export default ManageEarningsList;
