import React from "react";
import { FaTrash } from "react-icons/fa";
import { setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useFetchDataLoadMore from "../../../custom-hooks/useFetchDataLoadMore";
import {
  devApiUrl,
  formatDate,
  numberWithCommas,
} from "../../../helpers/functions-general";
import Loadmore from "../../../partials/Loadmore";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";
import { getStatus } from "../../earnings/manage-list/function-manage-list";

const ManageDeductionList = () => {
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
    `${devApiUrl}/v1/deductions/limit/${start}/${perPage}`,
    `${devApiUrl}/v1/deductions`,
    perPage,
    search
  );

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.deduction_aid);
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
        url={`${devApiUrl}/v1/deduction/search/`}
      />
      <div className="relative text-center overflow-x-auto z-0">
        {loading && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              {/* <th className="min-w-[5rem]">Payroll ID</th> */}
              <th className="min-w-[9rem]">Employeee</th>
              <th className="min-w-[5rem]">Amount</th>
              <th className="min-w-[5rem]">Installment</th>
              <th className="min-w-[5rem]">Start Date</th>
              <th className="min-w-[5rem]">End Date</th>
              <th className="min-w-[8rem]">Pay Type</th>
              <th className="min-w-[8rem]">Pay Item</th>
              <th className="min-w-[8rem]">Frequency</th>
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
                    {/* <td>{item.deduction_payroll_id}</td> */}
                    <td>{item.deduction_employee}</td>
                    <td>
                      P
                      {numberWithCommas(
                        Number(item.deduction_amount).toFixed(2)
                      )}
                    </td>
                    {/* <td>{item.deduction_number_of_installment}</td> */}
                    <td>
                      {item.deduction_number_of_installment === 0
                        ? "N/A"
                        : `${item.deduction_num_pay}/${item.deduction_number_of_installment}`}
                    </td>
                    <td>
                      {item.deduction_start_pay_date === "n/a"
                        ? "N/A"
                        : `${
                            formatDate(item.deduction_start_pay_date).split(
                              " "
                            )[1]
                          } 
                      ${formatDate(item.deduction_start_pay_date).split(" ")[2]}
                      ${formatDate(item.deduction_start_pay_date).split(" ")[3]}
                      `}
                    </td>
                    <td>
                      {item.deduction_end_pay_date === "n/a"
                        ? "N/A"
                        : `${
                            formatDate(item.deduction_end_pay_date).split(
                              " "
                            )[1]
                          } 
                    ${formatDate(item.deduction_end_pay_date).split(" ")[2]}
                    ${formatDate(item.deduction_end_pay_date).split(" ")[3]}
                    `}
                    </td>
                    <td>{item.paytype_name}</td>
                    <td>{item.payitem_name}</td>
                    <td>
                      {item.deduction_frequency === "sm"
                        ? "Semi-monthly"
                        : "Monthly"}
                    </td>
                    <td>{getStatus(item)}</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/deductions/${id}`}
          msg={"Are you sure you want to delete this user"}
          item={`${dataItem.deduction_employee}`}
        />
      )}
    </>
  );
};

export default ManageDeductionList;
