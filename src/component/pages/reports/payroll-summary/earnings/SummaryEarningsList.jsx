import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputText } from "../../../../helpers/FormInputs";
import {
  devApiUrl,
  getPayPeriod,
  getUserType,
  getWorkingDays,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../../partials/LoadmoreRq";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import {
  getErningsHolidayRate,
  getErningsOtRate,
} from "../function-report-summary";

const SummaryEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

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
    queryKey: ["payrollList-summary", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/payrollList/filter/${startDate}/${endDate}`, // search endpoint
        `${devApiUrl}/v1/payrollList/summary/${pageParam}`, // list endpoint
        isFilter // search boolean
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

  // use if not loadmore button undertime
  const { data: earnings } = useQueryData(
    `${devApiUrl}/v1/earnings`, // endpoint
    "get", // method
    "earnings-summary" // key
  );

  const initVal = {
    payStart_date: "",
    payEnd_date: "",
  };

  const yupSchema = Yup.object({
    payStart_date: Yup.string().required("Required"),
    payEnd_date: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full lg:w-[35rem] ">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setSubmit(!isSubmit);
            setStartDate(values.payStart_date);
            setEndDate(values.payEnd_date);
            // // refetch data of query
            // refetch();
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] py-10 items-center">
                  <div className="relative">
                    <InputText
                      label="Start Pay Date"
                      name="payStart_date"
                      type="text"
                      disabled={isFetching}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "date")}
                    />
                  </div>

                  <div className="relative">
                    <InputText
                      label="End Pay Date"
                      name="payEnd_date"
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
      <div className="text-center">
        <div className="overflow-x-auto max-h-[40rem] z-0 ">
          <table>
            <thead>
              <tr className="border-none text-center">
                <th className="text-center" rowSpan="2">
                  #
                </th>
                <th className="min-w-[18rem] text-left" rowSpan="2">
                  Name
                </th>
                <th
                  className="table-border min-w-[12rem] text-left"
                  rowSpan="2"
                >
                  Department
                </th>
                <th className="table-border min-w-[12rem]" rowSpan="2">
                  Pay Date
                </th>
                <th className="table-border min-w-[10rem]" rowSpan="2">
                  Monthly Basic Pay
                </th>
                <th className="table-border min-w-[8rem]" rowSpan="2">
                  Additional pay
                </th>
                <th className="table-border min-w-[6rem]" rowSpan="2">
                  Total Pay
                </th>
                <th className="table-border  min-w-[11rem]" rowSpan="2">
                  Regular Work Hours
                </th>
                <th className="table-border min-w-[5rem]" rowSpan="2">
                  Rate
                </th>
                <th className="table-border  min-w-[9rem]" rowSpan="2">
                  Total Reg Wage
                </th>
                <th className="table-border-center " colSpan="4">
                  Leave
                </th>
                <th className="table-border-center " colSpan="4">
                  Overtime
                </th>
                <th className="table-border-center " colSpan="4">
                  Holiday
                </th>
                <th className="table-border-center min-w-[20rem]" colSpan="4">
                  Night Differential
                </th>
                <th className="min-w-[5rem]" rowSpan="2">
                  Gross Pay
                </th>
              </tr>
              <tr className="text-center">
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border min-w-[7rem]">Total Amount</th>
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border min-w-[7rem]">Total Amount</th>
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border min-w-[7rem]">Total Amount</th>
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border min-w-[7rem]">Total Amount</th>
              </tr>
            </thead>

            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tbody>
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    {status === "loading" && <TableSpinner />}
                    <NoData />
                  </td>
                </tr>
              </tbody>
            )}
            {error && (
              <tbody>
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
              </tbody>
            )}
            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tbody key={key}>
                    <tr className="text-right">
                      <td className="text-center">{counter++}.</td>
                      <td className="text-left">
                        {item.payroll_list_employee_name}
                      </td>
                      <td className="text-left"> </td>
                      <td className="text-center">{getPayPeriod(result)}</td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_basic_pay)}
                      </td>
                      <td className="px-6">{numberWithCommas(0)}</td>
                      <td className="px-6">{numberWithCommas(0)}</td>
                      <td className="px-6">
                        {getWorkingDays(
                          new Date(item.payroll_start_date),
                          new Date(item.payroll_end_date)
                        ) * 8}
                      </td>
                      <td className="px-6">{numberWithCommas(0)}</td>
                      <td className="px-6">{numberWithCommas(0)}</td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td colSpan={4} className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td colSpan={4} className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                    </tr>

                    {getErningsOtRate(earnings, item)?.map((item, key) => {
                      return (
                        <tr
                          className="max-h-[10rem] overflow-y-auto text-right"
                          key={key}
                        >
                          <td colSpan={14} className="px-6"></td>

                          <td className="px-6">{numberWithCommas(item.hrs)}</td>
                          <td className="px-6">
                            {numberWithCommas(item.rate)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.amount)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.total)}
                          </td>
                        </tr>
                      );
                    })}
                    {getErningsHolidayRate(earnings, item)?.map((item, key) => {
                      return (
                        <tr
                          key={key}
                          className="text-right max-h-[10rem] overflow-y-auto "
                        >
                          <td colSpan={18} className="px-6"></td>

                          <td className="px-6">{numberWithCommas(item.hrs)}</td>
                          <td className="px-6">
                            {numberWithCommas(item.rate)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.amount)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ))}
              </React.Fragment>
            ))}
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

export default SummaryEarningsList;
