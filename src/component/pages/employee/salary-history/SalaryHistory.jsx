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
import SalaryHistoryList from "./SalaryHistoryList";
import ModalSalaryHistory from "./ModalSalaryHistory";
import { getUrlParam, hrisDevApiUrl } from "../../../helpers/functions-general";
import useQueryData from "../../../custom-hooks/useQueryData";

const SalaryHistory = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const empId = getUrlParam().get("employeeid");

  // use if not loadmore button undertime
  const { data: employee, isLoading } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/job/${empId}`, // endpoint
    "get", // method
    "employee", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
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
        <div className="flex items-center justify-between  whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />
          <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          {/* {isLoading && <TableSpinner />}
          <NoData /> */}
          <SalaryHistoryList setItemEdit={setItemEdit} employee={employee} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalSalaryHistory item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SalaryHistory;
