import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaList, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  setIsAdd,
  setIsRestore,
  setIsSearch,
  setStartIndex,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import {
  devApiUrl,
  formatDate,
  getPayPeriod,
  getUserType,
  numberWithCommas,
  pesoSign,
} from "../../helpers/functions-general";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
} from "../../helpers/functions-payroll-category-id";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import LoadmoreRq from "../../partials/LoadmoreRq";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import ModalDeleteRestoreRq from "../../partials/modals/ModalDeleteRestoreRq";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";
import FilterPayroll from "./search-filter/FilterPayroll";
import { validatePrId } from "./FunctionPayroll";
import PayrollSearchBar from "./search-filter/PayrollSearchBar";

const PayrollList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [loading, setLoading] = React.useState(false);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [month, setMonth] = React.useState("0");
  const [year, setYear] = React.useState("0");

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  let counter = 1;
  const { ref, inView } = useInView();

  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["payroll", onSearch, store.isSearch, isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/payroll/search/${search.current.value}`, // search endpoint
        isFilter === true
          ? `${devApiUrl}/v1/payroll/filter` // filter endpoint
          : `${devApiUrl}/v1/payroll/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        true,
        "post",
        { month, year }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    // refetchOnWindowFocus: false,
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = async (item) => {
    setLoading(true);
    let prId = item.payroll_id;
    const urlEarning = `${devApiUrl}/v1/earnings/validateId/${prId}`;
    const urlDeduction = `${devApiUrl}/v1/deductions/validateId/${prId}`;
    const vp = await validatePrId(
      urlEarning,
      urlDeduction,
      dispatch,
      prId,
      setLoading
    );
    if (vp) return;
    dispatch(setIsAdd(true));
    setItemEdit(item);
    setLoading(false);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payroll_aid);
    setData(item);
    setDel(true);
  };
  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };

  return (
    <>
      {/* filter and search */}
      <div className="grid grid-cols-1 xl:grid-cols-2 ">
        <FilterPayroll
          setFilter={setFilter}
          setSubmit={setSubmit}
          isSubmit={isSubmit}
          setMonth={setMonth}
          setYear={setYear}
          month={month}
          year={year}
          isFilter={isFilter}
          search={search}
        />
        <div className="mt-1">
          <PayrollSearchBar
            search={search}
            dispatch={dispatch}
            store={store}
            result={result?.pages}
            isFetching={isFetching}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
            setFilter={setFilter}
            setMonth={setMonth}
            setYear={setYear}
            setSubmit={setSubmit}
            isSubmit={isSubmit}
          />
        </div>
      </div>

      <div className="relative text-center">
        {/* {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )} */}
        {loading && <TableSpinner />}
        <div className=" overflow-x-auto z-0">
          {/* use only for updating important records */}
          {status !== "loading" && isFetching && <TableSpinner />}
          {/* use only for updating important records */}
          <table>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="min-w-[6rem]">Payroll ID</th>
                <th className="min-w-[5rem]">Type</th>
                <th className="min-w-[10rem] text-right">Pay Date</th>
                <th className="min-w-[10rem] text-right">Pay period</th>
                <th className="min-w-[8rem] text-center"># of Employee</th>
                <th className="min-w-[8rem] text-right">Total Amount</th>
                <th className="min-w-[5rem] text-center">Status</th>
                <th className="!w-[5rem]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(status === "loading" || result?.pages[0].data.length === 0) && (
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    {status === "loading" && <TableSpinner />}
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
              {result?.pages.map((page, key) => (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => (
                    <tr key={key}>
                      <td className="text-center">{counter++}.</td>
                      <td>{item.payroll_id}</td>
                      <td>{item.payroll_type_name}</td>
                      <td className=" text-right">
                        {formatDate(item.payroll_pay_date)}
                      </td>
                      <td className=" text-right">
                        {`${getPayPeriod(
                          item.payroll_start_date,
                          item.payroll_end_date
                        )}`}
                      </td>
                      <td className="text-center">{item.count}</td>
                      <td className="text-right">
                        {pesoSign}
                        {Number(item.payroll_category_type) ===
                        payrollCategoryBonusId
                          ? `${numberWithCommas(
                              Number(item.totalBonus).toFixed(2)
                            )}`
                          : Number(item.payroll_category_type) ===
                            payrollCategory13thMonthId
                          ? `${numberWithCommas(
                              Number(item.total13th).toFixed(2)
                            )}`
                          : `${numberWithCommas(
                              Number(item.payroll_total_amount).toFixed(2)
                            )}`}
                      </td>
                      <td className="text-center">
                        {item.payroll_is_paid === 1 ? (
                          <StatusActive text={"Paid"} />
                        ) : (
                          <StatusInactive text={"Draft"} />
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
                            to={`${link}/payroll/list?payrollid=${item.payroll_id}`}
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="View"
                            onClick={handleShow}
                          >
                            <FaList />
                          </Link>
                          {(item.payroll_is_paid === 0 ||
                            store.credentials.data.role_is_developer === 1) && (
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
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <LoadmoreRq
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result?.pages[0]}
          setPage={setPage}
          page={page}
          refView={ref}
        />
      </div>

      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`${devApiUrl}/v1/payroll/${id}`}
          // mysqlApiRestore={`${devApiUrl}/v1/payroll/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this payroll "
              : "Are you sure you want to restore this to draft "
          }
          item={`${dataItem.payroll_id}`}
          arrKey="payroll"
        />
      )}
    </>
  );
};

export default PayrollList;
