import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaList, FaTrash, FaHistory } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { setIsAdd, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import {
  devApiUrl,
  devNavUrl,
  formatDate,
  getUserType,
  numberWithCommas,
  UrlSystem,
} from "../../helpers/functions-general";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import LoadmoreRq from "../../partials/LoadmoreRq";
import ModalDeleteRestoreRq from "../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../partials/NoData";
import SearchBarRq from "../../partials/SearchBarRq";
import ServerError from "../../partials/ServerError";
import FetchingSpinner from "../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";
import { validatePrId } from "./FunctionPayroll";

const PayrollList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [loading, setLoading] = React.useState(false);

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
    queryKey: ["payroll", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/payroll/search/${search.current.value}`, // search endpoint
        `${devApiUrl}/v1/payroll/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  console.log(result);

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
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.payroll_aid);
    setData(item);
    setDel(false);
  };
  return (
    <>
      <SearchBarRq
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />

      <div className="relative text-center">
        {/* {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )} */}
        {loading && <TableSpinner />}
        <div className=" overflow-x-auto z-0">
          <table>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="min-w-[6rem]">Payroll ID</th>
                <th className="min-w-[5rem]">Type</th>
                <th className="min-w-[9rem]">Pay Date</th>
                <th className="min-w-[8rem]">Pay period</th>
                <th className="min-w-[8rem] text-center"># of Employee</th>
                <th className="min-w-[8rem] text-right">Total Amount</th>
                <th className="min-w-[5rem] text-center">Status</th>
                <th className="min-w-[10rem]">Actions</th>
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
                      <td>{formatDate(item.payroll_pay_date)}</td>
                      <td>
                        {`${formatDate(item.payroll_start_date).split(" ")[1]} 
                      ${formatDate(item.payroll_start_date).split(" ")[2]} - ${
                          formatDate(item.payroll_end_date).split(" ")[2]
                        },  ${formatDate(item.payroll_end_date).split(" ")[3]}`}
                      </td>
                      <td className="text-center">{item.count}</td>
                      <td className="text-right">
                        {numberWithCommas(Number(item.totalNet).toFixed(2))}
                      </td>
                      <td className="text-center">
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
                            to={`${link}/payroll/list?payrollid=${item.payroll_id}`}
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="View"
                          >
                            <FaList />
                          </Link>
                          {/* 
                          {item.payroll_is_paid === 1 &&
                            store.credentials.data.role_is_developer === 1 && (
                              <button
                                type="button"
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="draft"
                                onClick={() => handleRestore(item)}
                              >
                                <FaHistory />
                              </button>
                            )} */}

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
