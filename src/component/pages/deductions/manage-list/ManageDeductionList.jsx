import React from "react";
import { FaTrash } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
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
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import { getStatus } from "../../earnings/manage-list/function-manage-list";

const ManageDeductionList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [id, setId] = React.useState(null);
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
    queryKey: ["deduction", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/deductions/search/${search.current.value}`, // search endpoint
        `${devApiUrl}/v1/deductions/page/${pageParam}`, // list endpoint
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

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.deduction_aid);
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
        {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )}
        <div className=" overflow-x-auto z-0">
          <table>
            <thead>
              <tr>
                <th>#</th>
                {/* <th className="min-w-[5rem]">Payroll ID</th> */}
                <th className="min-w-[10rem]">Employeee</th>
                <th className="min-w-[12rem]">Details</th>
                <th className="min-w-[5rem]">Amount</th>
                <th>Installment</th>
                <th className="min-w-[6rem]">Start Date</th>
                <th className="min-w-[6rem]">End Date</th>
                <th className="min-w-[12rem]">Pay Type</th>
                <th className="min-w-[7rem]">Pay Item</th>
                <th className="min-w-[7rem]">Frequency</th>
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
                      {/* <td>{item.deduction_payroll_id}</td> */}
                      <td>{item.deduction_employee}</td>
                      <td>{item.deduction_details}</td>
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
          mysqlApiDelete={`${devApiUrl}/v1/deductions/${id}`}
          msg={"Are you sure you want to delete this user"}
          item={`${dataItem.deduction_employee}`}
          arrKey="deduction"
        />
      )}
    </>
  );
};

export default ManageDeductionList;
