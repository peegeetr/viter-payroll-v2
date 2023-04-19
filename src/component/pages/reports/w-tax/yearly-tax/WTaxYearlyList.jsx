import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  hrisDevApiUrl,
} from "../../../../helpers/functions-general";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import WTaxBodyYearly from "./WTaxBodyYearly";
import { getYear } from "./functions-wtax";

const WTaxYearlyList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [employeeId, setEmployee] = React.useState("");
  const [year, setYear] = React.useState("");

  const [page, setPage] = React.useState(1);
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
    queryKey: ["earnings-summary", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/payrollList/report/wtax/yearly/${year}/${employeeId}`, // filter endpoint
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
    year: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    employee_aid: Yup.string().required("Required"),
    year: Yup.string().required("Required"),
  });
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
            setYear(values.year);
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] pt-5 pb-5 items-center print:hidden">
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
                      label="Year"
                      name="year"
                      type="text"
                      disabled={isFetching}
                    >
                      <option value="" hidden></option>
                      <option value="0">All</option>
                      {getYear()?.map((yItem, key) => {
                        return (
                          <option key={key} value={yItem.year}>
                            {`${yItem.year}`}
                          </option>
                        );
                      })}
                    </InputSelect>
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
        {(status === "loading" || result?.pages[0].data.length === 0) && (
          <table>
            <tbody>
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {status === "loading" && <TableSpinner />}
                  <NoData text="Filter data using above controls." />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {error && (
          <table>
            <tbody>
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <WTaxBodyYearly result={result} year={year} employeeId={employeeId} />
      </div>
    </>
  );
};

export default WTaxYearlyList;
