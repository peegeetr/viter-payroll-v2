import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  getUrlParam,
  hrisDevApiUrl,
} from "../../../../helpers/functions-general";
import { FaPlusCircle } from "react-icons/fa";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import { fwcTithesId } from "../../../../helpers/functions-payitemId";
import DeductionInstallmentViewList from "./DeductionInstallmentViewList";
import {
  setError,
  setIsAdd,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalAddFWCTithes from "../other-deduction/ModalAddFWCTithes";

const DeductionInstallmentFwcTithes = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const eid = getUrlParam().get("employeeid");

  // use if not loadmore button undertime
  const { isLoading: isLoadingEmployee, data: employee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${eid}`, // endpoint
    "get", // method
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button undertime
  const { data: payItem } = useQueryData(
    `${devApiUrl}/v1/payitem/${fwcTithesId}`, // endpoint
    "get", // method
    `payItem${fwcTithesId}` // key
  );
  // use if not loadmore button undertime
  const { data: draft, isLoading: draftLoading } = useQueryData(
    `${devApiUrl}/v1/payroll/list`, // endpoint
    "get", // method
    "draft" // key
  );
  const handleAdd = () => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(
        setMessage("Payroll has ongoing draft. Editing is not allowed.")
      );
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />

        <hr />
        <div className="flex items-center pt-4 justify-between mb-3 whitespace-nowrap overflow-auto gap-2">
          <p className="font-semibold m-0">
            Name :
            <span className="font-light pl-4">
              {isLoadingEmployee
                ? "Loading..."
                : `${employee?.data[0].employee_lname}, 
            ${employee?.data[0].employee_fname}`}
            </span>
          </p>
          {!draftLoading && (
            <div className="flex items-center gap-1">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
        <div className="w-full pb-40">
          <DeductionInstallmentViewList
            setItemEdit={setItemEdit}
            paytypeId={fwcTithesId}
            payItem={payItem?.data}
          />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddFWCTithes item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default DeductionInstallmentFwcTithes;
