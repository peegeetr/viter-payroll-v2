import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import SearchBarRq from "../../../partials/SearchBarRq";
import NoData from "../../../partials/NoData";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import ServerError from "../../../partials/ServerError";
import {
  devApiUrl,
  formatDate,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq";
import useQueryData from "../../../custom-hooks/useQueryData";
import { getEmployeeName } from "./functions-exemptions";

const HolidayExemptionList = ({ setItemEdit }) => {
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
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

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
  // use if not loadmore button undertime
  const { data: employeeName } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employeeName", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

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
              <th className="min-w-[10rem] w-[10rem]">Employee</th>
              <th className="min-w-[10rem] ">Holidays Date</th>
              <th>Remarks</th>
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
                    <td>{getEmployeeName(item, employeeName)}</td>
                    <td>
                      {`${formatDate(item.holiday_exemption_holiday_date)}`}
                    </td>
                    <td>
                      {item.holiday_exemption_is_observe === 1
                        ? "Observed"
                        : "Not observed"}
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
          arrKey="holiday-exemptions"
        />
      )}
    </>
  );
};

export default HolidayExemptionList;
