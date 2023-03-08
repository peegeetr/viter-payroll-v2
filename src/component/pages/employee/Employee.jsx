import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import ModalError from "../../partials/modals/ModalError";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import Navigation from "../../partials/Navigation";
import EmployeeList from "./EmployeeList";

const Employee = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="employee" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Employee</h4>
        <hr />

        <div className="w-full pt-5 pb-20">
          <EmployeeList />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Employee;
