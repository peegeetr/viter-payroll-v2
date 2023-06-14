import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import {
  devApiUrl,
  getPayPeriod,
  getUserType,
  getWorkingDays,
  hrisDevApiUrl,
  numberWithCommas,
  pesoSign,
  showTips,
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
import { payrollCategorySalaryId } from "../../../../helpers/functions-payroll-category-id";

const SummaryEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isView, setIsView] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [employeeId, setEmployee] = React.useState("");

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
        `${devApiUrl}/v1/payrollList/report/filter/${startDate}/${endDate}/${payrollCategorySalaryId}/${employeeId}`, // search endpoint
        `${devApiUrl}/v1/payrollList/report/summary/${pageParam}/${payrollCategorySalaryId}`, // list endpoint
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

  // console.log(result);

  // use if not loadmore button undertime
  const { data: earnings } = useQueryData(
    `${devApiUrl}/v1/earnings`, // endpoint
    "get", // method
    "earnings-summary" // key
  );

  const initVal = {
    employee_aid: "",
    payStart_date: "",
    payEnd_date: "",
  };

  const yupSchema = Yup.object({
    payStart_date: Yup.string().required("Required"),
    payEnd_date: Yup.string().required("Required"),
    employee_aid: Yup.string().required("Required"),
  });

  // use if not loadmore button undertime
  const { data: employee, isLoading: loadingEmployee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employees", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
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
      <div className="relative overflow-x-auto z-0 w-full  ">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setSubmit(!isSubmit);
            setEmployee(values.employee_aid);
            setStartDate(values.payStart_date);
            setEndDate(values.payEnd_date);
            // // refetch data of query
            // refetch();
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_1fr_150px] pt-5 pb-10 items-center">
                  <div className="relative">
                    <InputSelect
                      label="Employee"
                      name="employee_aid"
                      type="text"
                      disabled={isFetching}
                    >
                      <option value="" hidden>
                        {loadingEmployee && "Loading..."}
                      </option>
                      <option value="0">All</option>
                      {employee?.data.map((eItem, key) => {
                        return (
                          <option key={key} value={eItem.employee_aid}>
                            {`${eItem.employee_lname}, ${eItem.employee_fname}`}
                          </option>
                        );
                      })}
                    </InputSelect>
                  </div>
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
            <thead className="relative z-[9]">
              <tr className="text-center sticky top-0">
                <th className="text-center" rowSpan="2">
                  #
                </th>
                <th
                  className="table-border border-white min-w-[12rem] text-left"
                  rowSpan="2"
                >
                  Name
                </th>
                <th
                  className="table-border border-white relative min-w-[13rem] text-center"
                  rowSpan="2"
                >
                  Department
                </th>
                <th
                  className="table-border border-white min-w-[12rem]"
                  rowSpan="2"
                >
                  Pay Date
                </th>
                <th
                  className="table-border border-white min-w-[10rem]"
                  rowSpan="2"
                >
                  Monthly Basic Pay
                </th>
                <th
                  className="table-border border-white min-w-[8rem]"
                  rowSpan="2"
                >
                  Additional pay
                </th>
                <th
                  className="table-border border-white min-w-[10rem]"
                  rowSpan="2"
                >
                  Total Pay
                </th>
                <th
                  className="table-border border-white min-w-[11rem]"
                  rowSpan="2"
                >
                  Regular Work Hours
                </th>
                <th
                  className="table-border border-white min-w-[8rem]"
                  rowSpan="2"
                >
                  Rate
                </th>
                <th
                  className="table-border border-white min-w-[9rem]"
                  rowSpan="2"
                >
                  Total Reg Wage
                </th>
                <th
                  className="table-border-center min-w-[12rem] border-white"
                  colSpan="3"
                >
                  Leave
                </th>
                <th className="table-border-center  border-white">Overtime</th>
                <th className="table-border-center  border-white">Holiday</th>
                <th
                  className="table-border-center border-white min-w-[12rem]"
                  colSpan="3"
                >
                  Night Differential
                </th>
                <th className="min-w-[9rem] border-white" rowSpan="2">
                  Gross Pay
                </th>
              </tr>
              <tr className="text-center sticky top-[35px] ">
                <th className="table-border border-white">Hrs</th>
                <th className="table-border border-white">Rate</th>
                <th className="table-border border-white min-w-[8rem]">
                  Amount
                </th>
                <th className="table-border min-w-[8rem] border-white ">
                  Total Amount
                </th>
                <th className="table-border min-w-[8rem] border-white">
                  Total Amount
                </th>
                <th className="table-border border-white">Hrs</th>
                <th className="table-border border-white">Rate</th>
                <th className="table-border border-white min-w-[8rem]">
                  Amount
                </th>
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
                      <td className="text-right pr-4">{`${getPayPeriod(
                        item.payroll_start_date,
                        item.payroll_end_date
                      )}`}</td>
                      <td
                        className="!pr-6 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
                        {numberWithCommas(
                          (Number(item.payroll_list_basic_pay) * 2).toFixed(2)
                        )}
                      </td>
                      <td
                        className="text-right !pr-4 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
                        {numberWithCommas(item.payroll_list_adjustment_pay)}
                      </td>
                      <td
                        className="text-right !pr-4 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
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
                      <td
                        className="text-right !pr-4 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
                        {getEmployeeRate(item)}
                      </td>
                      <td
                        className="text-right !pr-4 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
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
                      <td
                        className="text-right !pr-4 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
                        {/* leave pay */}
                        {numberWithCommas(item.payroll_list_leave_pay)}
                      </td>

                      {/* total overtime amount */}
                      {numberWithCommas(item.payroll_list_overtime_pay) !==
                      "0.00" ? (
                        <td className="pr-6 text-primary ">
                          <span
                            className="cursor-pointer tooltip-action-table !p-0"
                            data-tooltip="View Deatils"
                            onClick={() => handleOt(item)}
                          >
                            {pesoSign}
                            {numberWithCommas(item.payroll_list_overtime_pay)}
                          </span>
                        </td>
                      ) : (
                        <td
                          className="!pr-4 tooltip-action-table "
                          data-tooltip={showTips(item)}
                        >
                          {pesoSign}
                          {numberWithCommas(item.payroll_list_overtime_pay)}
                        </td>
                      )}

                      {/* total holiday amount */}
                      {numberWithCommas(item.payroll_list_holiday) !==
                      "0.00" ? (
                        <td className="pr-4 text-primary ">
                          <span
                            className="cursor-pointer tooltip-action-table !p-0"
                            data-tooltip="View Deatils"
                            onClick={() => handleHoliday(item)}
                          >
                            {pesoSign}
                            {numberWithCommas(item.payroll_list_holiday)}
                          </span>
                        </td>
                      ) : (
                        <td
                          className="!pr-4 tooltip-action-table "
                          data-tooltip={showTips(item)}
                        >
                          {pesoSign}
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
                        110%
                      </td>
                      <td
                        className="!pr-4 tooltip-action-table"
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
                        {/* ND amount */}
                        {numberWithCommas(
                          item.payroll_list_night_shift_differential
                        )}
                      </td>
                      <td
                        className="text-right !pr-4 tooltip-action-table "
                        data-tooltip={showTips(item)}
                      >
                        {pesoSign}
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
