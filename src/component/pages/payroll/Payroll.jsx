import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useLoadPayrollType from "../../custom-hooks/useLoadPayrollType.jsx";
import { devApiUrl } from "../../helpers/functions-general.jsx";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import ModalError from "../../partials/modals/ModalError";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import Navigation from "../../partials/Navigation";
import ModalAddPayroll from "./ModalAddPayroll";
import PayrollList from "./PayrollList";

const Payroll = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const { payrollType } = useLoadPayrollType(
    `${devApiUrl}/v1/payroll-type`,
    "get"
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="payroll" />
      <div className="wrapper">
        <div className="flex items-center mb-3 justify-between whitespace-nowrap overflow-auto gap-2">
          <h4 className="text-xl">Payroll</h4>
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <PayrollList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddPayroll item={itemEdit} payrollType={payrollType} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Payroll;
