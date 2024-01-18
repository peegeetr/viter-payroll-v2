import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../helpers/FormInputs";
import { devApiUrl, getYearNow } from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import ServerError from "../../../../partials/ServerError";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { getCurrentMonth, getMonth } from "../yearly-tax/functions-wtax";
import WTaxBodyYearly from "./WTaxBodySummary";

const WTaxSummaryList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [month, setMonth] = React.useState(`${getCurrentMonth()}`);
  const [year, setYear] = React.useState(`${getYearNow()}`);

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
        `${devApiUrl}/v1/payrollList/report/wtax/summary/${month}/${year}`, // filter endpoint
        `${devApiUrl}/v1/payrollList/report/wtax/summary/${month}/${year}`, // list endpoint
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

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  // use if not loadmore button monthly tax
  const { data: monthlyTax } = useQueryData(
    `${devApiUrl}/v1/tax/monthly`, // endpoint
    "get", // method
    "monthlyTax" // key
  );

  const initVal = {
    monthSummary: `${getCurrentMonth()}`,
    year: `${getYearNow()}`,
  };

  const yupSchema = Yup.object({
    monthSummary: Yup.string().required("Required"),
    year: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full ">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setMonth(values.monthSummary);
            setFilter(true);
            setSubmit(!isSubmit);
            setYear(values.year);
          }}
        >
          {(props) => {
            // props.values.monthSummary = !isFilter
            //   ? getCurrentMonth()
            //   : props.values.monthSummary;
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr,1fr,10rem] pt-5 pb-5 items-center print:hidden md:min-w-[20rem] md:w-3/4 w-full">
                  <div className="relative">
                    <InputSelect
                      label="Month"
                      name="monthSummary"
                      type="text"
                      disabled={isFetching}
                    >
                      {/* <option value="" hidden>
                        {status === "loading" && "Loading..."}
                      </option> */}
                      {getMonth()?.map((yItem, key) => {
                        // console.log(yItem);
                        return (
                          <option key={key} value={yItem.month_aid}>
                            {`${yItem.month_name}`}
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
                      <option value={getYearNow()}>{getYearNow()}</option>
                      <option value={getYearNow() - 1}>
                        {getYearNow() - 1}
                      </option>
                    </InputSelect>
                  </div>

                  <button
                    className="btn-modal-submit relative"
                    type="submit "
                    disabled={isFetching}
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
        {/* {(status === "loading" || result?.pages[0].data.length === 0) && (
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
        )} */}
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
        <WTaxBodyYearly
          result={result}
          month={month}
          year={year}
          monthlyTax={monthlyTax?.data}
        />
      </div>
    </>
  );
};

export default WTaxSummaryList;
