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
import { getErningsRate } from "../function-report-summary";

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

  console.log(result);

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
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] pt-5 pb-10 items-center">
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
        <div className="overflow-x-auto max-h-[40rem] h-[40rem]">
          <table className="">
            <thead className="relative z-0">
              <tr className="border-none text-center sticky top-0 ">
                <th className="text-center" rowSpan="2">
                  #
                </th>
                <th className="min-w-[12rem] text-left" rowSpan="2">
                  Name
                </th>
                <th
                  className="table-border min-w-[13rem] text-center"
                  rowSpan="2"
                >
                  Department
                </th>
                <th className="table-border min-w-[9rem]" rowSpan="2">
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
                <th className="table-border-center " colSpan="3">
                  Leave
                </th>
                <th className="table-border-center " colSpan="4">
                  Overtime
                </th>
                <th className="table-border-center " colSpan="4">
                  Holiday
                </th>
                <th className="table-border-center min-w-[15rem]" colSpan="3">
                  Night Differential
                </th>
                <th className="min-w-[5rem]" rowSpan="2">
                  Gross Pay
                </th>
              </tr>
              <tr className="text-center sticky top-[35px] ">
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
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
                    {/* <tr className="text-right relative"> */}
                    <tr className="text-right ">
                      <td className="text-center ">{counter++}.</td>
                      {/* <td className="text-left sticky left-0 bg-white"> */}
                      <td className="text-left ">
                        {item.payroll_list_employee_name}
                      </td>
                      <td className="text-left">
                        {item.payroll_list_employee_department}
                      </td>
                      <td className="text-center">{`${getPayPeriod(
                        item.payroll_start_date,
                        item.payroll_end_date
                      )}`}</td>
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
                      <td className="px-6">{numberWithCommas(10)}</td>
                      <td className="px-6">
                        {/* leave hrs */}
                        {numberWithCommas(item.payroll_list_leave_hrs)}
                      </td>
                      <td className="px-6">
                        {/* leave rate */}
                        {numberWithCommas(item.payroll_list_leave_rate)}
                      </td>
                      <td className="px-6">
                        {/* leave pay */}
                        {numberWithCommas(item.payroll_list_leave_pay)}
                      </td>
                      {/* <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td> */}
                      <td colSpan={4} className="px-6">
                        {numberWithCommas(item.payroll_list_overtime_pay)}
                      </td>
                      <td colSpan={4} className="px-6">
                        {/* total holiday amount */}
                        {numberWithCommas(item.payroll_list_holiday)}
                      </td>
                      <td className="px-6">
                        {/* ND hrs */}
                        {numberWithCommas(item.payroll_list_nd_hrs)}
                      </td>
                      {/* ND rate */}
                      <td className="px-6">{10}%</td>
                      <td className="px-6">
                        {/* ND amount */}
                        {numberWithCommas(
                          item.payroll_list_night_shift_differential
                        )}
                      </td>
                      <td className="px-6">
                        {/* gross pay */}
                        {numberWithCommas(item.payroll_list_gross)}
                      </td>
                    </tr>

                    {getErningsRate(earnings, item).otList?.map((item, key) => {
                      return (
                        <tr
                          className="max-h-[10rem] overflow-y-auto text-right"
                          key={key}
                        >
                          <td colSpan={13} className="px-6"></td>

                          <td className="px-6">
                            {numberWithCommas(item.otHrs)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.otRate)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.otAmount)}
                          </td>
<<<<<<< HEAD
                          <td className="px-6" colSpan={9}></td>
=======
                          <td className="px-6"></td>
                          <td className="px-6">
                            {numberWithCommas(item.holidayHrs)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.holidayRate)}
                          </td>
                          <td className="px-6">
                            {numberWithCommas(item.holidayAmount)}
                          </td>
                          <td className="px-6" colSpan={5}></td>
>>>>>>> 17a6c1d35c01713cff25728db740e30ae00f71c6
                        </tr>
                      );
                    })}
                    {getErningsRate(earnings, item).holidayList?.map(
                      (item, key) => {
                        return (
                          <tr
                            className="max-h-[10rem] overflow-y-auto text-right"
                            key={key}
                          >
                            <td colSpan={17} className="px-6"></td>
                            <td className="px-6">
                              {numberWithCommas(item.holidayHrs)}
                            </td>
                            <td className="px-6">
                              {numberWithCommas(item.holidayRate)}
                            </td>
                            <td className="px-6">
                              {numberWithCommas(item.holidayAmount)}
                            </td>
                            <td className="px-6" colSpan={5}></td>
                          </tr>
                        );
                      }
                    )}
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
