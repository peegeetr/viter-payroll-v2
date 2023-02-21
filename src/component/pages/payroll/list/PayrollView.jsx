import React from "react";
import { FaEnvelope, FaSave } from "react-icons/fa";
import { ImPlay3 } from "react-icons/im";
import { setIsAdd, setIsConfirm } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadPayrollEarnings from "../../../custom-hooks/useLoadPayrollEarnings";
import useLoadPayrollList from "../../../custom-hooks/useLoadPayrollList";
import { devApiUrl, getUrlParam } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalRun from "../../../partials/modals/ModalRun";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import ModalAddPayroll from "../ModalAddPayroll";
import PayrollViewList from "./PayrollViewList";

const PayrollView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const pid = getUrlParam().get("payrollid");

  const { payrollList } = useLoadPayrollList(
    `${devApiUrl}/v1/payrollList/${pid}`,
    "get"
  );
  const { payrollEarnings } = useLoadPayrollEarnings(
    `${devApiUrl}/v1/earnings/bypayrollId/${pid}`,
    "get"
  );

  console.log(payrollEarnings, payrollList);

  const handleRun = () => {
    dispatch(setIsConfirm(true));
  };

  return (
    <>
      <Header />
      <Navigation menu="payroll" />
      <div className="wrapper">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary">
              <FaEnvelope />
              <span>Email All</span>
            </button>
            <button type="button" className="btn-primary" onClick={handleRun}>
              <ImPlay3 />
              <span>Run</span>
            </button>
            <button type="button" className="btn-primary">
              <FaSave />
              <span>Mark Paid</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-2 pb-20">
          <PayrollViewList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isConfirm && (
        <ModalRun
          item={pid}
          employees={payrollList}
          payrollEarnings={payrollEarnings}
        />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PayrollView;
