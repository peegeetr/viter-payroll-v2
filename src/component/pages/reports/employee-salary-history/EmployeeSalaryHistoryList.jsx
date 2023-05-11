import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../helpers/FormInputs";
import { devApiUrl, hrisDevApiUrl } from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import SalaryHistoryBody from "./SalaryHistoryBody";
import SalaryHistoryHeader from "./SalaryHistoryHeader";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";

const EmployeeSalaryHistoryList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [employeeId, setEmployee] = React.useState("");

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
    queryKey: ["benefits-summary", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/salary-history/report/filter/${employeeId}`, // filter endpoint
        `${devApiUrl}/v1/salary-history/report/filter/0`, // list endpoint
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
  const handleEmployee = async (e) => {
    let employeeAid = e.target.value;
    setEmployee(employeeAid);
    setFilter(true);
    setSubmit(!isSubmit);
    // get employee id
  };
  const initVal = {
    payroll_employee: "",
  };
  const yupSchema = Yup.object({
    payroll_employee: Yup.string().required("Required"),
  });
  // console.log(result, employeeId);
  return (
    <>
      <div className=" z-0 w-full print:hidden">
        <Formik initialValues={initVal} validationSchema={yupSchema}>
          {(props) => {
            return (
              <Form>
                <div className=" sm:w-[20rem]  pb-4 items-center">
                  <div className="relative">
                    <InputSelect
                      label="Employee"
                      name="payroll_employee"
                      type="name"
                      onChange={handleEmployee}
                      disabled={loadingEmployee || status === "loading"}
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {(status === "loading" || result?.pages[0].data.length === 0) && (
        <div className="text-center relative ">
          <div className="py-8 hover:bg-gray-100">
            {status === "loading" && <TableSpinner />}
            <NoData text="Filter data using above controls." />
          </div>
          <hr />
        </div>
      )}
      {error && (
        <div className="text-center p-10">
          <ServerError />
        </div>
      )}
      {result?.pages.map((page, key) => (
        <React.Fragment key={key}>
          {page.data.map((item, key) => {
            return (
              <div key={key} className="my-10 print:my-0 print:mb-12">
                <SalaryHistoryBody item={item} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
};

export default EmployeeSalaryHistoryList;
