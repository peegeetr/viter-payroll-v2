import React from "react";
import { FaEnvelope, FaSave } from "react-icons/fa";
import { ImPlay3 } from "react-icons/im";
import { setIsConfirm } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl, getUrlParam } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalRun from "../../../partials/modals/ModalRun";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import PayrollViewList from "./PayrollViewList";

const PayrollView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isPaid, setIsPaid] = React.useState(false);
  const pid = getUrlParam().get("payrollid");

  // use if not loadmore button undertime
  const { data: sssBracket } = useQueryData(
    `${devApiUrl}/v1/sss-bracket`, // endpoint
    "get", // method
    "sss-bracket" // key
  );

  // use if not loadmore button undertime
  const {
    data: payrollList,
    isLoading,
    error,
  } = useQueryData(
    `${devApiUrl}/v1/payrollList/${pid}`, // endpoint
    "get", // method
    "payrollList" // key
  );
  // use if not loadmore button undertime
  const { data: payrollEarnings } = useQueryData(
    `${devApiUrl}/v1/earnings`, // endpoint
    "get", // method
    "payrollEarnings" // key
  );

  // use if not loadmore button undertime
  const { data: payrollDeductions } = useQueryData(
    `${devApiUrl}/v1/deductions`, // endpoint
    "get", // method
    "payrollDeductions" // key
  );

  // use if not loadmore button undertime
  const { data: holidays } = useQueryData(
    `${devApiUrl}/v1/holidays`, // endpoint
    "get", // method
    "holidays" // key
  );

  // use if not loadmore button undertime
  const { data: semiMonthly } = useQueryData(
    `${devApiUrl}/v1/tax/semi-monthly`, // endpoint
    "get", // method
    "semiMonthly" // key
  );

  // use if not loadmore button undertime
  const { data: pagibig } = useQueryData(
    `${devApiUrl}/v1/pagibig`, // endpoint
    "get", // method
    "pagibig" // key
  );
  // use if not loadmore button undertime
  const { data: philhealth } = useQueryData(
    `${devApiUrl}/v1/philhealth`, // endpoint
    "get", // method
    "philhealth" // key
  );

  const handleRun = () => {
    setIsPaid(true);
    dispatch(setIsConfirm(true));
  };

  const handleMarkPaid = () => {
    setIsPaid(false);
    dispatch(setIsConfirm(true));
  };
  return (
    <>
      <Header />
      <Navigation menu="payroll" />
      <div className="wrapper">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />
          <div className="flex items-center gap-1">
            {isLoading && <FetchingSpinner />}
            {payrollList?.data[0].payroll_list_is_paid === 1 ? (
              <>
                <button type="button" className="btn-primary">
                  <FaEnvelope />
                  <span>Email All</span>
                </button>{" "}
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleRun}
                >
                  <ImPlay3 />
                  <span>Run</span>
                </button>
                {payrollList?.data[0].payroll_list_gross !== "" && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleMarkPaid}
                  >
                    <FaSave />
                    <span>Mark Paid</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <hr />

        <div className="w-full pt-2 pb-20">
          {/* {payrollList?.data.length > 0 ? <PayrollViewList /> : <NoData />} */}
          {payrollList?.data.length > 0 && <PayrollViewList />}
          {/* <PayrollViewList /> */}
        </div>

        {error && <ServerError />}

        <Footer />
      </div>

      {store.isConfirm && (
        <ModalRun
          pid={pid}
          isPaid={isPaid}
          employees={payrollList?.data}
          payrollEarnings={payrollEarnings?.data}
          payrollDeductions={payrollDeductions?.data}
          holidays={holidays?.data}
          sssBracket={sssBracket?.data}
          semiTax={semiMonthly?.data}
          pagibig={pagibig?.data}
          philhealth={philhealth?.data}
          // monthlyTax={monthlyTax?.data}
        />
      )}

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PayrollView;
