import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  devApiUrl,
  formatDate,
  getPayPeriod,
  getUrlParam,
  getUserType,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import LoadmoreRq from "../../../../partials/LoadmoreRq";
import Navigation from "../../../../partials/Navigation";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import useQueryData from "../../../../custom-hooks/useQueryData";

const SummaryTypeView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const payrollId = getUrlParam().get("payrollId");
  const paytypeId = getUrlParam().get("paytypeId");
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const { ref, inView } = useInView();

  // use if not loadmore button undertime
  const { data: paycategory } = useQueryData(
    `${devApiUrl}/v1/paytype/${paytypeId}`, // endpoint
    "get", // method
    "paycategory" // key
  );
  let category =
    paycategory?.data.length > 0
      ? `${paycategory?.data[0].paytype_category}`
      : "0";

  let payType =
    paycategory?.data.length > 0 ? `${paycategory?.data[0].paytype_name}` : "";
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
          ? `${devApiUrl}/v1/earnings/summary/view/${pageParam}/${payrollId}/${paytypeId}` // list endpoint
          : `${devApiUrl}/v1/deductions/summary/view/${pageParam}/${payrollId}/${paytypeId}` // list endpoint
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
      <div className="wrapper">
        <BreadCrumbs name={payType} />
        <hr />
        <div className="pt-4 text-primary">
          <p className="m-0">
            Pay Type: <span className="text-black">{payType}</span>
          </p>
          <p className="m-0">
            Pay Period:{" "}
            <span className="text-black">
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
                  <th>Item</th>
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
                    {page.data.map((item, key) => (
                      <tr key={key}>
                        <td>{counter++}.</td>
                        <td>
                          {item.paytype_category === "earnings"
                            ? `${item.earnings_employee}`
                            : `${item.deduction_employee}`}
                        </td>
                        <td>{item.payitem_name}</td>

                        <td className="w-[15rem] text-right">
                          {item.paytype_category === "earnings"
                            ? `${Number(item.earnings_amount).toFixed(2)}`
                            : `${Number(item.deduction_amount)}`}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="text-center">
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
