import React from "react";
import { FaEnvelope, FaSave } from "react-icons/fa";
import { ImPlay3 } from "react-icons/im";
import { setIsAdd, setIsConfirm } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getUrlParam,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ServerError from "../../../partials/ServerError";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import ModalNoSssBracket from "./ModalNoSssBracket";
import PayrollViewList from "./PayrollViewList";
import ModalRun from "../../../partials/modals/ModalRun";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
  payrollCategorySalaryId,
} from "../../../helpers/functions-payroll-category-id";
import ModalPayslipEmailAll from "./ModalPayslipEmailAll";
import NoData from "../../../partials/NoData";

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

  let categoryId =
    payrollList?.data.length > 0
      ? payrollList?.data[0].payroll_category_type
      : "0";

  // use if not loadmore button undertime
  const { data: employeesInstallment } = useQueryData(
    `${devApiUrl}/v1/employees-installment/all-pending`, // endpoint
    "get", // method
    "employeesInstallment" // key
  );
  // use if not loadmore button undertime
  const { data: category13thMonth } = useQueryData(
    `${devApiUrl}/v1/payrollList/category/13month/${payrollCategorySalaryId}`, // endpoint
    "get", // method
    "category13thMonth" // key
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

  // use if not loadmore button monthly tax
  const { data: yearlyTax } = useQueryData(
    `${devApiUrl}/v1/tax/bracket-yearly`, // endpoint
    "get", // method
    "yearlyTax" // key
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

  // use if not loadmore button undertime
  const { data: holidayExemptions } = useQueryData(
    `${devApiUrl}/v1/holiday-exemptions`, // endpoint
    "get", // method
    "holiday-exemptions" // key
  );

  // console.log(payrollList, holidayExemptions);

  const handleEmailAll = () => {
    dispatch(setIsAdd(true));
  };

  const handleRun = () => {
    setIsPaid(false);
    dispatch(setIsConfirm(true));
  };

  const handleMarkPaid = () => {
    setIsPaid(true);
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
            {payrollList?.data.length > 0 && (
              <>
                {payrollList?.data[0].payroll_list_is_paid === 1 && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleEmailAll}
                  >
                    <FaEnvelope />
                    <span>Email All</span>
                  </button>
                )}

                {payrollList?.data[0].payroll_list_is_paid === 0 && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleRun}
                  >
                    <ImPlay3 />
                    <span>Run</span>
                  </button>
                )}

                {payrollList?.data[0].payroll_list_is_paid === 0 &&
                  payrollList?.data[0].payroll_list_gross !== "" && (
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
          {payrollList?.data.length > 0 ? <PayrollViewList /> : <NoData />}
          {/* {payrollList?.data.length > 0 && <PayrollViewList />} */}
          {/* <PayrollViewList /> */}
        </div>

        {error && <ServerError />}

        <Footer />
      </div>
      {sssBracket?.data.length > 0
        ? store.isConfirm && (
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
              category13thMonth={category13thMonth?.data}
              categoryId={categoryId}
              yearlyTax={yearlyTax?.data}
              holidayExemptions={holidayExemptions?.data}
              employeesInstallment={employeesInstallment?.data}
            />
          )
        : store.isConfirm && <ModalNoSssBracket />}

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
      {store.isAdd && <ModalPayslipEmailAll payrollList={payrollList?.data} />}
    </>
  );
};

export default PayrollView;
