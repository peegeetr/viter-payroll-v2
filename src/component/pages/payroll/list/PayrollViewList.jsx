import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { MdOutlineReceipt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devApiUrl,
  getPayPeriod,
  getUrlParam,
  getUserType,
  getWorkingDays,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import SearchBarRq from "../../../partials/SearchBarRq";
import ServerError from "../../../partials/ServerError";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const PayrollViewList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const pid = getUrlParam().get("payrollid");

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
    queryKey: ["payrollList", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/payrollList/search/${pid}/${search.current.value}`, // search endpoint
        `${devApiUrl}/v1/payrollList/page/${pid}/${pageParam}`, // list endpoint
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

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="xs:flex text-primary">
        <p className="mr-8">
          ID : <span className="font-light text-black">{pid}</span>
        </p>
        <p className="mr-8">
          Pay Period :{" "}
          <span className="font-light text-black">
            {result?.pages[0].data.length > 0 ? getPayPeriod(result) : "--"}
          </span>
        </p>
        <p className="">
          Period Work Days:{" "}
          <span className="font-light text-black">
            {result?.pages[0].data.length > 0
              ? getWorkingDays(
                  new Date(result?.pages[0].data[0].payroll_start_date),
                  new Date(result?.pages[0].data[0].payroll_end_date)
                )
              : "--"}
          </span>
        </p>
      </div>
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
                <th className="w-[15rem]">Employee</th>
                <th className="w-[8rem]">Gross</th>
                <th className="w-[8rem]">Deduction</th>
                <th className="w-[8srem]">Net Pay</th>
                <th></th>
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
                      <td className="text-center">{counter}.</td>
                      <td>{item.payroll_list_employee_name}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        {/* {item.payroll_list_is_paid === 1 && ( */}
                        <div className="flex items-center justify-end gap-1 mr-2">
                          <Link
                            to={`${link}/payroll/list/payslip?payslipid=${item.payroll_list_aid}`}
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Payslip"
                          >
                            <MdOutlineReceipt />
                          </Link>
                        </div>
                        {/* )} */}
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
      <div className="relative text-center overflow-x-auto z-0 w-full lg:w-[30rem] mx-auto mt-8">
        <table>
          <tbody>
            <tr className="bg-gray-200 hover:bg-gray-200 text-primary">
              <td className="w-[15rem]">Payroll Entry ({pid})</td>
              <td colSpan={2}>
                {result?.pages[0].data.length > 0 ? getPayPeriod(result) : "--"}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="w-[15rem]">Particulars</td>
              <td className="w-[8rem]">Dr</td>
              <td>Cr</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Salaries & Wages</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">13th Month & Bonuses</td>
              <td className="w-[8rem]">9,500.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">SSS Er</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">PHIC Er</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">PGBG ER</td>
              <td className="w-[8rem]">0.00</td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">SSS Payable</td>
              <td className="w-[8rem]"></td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PHIC Payable</td>
              <td className="w-[8rem]"></td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PGBG Payable</td>
              <td className="w-[8rem]"></td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">Wtax Payable</td>
              <td className="w-[8rem]"></td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PGBG MP2 Payable</td>
              <td className="w-[8rem]"></td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">Others</td>
              <td className="w-[8rem]"></td>
              <td>0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">Total Net Pay</td>
              <td className="w-[8rem]"></td>
              <td>9,500.00</td>
            </tr>
            <tr className="font-bold bg-gray-200 hover:bg-gray-200 ">
              <td className="w-[15rem] pl-8"></td>
              <td>9,500.00</td>
              <td>9,500.00</td>
            </tr>
            <tr className="font-bold bg-gray-200 hover:bg-gray-200 ">
              <td className="w-[15rem] pl-8"></td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PayrollViewList;
