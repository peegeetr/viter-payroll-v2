import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import ModalAddPayroll from "../ModalAddPayroll";
import PayrollViewList from "./PayrollViewList";

const PayrollView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

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
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-2 pb-20">
          <div className="xs:flex text-primary">
            <p className="font-bold mr-8">
              ID :{" "}
              <span className="font-light text-primary">
                {/* {`${formatDate(item.payroll_start_date).split(" ")[0]} 
                      ${formatDate(item.payroll_start_date).split(" ")[1]} - ${
          formatDate(item.payroll_end_date).split(" ")[1]
        } ${formatDate(item.payroll_end_date).split(" ")[2]}`} */}
                PR-001
              </span>
            </p>
            <p className="font-bold">
              Pay Period :{" "}
              <span className="font-light text-primary">
                {/* {item.payroll_id} */}
                Jan 1 - 15 2023
              </span>
            </p>
          </div>
          <PayrollViewList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddPayroll item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PayrollView;
