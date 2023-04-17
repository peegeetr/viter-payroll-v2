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
import ModalViewDetails from "./ModalViewDetails";
import { setIsAdd } from "../../../../../store/StoreAction";
import { employeeRate } from "../../../../helpers/payroll-formula";

const SummaryEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isView, setIsView] = React.useState(false);
  const [item, setItem] = React.useState(null);
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

  const handleOt = (item) => {
    dispatch(setIsAdd(true));
    setIsView(false);
    setItem(item);
  };
  const handleHoliday = (item) => {
    dispatch(setIsAdd(true));
    setIsView(true);
    setItem(item);
  };
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

  const getRegularWorkHrs = (item) => {
    const totalHrs = Number(
      getWorkingDays(
        new Date(item.payroll_start_date),
        new Date(item.payroll_end_date)
      ) * 8
    );
    const absences = Number(item.payroll_list_absences_hrs);
    return totalHrs - absences;
  };

  const getTotalRegWage = (item) => {
    const total =
      getRegularWorkHrs(item) * getEmployeeRate(item) +
      Number(item.payroll_list_adjustment_pay);
    return numberWithCommas(total.toFixed(2));
  };

  const getEmployeeRate = (item) => {
    return Number(
      employeeRate(
        item.payroll_list_employee_salary,
        getWorkingDays(
          new Date(item.payroll_start_date),
          new Date(item.payroll_end_date)
        )
      ).hourly
    ).toFixed(4);
  };

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
                <th className="table-border min-w-[6rem]" rowSpan="2">
                  Rate
                </th>
                <th className="table-border  min-w-[9rem]" rowSpan="2">
                  Total Reg Wage
                </th>
                <th className="table-border-center min-w-[12rem]" colSpan="3">
                  Leave
                </th>
                <th className="table-border-center ">Overtime</th>
                <th className="table-border-center ">Holiday</th>
                <th className="table-border-center min-w-[12rem]" colSpan="3">
                  Night Differential
                </th>
                <th className="min-w-[7rem]" rowSpan="2">
                  Gross Pay
                </th>
              </tr>
              <tr className="text-center sticky top-[35px] ">
                <th className="table-border">Hrs</th>
                <th className="table-border">Rate</th>
                <th className="table-border">Amount</th>
                <th className="table-border min-w-[8rem]">Total Amount</th>
                <th className="table-border min-w-[8rem]">Total Amount</th>
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
                      <td className="pr-6">
                        {numberWithCommas(
                          (Number(item.payroll_list_basic_pay) * 2).toFixed(2)
                        )}
                      </td>
                      <td className="text-right pr-4">
                        {numberWithCommas(item.payroll_list_adjustment_pay)}
                      </td>
                      <td className="text-right pr-4">
                        {numberWithCommas(
                          (
                            Number(item.payroll_list_basic_pay) * 2 +
                            Number(item.payroll_list_adjustment_pay)
                          ).toFixed(2)
                        )}
                      </td>
                      <td className="text-center pr-4">
                        {getRegularWorkHrs(item)}
                      </td>
                      <td className="text-right pr-4">
                        {getEmployeeRate(item)}
                      </td>
                      <td className="text-right pr-4">
                        {getTotalRegWage(item)}
                      </td>
                      <td className="text-center">
                        {/* leave hrs */}
                        {numberWithCommas(item.payroll_list_leave_hrs)}
                      </td>
                      <td className="text-center">
                        {/* leave rate */}
                        100%
                      </td>
                      <td className="text-right pr-4">
                        {/* leave pay */}
                        {numberWithCommas(item.payroll_list_leave_pay)}
                      </td>

                      {/* total overtime amount */}
                      {numberWithCommas(item.payroll_list_overtime_pay) !==
                      "0.00" ? (
                        <td className="pr-6 text-primary underline">
                          <span
                            className="cursor-pointer tooltip-action-table !p-0"
                            data-tooltip="View Deatils"
                            onClick={() => handleOt(item)}
                          >
                            {numberWithCommas(item.payroll_list_overtime_pay)}
                          </span>
                        </td>
                      ) : (
                        <td className="pr-4">
                          {numberWithCommas(item.payroll_list_overtime_pay)}
                        </td>
                      )}

                      {/* total holiday amount */}
                      {numberWithCommas(item.payroll_list_holiday) !==
                      "0.00" ? (
                        <td className="pr-4 text-primary underline">
                          <span
                            className="cursor-pointer tooltip-action-table !p-0"
                            data-tooltip="View Deatils"
                            onClick={() => handleHoliday(item)}
                          >
                            {numberWithCommas(item.payroll_list_holiday)}
                          </span>
                        </td>
                      ) : (
                        <td className="pr-4">
                          {numberWithCommas(item.payroll_list_holiday)}
                        </td>
                      )}
                      <td className="text-center">
                        {/* ND hrs */}
                        {numberWithCommas(item.payroll_list_nd_hrs)}
                      </td>
                      {/* ND rate */}
                      <td className="text-center">
                        {/* {item.payroll_list_night_diff_per_day === 0
                          ? "0"
                          : "10%"} */}
                        10%
                      </td>
                      <td className="pr-4">
                        {/* ND amount */}
                        {numberWithCommas(
                          item.payroll_list_night_shift_differential
                        )}
                      </td>
                      <td className="text-right pr-4">
                        {/* gross pay */}
                        {numberWithCommas(item.payroll_list_gross)}
                      </td>
                    </tr>
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
      {store.isAdd && (
        <ModalViewDetails item={item} isView={isView} earnings={earnings} />
      )}
    </>
  );
};

export default SummaryEarningsList;
