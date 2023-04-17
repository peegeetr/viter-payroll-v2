import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import {
  devApiUrl,
  getPayPeriod,
  getUserType,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import { deMinimisEarningsId } from "../../../helpers/functions-payitemId";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const PayrunSummaryList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [employeeId, setEmployee] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [payPeriod, setPayPeriod] = React.useState("");

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
    queryKey: ["earnings-summary", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${devApiUrl}/v1/paytype/report/filter/${employeeId}/${category}/${startDate}/${endDate}`, // search endpoint
        `${devApiUrl}/v1/paytype/0`, // list endpoint
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
  const { data: payType } = useQueryData(
    `${devApiUrl}/v1/paytype`, // endpoint
    "get", // method
    "payType" // key
  );

  // use if not loadmore button undertime
  const { data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employees" // key
  );
  // const handleCategory = async (e) => {
  //   // get employee id
  //   setCategory(e.target.options[e.target.selectedIndex].id);
  // };
  const initVal = {
    employee_aid: "",
    start_date: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    employee_aid: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  // payroll-type/summary/
  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full lg:w-[45rem] ">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setSubmit(!isSubmit);
            setEmployee(values.employee_aid);
            setStartDate(values.start_date);
            setEndDate(values.end_date);

            setPayPeriod(category);

            // // refetch data of query
            // refetch();
          }}
        >
          {(props) => {
            props.values.deminimis =
              Number(props.values.paytype_aid) === deMinimisEarningsId
                ? deMinimisEarningsId
                : "0";
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
                      <option value="" hidden></option>
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

        {/* startDate endDate  */}
        <div className="text-center">
          {startDate !== "" && (
            <>
              <p className="m-0">PayPeriod:</p>
              <p className="m-0 text-primary font-bold">
                {getPayPeriod(startDate, endDate)}
              </p>
            </>
          )}
        </div>

        <table>
          <tbody>
            <tr className="bg-gray-200 hover:bg-gray-200 text-primary font-bold">
              <td>{counter++}. Lumabas, Cyrene</td>
              <td className="w-[8rem] text-right px-4">Amount</td>
            </tr>
            <tr className="w-[15rem]">
              <td>Basic Pay</td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Overtime Pay</td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Paid Leave</td>
              <td className="w-[8rem] text-right px-4">9,500.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Absences</td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Holiday</td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]">Night Shift Differential</td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem] font-bold">
                Wages Total (De Minimis Inclusive)
              </td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
            <tr>
              <td className="w-[15rem]  font-bold">De Minimis Total</td>
              <td className="w-[8rem] text-right px-4">0.00</td>
            </tr>
          </tbody>
        </table>
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

export default PayrunSummaryList;
