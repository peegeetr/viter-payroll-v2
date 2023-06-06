import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getPayPeriod,
  getUrlParam,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import HeaderPrint from "../../../../partials/HeaderPrint";
import LoadmoreRq from "../../../../partials/LoadmoreRq";
import Navigation from "../../../../partials/Navigation";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";

const SummaryTypeView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const payrollId = getUrlParam().get("payrollId");
  const payitemId = getUrlParam().get("payitemId");
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const { ref, inView } = useInView();
  let total = 0;

  // use if not loadmore button undertime
  const { data: paycategory } = useQueryData(
    `${devApiUrl}/v1/payitem/${payitemId}`, // endpoint
    "get", // method
    "paycategory" // key
  );

  let category =
    paycategory?.data.length > 0
      ? `${paycategory?.data[0].paytype_category}`
      : "0";

  let payType =
    paycategory?.data.length > 0 ? `${paycategory?.data[0].paytype_name}` : "";
  let payItem =
    paycategory?.data.length > 0 ? `${paycategory?.data[0].payitem_name}` : "";
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
    queryKey: [`${category}-paytype`],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, // search endpoint
        category === "earnings"
          ? `${devApiUrl}/v1/earnings/report/paytype/view/${pageParam}/${payrollId}/${payitemId}` // list endpoint
          : `${devApiUrl}/v1/deductions/report/paytype/view/${pageParam}/${payrollId}/${payitemId}` // list endpoint
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

  // console.log(result);
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  let payPeriodEarinings =
    result?.pages[0].data.length > 0
      ? `${getPayPeriod(
          result?.pages[0].data[0].earnings_start_pay_date,
          result?.pages[0].data[0].earnings_end_pay_date
        )}`
      : "";
  let payPeriodDeductions =
    result?.pages[0].data.length > 0
      ? `${getPayPeriod(
          result?.pages[0].data[0].deduction_start_pay_date,
          result?.pages[0].data[0].deduction_end_pay_date
        )}`
      : "";
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs name={`${payItem}`} />
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.print()}
            >
              <AiFillPrinter />
              <span>Print</span>
            </button>
          </div>
        </div>
        <hr className="print:hidden" />
        <HeaderPrint />
        <div className="pt-4 text-primary">
          <p className="m-0">
            Pay Type: <span className="text-black ml-2">{payType}</span>
          </p>
          <p className="m-0">
            Pay Item: <span className="text-black ml-2">{payItem}</span>
          </p>
          <p className="m-0">
            Pay Period:{" "}
            <span className="text-black ml-2">
              {category === "earnings"
                ? payPeriodEarinings
                : payPeriodDeductions}
            </span>
          </p>
        </div>
        <div className="relative overflow-x-auto z-0 w-full lg:w-[35rem] ">
          <div className="w-full pt-5 pb-20">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th></th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(status === "loading" ||
                  result?.pages[0].data.length === 0) && (
                  <tr className="text-center relative">
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
                      console.log(item.earnings_rate);
                      item.earnings_amount === undefined
                        ? (total += Number(item.deduction_amount))
                        : (total += Number(item.earnings_amount));
                      return (
                        <tr key={key}>
                          <td>{counter++}.</td>
                          <td>
                            {item.paytype_category === "earnings"
                              ? `${item.earnings_employee}`
                              : `${item.deduction_employee}`}
                          </td>
                          <td>
                            {item.earnings_rate !== "" &&
                              item.earnings_rate !== undefined &&
                              `${Number(item.earnings_rate)}%`}
                          </td>
                          <td className="w-[15rem] text-right mt-2 pr-2 font-bold">
                            {item.paytype_category === "earnings"
                              ? `${numberWithCommas(
                                  Number(item.earnings_amount).toFixed(2)
                                )}`
                              : `${numberWithCommas(
                                  Number(item.deduction_amount).toFixed(2)
                                )}`}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {status !== "loading" && (
              <div className="text-right mt-2 pr-2 text-primary font-bold">
                <span className="mr-8">Total :</span>{" "}
                {numberWithCommas(total.toFixed(2))}
              </div>
            )}
            <div className="text-center print:hidden">
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
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SummaryTypeView;
