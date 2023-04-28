import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import ManageDeduction from "../manage-list/ManageDeduction";
import PageNotFound from "../../../partials/PageNotFound";

const SystemUserManageDeduction = () => {
  const { store } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));
  if (
    fbsPayroll.isDev === false ||
    store.credentials.data.role_is_developer !== 1
  ) {
    return <PageNotFound />;
  }
  return (
    <>
      <ManageDeduction />
    </>
  );
};

export default SystemUserManageDeduction;
