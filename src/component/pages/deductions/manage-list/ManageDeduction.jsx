import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadDraft from "../../../custom-hooks/useLoadDraft";
import useLoadEmployee from "../../../custom-hooks/useLoadEmployee";
import useLoadPayType from "../../../custom-hooks/useLoadPayType";
import { devApiUrl, hrisDevApiUrl } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import ModalNoPayrollId from "../../earnings/manage-list/ModalNoPayrollId";
import ManageDeductionList from "./ManageDeductionList";
import ModalAddManageDeduction from "./ModalAddManageDeduction";

const ManageDeduction = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const { payType } = useLoadPayType(`${devApiUrl}/v1/paytype`, "get");
  const { draft } = useLoadDraft(`${devApiUrl}/v1/payroll/list`, "get");
  const { employee } = useLoadEmployee(`${hrisDevApiUrl}/v1/employees`, "get");

  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <Header />
      <Navigation menu="deductions" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <ManageDeductionList />
        </div>
        <Footer />
      </div>
      {draft.length > 0 &&
      draft[0].payroll_id !== "" &&
      employee.length > 0 &&
      store.isAdd ? (
        <ModalAddManageDeduction
          payType={payType}
          employee={employee}
          payrollDraft={draft}
        />
      ) : (
        store.isAdd && <ModalNoPayrollId />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default ManageDeduction;
