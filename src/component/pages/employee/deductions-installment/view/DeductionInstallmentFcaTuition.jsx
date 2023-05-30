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
import { fcaTutionId } from "../../../../helpers/functions-payitemId";
import DeductionInstallmentViewList from "./DeductionInstallmentViewList";
import {
  setError,
  setIsAdd,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalAddFCATuition from "../other-deduction/ModalAddFCATuition";

const DeductionInstallmentFcaTuition = () => {
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
    `${devApiUrl}/v1/payitem/${fcaTutionId}`, // endpoint
    "get", // method
    `payItem${fcaTutionId}` // key
  );
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />
        <p className="font-semibold pt-4 m-0">
          Name :
          <span className="font-light ">
            {isLoadingEmployee
              ? "Loading..."
              : ` ${employee?.data[0].employee_lname}, 
            ${employee?.data[0].employee_fname}`}
          </span>
        </p>

        <div className="w-full pb-40">
          <DeductionInstallmentViewList
            setItemEdit={setItemEdit}
            paytypeId={fcaTutionId}
            payItem={payItem?.data}
          />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddFCATuition item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default DeductionInstallmentFcaTuition;
