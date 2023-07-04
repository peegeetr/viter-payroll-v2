import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devApiUrl,
  formatDate,
  getPayPeriod,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import SearchBarRq from "../../../partials/SearchBarRq";
import ServerError from "../../../partials/ServerError";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import {
  getEmployeeDetails,
  getHolidayName,
  getPayPeriodHoliday,
} from "./functions-exemptions";
import useQueryData from "../../../custom-hooks/useQueryData";
import { payrollCategorySalaryId } from "../../../helpers/functions-payroll-category-id";

const HolidayExemptionList = ({ setItemEdit, employeeName }) => {
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
    queryKey: ["holiday-exemptions", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/holiday-exemptions/search/${search.current.value}`, // search endpoint
        `${devApiUrl}/v1/holiday-exemptions/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const { data: payPeriodHoliday } = useQueryData(
    `${devApiUrl}/v1/payrollList/all-salary-category/${payrollCategorySalaryId}`, // endpoint
    "get", // method
    "payPeriodHoliday" // key
  );

  // use if not loadmore button undertime
  const { data: Allholiday } = useQueryData(
    `${devApiUrl}/v1/holidays`, // endpoint
    "get", // method
    "Allholiday" // key
  );
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.holiday_exemption_aid);
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
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[12rem]">Employee</th>
              <th className="min-w-[6rem] ">Payroll Id</th>
              <th className="min-w-[10rem] ">PayPeriod</th>
              <th className="min-w-[12rem] ">Holidays</th>
              <th className="min-w-[7rem] ">Holidays Date</th>
              <th className="min-w-[7rem] ">Remarks</th>
              <th className="max-w-[5rem]">Actions</th>
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
                    <td>
                      {getEmployeeDetails(item, employeeName).employee_name}
                    </td>
                    <td>{item.holiday_exemption_pr_id}</td>
                    <td>{getPayPeriodHoliday(item, payPeriodHoliday)}</td>
                    <td>{getHolidayName(item, Allholiday)}</td>
                    <td>
                      {`${formatDate(item.holiday_exemption_holiday_date)}`}
                    </td>
                    <td>
                      {item.holiday_exemption_is_observe === 1
                        ? "Not observed"
                        : "Observed"}
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => {
                            handleEdit(item);
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Delete"
                          onClick={() => {
                            handleDelete(item);
                          }}
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
          mysqlApiDelete={`${devApiUrl}/v1/holiday-exemptions/${id}`}
          mysqlApiRestore={null}
          msg="Are you sure you want to delete this "
          item={`${formatDate(dataItem.holiday_exemption_holiday_date)}`}
          pr_id={`${dataItem.holiday_exemption_pr_id}`}
          arrKey="holiday-exemptions"
        />
      )}
    </>
  );
};

export default HolidayExemptionList;
