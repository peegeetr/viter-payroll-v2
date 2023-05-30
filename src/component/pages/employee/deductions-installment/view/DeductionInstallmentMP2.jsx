import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { FaPlusCircle } from "react-icons/fa";
import {
  devApiUrl,
  getUrlParam,
  hrisDevApiUrl,
} from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import DeductionInstallmentViewList from "./DeductionInstallmentViewList";
import { PagibigMP2Id } from "../../../../helpers/functions-payitemId";
import {
  setError,
  setIsAdd,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalAddMP2 from "../optional-deduction/ModalAddMP2";

const DeductionInstallmentMP2 = () => {
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
    `${devApiUrl}/v1/payitem/${PagibigMP2Id}`, // endpoint
    "get", // method
    `payItem${PagibigMP2Id}` // key
  );

  // use if not loadmore button undertime
  const { data: employeeInsPagibigMP2 } = useQueryData(
    `${devApiUrl}/v1/employees-installment/by-employee/${PagibigMP2Id}/${eid}`, // endpoint
    "get", // method
    `employeeInsPagibigMP2${PagibigMP2Id}` // key
  );
  const handleAdd = () => {
    if (employeeInsPagibigMP2?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("You already have pending pagibig MP2"));
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
        <div className="flex items-center justify-between mb-3 whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />
          {employeeInsPagibigMP2?.count === 0 && (
            <div className="flex items-center gap-1">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
        <hr />
        <p className="font-semibold m-0">
          Name :
          <span className="font-light pl-4">
            {isLoadingEmployee
              ? "Loading..."
              : `${employee?.data[0].employee_lname}, 
            ${employee?.data[0].employee_fname}`}
          </span>
        </p>

        <div className="w-full pb-40">
          <DeductionInstallmentViewList
            setItemEdit={setItemEdit}
            paytypeId={PagibigMP2Id}
            payItem={payItem?.data}
          />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddMP2 item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default DeductionInstallmentMP2;
