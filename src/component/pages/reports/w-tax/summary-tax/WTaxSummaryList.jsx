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
import WTaxBodyYearly from "./WTaxBodySummary";
import {
  getCurrentYear,
  getMonth,
  getYear,
} from "../yearly-tax/functions-wtax";

const WTaxSummaryList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [monthFrom, setMonthFrom] = React.useState("");
  const [monthTo, setMonthTo] = React.useState("");

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
        `${devApiUrl}/v1/payrollList/report/wtax/summary/${monthFrom}/${monthTo}`, // filter endpoint
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
  // console.log(result);

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

  // use if not loadmore button monthly tax
  const { data: yearlyTax } = useQueryData(
    `${devApiUrl}/v1/tax/bracket-yearly`, // endpoint
    "get", // method
    "yearlyTax" // key
  );

  // use if not loadmore button monthly tax
  const { data: monthlyGross } = useQueryData(
    `${devApiUrl}/v1/payrollList/report/wtax/monthly-gross/${getCurrentYear()}`, // endpoint
    "get", // method
    "monthlyGross", // key
    {},
    `${getCurrentYear()}`
  );

  const initVal = {
    month_from: "",
    month_to: "",
  };

  const yupSchema = Yup.object({
    month_from: Yup.string().required("Required"),
    month_to: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full  ">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            setFilter(true);
            setSubmit(!isSubmit);
            setMonthFrom(values.month_from);
            setMonthTo(values.month_to);
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] pt-5 pb-5 items-center print:hidden md:w-1/2 md:min-w-[40rem]">
                  <div className="relative">
                    <InputSelect
                      label="Month From"
                      name="month_from"
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

                  <div className="relative">
                    <InputSelect
                      label="Month To"
                      name="month_to"
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
        <WTaxBodyYearly
          result={result}
          monthFrom={monthFrom}
          monthTo={monthTo}
          monthlyTax={monthlyTax?.data}
          yearlyTax={yearlyTax?.data}
          monthlyGross={monthlyGross?.data}
        />
      </div>
    </>
  );
};

export default WTaxSummaryList;
