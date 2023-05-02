import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devApiUrl, hrisDevApiUrl } from "../../../helpers/functions-general";
import { payrollCategorySalaryId } from "../../../helpers/functions-payroll-category-id";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalNoPayrollId from "../../earnings/manage-list/ModalNoPayrollId";
import HolidayExemptionList from "./HolidayExemptionList";
import ModalAddHolidayExemption from "./ModalAddHolidayExemption";

const HolidayExemption = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  // use if not loadmore button undertime
  const { data: isPayrollEmpty } = useQueryData(
    `${devApiUrl}/v1/payroll/list`, // endpoint
    "get", // method
    "isPayrollEmpty" // key
  );

  // use if not loadmore button undertime
  const { data: employeeName } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employeeName", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  // console.log(employeeName);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="holidays" />
      <div className="wrapper">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
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
          <HolidayExemptionList
            setItemEdit={setItemEdit}
            employeeName={employeeName}
          />
        </div>
        <Footer />
      </div>

      {isPayrollEmpty?.count > 0 &&
      isPayrollEmpty?.data[0].payroll_id !== "" &&
      Number(isPayrollEmpty?.data[0].payroll_category_type) ===
        payrollCategorySalaryId &&
      store.isAdd ? (
        <ModalAddHolidayExemption
          item={itemEdit}
          isPayrollEmpty={isPayrollEmpty}
          employeeName={employeeName}
        />
      ) : (
        store.isAdd && <ModalNoPayrollId text="salary " item={itemEdit} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default HolidayExemption;
