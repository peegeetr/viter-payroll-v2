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
  numberWithCommas,
} from "../../../helpers/functions-general";
import { deMinimisEarningsId } from "../../../helpers/functions-payitemId";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import LoadmoreRq from "../../../partials/LoadmoreRq";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import HeaderPrint from "../../../partials/HeaderPrint";

const SummaryTypeList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [paytype, setPaytype] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [payPeriod, setPayPeriod] = React.useState("");

  const [page, setPage] = React.useState(1);
  let counter = 1;
  const { ref, inView } = useInView();
  let total = 0;
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
        `${devApiUrl}/v1/paytype/report/filter/${paytype}/${category}/${startDate}/${endDate}`, // search endpoint
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
  const { data: payType } = useQueryData(
    `${devApiUrl}/v1/paytype`, // endpoint
    "get", // method
    "payType" // key
  );

  const handleCategory = async (e) => {
    // get employee id
    setCategory(e.target.options[e.target.selectedIndex].id);
  };
  const initVal = {
    paytype_aid: "",
    start_date: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    paytype_aid: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  // payroll-type/summary/
  return (
    <>
      <div className="relative overflow-x-auto z-0 w-full  print:hidden">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFilter(true);
            setSubmit(!isSubmit);
            setPaytype(values.paytype_aid);
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
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_1fr_150px] pt-5 pb-5 items-center">
                  <div className="relative">
                    <InputSelect
                      label="PayType"
                      name="paytype_aid"
                      onChange={handleCategory}
                      type="text"
                      disabled={isFetching}
                    >
                      <option value="" hidden></option>
                      {payType?.data.map((paytype, key) => {
                        return (
                          <option
                            key={key}
                            value={paytype.paytype_aid}
                            id={paytype.paytype_category}
                          >
                            {paytype.paytype_name}
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
      </div>
      <HeaderPrint />
      <div className="text-center pb-4 font-bold print:pt-4">
        {startDate !== "" && (
          <>
            <p className="m-0">Pay Run by Pay Item </p>
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
                <th>#</th>
                <th>Pay Item</th>
                <th>Pay Type</th>
                <th>Employee</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {(status === "loading" || result?.pages[0].data.length === 0) && (
                <tr className="text-center relative">
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
                    total += Number(item.amount);
                    return (
                      <tr key={key}>
                        <td>{counter++}.</td>
                        <td className="w-[15rem]">{item.payitem_name}</td>
                        <td className="w-[15rem]">{item.paytype_name}</td>
                        <td className="w-[15rem]">{item.count}</td>
                        <td className="text-right text-primary ">
                          <Link
                            className="tooltip-action-table"
                            data-tooltip="View"
                            target="_blank"
                            rel="noopener noreferrer"
                            to={
                              item.paytype_category === "earnings"
                                ? `${link}/reports/paytype/view?payrollId=${item.earnings_payroll_id}&payitemId=${item.payitem_aid}`
                                : `${link}/reports/paytype/view?payrollId=${item.deduction_payroll_id}&payitemId=${item.payitem_aid}`
                            }
                          >
                            {numberWithCommas(Number(item.amount).toFixed(2))}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      Total: {numberWithCommas(total.toFixed(2))}
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

export default SummaryTypeList;
