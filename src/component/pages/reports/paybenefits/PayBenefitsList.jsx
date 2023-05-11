import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import {
  devApiUrl,
  formatDate,
  getPayPeriod,
  getUserType,
  hrisDevApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import HeaderPrint from "../../../partials/HeaderPrint";

const PayBenefitsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [employeeId, setEmployee] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const [page, setPage] = React.useState(1);
  let counter = 1;
  const { ref, inView } = useInView();
  let totalSalary = 0;
  let totalSss = 0;
  let totalPag = 0;
  let totalPhic = 0;
  let totalSssLoan = 0;
  let totalPagLoan = 0;
  let totalMp2Loan = 0;
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
    queryKey: ["benefits-summary", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/payrollList/report/employee-benefits/${startDate}/${endDate}/${employeeId}`, // filter endpoint
        `${devApiUrl}/v1/payrollList/report/employee-benefits/${0}/${0}/${0}`, // list endpoint
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
  const { data: employee, isLoading: loadingEmployee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employees", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  const initVal = {
    employee_aid: "",
    start_date: "",
    end_date: "",
  };
  // console.log(employee);
  const yupSchema = Yup.object({
    employee_aid: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  // payroll-type/summary/
  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full print:hidden">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setSubmit(!isSubmit);
            setEmployee(values.employee_aid);
            setStartDate(values.start_date);
            setEndDate(values.end_date);
            // // refetch data of query
            // refetch();
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_1fr_150px] pt-5 pb-4 items-center">
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
                    type="submit"
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
      {/* startDate endDate  */}
      <div className=" print:pt-8">
        <HeaderPrint />
      </div>
      <div className="text-center pb-4 font-bold print:pt-4">
        {startDate !== "" && (
          <>
            <p className="m-0">Employee Benefits</p>
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
              <tr className="text-right">
                <th className="text-left  print:py-[2px]">#</th>
                <th className="text-left min-w-[12rem]  print:py-[2px]">
                  Name
                </th>
                <th className=" print:py-[2px]">&nbsp;</th>
                <th className=" print:py-[2px]">SALARY</th>
                <th className=" print:py-[2px]">SSS</th>
                <th className=" print:py-[2px]">PHIC</th>
                <th className=" print:py-[2px]">PGBG</th>
                <th className=" print:py-[2px]">SSS LOAN</th>
                <th className=" print:py-[2px]">PGBG LOAN</th>
                <th className=" print:py-[2px]">PGBG MP2</th>
              </tr>
            </thead>
            <tbody>
              {(status === "loading" || result?.pages[0].data.length === 0) && (
                <tr className="text-center relative ">
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
                  {page.data.map((item, key) => {
                    totalSalary += Number(item.payroll_list_employee_salary);
                    totalSss += Number(item.sss_ee);
                    totalPag += Number(item.pagibig_ee);
                    totalPhic += Number(item.philhealth_ee);
                    totalPagLoan += Number(item.pagibig_loan);
                    totalSssLoan += Number(item.sss_loan);
                    totalMp2Loan += Number(item.pagibig_mp2);
                    // totalSss += Number(item.payroll_list_sss_ee);
                    // totalPag += Number(item.payroll_list_pagibig_ee);
                    // totalPhic += Number(item.payroll_list_philhealth_ee);
                    // totalPagLoan += Number(item.payroll_list_pagibig_loan);
                    // totalSssLoan += Number(item.payroll_list_sss_loan);
                    // totalMp2Loan += Number(item.payroll_list_pagibig_mp2);
                    return (
                      <tr key={key} className="text-right">
                        <td className="text-left print:py-[2px]">
                          {counter++}.
                        </td>
                        <td colSpan={2} className="text-left print:py-[2px]">
                          {item.payroll_list_employee_name}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(
                            Number(item.payroll_list_employee_salary).toFixed(2)
                          )}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(Number(item.sss_ee))}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(Number(item.philhealth_ee))}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(Number(item.pagibig_ee))}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(Number(item.sss_loan))}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(Number(item.pagibig_loan))}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {numberWithCommas(Number(item.pagibig_mp2))}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
              {status !== "loading" && result?.pages[0].data.length !== 0 && (
                <tr className="font-bold text-right">
                  <td colSpan={3} className="w-[15rem] print:py-[2px]">
                    TOTAL
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalSalary.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalSss.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalPhic.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalPag.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalSssLoan.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalPagLoan.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {numberWithCommas(totalMp2Loan.toFixed(2))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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

export default PayBenefitsList;
