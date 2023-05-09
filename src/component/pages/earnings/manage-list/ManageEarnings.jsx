import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl, hrisDevApiUrl } from "../../../helpers/functions-general";
import { payrollCategory13thMonthId } from "../../../helpers/functions-payroll-category-id";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ManageEarningsList from "./ManageEarningsList";
import ModalAddManageEarnings from "./ModalAddManageEarnings";
import ModalNoPayrollId from "./ModalNoPayrollId";

const ManageEarnings = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  // use if not loadmore button undertime
  const { data: payType } = useQueryData(
    `${devApiUrl}/v1/paytype`, // endpoint
    "get", // method
    "payType" // key
  );

  // use if not loadmore button undertime
  const { data: draft, isLoading } = useQueryData(
    `${devApiUrl}/v1/payroll/list`, // endpoint
    "get", // method
    "draft" // key
  );

  // use if not loadmore button undertime
  const { data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button undertime
  const { data: holidays } = useQueryData(
    `${devApiUrl}/v1/holidays`, // endpoint
    "get", // method
    "holidays" // key
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    // dispatch(setIsFinish(true));
  };

  console.log(isLoading);

  return (
    <>
      <Header />
      <Navigation menu="earnings" />
      <div className="wrapper">
        <div className="flex items-center mb-3 justify-between whitespace-nowrap overflow-auto gap-2">
          {/* <BreadCrumbs /> */}
          <h4 className="text-xl mb-3">Earnings</h4>
          <div className="flex items-center gap-1">
            {!isLoading && (
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleAdd()}
              >
                <FaPlusCircle />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <ManageEarningsList />
        </div>
        <Footer />
      </div>
      {draft?.count > 0 &&
      draft?.data[0].payroll_id !== "" &&
      Number(draft?.data[0].payroll_category_type) !==
        payrollCategory13thMonthId &&
      employee?.count > 0 &&
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
