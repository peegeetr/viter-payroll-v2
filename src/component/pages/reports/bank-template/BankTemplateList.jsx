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
import { getBankTemplateList, getNetAmount } from "./functions-bank-template";

const BankTemplateList = ({
  employee,
  loadingEmployee,
  setShow,
  setDataExport,
  setExportDate,
}) => {
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
        `${devApiUrl}/v1/payrollList/report/bank-template/${startDate}/${endDate}`, // filter endpoint
        `${devApiUrl}/v1/payrollList/report/bank-template/${0}/${0}`, // list endpoint
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

  let exportDate = `PBTR ${getPayPeriod(startDate, endDate)}`;

  React.useEffect(() => {
    setDataExport(result?.pages[0].data);
    setExportDate(exportDate);
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView, result]);

  const initVal = {
    start_date: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  console.log("list", getBankTemplateList(employee, result?.pages[0].data));
  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full print:hidden">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setShow(true);
            setSubmit(!isSubmit);
            setStartDate(values.start_date);
            setEndDate(values.end_date);
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] pt-5 pb-4 items-center">
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
            <p className="m-0 text-lg">Payroll Bank Template Report</p>
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
                <th className="">#</th>
                <th className="!w-[10rem] min-w-[8rem] print:py-[2px]">
                  Account no.
                </th>
                <th className="!w-[10rem] min-w-[12rem] print:py-[2px]">
                  Last Name
                </th>
                <th className="!w-[10rem] min-w-[12rem] print:py-[2px]">
                  First Name
                </th>
                <th className="!w-[10rem] min-w-[10rem] print:py-[2px]">
                  Middle Name
                </th>
                <th className="text-right print:py-[2px]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
              )}
              {(status === "loading" && loadingEmployee) ||
              (result?.pages[0].data.length === 0 && employee?.data.length) ? (
                <tr className="text-center relative ">
                  <td colSpan="100%" className="p-10">
                    {status === "loading" && <TableSpinner />}
                    <NoData text="Filter data using above controls." />
                  </td>
                </tr>
              ) : (
                employee?.data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className="print:py-[2px]">{counter++}.</td>
                      <td className="print:py-[2px]">
                        {item.employee_job_number}
                      </td>
                      <td className="print:py-[2px]">{item.employee_lname}</td>
                      <td className="print:py-[2px]">{item.employee_fname}</td>
                      <td className="print:py-[2px]">{item.employee_mname}</td>
                      <td className="text-right print:py-[2px]">
                        {pesoSign}
                        {numberWithCommas(getNetAmount(item, result?.pages[0]))}
                      </td>
                    </tr>
                  );
                })
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

export default BankTemplateList;
