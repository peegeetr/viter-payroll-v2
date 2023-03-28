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

const SummaryTypeView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const paytypeId = getUrlParam().get("paytypeId");
  const [page, setPage] = React.useState(1);
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
    queryKey: ["earnings-paytype"],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, // search endpoint
        `${devApiUrl}/v1/earnings/summary/view/${pageParam}/${paytypeId}` // list endpoint
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
  let payItem =
    result?.pages.length > 0 ? `${result?.pages[0].data[0].payitem_name}` : "";
  let payType =
    result?.pages.length > 0 ? `${result?.pages[0].data[0].paytype_name}` : "";
  let payPeriod =
    result?.pages.length > 0
      ? result?.pages[0].data[0].earnings_start_pay_date === "n/a"
        ? formatDate(result?.pages[0].data[0].earnings_created)
        : `
        ${getPayPeriod(
          result?.pages[0].data[0].earnings_start_pay_date,
          result?.pages[0].data[0].earnings_end_pay_date
        )}`
      : "no";
  console.log(result);
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper">
        <BreadCrumbs name={payItem} />
        <hr />
        <div className="pt-4 text-primary">
          <p className="m-0">
            Pay Period: <span className="text-black">{payPeriod}</span>
          </p>
          <p className="m-0">
            Pay Type: <span className="text-black">{payType}</span>
          </p>
        </div>
        <div className="relative overflow-x-auto z-0 w-full lg:w-[35rem] ">
          <div className="w-full pt-5 pb-20">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
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
                        <td>{item.earnings_employee}</td>
                        <td className="w-[15rem] text-right">
                          {Number(item.earnings_amount).toFixed(2)}
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
