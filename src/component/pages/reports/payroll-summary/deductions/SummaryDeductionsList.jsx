import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText } from "../../../../helpers/FormInputs";
import {
  devApiUrl,
  getPayPeriod,
  getUserType,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../../partials/LoadmoreRq";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";

const SummaryDeductionsList = () => {
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

  // // use if not loadmore button undertime
  // const { data: job } = useQueryData(
  //   `${hrisDevApiUrl}/v1/employees/job`, // endpoint
  //   "get", // method
  //   "department" // key
  // );

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
      <div className="relative text-center">
        <div className=" overflow-x-auto z-0">
          <table>
            <thead>
              <tr className="border-none text-center">
                <th className="text-center" rowSpan="2">
                  #
                </th>
                <th className="min-w-[18rem]" rowSpan="2">
                  Name
                </th>
                <th className="table-border min-w-[12rem]" rowSpan="2">
                  Department
                </th>
                <th className="table-border min-w-[12rem]" rowSpan="2">
                  Pay Date
                </th>
                <th className="table-border-center min-w-[8rem]" colSpan="2">
                  SSS
                </th>
                <th className="table-border-center min-w-[8rem]" colSpan="2">
                  Phil. Health
                </th>
                <th className="table-border-center min-w-[5rem]" colSpan="2">
                  Pag-ibig
                </th>
                <th className="table-border-center min-w-[5rem]" colSpan="2">
                  Loans
                </th>
                <th className="table-border min-w-[10rem]" rowSpan="2">
                  With Holding TAX
                </th>
                <th className="table-border min-w-[6rem]" rowSpan="2">
                  PGBG MP2
                </th>
                <th className="table-border min-w-[10rem]" rowSpan="2">
                  Other Deductions
                </th>
                <th
                  className="text-center table-border border-b-[1px] min-w-[5rem]"
                  rowSpan="2"
                >
                  Total EE
                </th>
                <th className=" table-border min-w-[10rem]" rowSpan="2">
                  Total Deductions
                </th>
                <th className="min-w-[5rem] table-border" rowSpan="2">
                  Net Pay
                </th>
              </tr>
              <tr className="text-center">
                <th className="table-border">ER</th>
                <th className="table-border">EE</th>
                <th className="table-border">ER</th>
                <th className="table-border">EE</th>
                <th className="table-border">ER</th>
                <th className="table-border">EE</th>
                <th className="table-border">SSS</th>
                <th className="table-border">PGBG</th>
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
                  {page.data.map((item, key) => (
                    <tr key={key} className="text-right">
                      <td className="text-center">{counter++}.</td>

                      <td className="text-left">
                        {item.payroll_list_employee_name}
                      </td>
                      <td className="text-left">
                        {/* {getDepartment(item.payroll_list_employee_id, job)} */}
                      </td>
                      <td className="text-center">{`${getPayPeriod(
                        result?.pages[0].data[0].payroll_start_date,
                        result?.pages[0].data[0].payroll_end_date
                      )}`}</td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_er)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_philhealth_er)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_philhealth_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_pagibig_er)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_pagibig_ee)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_sss_loan)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_tax)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_pagibig_mp2)}
                      </td>
                      <td className="px-6">
                        {numberWithCommas(item.payroll_list_other_deduction)}
                      </td>
                      <td className="px-6">{numberWithCommas(0.0)}</td>
                      <td className="px-6">{numberWithCommas(0.0)}</td>
                      <td className="px-6">{numberWithCommas(0.0)}</td>
                      <td className="px-6">{numberWithCommas(0.0)}</td>
                    </tr>
                  ))}
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
    </>
  );
};

export default SummaryDeductionsList;
