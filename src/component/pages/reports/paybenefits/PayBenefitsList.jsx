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
  pesoSign,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import HeaderPrint from "../../../partials/HeaderPrint";
import {
  getCurrentMonth,
  getMonth,
  getMonthName,
} from "../w-tax/yearly-tax/functions-wtax";

const PayBenefitsList = () => {
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [month, setMonth] = React.useState("");
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

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
        `${devApiUrl}/v1/payrollList/report/employee-benefits`, // filter endpoint
        `${devApiUrl}/v1/payrollList/report/employee-benefits`, // list endpoint
        isFilter, // search boolean
        "post",
        { value },
        true
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
  const { data: employee, isLoading: loadingEmployee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employees", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  const initVal = {
    employee_aid: "0",
    month: `${getCurrentMonth()}`,
  };
  // console.log(employee);
  const yupSchema = Yup.object({
    employee_aid: Yup.string().required("Required"),
    month: Yup.string().required("Required"),
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
            setValue(values);
            setMonth(values.month);
            // // refetch data of query
            // refetch();
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] pt-5 pb-4 items-center">
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
                    <InputSelect
                      label="Month"
                      name="month"
                      type="text"
                      disabled={isFetching}
                    >
                      <option value="" hidden>
                        {status === "loading" && "Loading..."}
                      </option>
                      {getMonth()?.map((yItem, key) => {
                        return (
                          <option key={key} value={yItem.month_aid}>
                            {`${yItem.month_name}`}
                          </option>
                        );
                      })}
                    </InputSelect>
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
        <>
          <p className="m-0  text-lg">Employee Benefits</p>
          <p className="m-0 text-primary font-bold">
            {/* {getPayPeriod(startDate, endDate)} */}
            {`${getMonthName(
              month === "" ? getCurrentMonth() : month
            )} - ${getCurrentYear()}`}
          </p>
        </>
      </div>
      <div className="text-center">
        <div className="overflow-x-auto ">
          <table>
            <thead>
              <tr className="text-right">
                <th className="text-left  print:py-[2px]">#</th>
                <th className="text-left min-w-[12rem] capitalize print:py-[2px]">
                  Name
                </th>
                <th className=" print:py-[2px]">&nbsp;</th>
                {/* <th className=" print:py-[2px]">SALARY</th> */}
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
                    totalSss += Number(item.sss_ee) + Number(item.sss_er);
                    totalPag +=
                      Number(item.pagibig_ee) + Number(item.pagibig_er);
                    totalPhic +=
                      Number(item.philhealth_ee) + Number(item.philhealth_er);
                    totalPagLoan += Number(item.pagibig_loan);
                    totalSssLoan += Number(item.sss_loan);
                    totalMp2Loan += Number(item.pagibig_mp2);
                    return (
                      <tr key={key} className="text-right">
                        <td className="text-left print:py-[2px]">
                          {counter++}.
                        </td>
                        <td colSpan={2} className="text-left print:py-[2px]">
                          {item.payroll_list_employee_name}
                        </td>
                        {/* <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {numberWithCommas(
                            Number(item.payroll_list_employee_salary).toFixed(2)
                          )}
                        </td> */}
                        <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {numberWithCommas(
                            (Number(item.sss_ee) + Number(item.sss_er)).toFixed(
                              2
                            )
                          )}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {/* {numberWithCommas(
                            Number(item.philhealth_ee).toFixed(2)
                          )} */}
                          {numberWithCommas(
                            (
                              Number(item.philhealth_ee) +
                              Number(item.philhealth_er)
                            ).toFixed(2)
                          )}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {/* {numberWithCommas(Number(item.pagibig_ee).toFixed(2))} */}
                          {numberWithCommas(
                            (
                              Number(item.pagibig_ee) + Number(item.pagibig_er)
                            ).toFixed(2)
                          )}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {numberWithCommas(Number(item.sss_loan).toFixed(2))}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {numberWithCommas(
                            Number(item.pagibig_loan).toFixed(2)
                          )}
                        </td>
                        <td className="w-[15rem] print:py-[2px]">
                          {pesoSign}
                          {numberWithCommas(
                            Number(item.pagibig_mp2).toFixed(2)
                          )}
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
                  {/* <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
                    {numberWithCommas(totalSalary.toFixed(2))}
                  </td> */}
                  <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
                    {numberWithCommas(totalSss.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
                    {numberWithCommas(totalPhic.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
                    {numberWithCommas(totalPag.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
                    {numberWithCommas(totalSssLoan.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
                    {numberWithCommas(totalPagLoan.toFixed(2))}
                  </td>
                  <td className="w-[15rem] print:py-[2px]">
                    {pesoSign}
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
