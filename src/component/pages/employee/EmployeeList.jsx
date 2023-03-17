import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../store/StoreContext";
import { getUserType, hrisDevApiUrl } from "../../helpers/functions-general";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import LoadmoreRq from "../../partials/LoadmoreRq";
import NoData from "../../partials/NoData";
import SearchBarRq from "../../partials/SearchBarRq";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";

const EmployeeList = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  let counter = 1;
  const { ref, inView } = useInView();
  const link = getUserType(
    store.credentials.data.role_is_developer === 1,
    store.credentials.data.role_is_admin === 1,
    store.credentials.data.role_is_contributor === 1
  );

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
    queryKey: ["employee", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${hrisDevApiUrl}/v1/employees/search/${search.current.value}`, // search endpoint
        `${hrisDevApiUrl}/v1/employees/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    // cacheTime: 1000,
  });

  console.log(result);

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

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
                <th className="text-center">#</th>
                <th className="w-12"></th>
                <th className="w-52">Name</th>
                <th className="w-28">ID No.</th>
                <th className="w-[24rem]">Work Email</th>
                <th className="w-[12rem]">Direct report</th>
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
                      <td className="text-center">{counter++}.</td>
                      <td>
                        {item.employee_photo > 0 ? (
                          <img
                            src="https://hris.frontlinebusiness.com.ph/img/abrigo.jpg"
                            alt="employee photo"
                            className="rounded-full h-8 w-8 object-cover object-center mx-auto"
                          />
                        ) : (
                          <span className="text-3xl text-gray-400">
                            <FaUserCircle />
                          </span>
                        )}
                      </td>
                      <td>{item.fullname}</td>
                      <td>{item.employee_job_number}</td>
                      <td>{item.employee_email}</td>
                      <td>
                        {item.supervisor === null
                          ? "Not assigned"
                          : item.supervisor}
                      </td>
                      <td>
                        {item.employee_is_active === 1 ? (
                          <StatusActive />
                        ) : (
                          <StatusInactive />
                        )}
                      </td>
                      <td>
                        <div className="flex justify-end items-center gap-1">
                          <Link
                            to={`${link}/employee/details?employeeid=${item.employee_aid}`}
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Edit"
                          >
                            <FaEdit />
                          </Link>
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
    </>
  );
};

export default EmployeeList;
