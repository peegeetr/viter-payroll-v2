import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import ManageDeduction from "../manage-list/ManageDeduction";
import PageNotFound from "../../../partials/PageNotFound";

const OtherUserManageDeduction = () => {
  const { store } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  if (fbsPayroll.isDev === true || store.credentials.data.role_is_admin !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <ManageDeduction />
    </>
  );
};

export default OtherUserManageDeduction;
