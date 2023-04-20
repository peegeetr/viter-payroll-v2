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
  numberWithCommas,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import SearchBarRq from "../../../partials/SearchBarRq";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import { payrollCategoryBonusId } from "../../../helpers/functions-payroll-category-id";
import { payrollCategory13thMonthId } from "../../../helpers/functions-payroll-category-id";

const PayrollViewList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const pid = getUrlParam().get("payrollid");

  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef(null);
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const { ref, inView } = useInView();
  let salariesAndWages = 0;
  let monthAndBonuses = 0;
  let sssEr = 0;
  let phicEr = 0;
  let pagEr = 0;
  let dR = 0;
  let sssPayable = 0;
  let phicPayable = 0;
  let pagPayable = 0;
  let sssLoanPayable = 0;
  let pagLoanPayable = 0;
  let totalOptional = 0;
  let wtaxPayable = 0;
  let pagMp2Payable = 0;
  let others = 0;
  let netPay = 0;
  let cR = 0;

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
    cacheTime: 1000,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  console.log(result);

  return (
    <>
      <div className="xs:flex text-primary">
        <p className="mr-8">
          ID : <span className="font-light text-black">{pid}</span>
        </p>
        <p className="mr-8">
          Pay Period :{" "}
          <span className="font-light text-black">
            {result?.pages[0].data.length > 0
              ? `${getPayPeriod(
                  result?.pages[0].data[0].payroll_start_date,
                  result?.pages[0].data[0].payroll_end_date
                )}`
              : "--"}
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
                <th className="w-[10rem]">Employee</th>
                <th className="text-right w-[8rem]">Gross</th>
                <th className="text-right w-[8rem]">Deduction</th>
                <th className="text-right w-[8rem]">Net Pay</th>
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
                  {page.data.map((item, key) => {
                    salariesAndWages += Number(item.payroll_list_gross);
                    monthAndBonuses += Number(item.payroll_list_total_benefits);
                    sssEr += Number(item.payroll_list_sss_er);
                    phicEr += Number(item.payroll_list_philhealth_er);
                    pagEr += Number(item.payroll_list_pagibig_er);
                    dR =
                      salariesAndWages +
                      monthAndBonuses +
                      sssEr +
                      phicEr +
                      pagEr;
                    sssPayable +=
                      Number(item.payroll_list_sss_ee) +
                      Number(item.payroll_list_sss_er);
                    phicPayable +=
                      Number(item.payroll_list_philhealth_ee) +
                      Number(item.payroll_list_philhealth_er);
                    pagPayable +=
                      Number(item.payroll_list_pagibig_ee) +
                      Number(item.payroll_list_pagibig_er);
                    sssLoanPayable += Number(item.payroll_list_sss_loan);
                    pagLoanPayable += Number(item.payroll_list_pagibig_loan);
                    pagMp2Payable += Number(item.payroll_list_pagibig_mp2);
                    totalOptional =
                      sssLoanPayable + pagLoanPayable + pagMp2Payable;
                    wtaxPayable += Number(item.payroll_list_tax);
                    others +=
                      Number(item.payroll_list_fwc_tithes) +
                      Number(item.payroll_list_fca_tuition) +
                      Number(item.payroll_list_other_deduction);
                    netPay += Number(item.payroll_list_net_pay);
                    cR =
                      sssPayable +
                      phicPayable +
                      pagPayable +
                      wtaxPayable +
                      totalOptional +
                      others +
                      netPay;
                    return (
                      <tr key={key}>
                        <td className="text-center">{counter++}.</td>
                        <td>{item.payroll_list_employee_name}</td>
                        <td className="text-right px-2">
                          {numberWithCommas(item.payroll_list_gross)}
                        </td>
                        <td className="text-right px-2">
                          {numberWithCommas(item.payroll_list_deduction)}
                        </td>
                        <td className="text-right px-2">
                          {numberWithCommas(item.payroll_list_net_pay)}
                        </td>
                        <td>
                          {item.payroll_category_type ===
                          payrollCategoryBonusId ? (
                            <div className="flex items-center justify-end gap-1 mr-2">
                              <Link
                                to={`${link}/payroll/list/payslip?payslipid=${item.payroll_list_aid}`}
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="Payslip"
                              >
                                <MdOutlineReceipt />
                              </Link>
                            </div>
                          ) : item.payroll_category_type ===
                            payrollCategory13thMonthId ? (
                            <div className="flex items-center justify-end gap-1 mr-2">
                              <Link
                                to={`${link}/payroll/list/payslip-13th-Month?payslipid=${item.payroll_list_aid}`}
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="Payslip"
                              >
                                <MdOutlineReceipt />
                              </Link>
                            </div>
                          ) : (
                            // <div className="flex items-center justify-end gap-1 mr-2">
                            //   <Link
                            //     to={`${link}/payroll/list/payslip?payslipid=${item.payroll_list_aid}`}
                            //     className="btn-action-table tooltip-action-table"
                            //     data-tooltip="Payslip"
                            //   >
                            //     <MdOutlineReceipt />
                            //   </Link>
                            // </div>
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
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
                {result?.pages[0].data.length > 0
                  ? `${getPayPeriod(
                      result?.pages[0].data[0].payroll_start_date,
                      result?.pages[0].data[0].payroll_end_date
                    )}`
                  : "--"}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="w-[15rem]">Particulars</td>
              <td className="w-[8rem]">Dr</td>
              <td>Cr</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Salaries & Wages</td>
              <td className="w-[8rem] text-right px-5">
                {numberWithCommas(salariesAndWages.toFixed(2))}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">13th Month & Bonuses</td>
              <td className="w-[8rem] text-right px-5">
                {numberWithCommas(monthAndBonuses.toFixed(2))}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">SSS Er</td>
              <td className="w-[8rem] text-right px-5">
                {numberWithCommas(sssEr.toFixed(2))}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">PHIC Er</td>
              <td className="w-[8rem] text-right px-5">
                {numberWithCommas(phicEr.toFixed(2))}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem]">PGBG ER</td>
              <td className="w-[8rem] text-right px-5">
                {numberWithCommas(pagEr.toFixed(2))}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">SSS Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(sssPayable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PHIC Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(phicPayable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PGBG Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(pagPayable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">SSS Loan Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(sssLoanPayable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PGBG Loan Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(pagLoanPayable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">Wtax Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(wtaxPayable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">PGBG MP2 Payable</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(pagMp2Payable.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">Others</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(others.toFixed(2))}
              </td>
            </tr>
            <tr>
              <td className="w-[15rem] pl-8">Total Net Pay</td>
              <td className="w-[8rem]"></td>
              <td className="text-right px-5">
                {numberWithCommas(netPay.toFixed(2))}
              </td>
            </tr>
            <tr className="font-bold bg-gray-200 hover:bg-gray-200 ">
              <td className="w-[15rem] pl-8"></td>
              <td className="text-right px-5">
                {numberWithCommas(dR.toFixed(2))}
              </td>
              <td className="text-right px-5">
                {numberWithCommas(cR.toFixed(2))}
              </td>
            </tr>
            <tr className="font-bold bg-gray-200 hover:bg-gray-200 ">
              <td className="w-[15rem] pl-8"></td>
              <td className="text-right px-5">
                {numberWithCommas(Number(dR - cR).toFixed(2))}
              </td>
              <td className="text-right px-5">
                {numberWithCommas(Number(cR - dR).toFixed(2))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PayrollViewList;
