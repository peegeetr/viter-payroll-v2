import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadEmployee from "../../../custom-hooks/useLoadEmployee";
import useLoadPayItem from "../../../custom-hooks/useLoadPayItem";
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

const ManageEarnings = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const { payType } = useLoadPayType(`${devApiUrl}/v1/paytype`, "get");
  // const { payItem } = useLoadPayItem(`${devApiUrl}/v1/payitem`, "get");
  const { employee } = useLoadEmployee(`${hrisDevApiUrl}/v1/employees`, "get");

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="earnings" />
      <div className="wrapper">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2">
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
          <ManageEarningsList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddManageEarnings
          item={itemEdit}
          payType={payType}
          employee={employee}
          // payItem={payItem}
        />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default ManageEarnings;
