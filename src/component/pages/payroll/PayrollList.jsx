import React from "react";
import { FaEdit, FaList, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setIsAdd, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useFetchDataLoadMore from "../../custom-hooks/useFetchDataLoadMore";
import {
  devApiUrl,
  devNavUrl,
  formatDate,
  UrlAdmin,
} from "../../helpers/functions-general";
import Loadmore from "../../partials/Loadmore";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const PayrollList = ({ setItemEdit }) => {
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
    `${devApiUrl}/v1/payroll/limit/${start}/${perPage}`,
    `${devApiUrl}/v1/payroll`,
    perPage,
    search
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payroll_aid);
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
        url={`${devApiUrl}/v1/payroll/search/`}
      />

      <div className="relative text-center overflow-x-auto z-0">
        {loading && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Payroll ID</th>
              <th>Pay period</th>
              <th>Pay Date</th>
              <th>Earning Type</th>
              <th>No. of Employee</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((item, key) => {
                counter++;
                return (
                  <tr key={key}>
                    <td className="text-center">{counter}.</td>
                    <td>{item.payroll_id}</td>
                    <td>
                      {`${formatDate(item.payroll_start_date).split(" ")[1]} 
                      ${formatDate(item.payroll_start_date).split(" ")[2]} - ${
                        formatDate(item.payroll_end_date).split(" ")[2]
                      },  ${formatDate(item.payroll_end_date).split(" ")[3]}`}
                      <span className="inline-block text-[0] first-letter:text-sm">
                        {item.payroll_mname}
                      </span>
                    </td>
                    <td>{formatDate(item.payroll_pay_date)}</td>
                    <td>{item.payroll_earning_type}</td>
                    <td>{totalResult}</td>
                    <td>4200</td>
                    <td>
                      {item.payroll_is_paid === 1 ? (
                        <StatusActive text={"paid"} />
                      ) : (
                        <StatusInactive text={"draft"} />
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {item.payroll_is_paid === 0 && (
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                        )}
                        <Link
                          to={`${devNavUrl}/${UrlAdmin}/payroll/list?payrollid=${item.payroll_id}`}
                          className="btn-action-table tooltip-action-table"
                          onClick={() => dispatch(setStartIndex(0))}
                          data-tooltip="View"
                        >
                          <FaList />
                        </Link>

                        {item.payroll_is_paid === 0 && (
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        )}
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/payroll/${id}`}
          msg={"Are you sure you want to delete this payroll"}
          item={`${dataItem.payroll_id}`}
        />
      )}
    </>
  );
};

export default PayrollList;
