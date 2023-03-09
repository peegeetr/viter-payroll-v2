import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devApiUrl,
  formatDate,
  numberWithCommas,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq";
import NoData from "../../../partials/NoData";
import SearchBarRq from "../../../partials/SearchBarRq";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import { getStatus } from "./function-manage-list";

const ManageEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
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
    queryKey: ["earnings", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/earnings/search/${search.current.value}`, // search endpoint
        `${devApiUrl}/v1/earnings/page/${pageParam}`, // list endpoint
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

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.earnings_aid);
    setData(item);
    setDel(true);
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
        <div className=" overflow-x-auto z-0">
          <table>
            <thead>
              <tr>
                <th>#</th>
                {/* <th className="min-w-[5rem]">Payroll ID</th> */}
                <th className="min-w-[10rem]">Employeee</th>
                <th className="min-w-[7rem]">Pay Item</th>
                <th className="min-w-[12rem]">Details</th>
                <th className="min-w-[5rem]">Amount</th>
                <th>Installment</th>
                <th className="min-w-[6rem]">Start Date</th>
                <th className="min-w-[6rem]">End Date</th>
                <th className="min-w-[7rem]">Pay Type</th>
                <th className="min-w-[7rem]">Frequency</th>
                {/* <th className="min-w-[8rem]">Details</th> */}
                <th>Status</th>
                <th className="text-right">Actions</th>
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
                      <td>{counter++}.</td>
                      {/* <td>{item.earnings_payroll_id}</td> */}
                      <td>{item.earnings_employee}</td>
                      <td>{item.payitem_name}</td>
                      <td>{item.earnings_details}</td>
                      <td>
                        P
                        {numberWithCommas(
                          Number(item.earnings_amount).toFixed(2)
                        )}
                      </td>
                      <td>
                        {item.earnings_number_of_installment === 0
                          ? "N/A"
                          : `${item.earnings_num_pay}/${item.earnings_number_of_installment}`}
                      </td>

                      <td>
                        {item.earnings_start_pay_date === "n/a"
                          ? "N/A"
                          : `${
                              formatDate(item.earnings_start_pay_date).split(
                                " "
                              )[1]
                            } 
                        ${
                          formatDate(item.earnings_start_pay_date).split(" ")[2]
                        }
                        ${
                          formatDate(item.earnings_start_pay_date).split(" ")[3]
                        }
                        `}
                      </td>
                      <td>
                        {item.earnings_end_pay_date === "n/a"
                          ? "N/A"
                          : `${
                              formatDate(item.earnings_end_pay_date).split(
                                " "
                              )[1]
                            } 
                      ${formatDate(item.earnings_end_pay_date).split(" ")[2]}
                      ${formatDate(item.earnings_end_pay_date).split(" ")[3]}
                      `}
                      </td>
                      <td>{item.paytype_name}</td>
                      <td>
                        {item.earnings_frequency === "sm"
                          ? "Semi-monthly"
                          : "Monthly"}
                      </td>

                      {/* <td>{item.earnings_details}</td> */}
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
          mysqlApiDelete={`${devApiUrl}/v1/earnings/${id}`}
          msg={"Are you sure you want to delete this user"}
          item={`${dataItem.earnings_employee}`}
          arrKey="earnings"
        />
      )}
    </>
  );
};

export default ManageEarningsList;
