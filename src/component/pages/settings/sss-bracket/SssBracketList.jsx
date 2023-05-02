import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import {
  devApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general.jsx";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite.jsx";
import LoadmoreRq from "../../../partials/LoadmoreRq.jsx";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore.jsx";
import ModalDeleteRestoreRq from "../../../partials/modals/ModalDeleteRestoreRq.jsx";
import NoData from "../../../partials/NoData.jsx";
import SearchBarRq from "../../../partials/SearchBarRq.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
const SssBracketList = ({ setItemEdit, setItemNum }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [dataItem, setData] = React.useState(null);

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
    queryKey: ["sssBracket", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/sss-bracket/search/${search.current.value}`, // search endpoint
        `${devApiUrl}/v1/sss-bracket/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item, counter) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
    setItemNum(counter);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.sss_bracket_aid);
    setData(item);
    setDel(true);
    // console.log(item);
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
                <th className="min-w-[10rem] w-[230px]">Range From</th>
                <th className="min-w-[7rem] w-[230px]">Range To</th>
                <th className="min-w-[7rem]">ER</th>
                <th className="min-w-[7rem]">EE </th>
                <th className="min-w-[7rem]">Total</th>
                <th className="max-w-[7rem]">Actions</th>
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
                        {numberWithCommas(
                          Number(item.sss_bracket_range_from).toFixed(2)
                        )}
                      </td>
                      <td>
                        {numberWithCommas(
                          Number(item.sss_bracket_range_to).toFixed(2)
                        )}
                      </td>
                      <td>
                        {numberWithCommas(
                          Number(item.sss_bracket_er).toFixed(2)
                        )}
                      </td>
                      <td>
                        {numberWithCommas(
                          Number(item.sss_bracket_ee).toFixed(2)
                        )}
                      </td>
                      <td>
                        {numberWithCommas(
                          Number(item.sss_bracket_total).toFixed(2)
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item, key + 1)}
                          >
                            <FaEdit />
                          </button>
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
          mysqlApiDelete={`${devApiUrl}/v1/sss-bracket/${id}`}
          msg={"Are you sure you want to remove this data"}
          item={`${dataItem.sss_bracket_range_from} - ${dataItem.sss_bracket_range_to}`}
          arrKey="sssBracket"
        />
      )}
    </>
  );
};

export default SssBracketList;
