import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import {
  devApiUrl,
  getPayPeriod,
  getUserType,
  numberWithCommas,
  pesoSign,
} from "../../../helpers/functions-general";
import { wagesEarningsId } from "../../../helpers/functions-payitemId";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import HeaderPrint from "../../../partials/HeaderPrint";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const SummaryTypeList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [paytype, setPaytype] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const [page, setPage] = React.useState(1);
  let counter = Number(paytype) === wagesEarningsId ? 2 : 1;
  const { ref, inView } = useInView();
  let total = 0;
  let basicTotal = 0;
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
    queryKey: ["earnings-summary", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/paytype-report/filter/${paytype}/${category}/${startDate}/${endDate}`, // search endpoint
        `${devApiUrl}/v1/payrollList/page/0/${pageParam}`, // list endpoint
        isFilter // search boolean
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

  // use if not loadmore button undertime
  const { data: basicPay } = useQueryData(
    `${devApiUrl}/v1/paytype-report/basic-pay`, // endpoint filter
    "post", // method
    "basicPay", // key
    { startDate, endDate },
    isSubmit
  );

  // use if not loadmore button undertime
  const { data: payType, isLoading: loadingPayType } = useQueryData(
    `${devApiUrl}/v1/paytype`, // endpoint
    "get", // method
    "payType" // key
  );

  const handleCategory = async (e) => {
    // get employee id
    setCategory(e.target.options[e.target.selectedIndex].id);
  };
  const initVal = {
    paytype_aid: "",
    start_date: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    paytype_aid: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full  print:hidden">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setSubmit(!isSubmit);
            setPaytype(values.paytype_aid);
            setStartDate(values.start_date);
            setEndDate(values.end_date);

            // // refetch data of query
            // refetch();
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_1fr_150px] pt-5 pb-5 items-center">
                  <div className="relative">
                    <InputSelect
                      label="PayType"
                      name="paytype_aid"
                      onChange={handleCategory}
                      type="text"
                      disabled={isFetching}
                    >
                      <option value="" hidden>
                        {loadingPayType && "Loading..."}
                      </option>
                      {/* <option value="0">All</option> */}
                      {payType?.data.map((paytype, key) => {
                        return (
                          <option
                            key={key}
                            value={paytype.paytype_aid}
                            id={paytype.paytype_category}
                          >
                            {paytype.paytype_name}
                          </option>
                        );
                      })}
                    </InputSelect>
                  </div>
                  <div className="relative">
                    <InputText
                      label="Start Pay Date"
                      name="start_date"
                      type="text"
                      disabled={isFetching}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "date")}
                    />
                  </div>

                  <div className="relative">
                    <InputText
                      label="End Pay Date"
                      name="end_date"
                      type="text"
                      disabled={isFetching}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "date")}
                    />
                  </div>

                  <button
                    className="btn-modal-submit relative"
                    type="submit "
                    disabled={isFetching || !props.dirty}
                  >
                    {isFetching && <ButtonSpinner />}
                    <MdFilterAlt className="text-lg" />
                    <span>Filter</span>
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="print:pt-8">
        <HeaderPrint />
      </div>
      <div className="text-center pb-4 font-bold print:pt-4">
        {startDate !== "" && (
          <>
            <p className="m-0 text-lg">Pay Run by Pay Item </p>
            <p className="m-0 text-primary font-bold">
              {getPayPeriod(startDate, endDate)}
            </p>
          </>
        )}
      </div>
      <div className="text-center">
        <div className="overflow-x-auto ">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Pay Item</th>
                <th>Pay Type</th>
                <th>Count</th>
                <th className="text-right pr-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {(status === "loading" ||
                result?.pages[0].data.length === 0 ||
                (result?.pages[0].data.length === 0 &&
                  basicPay?.count === 0)) && (
                <tr className="text-center relative">
                  <td colSpan="100%" className="p-10">
                    {status === "loading" && <TableSpinner />}
                    <NoData text="Filter data using above controls." />
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
                  {Number(paytype) === wagesEarningsId &&
                    basicPay?.data.map((item, key) => {
                      basicTotal = Number(item.totalBasicSalary);
                      return (
                        <tr key={key}>
                          <td>1.</td>
                          <td>Basic Pay</td>
                          <td>Wages</td>
                          <td>{item.count}</td>
                          <td className="text-right text-primary ">
                            <Link
                              className="tooltip-action-table"
                              data-tooltip="View"
                              target="_blank"
                              rel="noopener noreferrer"
                              to={`${link}/reports/paytype/basic-pay?startDate=${startDate}&endDate=${endDate}`}
                            >
                              {pesoSign}
                              {numberWithCommas(
                                Number(item.totalBasicSalary).toFixed(2)
                              )}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  {page.data.map((item, key) => {
                    total += Number(item.amount);
                    return (
                      <tr key={key}>
                        <td>{counter++}.</td>
                        <td className="w-[15rem]">{item.payitem_name}</td>
                        <td className="w-[15rem]">{item.paytype_name}</td>
                        <td className="w-[15rem]">{item.count}</td>
                        <td className="text-right text-primary ">
                          <Link
                            className="tooltip-action-table"
                            data-tooltip="View"
                            target="_blank"
                            rel="noopener noreferrer"
                            to={`${link}/reports/paytype/view?startDate=${startDate}&endDate=${endDate}&payitemId=${item.payitem_aid}`}
                          >
                            {pesoSign}
                            {numberWithCommas(Number(item.amount).toFixed(2))}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isFilter && status !== "loading" && (
        <div className="text-right mt-2 pr-2 text-primary font-bold">
          <span className="mr-8">Total :</span>
          {pesoSign} {numberWithCommas((total + basicTotal).toFixed(2))}
        </div>
      )}
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
    </>
  );
};

export default SummaryTypeList;
