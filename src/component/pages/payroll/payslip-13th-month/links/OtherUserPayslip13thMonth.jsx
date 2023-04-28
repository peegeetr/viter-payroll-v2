import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";
import Payslip13thMonth from "../Payslip13thMonth";

const OtherUserPayslip13thMonth = () => {
  const { store } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  if (fbsPayroll.isDev === true || store.credentials.data.role_is_admin !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <Payslip13thMonth />
    </>
  );
};

export default OtherUserPayslip13thMonth;
