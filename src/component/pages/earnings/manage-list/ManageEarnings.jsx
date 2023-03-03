import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadDraft from "../../../custom-hooks/useLoadDraft";
import useLoadEmployee from "../../../custom-hooks/useLoadEmployee";
import useLoadHolidays from "../../../custom-hooks/useLoadHolidays";
import useLoadPayType from "../../../custom-hooks/useLoadPayType";
import { devApiUrl, hrisDevApiUrl } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import ManageEarningsList from "./ManageEarningsList";
import ModalAddManageEarnings from "./ModalAddManageEarnings";
import ModalNoPayrollId from "./ModalNoPayrollId";

const ManageEarnings = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const { payType } = useLoadPayType(`${devApiUrl}/v1/paytype`, "get");
  const { draft } = useLoadDraft(`${devApiUrl}/v1/payroll/list`, "get");
  const { employee } = useLoadEmployee(`${hrisDevApiUrl}/v1/employees`, "get");
  const { holidays } = useLoadHolidays(`${devApiUrl}/v1/holidays`, "get");

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    // dispatch(setIsFinish(true));
  };

  return (
    <>
      <Header />
      <Navigation menu="earnings" />
      <div className="wrapper">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn-primary"
              onClick={() => handleAdd()}
            >
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <ManageEarningsList />
        </div>
        <Footer />
      </div>
      {draft.length > 0 &&
      draft[0].payroll_id !== "" &&
      employee.length > 0 &&
      store.isAdd ? (
        <ModalAddManageEarnings
          payType={payType}
          employee={employee}
          payrollDraft={draft}
          holidays={holidays}
        />
      ) : (
        store.isAdd && <ModalNoPayrollId />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default ManageEarnings;
